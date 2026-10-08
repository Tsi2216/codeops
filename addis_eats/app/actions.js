"use server";

import { revalidatePath } from "next/cache";
import { createOrder, getOrder, markCancelled } from "../lib/orders";
import { orderSchema } from "../lib/schema";
import { getSession } from "../lib/auth";

export async function placeOrder(previousState, formData) {
  const parsed = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    area: formData.get("area"),
    notes: formData.get("notes") || ""
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      error: "Validation failed"
    };
  }

  const total = Number(formData.get("total"));

  if (!Number.isFinite(total) || total < 0) {
    return {
      error: "Validation failed",
      fieldErrors: { total: ["Invalid total."] }
    };
  }

  const session = await getSession();
  const order = await createOrder(parsed.data, session.id);
  revalidatePath("/orders");

  return {
    success: true,
    id: order.id,
    total: order.total,
    currency: order.currency,
    fieldErrors: {}
  };
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== session.id) {
    throw new Error("Not yours");
  }

  await markCancelled(orderId);
  revalidatePath("/orders");

  return { ok: true };
}
