const state = {
  rates: {},
  currencies: [],
  selectedCurrency: localStorage.getItem("selectedCurrency") || "",
  amount: localStorage.getItem("amount") || "",
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
  loading: true,
  error: null
};

const status = document.getElementById("status");
const form = document.getElementById("conversionForm");
const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const result = document.getElementById("result");
const watchlist = document.getElementById("watchlist");

async function getRates() {
  state.loading = true;
  state.error = null;
  showStatus("Loading rates...");

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/ETB");

    if (!response.ok) {
      throw new Error("Could not load currency rates");
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error("Could not load currency rates");
    }

    state.rates = data.rates;
    state.currencies = Object.keys(data.rates).sort();
    state.loading = false;

    renderCurrencies();
    renderWatchlist();
    showStatus("Rates loaded successfully.", "success");
  } catch (error) {
    state.loading = false;
    state.error = error.message;
    showStatus("Could not load rates.", "error");
  }
}

function showStatus(message, type) {
  status.textContent = message;
  status.className = type || "";
}

function renderCurrencies() {
  currencySelect.innerHTML = "";

  state.currencies.forEach(function(currency) {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;

    if (currency === state.selectedCurrency) {
      option.selected = true;
    }

    currencySelect.appendChild(option);
  });

  if (!state.selectedCurrency && state.currencies.length > 0) {
    state.selectedCurrency = state.currencies.includes("USD")
      ? "USD"
      : state.currencies[0];

    currencySelect.value = state.selectedCurrency;
    saveState();
  }
}

function convertCurrency(event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const currency = currencySelect.value;

  if (!amountInput.value || isNaN(amount) || amount <= 0) {
    result.textContent = "Please enter a valid amount.";
    result.className = "error";
    return;
  }

  if (!state.rates[currency]) {
    result.textContent = "Please choose a currency.";
    result.className = "error";
    return;
  }

  const converted = amount * state.rates[currency];

  state.amount = amountInput.value;
  state.selectedCurrency = currency;
  saveState();

  result.textContent =
    amount.toLocaleString() +
    " ETB = " +
    converted.toFixed(2) +
    " " +
    currency;

  result.className = "success";
}

function renderWatchlist() {
  watchlist.innerHTML = "";

  if (state.watchlist.length === 0) {
    watchlist.textContent = "No currencies in your watchlist.";
    return;
  }

  state.watchlist.forEach(function(currency) {
    const item = document.createElement("div");
    item.className = "watch-item";
    item.innerHTML =
      "<span>" + currency + "</span>" +
      "<button data-currency="" + currency + "">Remove</button>";

    watchlist.appendChild(item);
  });
}

function addToWatchlist(currency) {
  if (!currency || state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);
  saveState();
  renderWatchlist();
}

function removeFromWatchlist(currency) {
  state.watchlist = state.watchlist.filter(function(item) {
    return item !== currency;
  });

  saveState();
  renderWatchlist();
}

function saveState() {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  localStorage.setItem("selectedCurrency", state.selectedCurrency);
  localStorage.setItem("amount", state.amount);
}

currencySelect.addEventListener("change", function() {
  state.selectedCurrency = currencySelect.value;
  saveState();
});

amountInput.addEventListener("input", function() {
  state.amount = amountInput.value;
  saveState();
});

form.addEventListener("submit", convertCurrency);

watchlist.addEventListener("click", function(event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  const currency = event.target.dataset.currency;
  removeFromWatchlist(currency);
});

currencySelect.addEventListener("dblclick", function() {
  addToWatchlist(currencySelect.value);
});

amountInput.value = state.amount;

getRates();
