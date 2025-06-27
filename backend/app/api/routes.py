"""
API routes for the Holo Fill application.
"""

import logging

from fastapi import APIRouter, File, UploadFile

from app.models.image import ImageUploadResponse
from app.services.image_service import process_image_upload

router = APIRouter()
logger = logging.getLogger("uvicorn.error")


@router.get("/")
async def root() -> dict[str, str]:
    """Root endpoint."""
    from app.core.config import settings

    return {
        "message": "Welcome to Holo Fill",
        "version": settings.app_version,
        "docs": "/docs",
    }


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Health check endpoint."""
    from app.core.config import settings

    return {
        "status": "healthy",
        "version": settings.app_version,
    }


@router.post("/upload", response_model=ImageUploadResponse)
async def upload_image(file: UploadFile = File(...)) -> ImageUploadResponse:
    """Upload an image, get a description from OpenAI, then get Three.js code for 3D rendering."""
    return await process_image_upload(file)
