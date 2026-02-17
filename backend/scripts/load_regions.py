import os
from dotenv import load_dotenv
import json
from pathlib import Path
from sqlalchemy.orm import Session

# Load environment variables from .env file FIRST
load_dotenv()

from backend.app.database import SessionLocal
from backend.app.models import Region


def load_regions(db: Session, path: Path):
    data = json.loads(path.read_text(encoding="utf-8"))
    
    # Check if using SQLite and load directly
    if "sqlite" in str(db.bind.url):
        from sqlalchemy import text
        for item in data:
            # Check if region exists
            result = db.execute(text("SELECT id FROM regions WHERE name = :name"), {"name": item["name"]}).fetchone()
            if result:
                continue
            
            # Insert region directly
            db.execute(text("""
                INSERT INTO regions (name, state, population, created_at)
                VALUES (:name, :state, :population, CURRENT_TIMESTAMP)
            """), {
                "name": item["name"],
                "state": item.get("state"),
                "population": item.get("population")
            })
        db.commit()
    else:
        # Use ORM for PostgreSQL
        for item in data:
            exists = db.query(Region).filter(Region.name == item["name"]).one_or_none()
            if exists:
                continue
            region = Region(
                name=item["name"], 
                state=item.get("state"),
                population=item.get("population")
            )
            db.add(region)
        db.commit()


if __name__ == "__main__":
    db = SessionLocal()
    try:
        load_regions(db, Path(__file__).parent.parent / "data" / "regions.json")
        print("Regions loaded.")
    finally:
        db.close()




