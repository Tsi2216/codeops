import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import { getOrdersForUser } from "../../lib/orders";
import { signOut } from "../actions";
export const metadata = { title: "Your orders | Addis Eats", description: "View the status of your own Addis Eats orders." };
export const dynamic = "force-dynamic";
export default async function OrdersPage() {
 const session = await getSession();
 if (!session) redirect("/sign-in?next=/orders");
 const orders = await getOrdersForUser(session.id);
 return <main className="shell"><div className="page-heading"><div><h1>Your orders</h1><p>Signed in as {session.id}</p></div><form action={signOut}><button className="secondary">Sign out</button></form></div><section aria-live="polite">{orders.length ? orders.map(order => <article className="order-card" key={order.id}><div><strong>{order.id}</strong><p>{order.area} · {order.name}</p><p>Status: {order.cancelled ? "Cancelled" : "Received"}</p></div><strong>{order.total} ETB</strong></article>) : <p>No orders yet. Choose something from the <a href="/menu">menu</a> and check out.</p>}</section></main>;
}
