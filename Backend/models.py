from database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean



class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String,  nullable=False)

class Products(Base):
    __tablename__ = 'products'
    
    id = Column(Integer, primary_key=True,unique=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    is_favorite = Column(Boolean)


    