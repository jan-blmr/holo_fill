"""
Exception handling for the Holo Fill application.
"""

from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.config import settings


async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Global exception handler."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": (str(exc) if settings.debug else "Something went wrong"),
        },
    )
