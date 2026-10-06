# Rendering Strategy

| Route | Strategy | Why |
|---|---|---|
| `/` | Static | The home page has no request-specific data. |
| `/menu` | Revalidated static | Menu data can be refreshed periodically with `revalidate = 60`. |
| `/menu/[id]` | Static generation | `generateStaticParams` creates one page for each dish. |
| `/cart` | Client | The cart is interactive client state. |
| `/checkout` | Dynamic | The checkout is marked `force-dynamic` because the request can read request-specific checkout state. |
