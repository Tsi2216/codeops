import { getSession } from "../../lib/auth";

export default async function OrdersPage() {
  const session = await getSession();

  return (
    <main className="shell">
      <h1>Orders</h1>
      <p>Signed-in user: {session.id}</p>
      <p>Order data is kept on the server for this exercise.</p>
    </main>
  );
}
