# AURA ATHLETICS — Luxury High-Performance Athletic Club Website & Admin Panel

A **production-grade, fully mobile-responsive Gym Management Website and Admin Panel** built with **Next.js (App Router)**, **plain JavaScript (no TypeScript)**, **MySQL**, **Knex.js**, **Tailwind CSS**, and **Framer Motion**.

---

## Brand Aesthetic & Color System

- **Color Scheme**: Shades of luxury brown (`#120C08`, `#1C140E`, `#251B13`, `#8C5E3C`), warm tan (`#BE9677`), cream/beige (`#FCFAF6`), and warm gold/bronze accents (`#D4AF37`, `#C59F23`).
- **Strict Palette Rule**: Zero blue or violet used anywhere in the UI, icons, or charts.
- **Typography**: Display athletic headings (*Syne*) paired with clean body text (*Plus Jakarta Sans*).
- **Animations**: Rich Framer Motion animations across page headers, hero sections, scroll reveals, interactive cards, modals, tabs, and dashboard metrics.

---

## Key Features

### Public Website
- **Home**: Staggered hero entrance, animated live count-up stats (2,500+ members, 18+ coaches), faculty preview, monthly/annual plan cards, verified member review carousel, and VIP trial pass CTA.
- **About Us**: Club genesis story, luxury Eleiko facility highlights, core standards, and executive leadership profiles.
- **Trainers / Coaches**: Full faculty roster with specialty filtering (Strength, HIIT, Boxing, Pilates, Yoga, Nutrition) and detailed dossier modal.
- **Membership Plans & Pricing**: Monthly vs. Annual commitment toggle (20% discount badge), tier comparison matrix, and interactive FAQ accordion with height animations.
- **Class Schedule**: Weekly timetable matrix on desktop and day-by-day swipeable tab view on mobile with discipline filters and instant RSVP modal.
- **Facility Gallery**: Categorized high-res masonry visual gallery with full-screen lightbox modal and image navigation.
- **Performance Journal (Blog)**: Sports science publications with search, category filtering, reading time badge, and individual reader view.
- **Contact Concierge**: Validated contact form, flagship address, operating hours, telephone, and email details.
- **Member Authentication**: Login and Signup with one-click demo credentials switcher and password visibility toggles.
- **Branded 404 & 500 Pages**: Custom error boundaries styled in the luxury theme.

### Admin Console (`/admin`)
- **Dashboard**: 4 KPI metric cards with count-up animations, custom SVG time-series charts in brown & gold, tier distribution mix, recent enrollments, and recent inquiries.
- **Manage Members**: Complete athlete roster with live search, status filtering (Active, Frozen, Expired, Pending), Add/Edit modal, and deletion confirmation dialog.
- **Manage Trainers**: Master coach CRUD with photo, specialties, experience, and bio.
- **Manage Plans**: Membership tier CRUD, monthly/yearly rates, popular toggle, active toggle, and feature lists.
- **Manage Class Schedule**: Timetable manager with **trainer double-booking conflict validation** (prevents overlapping classes for the same coach).
- **Manage Testimonials**: Reviews CRUD, 5-star rating control, approve/hide toggle, and featured selector.
- **Manage Gallery**: Facility visual assets manager with category tagging and sort ordering.
- **Manage Blog**: Article publisher with Markdown content support, category selection, and draft/published toggle.
- **Concierge Inquiries**: Manage visitor inquiries, mark read/unread, inspect full message, and reply via email.
- **Club Settings**: Configure site name, contact details, operating hours, social URLs, and SEO meta.

---

## Demo Credentials

You can log in instantly using the demo switcher on `/login` or with these credentials:

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@auragym.com` | `Admin@12345` |
| **Staff Coach** | `staff@auragym.com` | `Staff@12345` |
| **Member** | `member@auragym.com` | `Member@12345` |

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v18.0.0+)
- MySQL Server (e.g. MySQL 8.x, Laragon, XAMPP, or Docker)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file from `.env.example`:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=aura_gym_db

JWT_SECRET=aura_athletics_super_secret_jwt_key_2026_luxury_brand
SESSION_COOKIE_NAME=aura_session_token

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AURA ATHLETICS"
```

### 4. Database Migrations & Seeds (MySQL)
Create the database in MySQL:
```sql
CREATE DATABASE IF NOT EXISTS aura_gym_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Run Knex migrations:
```bash
npm run migrate
```

Seed the database with sample data:
```bash
npm run seed
```

> **Note**: If MySQL is not running locally or credentials are not yet configured, the application automatically uses its built-in resilient data layer with the full realistic dataset so you can immediately preview and test all features without database setup errors.

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── (public)/
│   │   ├── page.jsx                # Home Page
│   │   ├── about/page.jsx          # About Us
│   │   ├── trainers/page.jsx       # Master Coaches Directory
│   │   ├── pricing/page.jsx        # Membership Plans & FAQ
│   │   ├── schedule/page.jsx       # Weekly Timetable & Booking
│   │   ├── gallery/page.jsx        # Facility Gallery & Lightbox
│   │   ├── blog/                   # Blog Listing & Reader
│   │   ├── contact/page.jsx        # Concierge Contact Form
│   │   ├── login/page.jsx          # Auth Login
│   │   └── signup/page.jsx         # Auth Registration
│   ├── admin/                      # Admin Panel & CRUD Modules
│   │   ├── page.jsx                # Admin Dashboard
│   │   ├── members/page.jsx        # Member Management
│   │   ├── trainers/page.jsx       # Trainer Management
│   │   ├── plans/page.jsx          # Plan Management
│   │   ├── classes/page.jsx        # Class Scheduling & Conflict Validation
│   │   ├── testimonials/page.jsx   # Review Moderation
│   │   ├── gallery/page.jsx        # Media Assets
│   │   ├── blog/page.jsx           # Article Publisher
│   │   ├── contact/page.jsx        # Inquiries
│   │   └── settings/page.jsx       # Club Configuration
│   ├── api/                        # Next.js Route Handlers (CRUD APIs)
│   ├── globals.css                 # Custom Brown/Gold Design Tokens
│   ├── layout.jsx                  # Root Layout
│   ├── not-found.jsx               # Custom 404
│   └── error.jsx                   # Error Boundary
├── components/                     # Reusable UI & Motion Components
├── db/
│   ├── migrations/                 # Knex Migrations
│   └── seeds/                      # Knex Seed Data
├── lib/
│   ├── auth.js                     # JWT & Password Verification
│   ├── db.js                       # Knex MySQL Connector & Fallback
│   └── validation.js               # Zod Schemas
├── knexfile.js                     # Knex Database Config
└── tailwind.config.js              # Extended Brown & Gold Palette
```
