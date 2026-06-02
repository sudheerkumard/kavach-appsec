from fastapi import APIRouter

from api.app.services.cve_service import (
    get_cve_intelligence
)

router = APIRouter()

@router.get("/{cve_id}")
def get_cve(cve_id: str):

    return get_cve_intelligence(
        cve_id
    )
