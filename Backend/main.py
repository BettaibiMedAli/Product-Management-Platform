from fastapi import FastAPI, status, Depends, HTTPException, APIRouter
import models
from database import engine, SessionLocal, get_db
from typing import Annotated
from sqlalchemy.orm import Session
import auth 
from auth import get_current_user
from productManagement import product_router

app = FastAPI()
app.include_router(auth.router)

app.include_router(product_router)

models.Base.metadata.create_all(bind=engine)


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=401, detail="authentication Failed")
    return {"User": user}


