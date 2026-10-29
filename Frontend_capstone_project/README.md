# Habesha Restaurant — ordering app capstone

A mobile-first React + Vite restaurant ordering prototype for Ethiopian dishes. It includes menu browsing/search, dish details, favorites, a basket, checkout, and a browser-local order history.

## Run locally

Requirements: Node.js compatible with Vite 8.

```bash
npm ci
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Main flow to rehearse

1. Open the menu and search or choose a category.
2. Open a dish and add it to the basket.
3. Increase/decrease quantities or remove an item.
4. Proceed to checkout, enter recipient details, and choose a payment option.
5. Place the demo order and confirm it appears in the account's order history.

**Important:** the current checkout records a local demo order; it does not submit a real payment or create a server-side order.

## Deployment

This is a Vite static site and can be deployed to Vercel, Netlify, or another static host.

For Vercel:
1. Push the project to a GitHub repository.
2. Import that repository into Vercel.
3. Use build command `npm run build` and output directory `dist`.
4. Deploy, open the public URL, and test the main flow on that exact URL.
5. Replace this line with the verified public URL: `Live URL: NOT DEPLOYED / NOT VERIFIED`.

Do not claim a live URL or test results until you have actually deployed and opened the site.

## Project documentation

- [`AUTH.md`](./AUTH.md) — current authentication limitations, required security layers, and three negative tests.
- [`DATA.md`](./DATA.md) — current storage model and recommended production data model.
- [`PERF.md`](./PERF.md) — performance/accessibility test steps and result table.
- [`FUTURE.md`](./FUTURE.md) — Must/Should/Could backlog and deferred scope.

## Important security and data limitations

The account sign-in is currently a UI simulation: it accepts any non-empty identity/password and stores a flag in browser `localStorage`. It is not secure authentication. Orders, favorites, basket, and saved addresses are also stored locally in the browser; there is no backend database or protected API in this project. Do not use real customer data, claim the authentication attacks passed, or claim production readiness until these gaps are fixed and retested.

## Git history

Keep the existing repository and commit history when working on the project. After making and testing changes, review `git status`, commit the intended source and documentation files, then push to the repository you own.
