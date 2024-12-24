from fastapi import FastAPI, status, Depends, HTTPException, APIRouter
import models
from database import engine, SessionLocal, get_db
from typing import Annotated
from sqlalchemy.orm import Session
import auth
from auth import get_current_user
from productManagement import product_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to the URL of your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include authentication and product management routes
app.include_router(auth.router)
app.include_router(product_router)

# Create all database tables if they do not exist
models.Base.metadata.create_all(bind=engine)

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

# Root endpoint to check authentication and user details
@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="Authentication Failed")
    return {"User": user}