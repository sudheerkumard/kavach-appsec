from fastapi import APIRouter
from scanners.semgrep_runner import run_semgrep
from scanners.gitleaks_runner import run_gitleaks
from scanners.checkov_runner import run_checkov

router = APIRouter()

@router.post("/start")
def start(repo_url: str):
    results = {
        "semgrep": run_semgrep(repo_url),
        "gitleaks": run_gitleaks(repo_url),
        "checkov": run_checkov(repo_url)
    }

    return {
        "status": "completed",
        "results": results
    }