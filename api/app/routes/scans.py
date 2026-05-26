from fastapi import APIRouter

router = APIRouter()

@router.post("/start")
def start():
    return {"message": "scan endpoint ready"}