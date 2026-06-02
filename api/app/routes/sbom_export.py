from fastapi import APIRouter, Depends
from fastapi.responses import (
    JSONResponse,
    StreamingResponse,
    FileResponse
)

from sqlalchemy.orm import Session

from api.app.db import get_db
from api.app.models import SBOMComponent

import csv
import io

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

router = APIRouter()


@router.get("/{repo_id}/json")
def export_json(
    repo_id: int,
    db: Session = Depends(get_db)
):

    packages = (
        db.query(SBOMComponent)
        .filter(
            SBOMComponent.repo_id == repo_id
        )
        .all()
    )

    return {
        "format": "JSON",
        "repository_id": repo_id,
        "components": [
            {
                "name": p.name,
                "version": p.version,
                "license": p.license,
                "vulnerabilities": p.vulnerabilities,
            }
            for p in packages
        ],
    }


@router.get("/{repo_id}/cyclonedx")
def export_cyclonedx(
    repo_id: int,
    db: Session = Depends(get_db)
):

    packages = (
        db.query(SBOMComponent)
        .filter(
            SBOMComponent.repo_id == repo_id
        )
        .all()
    )

    return {
        "bomFormat": "CycloneDX",
        "specVersion": "1.5",
        "components": [
            {
                "name": p.name,
                "version": p.version,
                "type": "library",
            }
            for p in packages
        ],
    }


@router.get("/{repo_id}/spdx")
def export_spdx(
    repo_id: int,
    db: Session = Depends(get_db)
):

    packages = (
        db.query(SBOMComponent)
        .filter(
            SBOMComponent.repo_id == repo_id
        )
        .all()
    )

    return {
        "spdxVersion": "SPDX-2.3",
        "packages": [
            {
                "name": p.name,
                "version": p.version,
                "license": p.license,
            }
            for p in packages
        ],
    }


@router.get("/{repo_id}/csv")
def export_csv(
    repo_id: int,
    db: Session = Depends(get_db)
):

    packages = (
        db.query(SBOMComponent)
        .filter(
            SBOMComponent.repo_id == repo_id
        )
        .all()
    )

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow(
        [
            "Package",
            "Version",
            "License",
            "Vulnerabilities"
        ]
    )

    for p in packages:

        writer.writerow(
            [
                p.name,
                p.version,
                p.license,
                p.vulnerabilities
            ]
        )

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition":
            f"attachment; filename=sbom_{repo_id}.csv"
        }
    )


@router.get("/{repo_id}/pdf")
def export_pdf(
    repo_id: int,
    db: Session = Depends(get_db)
):

    packages = (
        db.query(SBOMComponent)
        .filter(
            SBOMComponent.repo_id == repo_id
        )
        .all()
    )

    filename = f"sbom_report_{repo_id}.pdf"

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            f"SBOM Security Report - Repository {repo_id}",
            styles["Title"]
        )
    )

    content.append(
        Spacer(1, 12)
    )

    for p in packages:

        content.append(
            Paragraph(
                f"""
                <b>{p.name}</b><br/>
                Version: {p.version}<br/>
                License: {p.license}<br/>
                Vulnerabilities: {p.vulnerabilities}
                """,
                styles["BodyText"]
            )
        )

        content.append(
            Spacer(1, 8)
        )

    doc.build(content)

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename
    )
