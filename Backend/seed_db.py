from sqlalchemy.orm import Session
from database import Base, engine, get_db
from models import Products

# Define sample products with realistic details and one-line descriptions
sample_products = [
    {"name": "Wireless Mouse", "description": "Ergonomic wireless mouse with adjustable DPI.", "price": 29.99, "category": "Electronics", "is_favorite": False},
    {"name": "Bluetooth Speaker", "description": "Portable Bluetooth speaker with high-quality sound.", "price": 49.99, "category": "Electronics", "is_favorite": True},
    {"name": "Yoga Mat", "description": "Eco-friendly non-slip yoga mat for all yoga styles.", "price": 19.99, "category": "Sports", "is_favorite": False},
    {"name": "Stainless Steel Water Bottle", "description": "Insulated bottle keeps drinks cold for 24 hours.", "price": 24.99, "category": "Kitchen", "is_favorite": True},
    {"name": "Desk Lamp", "description": "LED desk lamp with adjustable brightness settings.", "price": 34.99, "category": "Home Office", "is_favorite": False},
    {"name": "Running Shoes", "description": "Comfortable running shoes with excellent grip and support.", "price": 59.99, "category": "Sports", "is_favorite": True},
    {"name": "Cookware Set", "description": "Non-stick cookware set with 10 essential pieces.", "price": 89.99, "category": "Kitchen", "is_favorite": False},
    {"name": "Wireless Headphones", "description": "Noise-canceling wireless headphones with superior sound.", "price": 99.99, "category": "Electronics", "is_favorite": True},
    {"name": "Gaming Chair", "description": "Ergonomic gaming chair with adjustable lumbar support.", "price": 199.99, "category": "Furniture", "is_favorite": False},
    {"name": "Electric Toothbrush", "description": "Rechargeable electric toothbrush with multiple modes.", "price": 39.99, "category": "Personal Care", "is_favorite": True},
]

# Seed the database
def seed_database():
    Base.metadata.create_all(bind=engine)
    db: Session = get_db().__next__()

    for product_data in sample_products:
        product = Products(**product_data)
        db.add(product)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed_database()
