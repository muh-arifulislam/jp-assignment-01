##### live-hosting: <https://jp-assignment-01.vercel.app/>

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- create .env file in root directory. with the given variable.
  ```env
    PORT= 5000
    DB_URL= //your_database_url
  ```
- `npm run start:dev` to start the local server

# Code Overview

## Dependencies

- expressjs - The server for handling and routing HTTP requests
- mongoose - For modeling and mapping MongoDB data to javascript
- zod - For schema validation
- cors - For handling cross origin request
- dotenv - To secure environment variable
- eslint - To secure clean code
- typescript - To ensure type safety

## Application Structure

- `app.js` - This file defines our app.Here we setup our application middlewares. It also requires the routes.
- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose.
- `config/` - This folder contains configuration for configuration/environment variables.
- `modules/` - This folder contains modules. Here we followed the modulers software design pattern.
- `middleware/` - This folder contains application all middleware.
- `utils/` - This folder contains utilities functions.
- `error/` - This folder contains error handling related functions.
- `interface/` - This folder contains global interfaces.

## Routes

## Product Management

### **1. Create a New Product**

- **Endpoint**: **`/api/products`**
- **Method:** `POST`
- **Sample Request Body**:
  ```json
  {
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
  ```
- **Sample Response**:
  ```json
  {
    "success": true,
    "message": "Product created successfully!",
    "data": {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
  }
  ```

### **2. Retrieve a List of All Products**

- **Endpoint**: **`/api/products`**
- **Method:** `GET`
- **Query:** `?searchTerm=name` use seachTerm query for search product
- **Sample Response**:
  ```json
  {
    "success": true,
    "message": "Products fetched successfully!",
    "data": [
      {
        "name": "iPhone 13",
        "description": "A sleek and powerful smartphone with cutting-edge features.",
        "price": 999,
        "category": "Electronics",
        "tags": ["smartphone", "Apple", "iOS"],
        "variants": [
          {
            "type": "Color",
            "value": "Midnight Blue"
          },
          {
            "type": "Storage Capacity",
            "value": "256GB"
          }
        ],
        "inventory": {
          "quantity": 50,
          "inStock": true
        }
      },
      {
        "name": "Samsung Galaxy S21",
        "description": "High-performance Android smartphone with advanced camera capabilities.",
        "price": 799,
        "category": "Electronics",
        "tags": ["smartphone", "Samsung", "Android"],
        "variants": [
          {
            "type": "Color",
            "value": "Phantom Black"
          },
          {
            "type": "Storage Capacity",
            "value": "128GB"
          }
        ],
        "inventory": {
          "quantity": 30,
          "inStock": true
        }
      }
      // Additional products can be added here...
    ]
  }
  ```

### **3. Retrieve a Specific Product by ID**

- **Endpoint**: **`/api/products/:productId`**
- **Method: `GET`**
- **Sample Response**:
  ```json
  {
    "success": true,
    "message": "Product fetched successfully!",
    "data": {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 50,
        "inStock": true
      }
    }
  }
  ```

### **4. Update Product Information**

- **Endpoint**: **`/api/products/:productId`**
- **Method: `PUT`**
- **Sample Request Body**:
  ```json
  {
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
  ```
- **Sample Response**:
  ```json
  {
    "success": true,
    "message": "Product updated successfully!",
    "data": {
      "name": "iPhone 13",
      "description": "A sleek and powerful smartphone with cutting-edge features.",
      "price": 999,
      "category": "Electronics",
      "tags": ["smartphone", "Apple", "iOS"],
      "variants": [
        {
          "type": "Color",
          "value": "Midnight Blue"
        },
        {
          "type": "Storage Capacity",
          "value": "256GB"
        }
      ],
      "inventory": {
        "quantity": 49,
        "inStock": true
      }
    }
  }
  ```

### **5. Delete a Product**

- **Endpoint**: **`/api/products/:productId`**
- **Method: `DELETE`**
- **Sample Response**:
  ```json
  {
    "success": true,
    "message": "Product deleted successfully!",
    "data": null
  }
  ```

## Order Management

### **Order Management API Endpoints**

### **1.Create a New Order**

- **Endpoint**: **`/api/orders`**
- **Method: `POST`**
- **Request Body**:
  ```json
  {
    "email": "user@gmail.com",
    "productId": "5fd67e890b60c903cd8544a3",
    "price": 999,
    "quantity": 1
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order created successfully!",
    "data": {
      "email": "user@gmail.com",
      "productId": "5fd67e890b60c903cd8544a3",
      "price": 999,
      "quantity": 1
    }
  }
  ```

### **2.Retrieve All Orders**

- **Endpoint**: **`/api/orders`**
- **Method: `GET`**
- **query: `?email=user@gmail.com`** use email for get all the orders of particular email.
- **Sample Response**:
  ```json
  {
    "success": true,
    "message": "Orders fetched successfully!",
    "data": [
      {
        "email": "user@gmail.com",
        "productId": "5fd67e890b60c903cd8544a3",
        "price": 999,
        "quantity": 1
      }
      // more orders...
    ]
  }
  ```
