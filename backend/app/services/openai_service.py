"""
OpenAI service for image analysis and Three.js code generation.
"""

import base64
import logging
import os

import httpx

from app.core.config import settings
from app.core.utils import extract_code_from_output, extract_first_output_text

logger = logging.getLogger("uvicorn.error")

# Load prompts
PROMPTS_DIR = os.path.join(os.path.dirname(__file__), "..", "prompts")

with open(os.path.join(PROMPTS_DIR, "describe_image.txt"), "r", encoding="utf-8") as f:
    DESCRIBE_IMAGE_PROMPT = f.read()

with open(os.path.join(PROMPTS_DIR, "generate_threejs_html.txt"), "r", encoding="utf-8") as f:
    GENERATE_THREEJS_HTML_PROMPT = f.read()


async def describe_image_with_openai(image_bytes: bytes, content_type: str) -> str | None:
    """Send the image to OpenAI and get a detailed description."""
    api_key = settings.openai_api_key
    if not api_key:
        logger.error("OpenAI API key not configured")
        return None

    url = "https://api.openai.com/v1/responses"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    image_b64 = base64.b64encode(image_bytes).decode()
    data_url = f"data:{content_type};base64,{image_b64}"

    data = {
        "model": settings.openai_model,
        "input": [
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": DESCRIBE_IMAGE_PROMPT},
                    {"type": "input_image", "image_url": data_url},
                ],
            }
        ],
    }

    logger.info("Making OpenAI request for image description (timeout: 600s)")

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=data, timeout=600)
            logger.info(f"OpenAI status: {response.status_code}")
            logger.info(f"OpenAI response: {response.text}")

            if response.status_code == 200:
                result = response.json()
                output = result.get("output", None)
                return extract_first_output_text(output)
            else:
                logger.error(f"OpenAI API error: {response.status_code} - {response.text}")
                return None
        except httpx.ReadTimeout:
            logger.error("OpenAI API timed out during image description")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during image description: {e}")
            return None


async def generate_threejs_code_with_openai(image_bytes: bytes, content_type: str, description: str) -> str | None:
    """Send the image and description to OpenAI and get Three.js code for 3D rendering."""
    api_key = settings.openai_api_key
    if not api_key:
        logger.error("OpenAI API key not configured")
        return None

    url = "https://api.openai.com/v1/responses"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    prompt = GENERATE_THREEJS_HTML_PROMPT.format(description=description)
    image_b64 = base64.b64encode(image_bytes).decode()
    data_url = f"data:{content_type};base64,{image_b64}"

    data = {
        "model": settings.openai_model,
        "input": [
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": prompt},
                    {"type": "input_image", "image_url": data_url},
                ],
            }
        ],
    }

    logger.info("Making OpenAI request for Three.js generation (timeout: 600s)")

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, headers=headers, json=data, timeout=600)
            logger.info(f"OpenAI status (Three.js): {response.status_code}")
            logger.info(f"OpenAI response (Three.js): {response.text}")

            if response.status_code == 200:
                result = response.json()
                output = result.get("output", None)
                code = extract_code_from_output(output)
                logger.info(f"Three.js code: {code}")
                return code
            else:
                logger.error(f"OpenAI API error (Three.js): {response.status_code} - {response.text}")
                return None
        except httpx.ReadTimeout:
            logger.error("OpenAI API timed out during Three.js generation")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during Three.js generation: {e}")
            return None
