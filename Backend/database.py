from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


Database_URL = 'sqlite:///./productManagementApp'

engine = create_engine(Database_URL, connect_args={'check_same_thread': False})

SessionLocal = sessionmaker(autocommit = Fasle, autoflush=Fasle, bind=engine)

Base = declarative_base()