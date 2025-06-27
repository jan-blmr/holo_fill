import logging

import httpx
from fastapi import HTTPException, UploadFile

from app.core.config import settings
from app.models.image import ImageUploadResponse
from app.services.openai_service import (
    describe_image_with_openai,
    generate_threejs_code_with_openai,
)

logger = logging.getLogger("uvicorn.error")


async def process_image_upload(file: UploadFile) -> ImageUploadResponse:
    # Validate file type
    if file.content_type not in settings.supported_formats:
        raise HTTPException(status_code=400, detail="Unsupported file type.")

    contents = await file.read()
    file_size = len(contents)
    logger.info(f"File size: {file_size} bytes ({file_size / 1024 / 1024:.2f} MB)")
    if file_size > settings.max_image_size:
        raise HTTPException(status_code=400, detail="File too large.")

    # 1. Get description
    logger.info("Starting image description with OpenAI...")
    try:
        description = await describe_image_with_openai(contents, file.content_type)
    except httpx.ReadTimeout:
        logger.error("Timeout during image description")
        return ImageUploadResponse(
            success=False,
            message="OpenAI API timed out during image description. Please try a smaller or simpler image.",
            image_id=None,
            description=None,
            threejs_code=None,
        )
    if not description:
        logger.error("Failed to get description from OpenAI")
        return ImageUploadResponse(
            success=False,
            message="Failed to get description from OpenAI.",
            image_id=None,
            description=None,
            threejs_code=None,
        )
    logger.info(f"Got description: {description[:100]}...")

    # 2. Get Three.js code
    logger.info("Starting Three.js code generation with OpenAI...")
    try:
        threejs_code = await generate_threejs_code_with_openai(contents, file.content_type, description)
    except httpx.ReadTimeout:
        logger.error("Timeout during Three.js generation")
        return ImageUploadResponse(
            success=False,
            message="OpenAI API timed out during 3D generation. Please try a smaller or simpler image.",
            image_id=None,
            description=None,
            threejs_code=None,
        )
    if not threejs_code:
        logger.error("Failed to get Three.js code from OpenAI")
        return ImageUploadResponse(
            success=False,
            message="Failed to get Three.js code from OpenAI.",
            image_id=None,
            description=None,
            threejs_code=None,
        )
    logger.info(f"Got Three.js code: {len(threejs_code)} characters")

    return ImageUploadResponse(
        success=True,
        message="Image processed successfully.",
        image_id=None,
        analysis_status="complete",
        description=description,
        threejs_code=threejs_code,
    )
