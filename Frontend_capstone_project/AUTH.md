# Authentication and security verification

## Current implementation status

**Status: NOT VERIFIED — authentication is currently a front-end demo, not a secure authentication system.**

The account screen in `src/pages/Account.jsx` sets `addis-eats-session` in browser `localStorage` after the user submits any non-empty identity/password, and the Google button signs in immediately. No server validates credentials, no password is stored or hashed, and no identity provider is contacted. A user can edit local storage or call the UI without proving identity. Do not use this implementation for real customer accounts or claim the authentication requirement has passed.

## Required security layers before production

1. Add a trusted server-side authentication service or a reputable identity provider.
2. Verify credentials on the server; hash passwords with a modern password-hashing algorithm if managing passwords directly.
3. Use secure, HttpOnly, SameSite cookies or the provider's recommended session mechanism. Do not trust a `localStorage` flag as proof of identity.
4. Enforce authorization on the server for order history, saved addresses, and account data.
5. Add rate limiting, generic login errors, input validation, CSRF protection where cookie-based sessions require it, and HTTPS.
6. Keep secrets in deployment environment variables; never commit them to the repository.

## Three required negative tests

Run these only against a test deployment/account. Record the live URL, date, browser, steps, and observed result before marking any test PASS.

| Test | Attack attempt | Secure expected result | Current result |
|---|---|---|---|
| 1. Invalid credentials | Submit a made-up email/phone and incorrect password | Server rejects login; no authenticated session is created | **FAIL / NOT IMPLEMENTED** — current UI accepts any non-empty credentials |
| 2. Session tampering | Set `localStorage["addis-eats-session"] = "signed-in"` in DevTools and refresh | Server still treats the visitor as unauthenticated; protected data is not returned | **FAIL / NOT IMPLEMENTED** — UI currently trusts this key |
| 3. Direct unauthorized access | Call a protected order/account endpoint without a valid session | Server returns 401/403 and exposes no private data | **NOT TESTABLE** — this project has no protected backend endpoint |

## Test record

Do not change the statuses above until a real authentication implementation is added and the tests are rerun against the deployed build.
