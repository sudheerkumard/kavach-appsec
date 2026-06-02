from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/pdf")
def generate_executive_report():

    return JSONResponse(
        {
            "status": "success",
            "message": "Executive Report API Working"
        }
    )
