const { addVat, VAT } = require("./money");

const amount = 1000;

console.log(`VAT rate: ${VAT * 100}%`);
console.log(`Amount with VAT: ${addVat(amount)} ETB`);