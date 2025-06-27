"""
Utility functions for the Holo Fill application.
"""

import re
from typing import Any


def extract_first_output_text(output: Any) -> str | None:
    """Extract the first output text from OpenAI response."""
    if not isinstance(output, list):
        return None
    for item in output:
        if item.get("type") == "message":
            for content in item.get("content", []):
                if content.get("type") == "output_text":
                    return content.get("text", "").strip()
    return None


def extract_code_from_output(output: Any) -> str | None:
    """Extract code from OpenAI response output."""
    text = extract_first_output_text(output)
    if not text:
        return None
    match = re.search(r"```(?:html)?\n(.*?)```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text
