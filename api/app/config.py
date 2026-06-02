from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Kavach AppSec API"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"

    DATABASE_URL: str = "postgresql://kavach:kavach123@localhost:5432/kavach"

    REDIS_URL: str = "redis://localhost:6379/0"

    GITHUB_WEBHOOK_SECRET: str = "kavach-secret"

    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]


settings = Settings()
