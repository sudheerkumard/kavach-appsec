from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.app.config import settings
from api.app.db import Base, engine
from api.app.routes import sbom_export

from api.app.routes import (
    dashboard,
    repositories,
    scans,
    findings,
    reports,
    cve,
    remediation,
    jira,
    sbom,
    enterprise_report,
    executive_report
)

# Create DB Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dashboard
app.include_router(
    dashboard.router,
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

# Repositories
app.include_router(
    repositories.router,
    prefix="/api/repositories",
    tags=["Repositories"]
)

# Scans
app.include_router(
    scans.router,
    prefix="/api/scans",
    tags=["Scans"]
)

# Findings
app.include_router(
    findings.router,
    prefix="/api/findings",
    tags=["Findings"]
)

# Reports
app.include_router(
    reports.router,
    prefix="/api/reports",
    tags=["Reports"]
)

# CVE Intelligence
app.include_router(
    cve.router,
    prefix="/api/cve",
    tags=["CVE Intelligence"]
)

# AI Remediation Assistant
app.include_router(
    remediation.router,
    prefix="/api/remediation",
    tags=["AI Remediation"]
)

# Jira Integration
app.include_router(
    jira.router,
    prefix="/api/jira",
    tags=["Jira"]
)

# SBOM Explorer
app.include_router(
    sbom.router,
    prefix="/api/sbom",
    tags=["SBOM"]
)

app.include_router(
    sbom_export.router,
    prefix="/api/sbom/export",
    tags=["SBOM Export"]
)

app.include_router(
    enterprise_report.router,
    prefix="/api/enterprise-report",
    tags=["Enterprise Report"]
)

app.include_router(
    executive_report.router,
    prefix="/api/executive-report",
    tags=["Executive Report"]
)

# Root
@app.get("/")
def root():

    return {
        "message": "Kavach AppSec API Running"
    }


# Health Check
@app.get("/health")
def health():

    return {
        "status": "healthy",
        "version": settings.APP_VERSION
    }