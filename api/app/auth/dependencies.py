from fastapi import Depends

from api.app.auth.keycloak import oauth2_scheme


def get_current_user(
    token: str = Depends(oauth2_scheme)
):
    return token