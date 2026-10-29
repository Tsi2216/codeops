# Addis Eats Dashboard — in-class exercise deliverable

This is a Next.js App Router implementation of the requested dashboard and orders table.

## Included
- `app/dashboard/page.js`: server component, server-side summary aggregation, revenue-by-neighbourhood chart, daily-orders line chart and accessible data tables.
- `app/dashboard/RevenueChart.jsx`: the only client component used by the dashboard; renders the revenue bar chart.
- `app/orders/OrderTable.jsx`: semantic order table, URL-based sorting and pagination links.
- `app/orders/loading.js`: five-row skeleton loading state.
- `app/orders/page.js`: orders page and empty/error demo states.
- `app/error.js`: retryable error boundary.
- `app/lib/orders.js`: small sample data source to make the exercise run without your original database.

## Integrate into your existing project
Copy the included `app` files into your existing Next.js App Router project. If you already have an order API/database, replace the demo implementation in `app/lib/orders.js` with your existing server-side data fetch. Keep the return shape: `id`, `customer`, `neighbourhood`, `createdAt` (`YYYY-MM-DD`), `total` (number), and `status`.

If your project already has `app/globals.css`, merge the included CSS into it rather than replacing it. Ensure your root layout imports `./globals.css`.

## Demo the required states
- Dashboard: `/dashboard`
- Dashboard empty state: `/dashboard?state=empty`
- Dashboard loading state: `/dashboard?state=loading`
- Dashboard error state: `/dashboard?state=error`
- Orders: `/orders`
- Orders empty state: `/orders?state=empty`
- Orders loading state: `/orders?state=loading`
- Orders error state: `/orders?state=error`
- Next.js also automatically uses `app/orders/loading.js` during route-level loading.

## Notes
- The charts use inline SVG and no chart library is required.
- Revenue is formatted in ETB.
- Each chart includes an equivalent HTML table for users who cannot access the SVG.
- Sorting and pagination are represented in URL query parameters so links can be copied and refreshed.
- Demo records are illustrative only; connect the project’s real data source before submitting as production work.
