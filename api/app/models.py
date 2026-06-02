from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Text
)

from sqlalchemy.orm import relationship
from datetime import datetime

from api.app.db import Base


class Repository(Base):

    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    repo_url = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    scans = relationship(
        "Scan",
        back_populates="repository"
    )


class Scan(Base):

    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)

    task_id = Column(String, unique=True, index=True)

    repo_id = Column(
        Integer,
        ForeignKey("repositories.id")
    )

    scan_type = Column(String)

    status = Column(String)

    progress = Column(Integer, default=0)

    current_stage = Column(String)

    error_message = Column(Text)

    started_at = Column(DateTime)

    completed_at = Column(DateTime)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    repository = relationship(
        "Repository",
        back_populates="scans"
    )


class Finding(Base):

    __tablename__ = "findings"

    id = Column(Integer, primary_key=True, index=True)

    repo_id = Column(
        Integer,
        ForeignKey("repositories.id")
    )

    tool = Column(String)

    severity = Column(String)

    title = Column(Text)

    description = Column(Text)

    file_path = Column(Text)

    line_number = Column(Integer)

    cwe = Column(String)

    owasp = Column(String)

    recommendation = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class SLA(Base):

    __tablename__ = "sla_tracking"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    severity = Column(String)

    sla_days = Column(Integer)


class SBOMComponent(Base):

    __tablename__ = "sbom_components"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    repo_id = Column(
        Integer,
        ForeignKey("repositories.id")
    )

    name = Column(String)

    version = Column(String)

    license = Column(String)

    vulnerabilities = Column(
        Integer,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
