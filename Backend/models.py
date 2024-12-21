from database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean
from typing import Optional



class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)

class Products(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True,unique=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    is_favorite = Column(Boolean)

    