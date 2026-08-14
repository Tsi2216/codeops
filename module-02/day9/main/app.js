let items = [];

const form = document.querySelector("#form");
const itemInput = document.querySelector("#itemInput");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

function render() {
  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");

    li.dataset.id = item.id;

    if (item.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button data-action="toggle">Bought</button>
        <button data-action="remove">Remove</button>
      </div>
    `;

    list.appendChild(li);
  });

  const remaining = items.filter((item) => !item.done).length;

  count.textContent = `${remaining} item${remaining === 1 ? "" : "s"} remaining`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = itemInput.value.trim();

  if (!name) {
    return;
  }

  items.push({
    id: Date.now(),
    name: name,
    done: false
  });

  itemInput.value = "";

  render();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const li = button.closest("li");
  const id = Number(li.dataset.id);

  const item = items.find((item) => item.id === id);

  if (button.dataset.action === "toggle") {
    item.done = !item.done;
  }

  if (button.dataset.action === "remove") {
    items = items.filter((item) => item.id !== id);
  }

  render();
});

render();