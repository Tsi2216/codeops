import assert from "node:assert/strict";
import cartReducer from "./cartReducer.js";

const dish = {
  id: 1,
  name: "Doro Wat",
  price: 250,
  category: "Main Dishes",
  spicy: true
};

let cart = cartReducer([], { type: "add", item: dish });
assert.equal(cart[0].quantity, 1);

cart = cartReducer(cart, { type: "add", item: dish });
assert.equal(cart[0].quantity, 2);

cart = cartReducer(cart, { type: "remove", item: dish });
assert.equal(cart[0].quantity, 1);

cart = cartReducer(cart, { type: "remove", item: dish });
assert.equal(cart.length, 0);

cart = cartReducer([dish], { type: "clear" });
assert.equal(cart.length, 0);

console.log("cartReducer tests passed");
