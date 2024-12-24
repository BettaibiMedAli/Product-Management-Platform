from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Products
from schemas import ProductCreate, ProductResponse
from auth import get_current_user
from pydantic import BaseModel

class FavoriteStatusUpdate(BaseModel): 
    is_favorite: bool

product_router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

# Create a new product
@product_router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate,
                db: Session = Depends(get_db),
                    current_user: dict = Depends(get_current_user)):
    new_product = Products(
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        is_favorite=product.is_favorite
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


# Fetch products with optional filters, pagination and sorting
@product_router.get("/", response_model=list[ProductResponse], status_code=status.HTTP_200_OK)
def get_products(skip: int = 0,
                limit: int = 10,
                search: str = None,
                category: str = None,
                sort: str = None,
                db: Session = Depends(get_db),
                current_user: dict = Depends(get_current_user)):
    query = db.query(Products)
    if search:
        query = query.filter(Products.name.ilike(f"%{search}%"))
    if category:
        query = query.filter(Products.category == category)
    if sort:
        if sort == "asc":
            query = query.order_by(Products.price.asc())
        elif sort == "desc":
            query = query.order_by(Products.price.desc())
    products = query.offset(skip).limit(limit).all()
    return products


# Get product by Id
@product_router.get("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def get_product(product_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    product = db.query(Products).filter(Products.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# update existing product
@product_router.put("/{product_id}", response_model=ProductResponse, status_code=status.HTTP_200_OK)
def update_product(product_id: int, newProduct: ProductCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    product = db.query(Products).filter(Products.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.name = newProduct.name
    product.description = newProduct.description
    product.price = newProduct.price
    product.category = newProduct.category
    product.is_favorite = newProduct.is_favorite

    db.commit()
    db.refresh(product)
    return product


# Update the favorite status of a product
@product_router.put("/{product_id}/favorite", status_code=status.HTTP_200_OK)
async def update_favorite_status(product_id: int, update: FavoriteStatusUpdate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    product = db.query(Products).filter(Products.id == product_id).first()
    if not product:
         raise HTTPException(status_code=404, detail="Product not found")
    
    product.is_favorite = update.is_favorite
    db.commit() 
    db.refresh(product) 
    return product

# Delete product by Id
@product_router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    product = db.query(Products).filter(Products.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"detail": "Product deleted successfully"}
