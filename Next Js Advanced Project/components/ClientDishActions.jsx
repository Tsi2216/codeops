"use client";

import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export default function ClientDishActions({ dish }) {
  const router = useRouter();

  return (
    <div className="dish-actions">
      <AddToCartButton dish={dish} />
      <button type="button" onClick={() => router.push(`/menu/${dish.id}`)}>
        Details
      </button>
    </div>
  );
}
