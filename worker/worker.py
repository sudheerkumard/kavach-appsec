from celery import Celery
from scanners.semgrep_runner import run_semgrep
from scanners.gitleaks_runner import run_gitleaks
from scanners.checkov_runner import run_checkov

celery = Celery(
    "kavach",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery.task
def start_scan(repo_url):
    findings = {}

    findings["semgrep"] = run_semgrep(repo_url)
    findings["gitleaks"] = run_gitleaks(repo_url)
    findings["checkov"] = run_checkov(repo_url)

    return findings