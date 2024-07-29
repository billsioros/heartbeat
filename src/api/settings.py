from pathlib import Path
from pydantic import BaseModel, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class DatabaseSettings(BaseModel):
    uri: PostgresDsn = "postgresql://guest:)M8z*yss$cRxw7(&@localhost:5432/heartbeat"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="BACKEND_",
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
        extra="ignore",
    )

    database: DatabaseSettings = DatabaseSettings()
    checkpoint_path: Path
