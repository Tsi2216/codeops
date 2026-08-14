const { makeReceiptMaker } = require("./order");

const receipt = makeReceiptMaker();

console.log(receipt(120, 200));
console.log(receipt(250, 150));
console.log(receipt(100, 300, 200));