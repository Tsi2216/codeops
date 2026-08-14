const { transactions } = require("./transactions");
const {
  totalByType,
  formatReceipts
} = require("./report");

const credits = transactions.filter(
  transaction => transaction.type === "credit"
);

const debits = transactions.filter(
  transaction => transaction.type === "debit"
);

const creditTotal = totalByType(transactions, "credit");
const debitTotal = totalByType(transactions, "debit");

console.log("TeleBirr Transaction Report");
console.log("---------------------------");

console.log(`Credits: ${creditTotal} ETB`);
console.log(`Debits: ${debitTotal} ETB`);

console.log("\nReceipts:");

formatReceipts(transactions).forEach(receipt => {
  console.log(receipt);
});

// Updated copy using spread without changing the original
const correctedTransaction = {
  ...transactions[0],
  amount: 300
};

console.log("\nOriginal transaction:");
console.log(transactions[0]);

console.log("Corrected transaction:");
console.log(correctedTransaction);