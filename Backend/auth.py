from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from models import Users
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

# Secret key and algorithm for JWT encoding/decoding
SecretKey = 'rs89va6v5jce75w3fi51y7ot9644jd84zu4nwnuzfdupg54r9v4a9xmq7abc3c3z'
Algorithm = 'HS256'

# Initialize password hashing context using bcrypt
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')


class CreateUserRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Dependency injection for database session
db_dependency = Annotated[Session, Depends(get_db)]


# Endpoint for user registration
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    # Check if the username already exists in the database
    if db.query(Users).filter(Users.username == create_user_request.username).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists.")
    
    create_user_model = Users(
        username=create_user_request.username,
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )

    db.add(create_user_model)
    db.commit()
    return {"message": "User registered successfully"}


# Endpoint for user login
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user!')

    # Creating an access token with expiration time
    token = create_access_token(user.username, user.id, timedelta(minutes=20))

    return {'access_token': token, 'token_type': 'bearer'}


# Authenticate user credentials
def authenticate_user(username: str, password: str, db):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return False 
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

# Create a JWT access token
def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SecretKey, algorithm=Algorithm)


# Get the current user from the token
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SecretKey, algorithms=[Algorithm])
        username: str = payload.get('sub')
        user_id: int = payload.get('id')
        
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user!')
        return {'username': username, 'id': user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user!')
