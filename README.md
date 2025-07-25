# 🛒 My-Cart – Ecommerce Web Application

[![Live Site](https://img.shields.io/badge/Live%20Site-%20my--cart--ashen--omega.vercel.app-green?style=for-the-badge&logo=vercel)](https://my-cart-ashen-omega.vercel.app)

**My-Cart** is a modern full-stack ecommerce platform that allows users to browse, add products to cart, place orders, and manage their accounts. It features a sleek and responsive UI, authentication, order management, and integrated admin functionalities.

---

## 🌐 Live Demo

👉 [Click here to view the live app](https://my-cart-ashen-omega.vercel.app)

---

## 📸 Screenshots

| Home Page                             | Cart Page                             |
|--------------------------------------|--------------------------------------|
| ![Home](./screenshots/home.png)      | ![Cart](./screenshots/cart.png)      |

_Add your own screenshots in the `/screenshots` folder and update above paths._

---

## 🚀 Features

- 🧾 User Registration & Login (JWT Auth)
- 🛍 Product Listing with Images, Prices & Descriptions
- 🛒 Shopping Cart with Quantity Control
- 📦 Order Placement & Address Collection
- 🧑‍💼 Admin Panel for Product Management
- 🔐 Role-Based Access Control
- 🧾 Order History & Status Tracking
- 💳 Coupon Code Input Support (if implemented)

---

## 🛠 Tech Stack

### Frontend:
- **React + Vite**
- **Redux Toolkit** for state management
- **Tailwind CSS v4** for styling
- **ShadCN UI** + **Lucide Icons** for UI components

### Backend:
- **Express.js** with **Node.js**
- **MongoDB** with Mongoose ODM
- **JWT Authentication** + Cookies
- **RESTful APIs**

### Deployment:
- Frontend: [Vercel](https://vercel.com)
- Backend: [Render](https://render.com)

---

## 📁 Folder Structure

```bash
my-cart/
│
├── client/              # React Frontend (Vite + Tailwind + Redux)
│   └── ...
│
├── server/              # Express Backend (MongoDB + Auth + APIs)
│   └── ...
│
└── README.md
