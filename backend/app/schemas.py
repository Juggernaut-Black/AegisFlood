from datetime import date, datetime
from typing import Optional, List, Dict
from pydantic import BaseModel, Field, constr, conint, model_serializer


PhoneNumberStr = constr(min_length=8, max_length=15)


class RegisterRequest(BaseModel):
    phone_number: PhoneNumberStr
    name: Optional[str] = None
    language: Optional[str] = Field(default="en", pattern=r"^[a-z]{2}(-[A-Z]{2})?$")
    location: Optional[str] = None
    sms_alerts: Optional[bool] = True
    whatsapp_alerts: Optional[bool] = False


class VerifyRequest(BaseModel):
    phone_number: PhoneNumberStr
    otp: constr(min_length=4, max_length=8)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class UserMeResponse(BaseModel):
    phone_number: str
    role: str
    name: Optional[str] = None
    language: str = "en"
    sms_alerts: bool = True
    whatsapp_alerts: bool = False


class UserMeUpdate(BaseModel):
    name: Optional[str] = None
    language: Optional[str] = Field(default=None, pattern=r"^[a-z]{2}(-[A-Z]{2})?$")
    sms_alerts: Optional[bool] = None
    whatsapp_alerts: Optional[bool] = None


class PredictionResponse(BaseModel):
    region_id: int
    risk_level: str
    risk_score: conint(ge=0, le=100)
    factors: Dict[str, float | str]
    valid_until: date


class AlertCreate(BaseModel):
    region: str
    message: constr(min_length=1, max_length=500)
    risk_level: str = Field(..., pattern=r"^(low|medium|high|critical)$")


class AlertResponse(BaseModel):
    id: int
    region: str
    message: str
    risk_level: str
    created_by: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
    
    @model_serializer
    def serialize_model(self):
        """Serialize datetime to ISO string for JSON."""
        return {
            'id': self.id,
            'region': self.region,
            'message': self.message,
            'risk_level': self.risk_level,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat() if isinstance(self.created_at, datetime) else str(self.created_at),
        }


class AlertRequest(BaseModel):
    region_id: int
    risk_level: str
    message: constr(min_length=1, max_length=300)


class AlertHistoryItem(BaseModel):
    id: int
    region_id: int
    message: str
    risk_level: Optional[str]
    sent_to_count: int
    sent_at: str
    created_by: Optional[str]

    class Config:
        from_attributes = True


class RegionSummary(BaseModel):
    id: int
    name: str
    state: Optional[str]
    latest_risk_level: Optional[str] = None
    latest_risk_score: Optional[int] = None


class DashboardStats(BaseModel):
    total_users: int
    total_regions: int
    alerts_sent_24h: int




