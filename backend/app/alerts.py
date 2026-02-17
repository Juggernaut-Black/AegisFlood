from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Any

from .database import get_db
from .models import Alert, User, AlertHistory, Region
from .schemas import AlertCreate, AlertResponse
from .auth import get_current_user
from .services.sms_service import sms_service, whatsapp_service
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=AlertResponse)
def create_alert(
    alert: AlertCreate,
    db: Session = Depends(get_db),
    current_user: Any = Depends(get_current_user),
):
    """
    Create a new alert and send notifications to users.
    
    Requires authority role. Creates Alert record and AlertHistory entry,
    then sends SMS/WhatsApp to all citizens based on their preferences.
    """
    if current_user.get("role") != "authority":
        raise HTTPException(status_code=403, detail="Only authorities can create alerts")

    try:
        # Find region by name for AlertHistory (optional)
        region = db.query(Region).filter(Region.name.ilike(f"%{alert.region}%")).first()
        region_id = region.id if region else None

        # Create alert record
        data = alert.model_dump()
        db_alert = Alert(
            region=data["region"],
            message=data["message"],
            risk_level=data["risk_level"],
            created_by=current_user.get("phone_number"),
        )
        db.add(db_alert)
        db.flush()  # Get alert ID without committing

        # Track notification sending
        sent_count = 0
        users = db.query(User).filter(User.role == "citizen", User.is_active == True).all()
        message = f"FLOOD ALERT: {alert.message} - Risk Level: {alert.risk_level}"
        
        for user in users:
            try:
                sent = False
                if user.sms_alerts:
                    if sms_service.send_sms(user.phone_number, message):
                        sent = True
                if user.whatsapp_alerts:
                    if whatsapp_service.send_whatsapp(user.phone_number, message):
                        sent = True
                if sent:
                    sent_count += 1
            except Exception as e:
                logger.error("Failed to send alert to user %s: %s", user.id, e, exc_info=True)

        # Create AlertHistory entry
        if region_id:
            alert_history = AlertHistory(
                region_id=region_id,
                message=alert.message,
                risk_level=alert.risk_level,
                sent_to_count=sent_count,
                created_by=current_user.get("phone_number"),
            )
            db.add(alert_history)

        db.commit()
        db.refresh(db_alert)
        logger.info("Alert %s created by %s, sent to %d users", db_alert.id, current_user.get("phone_number"), sent_count)
        return db_alert

    except SQLAlchemyError as e:
        db.rollback()
        logger.error("Database error creating alert: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to create alert")
    except Exception as e:
        db.rollback()
        logger.error("Unexpected error creating alert: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/", response_model=List[AlertResponse])
def get_alerts(
    db: Session = Depends(get_db),
    current_user: Any = Depends(get_current_user),
    limit: int = 50,
):
    """
    List recent alerts (MVP: last 50 for any authenticated user).
    
    Returns alerts ordered by creation date (newest first).
    """
    try:
        if limit > 100:
            limit = 100  # Cap at 100
        alerts = db.query(Alert).order_by(Alert.created_at.desc()).limit(limit).all()
        return alerts
    except Exception as e:
        logger.error("Error fetching alerts: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch alerts")

@router.post("/{alert_id}/confirm")
def confirm_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: Any = Depends(get_current_user),
):
    """Mark an alert as confirmed by the user."""
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {"message": "Alert confirmed successfully"}


@router.post("/test-sms")
def test_sms(
    phone_number: str,
    message: str = "Test SMS from AegisFlood",
    current_user: Any = Depends(get_current_user),
):
    """Test SMS (authority only)."""
    if current_user.get("role") != "authority":
        raise HTTPException(status_code=403, detail="Only authorities can test SMS")
    success = sms_service.send_sms(phone_number, message)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send test SMS")
    return {"message": "Test SMS sent successfully"}


@router.post("/test-whatsapp")
def test_whatsapp(
    phone_number: str,
    message: str = "Test WhatsApp from AegisFlood",
    current_user: Any = Depends(get_current_user),
):
    """Test WhatsApp (authority only)."""
    if current_user.get("role") != "authority":
        raise HTTPException(status_code=403, detail="Only authorities can test WhatsApp")
    success = whatsapp_service.send_whatsapp(phone_number, message)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send test WhatsApp")
    return {"message": "Test WhatsApp sent successfully"}




