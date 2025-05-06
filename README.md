# 🌾 Sarii - A Farm-to-Table Marketplace 🌾

Welcome to **Sarii**, a community-driven farm-to-table e-commerce platform proudly built to connect **farmers and consumers** directly, with a little help from the Department of Agriculture! 💚

Sarii makes it easy for the DA to manage market listings and for customers to buy fresh, local produce straight from the source. 🧑‍🌾🥬🍅

---

## 🚀 Project Overview

Sarii is an e-commerce web application that:

- Enables **customers** to browse, shop, and order fresh crops and poultry products.
- Empowers the **Department of Agriculture** to manage user accounts, product listings, orders, and sales reports.
- Promotes **transparency and direct trade** between farmers and consumers, minimizing the middleman.

---
Sarii is an e-commerce web application that:

- Enables **customers** to browse, shop, and order fresh crops and poultry products.
- Empowers the **Department of Agriculture** to manage user accounts, product listings, orders, and sales reports.
- Promotes **transparency and direct trade** between farmers and consumers, minimizing the middleman.

---

## <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/github.svg" width="25" style="vertical-align: middle;" />&nbsp;GitHub Workflow

1. Clone the repository  
2. Checkout `set-up` branch  
3. Create your own working branch named after the page you're working on  
   (e.g. `git checkout -b login-page`)
4. Open two terminals (one for backend, one for frontend)  
5. Run `npm install` in both directories
6. Start the project with:
   - `npm run dev` in the frontend terminal     - `node server.js` in the backend terminal

---

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Front End     | React JS           |
| Back End      | Node.js + Express  |
| Database      | MongoDB            |

---

## 👥 User Roles

### 👤 Customers
- Register/login using an email address (no OTP or verification required).
- Browse, filter, and sort products (by name, type, price, quantity).
- Add to cart, view total price, and manage orders (cash-on-delivery).
- Cancel orders if not yet confirmed.

### 🛒 Department of Agriculture (DA)
- Built-in administrator account (no need for registration).
- Manages all customer accounts.
- Adds and edits products in the inventory.
- Confirms orders, reducing inventory quantities accordingly.
- Views detailed sales reports (weekly, monthly, yearly).

---

## ✨ Features

### Customer Side 🌽
- 🧾 Register/Login/Logout
- 🛍️ Browse public market products
- 🛒 Add to and manage cart
- ✅ Place and cancel orders
- 🔎 Sort/filter products by category, price, etc.

### Admin Side (DA) 🧑‍🌾
- 📦 Product & inventory management
- 👥 User management
- ✅ Order fulfillment
- 📈 Sales reporting with filters by time frame

---

## 📸 Screenshots

> _(Add your screenshots here for both customer and admin views)_

- Customer dashboard preview
- Shopping cart view
- Admin dashboard
- Product management panel
- Sales report view

---

## 🚧 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-org/sarii.git
cd sarii
