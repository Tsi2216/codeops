# Data model and storage

## Current prototype storage

This application is a Vite + React single-page prototype. It has no server API or database configured.

| Data | Current storage | Notes |
|---|---|---|
| Menu/dishes | `src/data.js` | Static sample menu shipped with the frontend |
| Basket | Browser `localStorage` through Zustand `persist` | Key: `addis-eats-cart`; user-editable and not authoritative |
| Favorites | Browser `localStorage` | Key: `addis-eats-favorites` |
| Orders/history | Browser `localStorage` | Key: `addis-eats-orders`; not persisted to a server |
| Saved addresses | Browser `localStorage` | Key: `addis-eats-addresses`; personal data remains on that browser |
| Sign-in state | Browser `localStorage` | Key: `addis-eats-session`; demo-only and insecure |

## Recommended production model

Use a server-side relational database (for example PostgreSQL) with tables such as:

- `users`: user ID, normalized email/phone, password hash or identity-provider subject, created timestamp.
- `addresses`: address ID, user ID foreign key, label, delivery address, created timestamp.
- `dishes`: dish ID, name, category, price in ETB, active flag.
- `orders`: order ID, user ID or guest checkout reference, status, subtotal, delivery fee, total, payment method, created timestamp.
- `order_items`: order ID, dish ID, quantity, unit price snapshot.
- `favorites`: user ID and dish ID, with a unique constraint on the pair.

## Data integrity and privacy rules

- Calculate prices and totals on the server from trusted menu prices; never trust a client-supplied total.
- Validate quantity as a positive integer and confirm each dish is active.
- Enforce ownership checks for addresses and orders on every server request.
- Store money in integer minor units or a suitable decimal type, not floating-point arithmetic.
- Minimize personal data, provide a retention/deletion policy, and avoid logging passwords, tokens, or full payment details.
- Do not represent local browser storage as a durable order database.
