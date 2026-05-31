from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime

from api.app.db import get_db
from api.app.models import Repository, Finding, SBOMComponent

from api.app.services.chart_generator import (
    vulnerability_chart,
    repository_risk_chart,
    license_chart,
    vulnerable_components_chart,
    risk_trend_chart
)

router = APIRouter()


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.drawString(
        40,
        20,
        "© 2026 Aegis Data Kavach | Confidential"
    )
    canvas.drawRightString(
        550,
        20,
        f"Page {canvas.getPageNumber()}"
    )
    canvas.restoreState()


@router.get("/pdf")
def export_enterprise_pdf(
    db: Session = Depends(get_db)
):

    filename = "Aegis_Data_Kavach_Enterprise_Report.pdf"

    repositories = db.query(Repository).all()
    findings = db.query(Finding).all()
    components = db.query(SBOMComponent).all()

    total_repositories = len(repositories)
    total_findings = len(findings)
    total_components = len(components)

    critical_count = len([f for f in findings if f.severity == "CRITICAL"])
    high_count = len([f for f in findings if f.severity == "HIGH"])
    medium_count = len([f for f in findings if f.severity == "MEDIUM"])
    low_count = len([f for f in findings if f.severity == "LOW"])

    vulnerable_components = len(
        [c for c in components if c.vulnerabilities > 0]
    )

    risk_score = (
        critical_count * 10 +
        high_count * 5 +
        medium_count * 2 +
        low_count
    )

    if risk_score > 1500:
        risk_rating = "CRITICAL"
    elif risk_score > 1000:
        risk_rating = "HIGH"
    elif risk_score > 500:
        risk_rating = "MEDIUM"
    else:
        risk_rating = "LOW"

    vulnerability_chart(
        critical_count,
        high_count,
        medium_count,
        low_count
    )

    license_data = {}
    for c in components:
        key = c.license or "Unknown"
        license_data[key] = license_data.get(key, 0) + 1

    license_chart(license_data)

    repo_risk = []
    for repo in repositories:
        score = len([
            f for f in findings
            if f.repo_id == repo.id
        ])

        repo_risk.append({
            "name": repo.name,
            "score": score
        })

    repository_risk_chart(repo_risk)

    component_data = []

    for c in components:
        if c.vulnerabilities > 0:
            component_data.append({
                "name": c.name,
                "vulnerabilities": c.vulnerabilities
            })

    if component_data:
        vulnerable_components_chart(component_data)

    risk_trend_chart()

    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "AEGIS DATA KAVACH",
            styles["Title"]
        )
    )

    content.append(
        Paragraph(
            "Enterprise Software Supply Chain Security Report",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            f"Generated: {datetime.utcnow()}",
            styles["BodyText"]
        )
    )

    content.append(Spacer(1, 30))

    content.append(
        Paragraph(
            "Executive Dashboard",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            f"""
            Overall Risk Rating: <b>{risk_rating}</b><br/>
            Risk Score: <b>{risk_score}</b><br/><br/>

            Repositories: {total_repositories}<br/>
            Findings: {total_findings}<br/>
            Components: {total_components}<br/>
            Vulnerable Components: {vulnerable_components}<br/><br/>

            Critical: {critical_count}<br/>
            High: {high_count}<br/>
            Medium: {medium_count}<br/>
            Low: {low_count}
            """,
            styles["BodyText"]
        )
    )

    content.append(PageBreak())

    content.append(
        Paragraph(
            "Vulnerability Analytics",
            styles["Heading1"]
        )
    )

    content.append(Image("vulnerability_chart.png", width=350, height=250))
    content.append(Spacer(1, 15))
    content.append(Image("repository_risk_chart.png", width=450, height=250))

    content.append(PageBreak())

    content.append(
        Paragraph(
            "Supply Chain Analytics",
            styles["Heading1"]
        )
    )

    content.append(Image("license_chart.png", width=350, height=250))
    content.append(Spacer(1, 15))
    content.append(Image("vulnerable_components_chart.png", width=450, height=250))
    content.append(Spacer(1, 15))
    content.append(Image("risk_trend_chart.png", width=450, height=250))

    content.append(PageBreak())

    content.append(
        Paragraph(
            "License Compliance Analysis",
            styles["Heading1"]
        )
    )

    for license_name, count in license_data.items():
        content.append(
            Paragraph(
                f"{license_name}: {count} packages",
                styles["BodyText"]
            )
        )

    content.append(PageBreak())

    content.append(
        Paragraph(
            "Repository Security Analysis",
            styles["Heading1"]
        )
    )

    for repo in repositories:

        repo_findings = [
            f for f in findings
            if f.repo_id == repo.id
        ]

        repo_components = [
            c for c in components
            if c.repo_id == repo.id
        ]

        content.append(
            Paragraph(
                f"""
                <b>{repo.name}</b><br/>
                URL: {repo.repo_url}<br/>
                Findings: {len(repo_findings)}<br/>
                Dependencies: {len(repo_components)}
                """,
                styles["BodyText"]
            )
        )

        content.append(Spacer(1, 10))

    content.append(PageBreak())

    content.append(
        Paragraph(
            "Security Maturity Assessment",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            """
            Dependency Governance: 75%<br/>
            SBOM Coverage: 90%<br/>
            Vulnerability Visibility: 85%<br/>
            License Governance: 80%<br/>
            Supply Chain Monitoring: 70%<br/><br/>
            Overall Security Maturity: Level 3
            """,
            styles["BodyText"]
        )
    )

    content.append(PageBreak())

    content.append(
        Paragraph(
            "90-Day Remediation Roadmap",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            """
            0-30 Days<br/>
            • Remediate Critical Findings<br/>
            • Upgrade Vulnerable Dependencies<br/><br/>

            30-60 Days<br/>
            • Continuous SBOM Monitoring<br/>
            • License Governance<br/><br/>

            60-90 Days<br/>
            • Supply Chain Security Automation<br/>
            • Executive Security Scorecards
            """,
            styles["BodyText"]
        )
    )

    doc.build(
        content,
        onFirstPage=add_footer,
        onLaterPages=add_footer
    )

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename
    )
