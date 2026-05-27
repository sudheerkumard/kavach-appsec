import os
from celery import Celery
from scanners.semgrep_runner import run_semgrep
from scanners.gitleaks_runner import run_gitleaks
from scanners.checkov_runner import run_checkov

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")

celery = Celery(
    "kavach",
    broker=redis_url,
    backend=redis_url
)