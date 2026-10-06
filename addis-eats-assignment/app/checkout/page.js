import { cookies } from "next/headers";
import CheckoutForm from "../../components/CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  // The cookies() read makes checkout request-specific and therefore dynamic.
  const cookieStore = await cookies();
  const checkoutSession = cookieStore.get("checkout-session")?.value || "none";

  return (
    <main className="shell checkout-page">
      <h1>Checkout</h1>
      <CheckoutForm checkoutSession={checkoutSession} />
    </main>
  );
}
