from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from urllib.parse import urlparse

from api.app.db import get_db
from api.app.models import Repository, Scan
from worker.worker import start_scan

router = APIRouter()


class ScanRequest(BaseModel):
    repo_url: str
    scan_type: str = "full"


# ==========================================
# GET ALL SCANS
# ==========================================

@router.get("/")
def get_scans(db: Session = Depends(get_db)):

    scans = db.query(Scan).all()

    results = []

    for scan in scans:

        repo_name = None

        if scan.repository:
            repo_name = scan.repository.name

        results.append(
            {
                "id": scan.id,
                "task_id": scan.task_id,
                "repository": repo_name,
                "scan_type": scan.scan_type,
                "status": scan.status,
                "progress": scan.progress,
                "current_stage": scan.current_stage,
                "started_at": scan.started_at,
                "completed_at": scan.completed_at,
                "created_at": scan.created_at,
            }
        )

    return results


# ==========================================
# START NEW SCAN
# ==========================================

@router.post("/start")
def launch_scan(
    request: ScanRequest,
    db: Session = Depends(get_db)
):

    parsed = urlparse(request.repo_url)

    repo_name = (
        parsed.path.split("/")[-1]
        .replace(".git", "")
    )

    repo = (
        db.query(Repository)
        .filter(
            Repository.repo_url ==
            request.repo_url
        )
        .first()
    )

    if not repo:

        repo = Repository(
            name=repo_name,
            repo_url=request.repo_url
        )

        db.add(repo)
        db.commit()
        db.refresh(repo)

    task = start_scan.delay(
        request.repo_url
    )

    scan = Scan(
        task_id=task.id,
        repo_id=repo.id,
        scan_type=request.scan_type,
        status="QUEUED",
        progress=0,
        current_stage="QUEUED"
    )

    db.add(scan)
    db.commit()
    db.refresh(scan)

    return {
        "task_id": task.id,
        "status": "QUEUED",
        "repository": repo.name
    }


# ==========================================
# GET SINGLE SCAN
# ==========================================

@router.get("/{scan_id}")
def get_scan(
    scan_id: int,
    db: Session = Depends(get_db)
):

    scan = (
        db.query(Scan)
        .filter(Scan.id == scan_id)
        .first()
    )

    if not scan:

        return {
            "error": "Scan not found"
        }

    return {
        "id": scan.id,
        "task_id": scan.task_id,
        "status": scan.status,
        "progress": scan.progress,
        "current_stage": scan.current_stage,
        "started_at": scan.started_at,
        "completed_at": scan.completed_at,
    }