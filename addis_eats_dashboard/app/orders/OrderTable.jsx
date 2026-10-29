import Link from "next/link";

const columns = [
  { key: "id", label: "Order ID" },
  { key: "customer", label: "Customer" },
  { key: "neighbourhood", label: "Neighbourhood" },
  { key: "createdAt", label: "Date" },
  { key: "total", label: "Total (ETB)" },
  { key: "status", label: "Status" },
];

const money = (value) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

export default function OrderTable({ orders, searchParams, pageSize = 5 }) {
  const sort = columns.some((column) => column.key === searchParams?.sort)
    ? searchParams.sort
    : "createdAt";
  const direction = searchParams?.direction === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number.parseInt(searchParams?.page || "1", 10) || 1);

  const sorted = [...orders].sort((a, b) => {
    const left = a[sort];
    const right = b[sort];
    const comparison =
      sort === "total"
        ? Number(left || 0) - Number(right || 0)
        : String(left ?? "").localeCompare(String(right ?? ""), undefined, {
            numeric: true,
            sensitivity: "base",
          });
    return direction === "asc" ? comparison : -comparison;
  });

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageOrders = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function hrefFor(next = {}) {
    const query = new URLSearchParams();
    query.set("sort", next.sort ?? sort);
    query.set("direction", next.direction ?? direction);
    query.set("page", String(next.page ?? 1));
    return `/orders?${query.toString()}`;
  }

  if (!orders.length) {
    return (
      <section className="empty-state" role="status">
        <h2>No orders found</h2>
        <p>There are no orders to display right now.</p>
        <Link href="/orders" className="button-link">Reset filters</Link>
      </section>
    );
  }

  return (
    <>
      <div className="table-wrap">
        <table>
          <caption>Orders. Select a column heading to sort.</caption>
          <thead>
            <tr>{columns.map((column) => {
              const nextDirection = sort === column.key && direction === "asc" ? "desc" : "asc";
              return (
                <th key={column.key} scope="col" aria-sort={sort === column.key ? (direction === "asc" ? "ascending" : "descending") : "none"}>
                  <Link href={hrefFor({ sort: column.key, direction: nextDirection })}>
                    {column.label}{sort === column.key ? (direction === "asc" ? " ↑" : " ↓") : ""}
                  </Link>
                </th>
              );
            })}</tr>
          </thead>
          <tbody>{pageOrders.map((order) => (
            <tr key={order.id}>
              <th scope="row">{order.id}</th>
              <td>{order.customer}</td>
              <td>{order.neighbourhood}</td>
              <td>{order.createdAt}</td>
              <td>{money(order.total)}</td>
              <td><span className={`status status-${String(order.status).toLowerCase()}`}>{order.status}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <nav className="pagination" aria-label="Orders pagination">
        <span>Page {safePage} of {pageCount} · {orders.length} orders</span>
        <div>
          {safePage > 1 && <Link href={hrefFor({ page: safePage - 1 })}>← Previous</Link>}
          {safePage < pageCount && <Link href={hrefFor({ page: safePage + 1 })}>Next →</Link>}
        </div>
      </nav>
    </>
  );
}
