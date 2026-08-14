const list = document.querySelector("#list");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const refresh = document.querySelector("#refresh");

const API_URL = "https://dummyjson.com/recipes";

async function load() {
  loading.textContent = "Loading...";
  error.textContent = "";
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    data.recipes.forEach((dish) => {
      const li = document.createElement("li");
      li.textContent = dish.name;
      list.append(li);
    });
  } catch (err) {
    error.textContent =
      "Sorry, we couldn't load the dishes. Please try again.";
  } finally {
    loading.textContent = "";
  }
}

refresh.addEventListener("click", load);

load();