import requests

from jose import jwt
from jose import JWTError

from fastapi import HTTPException

KEYCLOAK_URL = "http://localhost:8080"
REALM = "master"

JWKS_URL = (
    f"{KEYCLOAK_URL}/realms/{REALM}"
    "/protocol/openid-connect/certs"
)


def validate_token(token):

    try:

        jwks = requests.get(
            JWKS_URL
        ).json()

        header = jwt.get_unverified_header(
            token
        )

        key = next(
            k
            for k in jwks["keys"]
            if k["kid"] == header["kid"]
        )

        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            options={
                "verify_aud": False
            }
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )