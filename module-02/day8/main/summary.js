const { withVat, format, total } = require("./pricing");
const orders = require("./orders");

// Calculate the total for each order using map and spread
const ordersWithTotals = orders.map((order) => ({
  ...order,
  total: withVat(total(order.items))
}));

// Filter orders over 500 ETB
const largeOrders = ordersWithTotals.filter(
  (order) => order.total > 500
);

// Print formatted summary
console.log("Addis Market Order Summary");
console.log("--------------------------");

ordersWithTotals.forEach((order) => {
  console.log(
    `Order #${order.id} - ${order.customer}: ${format(order.total)}`
  );
});

// Grand total using reduce
const grandTotal = ordersWithTotals.reduce(
  (sum, order) => sum + order.total,
  0
);

console.log("--------------------------");
console.log(`Grand total: ${format(grandTotal)}`);

console.log("\nOrders over 500 ETB:");
largeOrders.forEach((order) => {
  console.log(
    `Order #${order.id} - ${order.customer}: ${format(order.total)}`
  );
});