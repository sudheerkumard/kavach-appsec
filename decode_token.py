import requests
from jose import jwt

url = "http://localhost:8080/realms/Aegis%20Data%20Kavach/protocol/openid-connect/token"

data = {
    "grant_type": "password",
    "client_id": "kavach-appsec",
    "client_secret": "gqdHWf22Jc0O7lAxwpYHE6VNum8B493b",
    "username": "admin",
    "password": "GoldGold@1306"
}

r = requests.post(url, data=data)

print("Status:", r.status_code)

response = r.json()

print(response)

token = response["access_token"]

claims = jwt.get_unverified_claims(token)

print("\n=== TOKEN CLAIMS ===")
print(claims)

print("\n=== ROLES ===")

roles = claims.get(
    "realm_access",
    {}
).get(
    "roles",
    []
)

print(roles)