"""
Configuration settings for the Holo Fill application.
"""

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "Holo Fill"
    app_version: str = "0.1.0"
    debug: bool = Field(default=False, description="Enable debug mode")

    # Server
    host: str = Field(default="0.0.0.0", description="Server host")
    port: int = Field(default=8000, description="Server port")

    # OpenAI
    openai_api_key: str | None = Field(None, description="OpenAI API key")
    openai_model: str = Field(default="gpt-4.1", description="OpenAI model to use")
    openai_max_tokens: int = Field(default=1000, description="Maximum tokens for OpenAI responses")

    # Image processing
    max_image_size: int = Field(default=10 * 1024 * 1024, description="Maximum image size in bytes (10MB)")
    supported_formats: list[str] = Field(
        default=["image/jpeg", "image/png", "image/webp"], description="Supported image formats"
    )

    # CORS
    cors_origins: list[str] = Field(
        default=["http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:8000"],
        description="Allowed CORS origins",
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


# Global settings instance
settings = Settings()
