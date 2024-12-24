
# Product Management Platform


## Overview

This is a full-stack web application that includes user authentication, CRUD functionality for products, and interactive UI features. The backend is built using FastAPI, and the frontend uses React. The application demonstrates best practices for scalability, performance, and modularity, built entirely from scratch.

## Objective

The goal of this project is to develop a full-stack application where users can:
- Register and log in using JWT-based authentication.
- Perform Create, Read, Update, and Delete operations (CRUD) on products.
- View and manage the list of products with options to search, filter, sort, and mark products as favorites.

## Key Features

### Backend (FastAPI)

- **User Authentication**: 
  - Implemented registration and login endpoints.
  - JWT tokens are used for secure authentication.
  - All product-related endpoints are protected, requiring authentication.

- **Product Management (CRUD)**:
  - Endpoints for creating, reading, updating, and deleting products.
  - Supports query parameters for search, filter, and sorting.
  - Pagination is included for listing products.

- **Database**:
  - SQLite database.
  - Tables for users and products.

### Frontend (React)

- **Authentication Pages**:
  - Login and Registration pages for user authentication via JWT.

- **Dashboard Page**:
  - Displays a list of products with search, filter, and sort functionalities.
  - Pagination for handling large datasets.

- **Product Management**:
  - Allows users to create, update, and delete products.
  - Form validation on the frontend before sending data to the backend.

- **Favorites Management**:
  - Users can mark products as "favorites".
  - A separate view displays only favorite products.

## Technical Requirements

### Backend (FastAPI)
1. **User Authentication**: 
   - JWT authentication for secure user login and registration.
   - Protection for all product-related endpoints.

2. **Product Management (CRUD)**:
   - Endpoints to create, read, update, and delete products with the following properties:
     ```json
     {
       "id": "unique-id",
       "name": "Product Name",
       "description": "Short description of the product",
       "price": 100.0,
       "category": "Electronics",
       "is_favorite": false
     }
     ```

### Frontend (React)
1. **Authentication Pages**:
   - A Login page to authenticate users with JWT tokens.
   - A Registration page for new users.

2. **Dashboard Page**:
   - Display the product list with features to search, filter, and sort products.
   - Pagination for large datasets.

3. **Product Management**:
   - Allow users to create, update, and delete products with form validation.
   
4. **Favorites Management**:
   - Option for users to mark products as favorites and view them in a separate section.
