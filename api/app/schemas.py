from pydantic import BaseModel


class RepositoryCreate(BaseModel):
    name: str
    repo_url: str
    branch: str = "main"


class ScanRequest(BaseModel):
    repo_url: str
    scan_type: str = "full"