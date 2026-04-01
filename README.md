# 🍽️ Hungry Platter — Full-Stack Restaurant Website

> Authentic Indian Cuisine | Bachupally, Hyderabad

A production-ready full-stack restaurant web application built with React + Node.js + MySQL.

---

## 📁 Project Structure

```
hungry-platter/
├── client/          # React (Vite) frontend
│   └── src/
│       ├── components/   # Navbar, CartDrawer, Footer, WhatsApp
│       ├── context/      # Auth, Cart, Theme context
│       ├── pages/        # All page components
│       └── utils/        # API utility (axios)
└── server/          # Node.js + Express backend
    ├── config/       # MySQL DB connection
    ├── middleware/   # JWT auth middleware
    ├── routes/       # API route handlers
    ├── schema.sql    # Database schema + seed data
    └── index.js      # Entry point
```

---

## 🚀 Quick Setup

### Step 1 — MySQL Database

1. Open MySQL Workbench or MySQL CLI
2. Run the schema file:
   ```sql
   source /path/to/hungry-platter/server/schema.sql
   ```
   This creates all tables and seeds menu data + admin user.

### Step 2 — Server Setup

```bash
cd server
cp .env.example .env
# Edit .env with your MySQL credentials and email settings
npm install
npm run dev
```

Server runs on: **http://localhost:5000**

### Step 3 — Client Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 🔐 Default Admin Login

| Field    | Value                       |
|----------|-----------------------------|
| Email    | admin@hungryplatter.com     |
| Password | admin123                    |
| Role     | Admin                       |

---

## ⚙️ Environment Variables (server/.env)

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hungry_platter
JWT_SECRET=your_super_secret_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@hungryplatter.com
```

### Gmail App Password Setup:
1. Enable 2FA on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate password for "Mail"
4. Use that as EMAIL_PASS

---

## 🛠️ Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Frontend   | React 18, Vite       |
| Routing    | React Router v6      |
| Styling    | Custom CSS Variables |
| Backend    | Node.js, Express     |
| Database   | MySQL 8+             |
| Auth       | JWT + bcrypt         |
| Email      | Nodemailer + Gmail   |
| HTTP       | Axios                |
| Toast      | react-hot-toast      |

---

## 📱 Features

### 🏠 Frontend
- **Dark/Light Mode** — Default dark, toggle persistent
- **Hero Section** — Full-screen with CTA buttons
- **Menu** — Categorized (Breakfast/Lunch/Dinner), search, add to cart
- **Cart Drawer** — Slide-in cart with qty controls
- **Checkout** — Form + WhatsApp order + email order
- **Reservations** — Table booking form with confirmation
- **Admin Dashboard** — Orders, Menu CRUD, Reservations, Users, Messages
- **Authentication** — JWT Login/Signup, role-based access
- **About Page** — Story, team, mission/vision
- **Contact Page** — Contact form + embedded map
- **Find Us Page** — Google Maps embed + directions
- **WhatsApp Button** — Floating click-to-chat
- **Responsive** — Mobile, tablet, desktop

### ⚙️ Backend API

| Endpoint                     | Method | Auth     | Description             |
|------------------------------|--------|----------|-------------------------|
| `/api/auth/register`         | POST   | Public   | Register new user       |
| `/api/auth/login`            | POST   | Public   | Login, get JWT          |
| `/api/auth/me`               | GET    | User     | Get current user        |
| `/api/menu`                  | GET    | Public   | Get all menu items      |
| `/api/menu/featured`         | GET    | Public   | Get featured items      |
| `/api/menu`                  | POST   | Admin    | Add menu item           |
| `/api/menu/:id`              | PUT    | Admin    | Update menu item        |
| `/api/menu/:id`              | DELETE | Admin    | Delete menu item        |
| `/api/orders`                | POST   | Public   | Place order             |
| `/api/orders/my`             | GET    | User     | Get my orders           |
| `/api/orders`                | GET    | Admin    | Get all orders          |
| `/api/orders/:id/status`     | PUT    | Admin    | Update order status     |
| `/api/reservations`          | POST   | Public   | Create reservation      |
| `/api/reservations`          | GET    | Admin    | Get all reservations    |
| `/api/contact`               | POST   | Public   | Send contact message    |
| `/api/contact`               | GET    | Admin    | Get all messages        |
| `/api/admin/stats`           | GET    | Admin    | Dashboard statistics    |
| `/api/admin/users`           | GET    | Admin    | Get all users           |

---

## 📞 WhatsApp Integration

Update `WHATSAPP` number in:
- `client/src/components/CartDrawer.jsx` (line 9)
- `client/src/pages/Checkout.jsx` (line 16)
- `client/src/components/WhatsAppBtn.jsx` (href)
- `client/src/components/Footer.jsx`

Change `919876543210` → your actual number with country code (no +).

---

## 🗺️ Google Maps

The embedded map in Contact and Find Us pages uses Bachupally, Hyderabad.
Replace the iframe `src` URLs with your actual Google Maps Embed API URL for production.

---

## 🎨 Customization

- **Colors** — Edit CSS variables in `client/src/index.css`
- **Restaurant Name** — Global search/replace `Hungry Platter`
- **Phone** — Replace `919876543210` and `+91 98765 43210`
- **Address** — Replace `Bachupally, Hyderabad` references
- **Menu Items** — Update `server/schema.sql` seed data

---

## 📦 Build for Production

```bash
# Build frontend
cd client && npm run build

# Serve with Express (add to server/index.js):
# app.use(express.static('../client/dist'))
```

---

Made with ❤️ for Hungry Platter, Bachupally, Hyderabad 🌶️
