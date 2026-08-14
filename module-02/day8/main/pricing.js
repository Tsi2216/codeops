function withVat(amount, rate = 0.15) {
  return amount * (1 + rate);
}

function format(amount) {
  return `${amount.toFixed(2)} ETB`;
}

function total(items) {
  return items.reduce(
    (sum, { price, qty }) => sum + price * qty,
    0
  );
}

module.exports = {
  withVat,
  format,
  total
};