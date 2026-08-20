const API_URL = "https://open.er-api.com/v6/latest/ETB";

const state = {
  rates: {},
  currencies: [],
  watchlist: JSON.parse(localStorage.getItem("watchlist")) || [],
  amount: localStorage.getItem("amount") || "",
  selectedCurrency: localStorage.getItem("selectedCurrency") || "",
  status: "loading"
};

const statusElement = document.getElementById("status");
const form = document.getElementById("conversion-form");
const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const resultElement = document.getElementById("result");
const watchlistElement = document.getElementById("watchlist");
const addWatchlistButton = document.getElementById("add-watchlist");


// Status
function renderStatus() {
  if (state.status === "loading") {
    statusElement.textContent = "Loading currency rates...";
  }

  if (state.status === "success") {
    statusElement.textContent = "Currency rates loaded successfully.";
  }

  if (state.status === "error") {
    statusElement.textContent = "Failed to load currency rates.";
  }
}


// Render currency dropdown
function renderCurrencies() {
  currencySelect.innerHTML = `
    <option value="">Select a currency</option>
  `;

  state.currencies.forEach((currency) => {
    const option = document.createElement("option");

    option.value = currency;
    option.textContent = currency;

    if (currency === state.selectedCurrency) {
      option.selected = true;
    }

    currencySelect.appendChild(option);
  });
}


// Render watchlist
function renderWatchlist() {
  watchlistElement.innerHTML = "";

  state.watchlist.forEach((currency) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <span>${currency}</span>
      <button
        class="remove-button"
        data-currency="${currency}"
      >
        Remove
      </button>
    `;

    watchlistElement.appendChild(listItem);
  });
}


// Save state to localStorage
function saveState() {
  localStorage.setItem(
    "watchlist",
    JSON.stringify(state.watchlist)
  );

  localStorage.setItem(
    "amount",
    state.amount
  );

  localStorage.setItem(
    "selectedCurrency",
    state.selectedCurrency
  );
}


// Fetch live ETB rates
async function fetchRates() {
  state.status = "loading";
  renderStatus();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await response.json();

    state.rates = data.rates;
    state.currencies = Object.keys(data.rates).sort();
    state.status = "success";

    renderStatus();
    renderCurrencies();
    renderWatchlist();

  } catch (error) {
    state.status = "error";
    renderStatus();

    console.error(error);
  }
}


// Currency conversion
function convertCurrency(amount, currency) {
  const rate = state.rates[currency];

  if (!rate) {
    throw new Error("Currency rate not found");
  }

  return amount * rate;
}


// Conversion form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const currency = currencySelect.value;

  if (!amount || amount <= 0) {
    resultElement.textContent = "Please enter a valid amount.";
    return;
  }

  if (!currency) {
    resultElement.textContent = "Please select a currency.";
    return;
  }

  try {
    const convertedAmount = convertCurrency(amount, currency);

    state.amount = amount;
    state.selectedCurrency = currency;

    resultElement.textContent =
      `${amount} ETB = ${convertedAmount.toFixed(2)} ${currency}`;

    saveState();

  } catch (error) {
    resultElement.textContent = "Unable to convert currency.";
  }
});


// Save selected currency
currencySelect.addEventListener("change", function () {
  state.selectedCurrency = currencySelect.value;

  saveState();
});


// Add currency to watchlist
addWatchlistButton.addEventListener("click", function () {
  const currency = currencySelect.value;

  if (!currency) {
    return;
  }

  if (state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);

  saveState();
  renderWatchlist();
});


// Remove currency using event delegation
watchlistElement.addEventListener("click", function (event) {
  if (!event.target.classList.contains("remove-button")) {
    return;
  }

  const currency = event.target.dataset.currency;

  state.watchlist = state.watchlist.filter(
    (item) => item !== currency
  );

  saveState();
  renderWatchlist();
});


// Restore saved amount
amountInput.value = state.amount;


// Initial rendering
renderStatus();
renderWatchlist();


// Load live rates
fetchRates();