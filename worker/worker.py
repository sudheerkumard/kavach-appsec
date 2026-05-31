from celery import Celery
from sqlalchemy.orm import Session
from api.app.db import SessionLocal
from api.app.models import Finding, Repository, Scan

from scanners.semgrep_runner import run_semgrep
from scanners.gitleaks_runner import run_gitleaks
from scanners.checkov_runner import run_checkov
from scanners.trivy_runner import run_trivy

import tempfile
import git
import shutil
import os
import uuid
from datetime import datetime, timezone


celery_app = Celery(
    "kavach",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)


def normalize_severity(severity):
    if not severity:
        return "LOW"

    severity = str(severity).upper()

    mapping = {
        "ERROR": "HIGH",
        "WARNING": "MEDIUM",
        "INFO": "LOW",
        "CRITICAL": "CRITICAL",
        "HIGH": "HIGH",
        "MEDIUM": "MEDIUM",
        "LOW": "LOW"
    }

    return mapping.get(severity, "LOW")


@celery_app.task(bind=True)
def start_scan(self, repo_url):

    db: Session = SessionLocal()

    temp_dir = tempfile.mkdtemp()

    try:

        # =========================
        # SAVE / CREATE REPOSITORY
        # =========================

        repository = db.query(Repository).filter(
            Repository.repo_url == repo_url
        ).first()

        if not repository:

            repository = Repository(
                name=repo_url.split("/")[-1].replace(".git", ""),
                repo_url=repo_url
            )

            db.add(repository)
            db.commit()
            db.refresh(repository)

        # =========================
        # CREATE SCAN RECORD
        # =========================

        scan = Scan(
            task_id=str(uuid.uuid4()),
            repo_id=repository.id,
            scan_type="FULL",
            status="RUNNING",
            progress=5,
            current_stage="CLONING",
            started_at=datetime.now(timezone.utc)
        )

        db.add(scan)
        db.commit()
        db.refresh(scan)

        # =========================
        # CLONE REPOSITORY
        # =========================

        git.Repo.clone_from(repo_url, temp_dir)

        # =========================
        # SEMGREP
        # =========================

        scan.current_stage = "SAST_RUNNING"
        scan.progress = 25
        db.commit()

        print("RUNNING SEMGREP")

        semgrep_results = run_semgrep(temp_dir)

        try:

            for item in semgrep_results.get("results", []):

                severity = (
                    item.get("extra", {})
                    .get("severity", "LOW")
                )

                finding = Finding(
                    repo_id=repository.id,
                    tool="Semgrep",
                    severity=normalize_severity(severity),
                    title=item.get(
                        "check_id",
                        "Semgrep Finding"
                    ),
                    description=item.get(
                        "message",
                        "Code issue detected"
                    ),
                    file_path=item.get("path", ""),
                    line_number=item.get(
                        "start",
                        {}
                    ).get("line", 0)
                )

                db.add(finding)

            db.commit()

        except Exception as e:
            print("SEMGREP SAVE ERROR:", str(e))

        # =========================
        # GITLEAKS
        # =========================

        scan.current_stage = "SECRETS_RUNNING"
        scan.progress = 45
        db.commit()

        print("RUNNING GITLEAKS")

        gitleaks_results = run_gitleaks(temp_dir)

        try:

            for leak in gitleaks_results:

                finding = Finding(
                    repo_id=repository.id,
                    tool="Gitleaks",
                    severity="HIGH",
                    title=leak.get(
                        "RuleID",
                        "Secret Detected"
                    ),
                    description=leak.get(
                        "Description",
                        "Potential secret exposure"
                    ),
                    file_path=leak.get("File", ""),
                    line_number=leak.get("StartLine", 0)
                )

                db.add(finding)

            db.commit()

        except Exception as e:
            print("GITLEAKS SAVE ERROR:", str(e))

        # =========================
        # CHECKOV
        # =========================

        scan.current_stage = "IAC_RUNNING"
        scan.progress = 70
        db.commit()

        print("RUNNING CHECKOV")

        checkov_results = run_checkov(temp_dir)

        try:

            failed_checks = []

            if isinstance(checkov_results, dict):

                failed_checks = (
                    checkov_results.get("results", {})
                    .get("failed_checks", [])
                )

            elif isinstance(checkov_results, list):

                for result in checkov_results:

                    if isinstance(result, dict):

                        failed_checks.extend(
                            result.get("results", {})
                            .get("failed_checks", [])
                        )

            for check in failed_checks:

                finding = Finding(
                    repo_id=repository.id,
                    tool="Checkov",
                    severity=normalize_severity(
                        check.get("severity", "MEDIUM")
                    ),
                    title=(
                        check.get("check_name")
                        or check.get("check_id")
                        or "Checkov Finding"
                    ),
                    description=(
                        check.get("guideline")
                        or "Infrastructure issue detected"
                    ),
                    file_path=check.get("file_path", ""),
                    line_number=(
                        check.get(
                            "file_line_range",
                            [0]
                        )[0]
                        if check.get("file_line_range")
                        else 0
                    )
                )

                db.add(finding)

            db.commit()

        except Exception as e:
            print("CHECKOV SAVE ERROR:", str(e))

        # =========================
        # TRIVY
        # =========================

        scan.current_stage = "SCA_RUNNING"
        scan.progress = 90
        db.commit()

        print("RUNNING TRIVY")

        trivy_results = run_trivy(temp_dir)

        try:

            for result in trivy_results.get("Results", []):

                vulnerabilities = result.get(
                    "Vulnerabilities",
                    []
                )

                for vuln in vulnerabilities:

                    finding = Finding(
                        repo_id=repository.id,
                        tool="Trivy",
                        severity=normalize_severity(
                            vuln.get("Severity")
                        ),
                        title=vuln.get(
                            "VulnerabilityID",
                            "Unknown CVE"
                        ),
                        description=(
                            f"{vuln.get('PkgName')} | "
                            f"Installed: {vuln.get('InstalledVersion')} | "
                            f"Fixed: {vuln.get('FixedVersion')}"
                        ),
                        file_path=result.get("Target", ""),
                        line_number=0
                    )

                    db.add(finding)

            db.commit()

        except Exception as e:
            print("TRIVY SAVE ERROR:", str(e))

        # =========================
        # COMPLETE
        # =========================

        scan.status = "COMPLETED"
        scan.progress = 100
        scan.current_stage = "COMPLETED"
        scan.completed_at = datetime.now(timezone.utc)

        db.commit()

        return {
            "status": "completed",
            "repo": repo_url
        }

    except Exception as e:

        db.rollback()

        if "scan" in locals():

            scan.status = "FAILED"
            scan.current_stage = "FAILED"

            try:
                scan.error_message = str(e)
            except:
                pass

            db.commit()

        return {
            "status": "failed",
            "error": str(e)
        }

    finally:

        db.close()

        try:
            shutil.rmtree(temp_dir)
        except:
            pass