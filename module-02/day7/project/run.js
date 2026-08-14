const { createLoyalty } = require("./loyalty");

// Normal earn rule: 1 point per 10 ETB
const card = createLoyalty();

card.earn(250);
console.log("After earning 250 ETB:", card.balance(), "points");

card.redeem(10);
console.log("After redeeming 10 points:", card.balance(), "points");

// Holiday rule: double points
const holiday = createLoyalty(
  etb => Math.floor(etb / 10) * 2
);

holiday.earn(250);

console.log(
  "Holiday points after spending 250 ETB:",
  holiday.balance(),
  "points"
);