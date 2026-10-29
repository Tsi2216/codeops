export default function OrdersLoading() {
  return (
    <main className="dashboard" aria-busy="true" aria-live="polite">
      <header className="page-heading">
        <div>
          <div className="skeleton skeleton-eyebrow" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-copy" />
        </div>
      </header>
      <section className="panel">
        <div className="table-wrap">
          <table aria-label="Loading orders">
            <thead><tr>
              {["Order ID", "Customer", "Neighbourhood", "Date", "Total", "Status"].map((heading) => <th key={heading}>{heading}</th>)}
            </tr></thead>
            <tbody>{Array.from({ length: 5 }, (_, index) => (
              <tr key={index}><td colSpan="6"><div className="skeleton skeleton-row" /></td></tr>
            ))}</tbody>
          </table>
        </div>
        <p className="muted">Loading orders…</p>
      </section>
    </main>
  );
}
