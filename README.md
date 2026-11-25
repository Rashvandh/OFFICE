# Gramiyam — Tradition Renown

A React + Vite storefront and Express/MongoDB API starter based on the supplied Gramiyam website specification.

## Requirements
- Node.js 20+
- MongoDB local instance or MongoDB Atlas connection
- Razorpay test account for payment testing

## Setup

1. Copy `.env.example` to `server/.env` and configure MongoDB and Razorpay test credentials.
2. Create `client/.env.local` with `VITE_API_URL=http://localhost:5000/api`.
3. Install dependencies from the repository root: `npm install`.
4. Start both applications: `npm run dev`.
5. Open `http://localhost:5173`; API health check: `http://localhost:5000/api/health`.

## Current implementation
- Premium responsive corporate storefront shell, navigation and footer.
- Homepage sections for hero, featured products, brand philosophy and franchise CTA.
- About, R&D, product listing, cart and checkout UI.
- Store locator, franchise, careers, news, Feed India and policy route placeholders.
- Express API health endpoint and MongoDB Product/Order models.
- Razorpay order creation and signature verification API skeleton.

## Important before production
- Replace illustrative product names/prices with the approved product catalogue and actual product images.
- Complete checkout by calculating order totals on the server from Product records; do not trust client-supplied prices.
- Add Razorpay webhook signature verification and idempotent payment/order state handling.
- Add authentication, role-based admin access, rate limiting, validation, email notifications and audit logging.
- Confirm shipping, tax, refund, privacy and terms content with the business/legal team.
- Add verified store addresses, founder content, lab credentials, approved claims, careers openings and Feed India impact figures.
- Never commit `.env` files or expose Razorpay secret keys in the browser.

## Notes
The PDF contains some incomplete fields and draft legal/policy wording. Those have intentionally been left for business approval rather than invented. The initial product prices are illustrative placeholders and must not be used for live sales.
# OFFICE
# OFFICE
