import os
from datetime import datetime, timedelta
from typing import Optional, Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from .database import get_db
from .models import User
from .schemas import RegisterRequest, VerifyRequest, TokenResponse, AdminLoginRequest, UserMeResponse, UserMeUpdate


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

JWT_SECRET = os.getenv("JWT_SECRET", "change_me")
JWT_ALG = "HS256"
JWT_EXPIRE_HOURS = int(os.getenv("JWT_EXPIRE_HOURS", "24"))


def create_access_token(subject: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=JWT_EXPIRE_HOURS))
    to_encode = {"sub": subject, "role": role, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALG)


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
        phone = payload.get("sub")
        role = payload.get("role")
        if phone is None or role is None:
            raise credentials_exception
        return {"phone_number": phone, "role": role}
    except JWTError:
        raise credentials_exception


def require_role(required_role: str):
    def _role_checker(user=Depends(get_current_user)):
        if user["role"] != required_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user

    return _role_checker


def get_current_user_db(
    payload: Any = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Load full User from DB for citizens; None for authority (no DB row)."""
    sub = payload.get("phone_number") or ""
    if sub.startswith("admin:"):
        return None
    user = db.query(User).filter(User.phone_number == sub).one_or_none()
    return user


@router.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new user or update existing user preferences.
    
    Creates user if phone doesn't exist, otherwise updates preferences.
    Returns OTP sent confirmation (MVP: always returns success).
    """
    from sqlalchemy.exc import SQLAlchemyError
    import logging
    from .utils import sanitize_phone, sanitize_string, validate_language_code
    
    logger = logging.getLogger(__name__)
    
    try:
        # Sanitize and validate phone
        phone = sanitize_phone(req.phone_number)
        if not phone:
            raise HTTPException(status_code=400, detail="Invalid phone number format")
        
        # Validate language if provided
        if req.language and not validate_language_code(req.language):
            raise HTTPException(status_code=400, detail="Invalid language code")
        
        existing = db.query(User).filter(User.phone_number == phone).one_or_none()
        if existing is None:
            # Sanitize name/location
            name = sanitize_string(req.name or req.location)
            user = User(
                phone_number=phone,
                name=name,
                language=req.language or "en",
                role="citizen",
                sms_alerts=req.sms_alerts if req.sms_alerts is not None else True,
                whatsapp_alerts=req.whatsapp_alerts if req.whatsapp_alerts is not None else False,
            )
            db.add(user)
            db.commit()
            logger.info("New user registered: %s", phone)
        else:
            # Update preferences when re-registering
            if req.name or req.location:
                existing.name = existing.name or sanitize_string(req.name or req.location)
            if req.language is not None:
                existing.language = req.language
            if req.sms_alerts is not None:
                existing.sms_alerts = req.sms_alerts
            if req.whatsapp_alerts is not None:
                existing.whatsapp_alerts = req.whatsapp_alerts
            db.commit()
            logger.info("User preferences updated: %s", phone)
        return {"otp_sent": True}
    except SQLAlchemyError as e:
        db.rollback()
        logger.error("Database error in register: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Registration failed")
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error("Unexpected error in register: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/verify", response_model=TokenResponse)
def verify(req: VerifyRequest, db: Session = Depends(get_db)):
    """
    Verify OTP and return JWT token.
    
    MVP: accepts OTP "0000" for demo purposes.
    In production, this would verify against stored OTP with expiration.
    """
    import logging
    from sqlalchemy.exc import SQLAlchemyError
    from .utils import sanitize_phone
    
    logger = logging.getLogger(__name__)
    
    try:
        phone = sanitize_phone(req.phone_number)
        if not phone:
            raise HTTPException(status_code=400, detail="Invalid phone number format")
        otp = req.otp.strip()
        
        # MVP: accept any OTP == "0000"
        if otp != "0000":
            logger.warning("Invalid OTP attempt for phone: %s", phone)
            raise HTTPException(status_code=400, detail="Invalid OTP")
        
        user = db.query(User).filter(User.phone_number == phone).one_or_none()
        if user is None:
            logger.warning("Verification attempt for non-existent user: %s", phone)
            raise HTTPException(status_code=404, detail="User not found. Please register first.")
        
        if not user.is_active:
            raise HTTPException(status_code=403, detail="User account is inactive")
        
        token = create_access_token(subject=user.phone_number, role=user.role)
        logger.info("User verified successfully: %s (role: %s)", phone, user.role)
        return TokenResponse(access_token=token, role=user.role)
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        logger.error("Database error in verify: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Verification failed")
    except Exception as e:
        logger.error("Unexpected error in verify: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/admin/login", response_model=TokenResponse)
def admin_login(req: AdminLoginRequest):
    admin_user = os.getenv("ADMIN_USERNAME", "admin")
    admin_pass = os.getenv("ADMIN_PASSWORD", "admin123")
    if req.username != admin_user or req.password != admin_pass:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(subject=f"admin:{req.username}", role="authority")
    return TokenResponse(access_token=token, role="authority")


@router.get("/me", response_model=UserMeResponse)
def get_me(
    payload: dict = Depends(get_current_user),
    user_db: Optional[User] = Depends(get_current_user_db),
):
    """Current user profile (from JWT + DB for citizens)."""
    if user_db is not None:
        return UserMeResponse(
            phone_number=user_db.phone_number,
            role=user_db.role,
            name=user_db.name,
            language=user_db.language or "en",
            sms_alerts=user_db.sms_alerts,
            whatsapp_alerts=user_db.whatsapp_alerts,
        )
    sub = payload.get("phone_number", "")
    return UserMeResponse(
        phone_number=sub,
        role="authority",
        name="Authority",
        language="en",
        sms_alerts=False,
        whatsapp_alerts=False,
    )


@router.patch("/me", response_model=UserMeResponse)
def update_me(
    body: UserMeUpdate,
    payload: dict = Depends(get_current_user),
    user_db: Optional[User] = Depends(get_current_user_db),
    db: Session = Depends(get_db),
):
    """
    Update current user profile (citizens only).
    
    Allows updating name, language, and alert preferences.
    Authority users cannot update via this endpoint.
    """
    import logging
    from sqlalchemy.exc import SQLAlchemyError
    
    logger = logging.getLogger(__name__)
    
    if user_db is None:
        raise HTTPException(status_code=403, detail="Authority profile cannot be updated here")
    
    try:
        if body.name is not None:
            user_db.name = body.name.strip()[:255] if body.name else None
        if body.language is not None:
            user_db.language = body.language
        if body.sms_alerts is not None:
            user_db.sms_alerts = body.sms_alerts
        if body.whatsapp_alerts is not None:
            user_db.whatsapp_alerts = body.whatsapp_alerts
        
        db.commit()
        db.refresh(user_db)
        logger.info("Profile updated for user: %s", user_db.phone_number)
        return UserMeResponse(
            phone_number=user_db.phone_number,
            role=user_db.role,
            name=user_db.name,
            language=user_db.language or "en",
            sms_alerts=user_db.sms_alerts,
            whatsapp_alerts=user_db.whatsapp_alerts,
        )
    except SQLAlchemyError as e:
        db.rollback()
        logger.error("Database error updating profile: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to update profile")
    except Exception as e:
        db.rollback()
        logger.error("Unexpected error updating profile: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")




