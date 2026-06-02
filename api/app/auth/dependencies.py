from fastapi import Depends

from api.app.auth.keycloak import oauth2_scheme
from api.app.auth.jwt_validator import validate_token


def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    return validate_token(token)
