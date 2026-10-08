import { createOrder } from "../../../lib/orders";
import { orderSchema } from "../../../lib/schema";
import { getSession } from "../../../lib/auth";

export async function POST(request) {
  const body = await request.json();

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  const session = await getSession();

  const order = await createOrder(result.data, session.id);

  return Response.json(
    {
      id: order.id,
      total: order.total,
      currency: order.currency
    },
    { status: 201 }
  );
}
