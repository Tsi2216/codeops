# Component Boundaries

| Component | Side | Why |
|---|---|---|
| `app/layout.js` | Server | Owns the root document shell and navigation links. |
| `app/page.js` | Server | Static home content. |
| `app/menu/page.js` | Server | Fetches menu data without client state. |
| `app/menu/layout.js` | Server | Owns the menu sidebar and renders the client counter. |
| `components/MenuCounter.jsx` | Client | Owns the counter state that survives menu navigation. |
| `app/menu/CategoryBar.jsx` | Client | Uses interactive category state and browser events. |
| `components/FilterShell.jsx` | Client | Owns the client filter boundary and receives server children. |
| `app/menu/DishList.js` | Server | Renders the fetched dish list. |
| `components/ClientDishActions.jsx` | Client | Uses `useRouter` and interactive cart actions. |
| `components/AddToCartButton.jsx` | Client | Uses the cart context and a click handler. |
| `app/providers.jsx` | Client | Owns the cart context and cart state. |
| `app/cart/page.js` | Client | Reads and changes cart state. |
| `app/checkout/page.js` | Server | Reads `cookies()` and marks checkout dynamic. |
| `components/CheckoutForm.jsx` | Client | Owns the controlled checkout form and submission state. |
| `app/menu/[id]/page.js` | Server | Reads the dynamic id from `params`. |
