from fastapi import APIRouter
from worker.worker import start_scan

router = APIRouter()

@router.post("/start")
def start(repo_url: str):
    task = start_scan.delay(repo_url)
    return {
        "task_id": task.id,
        "status": "queued"
    }