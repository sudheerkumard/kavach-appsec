from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from datetime import datetime, timedelta, timezone

from api.app.db import get_db
from api.app.models import Finding

router = APIRouter()


@router.get("/")
def get_findings(db: Session = Depends(get_db)):

    findings = (
        db.query(Finding)
        .order_by(Finding.id.desc())
        .all()
    )

    items = []

    for finding in findings:

        severity = (
            finding.severity or "LOW"
        ).upper()

        sla_days = {
            "CRITICAL": 7,
            "HIGH": 30,
            "MEDIUM": 60,
            "LOW": 90,
        }.get(severity, 90)

        created = finding.created_at

        if created is None:

            created = datetime.now(timezone.utc)

        due_date = created + timedelta(days=sla_days)

        now = datetime.now(timezone.utc)

        days_remaining = (
            due_date - now
        ).days

        items.append(
            {
                "id": finding.id,
                "tool": finding.tool,
                "title": finding.title,
                "severity": finding.severity,
                "description": finding.description,
                "file_path": finding.file_path,
                "line_number": finding.line_number,
                "sla_days": sla_days,
                "due_date": due_date.strftime("%Y-%m-%d"),
                "days_remaining": days_remaining,
                "overdue": days_remaining < 0,
            }
        )

    return {
        "total": len(items),
        "items": items,
    }
