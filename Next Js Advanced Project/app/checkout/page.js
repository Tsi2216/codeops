import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import CheckoutForm from "../../components/CheckoutForm";
export const dynamic = "force-dynamic";
export const metadata = { title: "Checkout | Addis Eats", description: "Complete your Addis Eats delivery order in Addis Ababa." };
export default async function CheckoutPage() {
 const session = await getSession();
 if (!session) redirect("/sign-in?next=/checkout");
 return <main className="shell checkout-page"><h1>Checkout</h1><p>Signed in as {session.id}</p><CheckoutForm /></main>;
}
