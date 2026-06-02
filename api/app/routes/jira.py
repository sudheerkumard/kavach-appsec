from fastapi import APIRouter

router = APIRouter()

@router.post("/create")
def create_ticket():

    return {
        "ticket": "KAV-101",
        "status": "CREATED"
    }
