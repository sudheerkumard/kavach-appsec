from fastapi import APIRouter
from fastapi import Depends

from api.app.auth.dependencies import (
    get_current_user
)

router = APIRouter()


@router.get("/health")
def auth_health():

    return {
        "status": "Keycloak Connected"
    }


@router.get("/me")
def me(
    user=Depends(get_current_user)
):

    return user
