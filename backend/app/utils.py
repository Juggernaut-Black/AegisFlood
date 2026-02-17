"""
Utility functions for input validation and sanitization.
"""
import re
from typing import Optional


def sanitize_phone(phone: str) -> Optional[str]:
    """
    Sanitize and validate phone number.
    
    Removes spaces, dashes, and validates basic format.
    Returns None if invalid.
    """
    if not phone:
        return None
    
    # Remove common separators
    cleaned = re.sub(r'[\s\-\(\)]', '', phone.strip())
    
    # Remove leading + if present
    if cleaned.startswith('+'):
        cleaned = cleaned[1:]
    
    # Basic validation: 8-15 digits
    if not re.match(r'^\d{8,15}$', cleaned):
        return None
    
    return cleaned


def sanitize_string(value: str, max_length: int = 255) -> Optional[str]:
    """
    Sanitize string input by trimming and limiting length.
    
    Returns None if empty after trimming.
    """
    if not value:
        return None
    
    cleaned = value.strip()
    if not cleaned:
        return None
    
    if len(cleaned) > max_length:
        cleaned = cleaned[:max_length]
    
    return cleaned


def validate_language_code(code: str) -> bool:
    """
    Validate language code format (e.g., 'en', 'hi', 'as', 'ta').
    """
    if not code:
        return False
    return bool(re.match(r'^[a-z]{2}(-[A-Z]{2})?$', code.strip()))
