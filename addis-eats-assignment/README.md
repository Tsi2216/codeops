# Addis Eats — Server and Client Boundaries

## This exercise

- `app/menu/page.js` is an async server component and awaits the dishes.
- The menu page does not use a fetch hook, loading state, or error state.
- `CategoryBar.jsx` is the interactive client component in the menu segment.
- `app/providers.jsx` contains the cart provider and is a client component.
- `FilterShell.jsx` is a client component outside the menu segment and receives the server `DishList` through `children`.
- `DishList.js` remains a server component.
- Interactive client code stays at the smallest required boundary.

## First Load JS

Record the `/menu` First Load JS from the build output before and after this boundary change. Do not invent a value; use the numbers printed by `npm run build`.

## Boundary notes

See `BOUNDARY.md` for the component-by-component server/client explanation.
