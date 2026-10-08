# Addis Eats — Day 39 API Routes & Server Actions

## Endpoints

| Endpoint | Method | Success | Validation / Error |
|---|---|---:|---|
| `/api/dishes` | GET | 200 | — |
| `/api/dishes/[id]` | GET | 200 | 404 for an unknown dish |
| `/api/orders` | POST | 201 | 422 with `fieldErrors` |

## Server actions

- `placeOrder` in `app/actions.js` validates the order with the shared schema, creates the order, and calls `revalidatePath("/orders")` after a successful write.
- `CheckoutForm` uses `useActionState` for the action result and pending state.
- `cancelOrder` checks the session and confirms that the requested order belongs to that session before cancelling it.

## Shared schema

`lib/schema.js` is used by both the browser validation and the server/API validation.

## Environment variables

`.env.local` is ignored by Git through `.gitignore`. No secret is placed in client code.
