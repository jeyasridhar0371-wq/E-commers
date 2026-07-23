# 🛒 E-Commerce Web Application

A full-stack E-Commerce web application built using **React.js**, **Node.js**, **Express.js**, **MongoDB**, and **Firebase Authentication**. The application allows users to browse products, manage their shopping cart, place orders, and view order history, while administrators can manage products.

---

## 🚀 Features

### 👤 User Authentication

* Firebase Authentication
* User Sign Up
* User Login
* Secure Logout
* User Account Page

### 🏠 Home Page

* Responsive navigation bar
* Promotional banner/slider
* Featured products section
* Footer with navigation links

### 📦 Product Management

* View all products
* Product search
* Product sorting (A–Z, Z–A, Newest, Oldest)
* Product details page
* Add new products (Admin)

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Increase/Decrease quantity
* Automatic total price calculation
* Empty cart handling

### 💳 Checkout

* Shipping information form
* Payment method selection

  * Cash on Delivery
  * UPI
  * Credit/Debit Card (UI)
* Order summary
* Total amount calculation
* Place order

### 📋 Orders

* Order confirmation page
* My Orders page
* Order status
* Order history

### 👤 Account

* User profile information
* Quick navigation
* Logout

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* Firebase Authentication

---

# 📂 Project Structure

```text
client/
│
├── src/
│   ├── component/
│   │   ├── common/
│   │   ├── Home.jsx
│   │   ├── Productlisting.jsx
│   │   ├── Productdetail.jsx
│   │   ├── Shoppingcart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orderconfirmation.jsx
│   │   ├── Myorders.jsx
│   │   ├── Account.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Addproduct.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
server/
│
├── server.js
├── models
└── routes
```

---

# 📚 Database Collections

### Products

* Name
* Description
* Price
* Category
* Image

### Users

* Firebase UID
* Role (Admin/User)

### Cart

* Product ID
* User ID
* Quantity

### Orders

* User ID
* Products
* Quantity
* Shipping Information
* Payment Method
* Total Amount
* Status

---

# 🔗 API Endpoints

## Products

* POST `/createproduct`
* GET `/readallproduct`
* GET `/readoneproduct`
* PUT `/updateproduct`
* DELETE `/deleteproduct`

## Users

* POST `/storeuser`
* GET `/readuser`

## Cart

* GET `/checkcart`
* GET `/readcart`
* POST `/addcart`
* DELETE `/removecart`
* PUT `/increasequantity`
* PUT `/decreasequantity`
* DELETE `/clearcart`

## Orders

* POST `/addorder`
* GET `/readorders`

---

# ⚙️ Installation

## Clone the repository

```bash
git clone <repository-url>
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
node server.js
```

---

# 🔑 Environment Variables

Create a `.env` file for Firebase configuration and MongoDB connection.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
```

---

# 🎯 Future Improvements

* Wishlist
* Product reviews and ratings
* Online payment gateway integration
* Coupon and discount system
* Product categories and filters
* Admin dashboard
* Order tracking
* Email notifications
* Responsive mobile optimization

---

# 👨‍💻 Author

**Jeyasridhar G**

Developed as a full-stack E-Commerce project using React, Node.js, Express, MongoDB, and Firebase Authentication.

