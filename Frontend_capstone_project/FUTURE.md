# Deferred scope and prioritization

The exercise asks for Must / Should / Could prioritization and a reasoned list of cuts. This file records work that is intentionally deferred rather than silently forgotten.

## Must — before claiming production readiness

- [ ] Implement real server-side authentication or integrate a trusted identity provider.
- [ ] Add server-side authorization and protect customer order/address data.
- [ ] Persist orders in a database and calculate totals using trusted server-side prices.
- [ ] Configure and verify a live deployment, then record the public URL in `README.md`.
- [ ] Run the three negative authentication tests in `AUTH.md` and record actual results.
- [ ] Run Lighthouse and real-phone main-flow checks; fill `PERF.md` with measured results.
- [ ] Add automated tests for cart totals, checkout validation, and order persistence.

## Should — improve reliability and usability

- [ ] Add clear loading, success, empty, and error states to every asynchronous operation.
- [ ] Add phone-number validation suitable for Ethiopian phone formats.
- [ ] Add a proper order confirmation page and order status lifecycle.
- [ ] Add image loading fallbacks and consider local/optimized responsive images.
- [ ] Add CI checks for lint and production build.

## Could — only after the core is secure and verified

- [ ] Real Google sign-in through an identity provider.
- [ ] Real Telebirr payment integration after merchant credentials and provider requirements are available.
- [ ] Restaurant administration for menu, availability, and order status.
- [ ] Delivery tracking, promotions, and recommendations.

## Why these items are deferred

A UI-only demo can show the user journey, but it cannot safely verify identity, authorize access to private records, or provide durable order storage. Payment-provider integration also requires merchant setup and secrets that must not be placed in frontend code. Those features should not be simulated and described as production-ready.
