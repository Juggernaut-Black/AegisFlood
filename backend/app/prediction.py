import random
import logging
from datetime import date, timedelta
from typing import Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .database import get_db
from .models import FloodPrediction, Region
from .schemas import PredictionResponse

logger = logging.getLogger(__name__)
router = APIRouter()


class SimplePredictionEngine:
    """
    Simple rule-based flood prediction engine (MVP).
    
    Uses rainfall data to calculate risk levels:
    - High: >100mm rainfall
    - Medium: 50-100mm rainfall
    - Low: <50mm rainfall
    """
    def predict_flood_risk(self, region_id: int, weather_data: Dict) -> Dict:
        rainfall_24h = weather_data.get('rainfall_24h', random.uniform(0, 150))
        if rainfall_24h > 100:
            risk_level = 'high'
            risk_score = min(90, 60 + int(rainfall_24h - 100))
        elif rainfall_24h > 50:
            risk_level = 'medium'
            risk_score = 30 + int(rainfall_24h - 50)
        else:
            risk_level = 'low'
            risk_score = max(10, int(rainfall_24h))
        return {
            'region_id': region_id,
            'risk_level': risk_level,
            'risk_score': risk_score,
            'factors': {
                'rainfall_24h': rainfall_24h,
                'prediction_method': 'simple_rules'
            },
            'valid_until': date.today() + timedelta(days=1)
        }


@router.get("/{region_id}", response_model=PredictionResponse)
def get_prediction(region_id: int, db: Session = Depends(get_db)):
    """
    Get flood prediction for a specific region.
    
    Generates a new prediction using simple rule-based engine and stores it.
    """
    try:
        region = db.query(Region).filter(Region.id == region_id).one_or_none()
        if region is None:
            raise HTTPException(status_code=404, detail="Region not found")

        engine = SimplePredictionEngine()
        weather_data = {
            'rainfall_24h': random.uniform(0, 150),
            'temperature': random.uniform(20, 35)
        }
        prediction = engine.predict_flood_risk(region_id, weather_data)

        db_prediction = FloodPrediction(
            region_id=region_id,
            risk_level=prediction['risk_level'],
            risk_score=prediction['risk_score'],
            weather_data=weather_data,
        )
        db.add(db_prediction)
        db.commit()
        logger.info("Prediction created for region %s: %s (score: %d)", region_id, prediction['risk_level'], prediction['risk_score'])
        return prediction
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        db.rollback()
        logger.error("Database error creating prediction: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to create prediction")
    except Exception as e:
        db.rollback()
        logger.error("Unexpected error creating prediction: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/location")
def get_prediction_by_location(lat: float, lon: float, db: Session = Depends(get_db)):
    """
    Get prediction by location coordinates (MVP: returns first available region).
    
    In production, this would use PostGIS to find the nearest region.
    """
    try:
        # MVP: naive mapping to nearest region by ID for demo purposes
        region = db.query(Region).first()
        if region is None:
            raise HTTPException(status_code=404, detail="No regions available")
        return get_prediction(region.id, db)
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error getting prediction by location: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to get prediction")




