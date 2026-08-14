const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const facts = document.querySelector("#facts");

function renderFact(container, label, value) {
  const p = document.createElement("p");

  const strong = document.createElement("strong");
  strong.textContent = `${label}: `;

  p.append(strong, document.createTextNode(value));

  container.append(p);
}

async function showCountry(name) {
  facts.textContent = "Loading...";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
    );

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const [country] = await res.json();

    facts.innerHTML = "";

    renderFact(
      facts,
      "Capital",
      country.capital?.[0] || "N/A"
    );

    renderFact(
      facts,
      "Population",
      country.population.toLocaleString()
    );

    renderFact(
      facts,
      "Region",
      country.region
    );

    const currencies = country.currencies
      ? Object.entries(country.currencies)
          .map(([code, currency]) =>
            `${currency.name} (${code})`
          )
          .join(", ")
      : "N/A";

    renderFact(
      facts,
      "Currencies",
      currencies
    );

    const flag = document.createElement("img");
    flag.src = country.flags.svg;
    flag.alt = `${country.name.common} flag`;

    facts.append(flag);

  } catch (error) {
    facts.textContent =
      "Country not found. Please check the country name and try again.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const countryName = input.value.trim();

  if (!countryName) {
    facts.textContent = "Please enter a country name.";
    return;
  }

  showCountry(countryName);
});

// Default country
showCountry("Ethiopia");