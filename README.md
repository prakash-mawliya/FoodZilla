# Campus Food Delivery App

## Role Based Authorization

## Roles:

- Admin
- Restaurent Owner
- User

### Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js, Jwt
- Database: MongoDB
- Deploy:

### API Endpoints

### 1. Authentication

### Signup

- **Description** : register every new user
- **Method**: POST
- **Endpoint**: `/signup`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "username": "string",
    "phone": "string",
    "role": "string"
  }
  ```
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "new user added succesfully"
  }
  ```

### Login

- **Description** : login
- **Method**: POST
- **Endpoint**: `/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "user logged in succesfully"
  }
  ```

### 2. Admin Routes

#### Add a Restaurent

- **Description** : Add a Restaurent into the list
- **Method**: POST
- **Endpoint**: `/addRes`
- **Request Body**:
  ```json
  {
    "Resname": "string",
    "Ownername": "string",
    "phone": "string"
  }
  ```
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "Restaurent added succesfully"
  }
  ```

#### Delete a Restaurent

- **Description** : Delete a Restaurent and its all respective dishes
- **Method**: POST
- **Endpoint**: `/deleteRes`
- **Request Body**:
  ```json
  {
    "_id": "string",
    "Resname": "string",
    "Ownername": "string",
    "phone": "string",
    "selected": "boolean"
  }
  ```
- **Response Status Code**: 201
- **Response Body**:
  ```json
  {
    "Restaurants deleted successfully"
  }
  ```

### 3. Resaturent Owner Routes

#### Add Dishes

-**Description**: Add dishes to there restaurent

- **Method**: POST
- **Endpoint**: `/adddish`
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "dishName": "string",
    "dishPrice": "Int",
    "phone": "string"
  }
  ```

#### Delete Dishes

-**Description**: Delete dishes from there restaurent

- **Method**: POST
- **Endpoint**: `/deletedishes`
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "data": {
      "_id": "string",
      "dishName": "string",
      "dishPrice": "string",
      "phone": "string",
      "selected": "boolean"
    },
    "token": "string"
  }
  ```

#### Update order status

-**Description**: Update order either confirm a given order or reject

- **Method**: POST
- **Endpoint**: `/updateOrder`
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "data": {
      "_id": "string",
      "dishName": "string",
      "dishPrice": "Int",
      "ph": "string",
      "quantity": "Int",
      "accept": "boolean"
    },
    "token": "string"
  }
  ```

#### Get the order details placed by users

- **Method**: GET
- **Endpoint**: `/ResOrder`
- **Response Status Code**: 200
- **Response Body**:
  ```json
  {
    "dishName": "string",
    "dishPrice": "Int",
    "ph": "string",
    "quantity": "Int",
    "accept": "boolean"
  }
  ```

### 4. User Routes

#### Get all Orders placed by user

- **Method**: GET
- **Endpoint**: `/allOrder`
- **Response Body**:
  ```json
  {
    "dishName": "string",
    "dishPrice": "Int",
    "ph": "string",
    "quantity": "Int"
  }
  ```
- **Response Status Code**: 200

#### Get specific Orders placed by user that are accepted by restaurent

- **Method**: GET
- **Endpoint**: `/userOrder`
- **Respons Body**:
  ```json
  {
    "dishName": "string",
    "dishPrice": "Int",
    "ph": "string",
    "quantity": "Int",
    "accept": "boolean"
  }
  ```
- **Response Status Code**: 200

#### Send Order

- **Method**: POST
- **Endpoint**: `/sendOrder`
- **Request Body**:

  ```json
  {
    "data": {
      "dishName": "string",
      "dishPrice": "Int",
      "ph": "string",
      "quantity": "Int",
      "selected": "boolean"
    },
    "token": "string"
  }
  ```

  - **Response Status Code**: 200

  ### 5. Unprotected Routes

  #### Get the list of all Restaurents

- **Method**: GET
- **Endpoint**: `/getAllRes`
- **Response Body**:
  ```json
  {
    "Resname": "string",
    "Ownername": "string",
    "phone": "string"
  }
  ```
- **Response Status Code**: 200

#### Get the list of dishes in a Restaurents

- **Method**: GET
- **Endpoint**: `/getAllDishes/:phone`
- **Parameters**:
  - `phone`: To apply a filter by phone as a id to Restaurents
- **Response Body**:
  ```json
  {
    "dishName": "string",
    "dishPrice": "Int",
    "ph": "string",
    "quantity": "Int",
    "selected": "boolean"
  }
  ```
- **Response Status Code**: 200
