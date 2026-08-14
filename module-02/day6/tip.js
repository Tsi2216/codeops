// Read bill and party size
const bill = Number(process.argv[2]);
const partySize = Number(process.argv[3]);

// Add tiered tip
const tipRate = bill > 300 ? 0.10 : 0.05;
const tip = bill * tipRate;

// Compute total
const total = bill + tip;

// TeleBirr / CBE Birr service fee
let serviceFee;

switch (process.argv[4]) {
  case "telebirr":
    serviceFee = 5;
    break;

  case "cbe":
    serviceFee = 3;
    break;

  default:
    serviceFee = 0;
}

// Compute final total and amount per person
const finalTotal = total + serviceFee;
const perPerson = finalTotal / partySize;

// Print result
console.log(`Bill: ${bill.toFixed(2)} ETB`);
console.log(`Tip: ${tip.toFixed(2)} ETB`);
console.log(`Service fee: ${serviceFee.toFixed(2)} ETB`);
console.log(`Total: ${finalTotal.toFixed(2)} ETB`);
console.log(`Each person pays: ${perPerson.toFixed(2)} ETB`);