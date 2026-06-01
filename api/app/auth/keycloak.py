from fastapi.security import OAuth2AuthorizationCodeBearer

KEYCLOAK_SERVER_URL = "http://localhost:8080"

KEYCLOAK_REALM = "master"

KEYCLOAK_CLIENT_ID = "kavach-appsec"

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=(
        f"{KEYCLOAK_SERVER_URL}/realms/"
        f"{KEYCLOAK_REALM}"
        "/protocol/openid-connect/auth"
    ),
    tokenUrl=(
        f"{KEYCLOAK_SERVER_URL}/realms/"
        f"{KEYCLOAK_REALM}"
        "/protocol/openid-connect/token"
    )
)