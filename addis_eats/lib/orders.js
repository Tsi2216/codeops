let orders = [];

export async function createOrder(data, userId) {
  const order = {
    id: `ord_${Date.now()}`,
    userId,
    total: data.total,
    currency: "ETB",
    name: data.name,
    phone: data.phone,
    area: data.area,
    notes: data.notes || ""
  };

  orders.push(order);
  return order;
}

export async function getOrder(id) {
  return orders.find((order) => order.id === id);
}

export async function markCancelled(id) {
  const order = await getOrder(id);
  if (order) order.cancelled = true;
  return order;
}
