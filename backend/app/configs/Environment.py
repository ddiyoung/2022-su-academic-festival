from functools import lru_cache
import os

from pydantic import BaseSettings, Field, SecretStr


@lru_cache
def get_env_filename():
    runtime_env = os.getenv("ENV")
    return f".env.{runtime_env}" if runtime_env else ".env"


class EnvironmentSettings(BaseSettings):
    DATABASE_DIALECT: str = Field(..., env="DATABASE_DIALECT")
    DATABASE_HOSTNAME: str = Field(..., env="DATABASE_HOSTNAME")
    DATABASE_NAME: str = Field(..., env="DATABASE_NAME")
    DATABASE_PASSWORD: str = Field(..., env="DATABASE_PASSWORD")
    DATABASE_PORT: int = Field(..., env="DATABASE_PORT")
    DATABASE_USERNAME: str = Field(..., env="DATABASE_USERNAME")
    DEBUG_MODE: bool = Field(..., env="DEBUG_MODE")

    class Config:
        env_file = get_env_filename()
        env_file_encoding = "utf-8"


@lru_cache
def get_environment_variables():
    return EnvironmentSettings()
