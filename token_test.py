import requests

url = (
    "http://localhost:8080/realms/Aegis%20Data%20Kavach"
    "/protocol/openid-connect/token"
)

data = {
    "grant_type": "password",
    "client_id": "kavach-appsec",
    "client_secret": "gqdHWf22Jc0O7lAxwpYHE6VNum8B493b",
    "username": "admin",
    "password": "GoldGold@1306"
}

response = requests.post(
    url,
    data=data
)

print("Status:", response.status_code)
print(response.json())
