// Exercise 1
const title = document.querySelector("#title");
const changeTitle = document.querySelector("#change-title");

changeTitle.addEventListener("click", () => {
  title.textContent = "Welcome to Addis Market";
  title.classList.toggle("highlight");
});


// Exercise 2
const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];
const cityList = document.querySelector("#cities");

cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
});


// Exercise 3
const eventButton = document.querySelector("#event-button");
const buttonContainer = document.querySelector("#button-container");

eventButton.addEventListener("click", (event) => {
  console.log("Button target:", event.target);
});

buttonContainer.addEventListener("click", (event) => {
  console.log("Container listener:", event.target);
});


// Exercise 4
const deleteList = document.querySelector("#delete-list");

deleteList.addEventListener("click", (event) => {
  if (event.target.matches(".delete")) {
    event.target.closest("li").remove();
  }
});


// Week-2 Project
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

function addRow(name, price) {
  const li = document.createElement("li");

  li.dataset.price = price;

  const itemText = document.createElement("span");
  itemText.textContent = `${name} - ${price} ETB`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("del");

  li.append(itemText, deleteButton);

  list.append(li);
}

function updateTotal() {
  let total = 0;

  list.querySelectorAll("li").forEach((item) => {
    total += Number(item.dataset.price);
  });

  totalEl.textContent = `Total: ${total} ETB`;
}


// Exercise 5 + project form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  if (!name || !price) {
    return;
  }

  addRow(name, price);

  form.reset();

  updateTotal();
});


// Delegated listener for delete and bought
list.addEventListener("click", (event) => {
  if (event.target.matches(".del")) {
    event.target.closest("li").remove();
    updateTotal();
  } else if (event.target.closest("li")) {
    event.target.closest("li").classList.toggle("bought");
  }
});