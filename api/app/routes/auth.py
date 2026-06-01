from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def auth_health():

    return {
        "status": "Keycloak Connected"
    }

@router.get("/protected")
def protected():

    return {
        "status": "Protected Endpoint"
    }