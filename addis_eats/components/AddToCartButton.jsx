"use client";

import { useCart } from "../app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  return (
    <button type="button" onClick={() => addToCart(dish)}>
      Add
    </button>
  );
}
