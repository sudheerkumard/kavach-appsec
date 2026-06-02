from fastapi import APIRouter
from sqlalchemy.orm import Session

from api.app.db import SessionLocal
from api.app.models import Scan

router = APIRouter()


@router.get("/{task_id}")
def get_task(task_id: str):
    db: Session = SessionLocal()

    try:
        scan = db.query(Scan).filter(
            Scan.task_id == task_id
        ).first()

        if not scan:
            return {"status": "not_found"}

        return {
            "task_id": scan.task_id,
            "status": scan.status
        }

    finally:
        db.close()
