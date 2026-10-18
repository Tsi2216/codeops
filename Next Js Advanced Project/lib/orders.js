// In-memory storage is intentional for the exercise. Data resets when the server restarts
// and is not suitable for a multi-instance production deployment; use a database there.
let orders = [];
export async function createOrder(data, userId) {
 const order = { id: `ord_${Date.now()}_${Math.random().toString(36).slice(2,7)}`, userId, total: data.total, currency: "ETB", name: data.name, phone: data.phone, area: data.area, notes: data.notes || "", createdAt: new Date().toISOString(), cancelled: false };
 orders.push(order); return order;
}
export async function getOrder(id) { return orders.find(order => order.id === id); }
export async function getOrdersForUser(userId) { return orders.filter(order => order.userId === userId); }
export async function markCancelled(id) { const order = await getOrder(id); if (order) order.cancelled = true; return order; }
