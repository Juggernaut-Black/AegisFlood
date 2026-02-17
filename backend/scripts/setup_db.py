import os
from dotenv import load_dotenv

# Load environment variables from .env file FIRST
load_dotenv()

# Debug: Print environment variables
print(f"DATABASE_URL from env: {os.getenv('DATABASE_URL')}")

# Now import after environment is loaded
from sqlalchemy import text
from sqlalchemy.exc import OperationalError
from backend.app.database import engine, Base
from backend.app.models import User, Region, FloodPrediction, AlertHistory # Explicitly import all models

print(f"Engine URL: {engine.url}")


def ensure_postgis():
    # Skip PostGIS setup for SQLite
    if "sqlite" in str(engine.url):
        print("SQLite detected - skipping PostGIS setup")
        return
    try:
        with engine.connect() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis"))
            conn.commit()
    except OperationalError as e:
        print("Database connection failed:", e)
        raise


def create_sqlite_tables():
    """Create SQLite-compatible tables without PostGIS columns"""
    with engine.connect() as conn:
        # Users table (without geography)
        conn.execute(text("""
            CREATE TABLE users (
                id INTEGER NOT NULL PRIMARY KEY,
                phone_number VARCHAR(15) NOT NULL UNIQUE,
                name VARCHAR(255),
                location_lat REAL,
                location_lon REAL,
                language VARCHAR(10) NOT NULL DEFAULT 'en',
                role VARCHAR(20) NOT NULL DEFAULT 'citizen',
                sms_alerts BOOLEAN NOT NULL DEFAULT 1,
                whatsapp_alerts BOOLEAN NOT NULL DEFAULT 0,
                is_active BOOLEAN NOT NULL DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """))
        
        # Regions table (without geography)
        conn.execute(text("""
            CREATE TABLE regions (
                id INTEGER NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                state VARCHAR(100),
                population INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """))
        
        # Flood predictions table
        conn.execute(text("""
            CREATE TABLE flood_predictions (
                id INTEGER NOT NULL PRIMARY KEY,
                region_id INTEGER NOT NULL,
                prediction_date DATE NOT NULL DEFAULT CURRENT_DATE,
                risk_level VARCHAR(20) NOT NULL,
                risk_score INTEGER NOT NULL,
                weather_data TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                FOREIGN KEY (region_id) REFERENCES regions (id)
            )
        """))
        
        # Alert history table
        conn.execute(text("""
            CREATE TABLE alert_history (
                id INTEGER NOT NULL PRIMARY KEY,
                region_id INTEGER,
                alert_type VARCHAR(50) NOT NULL,
                message TEXT NOT NULL,
                severity VARCHAR(20) NOT NULL,
                delivery_count INTEGER NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                FOREIGN KEY (region_id) REFERENCES regions (id)
            )
        """))
        
        conn.commit()
        print("SQLite tables created successfully!")


def init_tables():
    # For SQLite, we need to create tables without PostGIS columns
    # Drop all existing tables before creating them
    Base.metadata.drop_all(bind=engine)
    
    # Create tables without PostGIS columns for SQLite compatibility
    if "sqlite" in str(engine.url):
        create_sqlite_tables()
    else:
        # Create all tables defined in Base.metadata
        Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    ensure_postgis()
    init_tables()
    print("Database initialized.")




