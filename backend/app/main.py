from pathlib import Path
import os
import logging
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

# Load backend/.env when running from project root (uvicorn backend.app.main:app)
_env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(_env_path)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
    ]
)

logger = logging.getLogger(__name__)

from .auth import router as auth_router
from .prediction import router as prediction_router
from .alerts import router as alerts_router
from .admin import router as admin_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    logger.info("Starting AegisFlood API...")
    yield
    logger.info("Shutting down AegisFlood API...")


def create_app() -> FastAPI:
    app = FastAPI(
        title="AegisFlood API (MVP)",
        description="AI-powered flood prediction and community alert system",
        version="1.0.0",
        lifespan=lifespan,
    )

    frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[frontend_origin],
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

    # Global exception handlers
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.warning("Validation error: %s", exc.errors())
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"detail": "Validation error", "errors": exc.errors()},
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
        logger.error("Database error: %s", exc, exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Database error occurred"},
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        logger.error("Unhandled exception: %s", exc, exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "Internal server error"},
        )

    app.include_router(auth_router, prefix="/auth", tags=["auth"])
    app.include_router(prediction_router, prefix="/predictions", tags=["predictions"])
    app.include_router(alerts_router, prefix="/alerts", tags=["alerts"])
    app.include_router(admin_router, prefix="/dashboard", tags=["dashboard"])

    @app.get("/health")
    def health():
        """Health check endpoint."""
        return {"status": "ok", "service": "aegisflood-api"}

    return app


app = create_app()




