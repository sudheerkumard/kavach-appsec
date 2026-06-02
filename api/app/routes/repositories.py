from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api.app.db import get_db
from api.app.models import Repository
from api.app.schemas import RepositoryCreate

router = APIRouter()


@router.post("/")
def add_repository(repo: RepositoryCreate, db: Session = Depends(get_db)):
    repository = Repository(
        name=repo.name,
        repo_url=repo.repo_url,
        branch=repo.branch
    )
    db.add(repository)
    db.commit()
    db.refresh(repository)
    return repository


@router.get("/")
def list_repositories(db: Session = Depends(get_db)):
    return db.query(Repository).all()
