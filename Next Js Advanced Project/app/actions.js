"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOrder, getOrder, markCancelled } from "../lib/orders";
import { orderSchema } from "../lib/schema";
import { getSession, setSession, clearSession } from "../lib/auth";

export async function signIn(previousState, formData) {
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  // Demo credentials for this learning project only; replace with a real identity provider for production.
  if (!username || password !== "addiseats-demo") return { error: "Use any email and password addiseats-demo." };
  await setSession(username);
  redirect("/orders");
}

export async function signOut() { await clearSession(); redirect("/"); }

export async function placeOrder(previousState, formData) {
  const session = await getSession();
  if (!session) return { error: "Please sign in before placing an order.", fieldErrors: {} };
  const parsed = orderSchema.safeParse({ name: formData.get("name"), phone: formData.get("phone"), area: formData.get("area"), notes: formData.get("notes") || "" });
  if (!parsed.success) return { fieldErrors: parsed.error.flatten().fieldErrors, error: "Please correct the highlighted fields." };
  const total = Number(formData.get("total"));
  if (!Number.isFinite(total) || total < 0) return { error: "Invalid total.", fieldErrors: { total: ["Invalid total."] } };
  const order = await createOrder({ ...parsed.data, total }, session.id);
  revalidatePath("/orders");
  return { success: true, id: order.id, total: order.total, currency: order.currency, fieldErrors: {} };
}

export async function cancelOrder(orderId) {
  const session = await getSession();
  if (!session) throw new Error("Not signed in");
  const order = await getOrder(orderId);
  if (!order) throw new Error("Order not found");
  if (order.userId !== session.id) throw new Error("Not yours");
  await markCancelled(orderId); revalidatePath("/orders"); return { ok: true };
}
