function totalByType(transactions, type) {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);
}

function formatReceipts(transactions) {
  return transactions.map(({ customer, amount }) =>
    `${customer}: ${amount} ETB`
  );
}

module.exports = {
  totalByType,
  formatReceipts
};