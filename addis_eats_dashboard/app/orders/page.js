import Link from "next/link";
import OrderTable from "./OrderTable";
import { getOrders } from "../lib/orders";

export const dynamic = "force-dynamic";

export default async function OrdersPage({ searchParams }) {
  const params = await searchParams;
  const state = params?.state;

  if (state === "loading") {
    return (
      <main className="dashboard" aria-busy="true" aria-live="polite">
        <header className="page-heading"><div>
          <div className="skeleton skeleton-eyebrow" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-copy" />
        </div></header>
        <section className="panel"><div className="table-wrap"><table aria-label="Loading orders">
          <thead><tr>{["Order ID", "Customer", "Neighbourhood", "Date", "Total", "Status"].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{Array.from({ length: 5 }, (_, index) => <tr key={index}><td colSpan="6"><div className="skeleton skeleton-row" /></td></tr>)}</tbody>
        </table></div><p className="muted">Loading orders…</p></section>
      </main>
    );
  }

  if (state === "error") throw new Error("Demo error state requested from the URL.");

  const orders = await getOrders();

  return (
    <main className="dashboard">
      <header className="page-heading">
        <div>
          <p className="eyebrow">ADDIS EATS · OPERATIONS</p>
          <h1>Orders</h1>
          <p className="muted">Browse, sort, and page through customer orders.</p>
        </div>
        <Link className="text-link" href="/dashboard">← Dashboard</Link>
      </header>

      {state === "empty" ? (
        <section className="empty-state" role="status">
          <h2>No orders found</h2>
          <p>There are no orders to display right now.</p>
          <Link href="/orders" className="button-link">Show orders</Link>
        </section>
      ) : (
        <section className="panel">
          <OrderTable orders={orders} searchParams={params} />
        </section>
      )}

      <section className="demo-links" aria-label="Demonstrate page states">
        <span>Demo states:</span>
        <Link href="/orders">Normal</Link>
        <Link href="/orders?state=empty">Empty</Link>
        <Link href="/orders?state=error">Error</Link>
        <Link href="/orders?state=loading">Loading</Link>
      </section>
    </main>
  );
}
