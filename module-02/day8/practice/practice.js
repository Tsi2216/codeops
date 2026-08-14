// 1. map + filter + reduce
const prices = [200, 500, 800, 1200, 1500];

const pricesWithVat = prices.map(price => price * 1.15);

const under1000 = pricesWithVat.filter(price => price < 1000);

const grandTotal = under1000.reduce(
  (sum, price) => sum + price,
  0
);

console.log("1. Prices with VAT:", pricesWithVat);
console.log("1. Under 1000 ETB:", under1000);
console.log("1. Grand total:", grandTotal, "ETB");


// 2. Object.entries with for...of
const customer = {
  name: "Tsion",
  city: "Addis Ababa",
  balance: 1500
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`2. ${key}: ${value}`);
}


// 3. Destructuring and parameter destructuring
const { name, city } = customer;

console.log("3. Name:", name);
console.log("3. City:", city);

function greet({ name }) {
  return `Hello, ${name}!`;
}

console.log(greet(customer));


// 4. Spread without mutating the original
const updatedCustomer = {
  ...customer,
  city: "Bahir Dar",
  phone: "0912345678"
};

console.log("4. Original customer:", customer);
console.log("4. Updated customer:", updatedCustomer);