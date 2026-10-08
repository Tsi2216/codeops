"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const items = Object.values(cart);
  const total = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <main className="shell">
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map(({ dish, quantity }) => (
            <article className="cart-item" key={dish.id}>
              <span>{dish.name} × {quantity}</span>
              <span>{dish.price * quantity} ETB</span>
              <button type="button" onClick={() => removeFromCart(dish)}>Remove</button>
            </article>
          ))}
          <h2>Total: {total} ETB</h2>
          <Link className="button" href="/checkout">Checkout</Link>
        </>
      )}
    </main>
  );
}
