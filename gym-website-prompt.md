# Gym Management Website — Professional AI Build Prompt

## Project Overview
Build a **premium, professional-grade, fully mobile-responsive Gym Management Website** using **Next.js (App Router)** for the frontend and **MySQL** as the database, using **Knex.js** as the query builder. Use **plain JavaScript only — no TypeScript**. Keep code clean and self-explanatory — do not add extra or unnecessary comments. The project must include a **public-facing marketing website** and a **fully functional, secure Admin Panel**, both built to production quality, not a demo/MVP quality.

Treat this like a real client project for a high-end fitness brand — attention to detail, polish, and consistency matters more than speed.

---

## Design Requirements

### Color Palette
- Primary theme: shades of **brown** — deep espresso/coffee brown, warm tan, cream/beige backgrounds, warm gold/bronze accent for CTAs and highlights.
- Do **NOT** use blue or violet anywhere in the UI, icons, or charts.
- Provide a `tailwind.config.js` with a custom extended color palette (e.g., `brown-950` to `brown-50`, `gold-accent`, `cream-bg`) so colors are reused consistently, not hardcoded.
- Optional dark mode: charcoal/black background with brown and gold accents.

### Look & Feel
- Premium, modern, high-end fitness brand aesthetic — not a generic Bootstrap-looking template.
- Strong typography hierarchy: a bold display font for headings (e.g., a condensed/athletic sans-serif) and a clean readable font for body text.
- Generous white space, large hero imagery/video, and confident use of section dividers.
- Consistent spacing scale and border-radius scale across all components (buttons, cards, inputs).
- Custom-styled scrollbars, custom-styled form inputs, custom loaders/spinners matching the brown/gold theme (no default browser styling left visible anywhere).

### Framer Motion Animation Requirements
Use **Framer Motion** throughout for a premium interactive feel. Be specific and intentional — animations should feel expensive, not gimmicky:
- **Page transitions**: smooth fade/slide transitions between route changes.
- **Hero section**: staggered entrance animation for heading, subheading, and CTA button (fade + slide up, staggered by ~0.1–0.2s per element).
- **Scroll-triggered reveals**: use `whileInView` for sections (trainers, plans, testimonials, gallery) — fade + slide up as user scrolls, with `viewport={{ once: true }}` so it doesn't replay awkwardly.
- **Cards (trainers, plans, blog)**: subtle scale/lift + shadow increase on hover (`whileHover`), tap scale-down feedback (`whileTap`) for mobile touch.
- **Buttons**: hover scale (1.03–1.05) and tap scale (0.97) with smooth easing.
- **Navbar**: animated mobile menu (slide-in drawer or full-screen overlay) with staggered nav link entrance.
- **Modals/dialogs** (admin panel: add/edit forms, delete confirmation): animate in with scale + fade, animate out cleanly, with a backdrop fade.
- **Tabs/accordions** (e.g., pricing plan toggle monthly/yearly, FAQ accordion): animated height/content transitions using `AnimatePresence`.
- **Toast notifications** (success/error messages): slide-in from top or bottom-right, auto-dismiss with fade-out.
- **Admin dashboard charts/stat cards**: number count-up animation and staggered card entrance on load.
- **Loading states**: skeleton loaders or branded spinner animations (not default browser spinners) while data fetches.
- Keep animation durations short and easing natural (e.g., `ease: "easeOut"`, 0.3–0.6s) — premium feel means subtle, not slow or bouncy/cartoonish.
- Respect `prefers-reduced-motion` for accessibility.

---

## Mobile Responsiveness Requirements
The entire site (public + admin) must be **fully responsive and mobile-first**, tested and functional at these breakpoints:
- **Mobile**: 320px–480px
- **Large mobile / small tablet**: 481px–768px
- **Tablet**: 769px–1024px
- **Desktop**: 1025px–1440px
- **Large desktop**: 1441px+

Specific responsive behavior required:
- **Navbar**: hamburger menu with animated slide-in drawer on mobile/tablet; full horizontal nav on desktop.
- **Hero section**: text and CTA stack vertically on mobile, image/video scales down without cropping important content.
- **Trainers/Plans/Gallery grids**: 1 column on mobile, 2 columns on tablet, 3–4 columns on desktop, using CSS grid/flex with Tailwind responsive classes (`sm:`, `md:`, `lg:`, `xl:`).
- **Pricing comparison table**: convert to stacked/card layout on mobile instead of horizontal scroll wherever possible; if a table is unavoidable, make it horizontally scrollable with a visible scroll hint.
- **Class schedule/timetable**: switch from full week-grid view (desktop) to a day-by-day swipeable/tab view (mobile).
- **Admin panel sidebar**: collapsible/off-canvas sidebar on mobile with a toggle button, fixed sidebar on desktop.
- **Admin data tables** (members, trainers, bookings): convert to stacked card rows on mobile instead of horizontally squeezed tables.
- **Forms** (contact, login, signup, admin CRUD forms): full-width single-column inputs on mobile, appropriately sized on desktop, with large enough touch targets (min 44px height) for buttons/inputs on mobile.
- **Images**: use `next/image` with responsive `sizes` prop so correctly sized images load per device — no oversized image downloads on mobile.
- **Typography**: fluid font sizing (e.g., `clamp()` or Tailwind responsive text classes) so headings don't overflow on small screens.
- Test and ensure no horizontal scroll/overflow bugs on any page at any breakpoint.

---

## Public Website Pages
- **Home** — hero (with Framer Motion entrance + background image/video), trainers preview, membership plans preview, testimonials carousel, gallery preview, stats counter section (members, trainers, years of experience — animated count-up), CTA banner.
- **About Us** — gym story, mission, founder/team highlight.
- **Trainers/Staff** — profile cards with photo, bio, specialty tags, social links; individual trainer detail page (optional).
- **Membership Plans/Pricing** — monthly/yearly toggle, feature comparison table, "Most Popular" highlighted plan.
- **Class Schedule** — weekly timetable view (desktop) / day-tab view (mobile), filter by class type or trainer.
- **Gallery** — masonry or grid image gallery with lightbox modal on click.
- **Blog** (optional) — list + individual post page.
- **Contact Us** — contact form with validation, embedded map, business hours, social links.
- **Login/Signup** — member authentication with form validation and error states.
- **Custom 404 and 500 error pages** styled to match the brand.

## Admin Panel Features
- **Authentication**: secure login (JWT-based sessions or NextAuth with credentials provider), role-based access control (Admin vs Staff), protected routes/middleware.
- **Dashboard**: key stat cards (total members, active memberships, monthly revenue, new signups this month) with animated count-up, revenue/signup charts (e.g., using Recharts or Chart.js, styled in the brown/gold theme — no blue chart defaults).
- **Manage Members**: list with search/filter/pagination, add/edit/delete, view membership status/history.
- **Manage Trainers/Staff**: CRUD with image upload.
- **Manage Membership Plans/Pricing**: CRUD, toggle active/inactive plans.
- **Manage Class Schedules**: CRUD, assign trainer + time slot, conflict validation (no double-booking a trainer).
- **Manage Blog Posts** (optional): CRUD with rich text editor.
- **Manage Testimonials**: CRUD, approve/hide toggle.
- **Manage Gallery Images**: upload/delete, drag-to-reorder (optional).
- **Contact Form Submissions**: view/list, mark as read, delete.
- **Settings**: site info, contact details, social links, SEO meta defaults.
- Confirmation modals (animated) for all delete actions.
- Toast notifications for all success/error actions.

---

## Technical Requirements
- **Framework**: Next.js App Router, Server Components by default, Client Components only where interactivity/animation is required.
- **Database**: MySQL, well-normalized schema with proper foreign keys and indexes on frequently queried columns.
- **Query builder**: Knex.js only (no Prisma, no Sequelize, no raw mysql2 without Knex). Write explicit Knex migration files for every table, and seed files for sample data (members, trainers, plans, classes).
- **API layer**: Next.js Route Handlers or Server Actions for all CRUD operations, using Knex queries directly inside them.
- **Validation**: Zod (or thorough manual validation) on both client and server for every form — never trust client-only validation.
- **Error handling (critical)**:
  - `try/catch` around every database call and external API call.
  - Consistent error response shape from all API routes (e.g., `{ success: false, message }`).
  - Correct HTTP status codes (400 validation, 401/403 auth, 404 not found, 409 conflict, 500 server error).
  - User-friendly error messages on the frontend (never expose raw stack traces or SQL errors to the user).
  - Loading states, empty states (e.g., "No members found"), and error states (with retry option) for every data-fetching UI section.
  - Custom branded 404 and 500 pages.
  - Global error boundary for unexpected client-side errors.
- **File/image uploads**: Cloudinary or local `public/uploads` storage, with file type and size validation, and error handling for failed uploads.
- **SEO**: dynamic meta tags per page, Open Graph tags, `sitemap.xml`, `robots.txt`.
- **Environment variables**: `.env` for DB credentials, JWT secret, Cloudinary keys, etc. — never hardcoded.
- **Folder structure**: clearly separated `components/`, `lib/`, `actions/` (or `app/api/`), `config/`, `db/migrations/`, `db/seeds/` — self-documenting names, minimal comments.
- **Styling**: TailwindCSS with the custom brown/gold theme extended in `tailwind.config.js`; avoid inline styles except where dynamic values require it.
- **Animation library**: Framer Motion for all animations described above.

---

## Deliverables
- Full working codebase in plain JavaScript (no TypeScript) with a clean, modular folder structure.
- Knex migration files for all tables (members, trainers, plans, classes, testimonials, gallery, contact_submissions, users/admins, etc.) and seed files with realistic sample data.
- `README.md` with setup instructions: MySQL setup, `knexfile.js` configuration, environment variables, install/run commands, and how to run migrations/seeds.

## Build Order
Generate this step by step, in this order, so error handling and responsiveness are built in from the start rather than bolted on later:
1. Project setup (Next.js, Tailwind config with brown theme, Framer Motion, folder structure)
2. Knex config, database schema/migrations, and seed data
3. Shared components (Navbar, Footer, Buttons, Cards, Modals, Toasts, Loaders) — mobile responsive + animated from the start
4. Public website pages, one at a time
5. Authentication (member + admin)
6. Admin panel layout (responsive sidebar) and dashboard
7. Admin CRUD modules, one at a time, with full error handling and validation
8. Final pass: SEO, custom error pages, accessibility check, responsive QA across all breakpoints
