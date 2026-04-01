# 🍽️ Hungry Platter

A full-stack restaurant web app for online ordering, table reservations, and menu browsing — built for Hungry Platter, Bachupally, Hyderabad.

## 🌐 Live Demo
- **Frontend:** https://hungry-platter.vercel.app
- **Backend:** https://hungry-platter.onrender.com

## ✨ Features
- 🔐 User authentication (register, login, JWT)
- 🛒 Cart & online food ordering
- 📅 Table reservations
- 📧 Email confirmations for orders & reservations
- 👤 User profile with order history
- 🛠️ Admin dashboard (manage orders, reservations, menu)
- 📍 Find Us page with location info
- 📬 Contact form

## 🛠️ Tech Stack

| Frontend | Backend | Database | Hosting |
|----------|---------|----------|---------|
| React + Vite | Node.js + Express | MySQL (Aiven) | Vercel + Render |

## 🚀 Getting Started

### 1. Clone the repo
git clone https://github.com/akshithasangam1759-dotcom/hungry-platter.git
cd hungry-platter

### 2. Setup Backend
cd server
npm install

Create a .env file in /server:
DB_HOST=your_aiven_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=defaultdb
DB_SSL=true
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=your_gmail@gmail.com
PORT=5000

node index.js

### 3. Setup Frontend
cd client
npm install
npm run dev

## 📁 Project Structure
hungry-platter/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── context/
│       └── utils/
└── server/          # Express backend
    ├── routes/
    ├── middleware/
    └── config/

## 📬 Contact
Built with ❤️ by Akshitha — https://github.com/akshithasangam1759-dotcom
