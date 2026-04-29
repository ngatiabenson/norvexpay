# Norvex Pay

> Secure, reliable payments infrastructure for growing businesses — built for trust, speed, and global reach.



---

## Overview

Norvex Pay is a full-stack payment gateway web application built as part of a software developer internship assessment for **Neptune Fiduciaries Group**. It demonstrates a production-grade payments platform featuring a polished public-facing landing site, an authenticated merchant dashboard, and a developer resources portal.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, Sequelize ORM |
| Database | PostgreSQL (via Sequelize) |
| Auth | JWT middleware (`/src/middleware/auth.js`) |
| Payment Services | M-Pesa (Safaricom Daraja), Stripe, PayPal |

---

## Project Structure

```
norvexpay/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (landing)/
│   │   │   │   └── components/
│   │   │   │       ├── HeroSection.tsx      # Animated globe hero
│   │   │   │       ├── WhyUs.tsx            # About Us / value props
│   │   │   │       ├── InteractiveDemo.tsx  # Click-to-pay demo
│   │   │   │       └── Pricing.tsx          # Pricing plans
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                 # Merchant dashboard
│   │   │   ├── docs/
│   │   │   │   └── page.tsx                 # Developer Resources
│   │   │   ├── login/
│   │   │   │   └── page.tsx                 # Auth page
│   │   │   └── page.tsx                     # Landing page (/)
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── lib/
│   │       └── api/
│   │           ├── mockData.ts              # Demo transaction data
│   │           └── types.ts                 # Shared TypeScript types
│   └── package.json
└── backend/
    ├── src/
    │   ├── routes/
    │   │   ├── auth.js                      # Register / login
    │   │   ├── payments.js                  # Payment initiation
    │   │   ├── paymentsProcess.js           # Gateway routing
    │   │   ├── transactions.js              # Transaction history
    │   │   └── me.js                        # Authenticated user
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Transaction.js
    │   │   └── PaymentOption.js
    │   ├── services/
    │   │   ├── mpesaService.js              # Safaricom Daraja STK Push
    │   │   ├── stripeService.js             # Card payments
    │   │   └── paypalService.js             # PayPal orders
    │   └── middleware/
    │       └── auth.js                      # JWT verification
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/norvexpay.git
cd norvexpay
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Fill in your database credentials and payment API keys in .env
npm install
npm run dev
```

The backend runs on `http://localhost:4000`.

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`.

---

## Environment Variables

Create `backend/.env` based on `.env.example`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=norvexpay
DB_USER=postgres
DB_PASSWORD=yourpassword

# Auth
JWT_SECRET=your_jwt_secret

# M-Pesa (Safaricom Daraja)
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=

# Stripe
STRIPE_SECRET_KEY=

# PayPal
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

---

## Key Features

### Landing Page
- Full-bleed animated globe hero with parallax mouse tracking
- "Why Norvex Pay" section — hybrid dark-to-light design with value proposition pillars
- Interactive demo — animated payment flow and live click-to-pay checkout simulation
- Transparent pricing tiers (Starter, Growth, Enterprise)

### Merchant Dashboard (`/dashboard`)
- **Overview** — revenue chart, stat cards with sparklines, recent transactions
- **Transactions** — filterable table by status (succeeded, pending, failed, refunded)
- **Payouts** — balance summary and payout history
- **Developers** — API key display, quickstart code, resource links
- **Settings** — business profile editor and security toggles

### Developer Resources (`/docs`)
- Sticky sidebar navigation (Getting Started, Payments, Webhooks, SDKs)
- Live code examples with syntax-highlighted blocks
- SDK tabs for Node.js, Python, and PHP

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Authenticate, receive JWT |
| GET | `/api/me` | Authenticated user profile |
| POST | `/api/payments` | Initiate a payment |
| POST | `/api/payments/process` | Route to gateway (M-Pesa / Stripe / PayPal) |
| GET | `/api/transactions` | List transactions |
| GET | `/api/health` | Service health check |

---

## Payment Integrations

### M-Pesa (STK Push)
Integrates with Safaricom's Daraja API to initiate mobile money prompts directly to a customer's phone.

### Stripe
Handles card payments (Visa, Mastercard) with 3DS-ready flows via the Stripe SDK.

### PayPal
Creates and captures PayPal orders for international wallet payments.

---

## Design System

| Token | Value |
|---|---|
| Primary Blue | `#0052CC` |
| Cyan Accent | `#00B8D9` |
| Amber / Warning | `#FFAB00` |
| Success | `#36B37E` |
| Dark Background | `#050d1a` / `#07111f` |
| Light Background | `#F9FAFB` |

Typography: System font stack via Tailwind's `font-sans`. Headings use `font-extrabold` with tight tracking.

---

## Scripts

```bash
# Frontend
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint

# Backend
npm run dev      # Nodemon dev server
npm start        # Production start
```

---

## License

This project was created as an internship assessment submission for Neptune Fiduciaries Group. All rights reserved.

---

*Built with ❤️ for Neptune Fiduciaries Group — 2026*
