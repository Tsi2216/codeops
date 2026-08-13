const items = [];

const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const groceryList = document.getElementById("grocery-list");
const itemCount = document.getElementById("item-count");

function render() {
    groceryList.innerHTML = "";

    items.forEach(function (item) {
        const li = document.createElement("li");
        li.className = "grocery-item";

        if (item.bought) {
            li.classList.add("bought");
        }

        const name = document.createElement("span");
        name.className = "item-name";
        name.textContent = item.name;

        const buttons = document.createElement("div");
        buttons.className = "item-buttons";

        const buyButton = document.createElement("button");
        buyButton.className = "buy-button";
        buyButton.textContent = item.bought ? "Unbuy" : "Bought";

        buyButton.addEventListener("click", function () {
            toggleItem(item.id);
        });

        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            removeItem(item.id);
        });

        buttons.appendChild(buyButton);
        buttons.appendChild(removeButton);

        li.appendChild(name);
        li.appendChild(buttons);

        groceryList.appendChild(li);
    });

    if (items.length === 1) {
        itemCount.textContent = "1 item";
    } else {
        itemCount.textContent = items.length + " items";
    }
}

function addItem() {
    const name = input.value.trim();

    if (name === "") {
        return;
    }

    const newItem = {
        id: Date.now(),
        name: name,
        bought: false
    };

    items.push(newItem);
    input.value = "";

    render();
}

function toggleItem(id) {
    const item = items.find(function (item) {
        return item.id === id;
    });

    if (item) {
        item.bought = !item.bought;
        render();
    }
}

function removeItem(id) {
    const index = items.findIndex(function (item) {
        return item.id === id;
    });

    if (index !== -1) {
        items.splice(index, 1);
        render();
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addItem();
});

render();
