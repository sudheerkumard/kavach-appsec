from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.app.db import get_db
from api.app.models import Repository, Scan, Finding

router = APIRouter()


@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    repositories = db.query(Repository).count()
    scans = db.query(Scan).count()
    findings = db.query(Finding).count()

    critical = (
        db.query(Finding)
        .filter(Finding.severity == "CRITICAL")
        .count()
    )

    severity_distribution = {}

    for severity in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:

        severity_distribution[severity] = (
            db.query(Finding)
            .filter(Finding.severity == severity)
            .count()
        )

    tool_distribution = {}

    for tool in ["Semgrep", "Trivy", "Checkov", "Gitleaks"]:

        tool_distribution[tool] = (
            db.query(Finding)
            .filter(Finding.tool == tool)
            .count()
        )

    repo_scores = []

    repos = db.query(Repository).all()

    for repo in repos:

        critical_count = 0
        high_count = 0
        medium_count = 0
        low_count = 0

        #
        # Get findings belonging to this repository
        #
        repo_findings = (
            db.query(Finding)
            .filter(Finding.repo_id == repo.id)
            .all()
        )

        for finding in repo_findings:

            if finding.severity == "CRITICAL":
                critical_count += 1

            elif finding.severity == "HIGH":
                high_count += 1

            elif finding.severity == "MEDIUM":
                medium_count += 1

            elif finding.severity == "LOW":
                low_count += 1

        weighted_risk = (
            (critical_count * 10)
            + (high_count * 5)
            + (medium_count * 2)
            + low_count
        )

        score = round(
            100 / (1 + (weighted_risk / 50))
        )

        if score >= 80:
            risk = "LOW"

        elif score >= 60:
            risk = "MEDIUM"

        elif score >= 40:
            risk = "HIGH"

        else:
            risk = "CRITICAL"

        repo_scores.append(
            {
                "id": repo.id,
                "name": repo.name,
                "repo_url": repo.repo_url,
                "score": score,
                "risk": risk,
                "critical": critical_count,
                "high": high_count,
                "medium": medium_count,
                "low": low_count,
            }
        )

    repo_scores = sorted(
        repo_scores,
        key=lambda x: x["score"]
    )

    return {
        "repositories": repositories,
        "scans": scans,
        "findings": findings,
        "critical": critical,
        "severity_distribution": severity_distribution,
        "tool_distribution": tool_distribution,
        "repository_risk": repo_scores,
    }
