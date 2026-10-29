import Link from "next/link";
import RevenueChart from "./RevenueChart";
import { getOrders } from "../lib/orders";

export const dynamic = "force-dynamic";

const money = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(value);

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const requestedState = params?.state;

  if (requestedState === "loading") {
    return (
      <main className="dashboard" aria-busy="true" aria-live="polite">
        <header className="page-heading"><div>
          <div className="skeleton skeleton-eyebrow" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-copy" />
        </div></header>
        <section className="chart-grid">
          {[1, 2].map((item) => <article className="panel" key={item}>
            <div className="skeleton skeleton-title" />
            {[1, 2, 3, 4].map((row) => <div className="skeleton skeleton-row" style={{ margin: "18px 0" }} key={row} />)}
          </article>)}
        </section>
        <p className="muted">Loading dashboard…</p>
      </main>
    );
  }

  // These URL states make the required empty and error views easy to demonstrate.
  if (requestedState === "error") {
    throw new Error("Demo error state requested from the URL.");
  }

  const orders = await getOrders();
  const visibleOrders = requestedState === "empty" ? [] : orders;
  const revenueByNeighbourhood = Object.values(
    visibleOrders.reduce((summary, order) => {
      const name = order.neighbourhood || "Other";
      summary[name] ??= { neighbourhood: name, revenue: 0 };
      summary[name].revenue += Number(order.total || 0);
      return summary;
    }, {})
  ).sort((a, b) => b.revenue - a.revenue);

  const ordersByDay = Object.values(
    visibleOrders.reduce((summary, order) => {
      const day = order.createdAt;
      summary[day] ??= { day, orders: 0 };
      summary[day].orders += 1;
      return summary;
    }, {})
  ).sort((a, b) => a.day.localeCompare(b.day));

  const totalRevenue = visibleOrders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  return (
    <main className="dashboard">
      <header className="page-heading">
        <div>
          <p className="eyebrow">ADDIS EATS · OPERATIONS</p>
          <h1>Dashboard</h1>
          <p className="muted">A quick view of revenue and daily orders.</p>
        </div>
        <Link className="text-link" href="/orders">View all orders →</Link>
      </header>

      {visibleOrders.length === 0 ? (
        <section className="empty-state" role="status">
          <h2>No orders yet</h2>
          <p>When customers place orders, revenue and order activity will appear here.</p>
          <Link href="/dashboard" className="button-link">Show dashboard data</Link>
        </section>
      ) : (
        <>
          <section className="summary-grid" aria-label="Order summary">
            <article className="summary-card">
              <p>Total revenue</p><strong>{money(totalRevenue)}</strong>
            </article>
            <article className="summary-card">
              <p>Total orders</p><strong>{visibleOrders.length}</strong>
            </article>
            <article className="summary-card">
              <p>Neighbourhoods</p><strong>{revenueByNeighbourhood.length}</strong>
            </article>
          </section>

          <section className="chart-grid">
            <article className="panel">
              <h2>Revenue by neighbourhood</h2>
              <p className="muted">Revenue in Ethiopian birr (ETB).</p>
              <RevenueChart data={revenueByNeighbourhood} />
              <div className="accessible-data">
                <h3>Revenue data table</h3>
                <table>
                  <caption>Revenue by neighbourhood, in ETB</caption>
                  <thead><tr><th scope="col">Neighbourhood</th><th scope="col">Revenue (ETB)</th></tr></thead>
                  <tbody>{revenueByNeighbourhood.map((item) => (
                    <tr key={item.neighbourhood}><th scope="row">{item.neighbourhood}</th><td>{money(item.revenue)}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </article>

            <article className="panel">
              <h2>Orders over time</h2>
              <p className="muted">Number of orders per day.</p>
              <OrdersLineChart data={ordersByDay} />
              <div className="accessible-data">
                <h3>Daily orders data table</h3>
                <table>
                  <caption>Number of orders per day</caption>
                  <thead><tr><th scope="col">Date</th><th scope="col">Orders</th></tr></thead>
                  <tbody>{ordersByDay.map((item) => (
                    <tr key={item.day}><th scope="row">{item.day}</th><td>{item.orders}</td></tr>
                  ))}</tbody>
                </table>
              </div>
            </article>
          </section>
        </>
      )}

      <section className="demo-links" aria-label="Demonstrate page states">
        <span>Demo states:</span>
        <Link href="/dashboard">Normal</Link>
        <Link href="/dashboard?state=empty">Empty</Link>
        <Link href="/dashboard?state=error">Error</Link>
        <Link href="/dashboard?state=loading">Loading</Link>
      </section>
    </main>
  );
}

function OrdersLineChart({ data }) {
  const width = 560;
  const height = 230;
  const padding = { top: 18, right: 20, bottom: 42, left: 38 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(1, ...data.map((item) => item.orders));
  const points = data.map((item, index) => ({
    ...item,
    x: padding.left + (data.length === 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth),
    y: padding.top + plotHeight - (item.orders / maxValue) * plotHeight,
  }));
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <div className="chart-frame">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="orders-chart-title orders-chart-desc">
        <title id="orders-chart-title">Orders per day line chart</title>
        <desc id="orders-chart-desc">{data.map((item) => `${item.day}: ${item.orders} orders`).join("; ")}</desc>
        {[0, 0.5, 1].map((fraction) => {
          const y = padding.top + plotHeight * fraction;
          return <line key={fraction} x1={padding.left} x2={width - padding.right} y1={y} y2={y} className="grid-line" />;
        })}
        <path d={path} className="line-path" />
        {points.map((point) => (
          <g key={point.day}>
            <circle cx={point.x} cy={point.y} r="4" className="line-dot" />
            <text x={point.x} y={height - 15} textAnchor="middle" className="axis-label">{point.day.slice(5)}</text>
            <text x={point.x} y={point.y - 10} textAnchor="middle" className="point-label">{point.orders}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
