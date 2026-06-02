from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.app.db import get_db
from api.app.models import SBOMComponent

router = APIRouter()


@router.get("/{repo_id}")
def get_sbom(
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

    components = []

    total_vulnerable = 0
    licenses = set()

    for package in packages:

        licenses.add(package.license)

        if package.vulnerabilities > 0:
            total_vulnerable += 1

        # PACKAGE RISK SCORE

        risk_score = min(
            package.vulnerabilities * 25,
            100
        )

        risk = "LOW"

        if risk_score >= 90:
            risk = "CRITICAL"

        elif risk_score >= 70:
            risk = "HIGH"

        elif risk_score >= 40:
            risk = "MEDIUM"

        components.append({

            "name": package.name,

            "version": package.version,

            "license": package.license,

            "vulnerabilities":
                package.vulnerabilities,

            "risk_score":
                risk_score,

            "risk":
                risk

        })

    dependency_tree = [

        {
            "parent": "express",
            "child": "body-parser"
        },

        {
            "parent": "express",
            "child": "cookie-parser"
        },

        {
            "parent": "express",
            "child": "lodash"
        },

        {
            "parent": "lodash",
            "child": "tar"
        }

    ]

    supply_chain_score = min(
        (
            total_vulnerable * 10
        ) + (
            len(packages) * 2
        ),
        100
    )

    supply_chain_rating = "LOW"

    if supply_chain_score >= 70:

        supply_chain_rating = "CRITICAL"

    elif supply_chain_score >= 50:

        supply_chain_rating = "HIGH"

    elif supply_chain_score >= 25:

        supply_chain_rating = "MEDIUM"

    return {

        "repository_id": repo_id,

        "package_count":
            len(packages),

        "dependency_count":
            len(dependency_tree),

        "unique_licenses":
            len(licenses),

        "vulnerable_packages":
            total_vulnerable,

        "supply_chain_risk_score":
            supply_chain_score,

        "supply_chain_risk_rating":
            supply_chain_rating,

        "components":
            components,

        "dependencies":
            dependency_tree

    }
