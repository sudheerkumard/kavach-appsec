from fastapi import APIRouter

router = APIRouter()

@router.get("/{finding_id}")
def remediation(finding_id: int):

    return {
        "finding_id": finding_id,
        "root_cause": "Vulnerable dependency detected.",
        "package": "underscore",
        "current_version": "1.12.0",
        "fixed_version": "1.13.1",
        "upgrade_command": "npm install underscore@1.13.1",
        "owasp": "A06: Vulnerable and Outdated Components",
        "verification": [
            "npm audit",
            "Re-run Kavach scan",
            "Verify CVE removed"
        ]
    }