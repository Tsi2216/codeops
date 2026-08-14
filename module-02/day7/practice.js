// 1. VAT function with a default parameter
function vat(amount, rate = 0.15) {
  return amount * (1 + rate);
}

// Same logic as an arrow function with implicit return
const vatArrow = (amount, rate = 0.15) => amount * (1 + rate);

console.log("1.", vat(100));
console.log("1.", vatArrow(100));


// 2. makeCounter closure
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log("2.", counter());
console.log("2.", counter());
console.log("2.", counter());

// count stays private because it is declared inside makeCounter
// and can only be accessed through the returned function.


// 3. discountBy factory
function discountBy(rate) {
  return (price) => price * (1 - rate);
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log("3. Member price:", memberPrice(1000), "ETB");
console.log("3. Sale price:", salePrice(1000), "ETB");


// 4. Higher-order applyToAll
function applyToAll(list, fn) {
  return list.map(fn);
}

const prices = [100, 200, 300];
const pricesWithVat = applyToAll(prices, vat);

console.log("4.", pricesWithVat);


// 5. forEach with Ethiopian cities
const cities = [
  "Addis Ababa",
  "Dire Dawa",
  "Bahir Dar",
  "Hawassa"
];

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});