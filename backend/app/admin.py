from typing import Any
import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .auth import get_current_user
from .database import get_db
from .models import User, Region, AlertHistory, FloodPrediction
from .schemas import RegionSummary, DashboardStats

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/regions", response_model=list[RegionSummary])
def list_regions(
    db: Session = Depends(get_db),
    current_user: Any = Depends(get_current_user),
    limit: int = 200,
):
    """
    List all regions with their latest risk predictions.
    
    Returns up to 200 regions (default) with their most recent flood prediction data.
    """
    try:
        if limit > 500:
            limit = 500  # Cap at 500
        regions = db.query(Region).limit(limit).all()
        items: list[RegionSummary] = []
        for r in regions:
            latest = (
                db.query(FloodPrediction)
                .filter(FloodPrediction.region_id == r.id)
                .order_by(FloodPrediction.created_at.desc())
                .first()
            )
            items.append(
                RegionSummary(
                    id=r.id,
                    name=r.name,
                    state=r.state,
                    latest_risk_level=latest.risk_level if latest else None,
                    latest_risk_score=latest.risk_score if latest else None,
                )
            )
        return items
    except SQLAlchemyError as e:
        logger.error("Database error listing regions: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch regions")
    except Exception as e:
        logger.error("Unexpected error listing regions: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/stats", response_model=DashboardStats)
def basic_stats(
    db: Session = Depends(get_db),
    current_user: Any = Depends(get_current_user),
):
    """
    Get dashboard statistics.
    
    Returns total users, regions, and alerts sent in the last 24 hours.
    """
    try:
        total_users = db.query(func.count(User.id)).filter(User.is_active == True).scalar() or 0
        total_regions = db.query(func.count(Region.id)).scalar() or 0
        # Count alerts from last 24 hours
        from datetime import datetime, timedelta
        yesterday = datetime.utcnow() - timedelta(hours=24)
        alerts_sent_24h = (
            db.query(func.count(AlertHistory.id))
            .filter(AlertHistory.sent_at >= yesterday)
            .scalar() or 0
        )
        return DashboardStats(
            total_users=total_users,
            total_regions=total_regions,
            alerts_sent_24h=alerts_sent_24h,
        )
    except SQLAlchemyError as e:
        logger.error("Database error fetching stats: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")
    except Exception as e:
        logger.error("Unexpected error fetching stats: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")




