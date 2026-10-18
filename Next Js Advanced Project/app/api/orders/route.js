import { createOrder } from "../../../lib/orders";
import { orderSchema } from "../../../lib/schema";
import { getSession } from "../../../lib/auth";
import { getDish } from "../../../lib/data";

export async function POST(request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Sign in required" }, { status: 401 });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  const result = orderSchema.safeParse(body);
  if (!result.success) return Response.json({ error: "Validation failed", fieldErrors: result.error.flatten().fieldErrors }, { status: 422 });
  if (!Array.isArray(body.items) || body.items.length === 0) return Response.json({ error: "Provide at least one item with dishId and quantity." }, { status: 422 });
  let total = 0;
  for (const item of body.items) {
    const dish = await getDish(item?.dishId);
    const quantity = Number(item?.quantity);
    if (!dish || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return Response.json({ error: "Invalid order item." }, { status: 422 });
    total += dish.price * quantity;
  }
  const order = await createOrder({ ...result.data, total }, session.id);
  return Response.json({ id: order.id, total: order.total, currency: order.currency }, { status: 201 });
}
