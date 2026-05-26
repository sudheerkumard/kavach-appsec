from fastapi import FastAPI
from api.app.routes import github, scans, health

app = FastAPI(title="Kavach AppSec API")

app.include_router(health.router)
app.include_router(github.router, prefix="/github")
app.include_router(scans.router, prefix="/scans")