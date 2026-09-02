// APP DATA

const state = {
  currentCity: "Addis Ababa",
  weather: null,
  hourlyForecast: [],
  dailyForecast: [],
  favorites: [],
  recentSearches: [],
  loading: false,
  error: null
};


// ETHIOPIAN CITIES

const CITIES = [
  { name: "Addis Ababa", lat: 9.03, lon: 38.74, region: "Addis Ababa" },
  { name: "Adama", lat: 8.54, lon: 39.27, region: "Oromia" },
  { name: "Hawassa", lat: 7.05, lon: 38.49, region: "Sidama" },
  { name: "Bahir Dar", lat: 11.59, lon: 37.39, region: "Amhara" },
  { name: "Dire Dawa", lat: 9.59, lon: 41.86, region: "Dire Dawa" },
  { name: "Mekelle", lat: 13.49, lon: 39.47, region: "Tigray" },
  { name: "Gondar", lat: 12.60, lon: 37.46, region: "Amhara" },
  { name: "Jimma", lat: 7.68, lon: 36.84, region: "Oromia" }
];


// WEATHER CODES

const WEATHER_CODES = {
  0: {
    desc: "Clear sky",
    icon: "☀️",
    scene: "sunny"
  },

  1: {
    desc: "Mainly clear",
    icon: "🌤️",
    scene: "sunny"
  },

  2: {
    desc: "Partly cloudy",
    icon: "⛅",
    scene: "cloudy"
  },

  3: {
    desc: "Overcast",
    icon: "☁️",
    scene: "cloudy"
  },

  45: {
    desc: "Fog",
    icon: "🌫️",
    scene: "cloudy"
  },

  48: {
    desc: "Rime fog",
    icon: "🌫️",
    scene: "cloudy"
  },

  51: {
    desc: "Light drizzle",
    icon: "🌦️",
    scene: "rainy"
  },

  53: {
    desc: "Drizzle",
    icon: "🌦️",
    scene: "rainy"
  },

  55: {
    desc: "Heavy drizzle",
    icon: "🌧️",
    scene: "rainy"
  },

  61: {
    desc: "Light rain",
    icon: "🌦️",
    scene: "rainy"
  },

  63: {
    desc: "Rain",
    icon: "🌧️",
    scene: "rainy"
  },

  65: {
    desc: "Heavy rain",
    icon: "🌧️",
    scene: "rainy"
  },

  71: {
    desc: "Light snow",
    icon: "🌨️",
    scene: "cloudy"
  },

  73: {
    desc: "Snow",
    icon: "❄️",
    scene: "cloudy"
  },

  75: {
    desc: "Heavy snow",
    icon: "❄️",
    scene: "cloudy"
  },

  80: {
    desc: "Rain showers",
    icon: "🌧️",
    scene: "rainy"
  },

  81: {
    desc: "Heavy showers",
    icon: "🌧️",
    scene: "rainy"
  },

  82: {
    desc: "Violent showers",
    icon: "⛈️",
    scene: "rainy"
  },

  95: {
    desc: "Thunderstorm",
    icon: "⛈️",
    scene: "rainy"
  },

  96: {
    desc: "Thunderstorm + hail",
    icon: "⛈️",
    scene: "rainy"
  },

  99: {
    desc: "Severe thunderstorm",
    icon: "⛈️",
    scene: "rainy"
  }
};


// Get weather information from the weather code

function describeCode(code) {
  if (WEATHER_CODES[code]) {
    return WEATHER_CODES[code];
  }

  return {
    desc: "Unknown",
    icon: "☁️",
    scene: "cloudy"
  };
}


// ICONS

const ICONS = {

  search:
    '<circle cx="11" cy="11" r="8"/>' +
    '<path d="m21 21-4.3-4.3"/>',

  mapPin:
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>' +
    '<circle cx="12" cy="10" r="3"/>',

  heart:
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',

  x:
    '<path d="M18 6 6 18"/>' +
    '<path d="m6 6 12 12"/>',

  alert:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>' +
    '<path d="M12 9v4"/>' +
    '<path d="M12 17h.01"/>',

  droplet:
    '<path d="M12 22a7 7 0 0 0 7-7c0-2-3.5-4-4-6.5-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z"/>',

  wind:
    '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>' +
    '<path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>' +
    '<path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',

  eye:
    '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>' +
    '<circle cx="12" cy="12" r="3"/>',

  gauge:
    '<path d="m12 14 4-4"/>' +
    '<path d="M3.34 19a10 10 0 1 1 17.32 0"/>',

  sunrise:
    '<path d="M12 2v8"/>' +
    '<path d="m4.93 10.93 1.41 1.41"/>' +
    '<path d="M2 18h2"/>' +
    '<path d="M20 18h2"/>' +
    '<path d="m19.07 10.93-1.41 1.41"/>' +
    '<path d="M22 22H2"/>' +
    '<path d="m8 6 4-4 4 4"/>' +
    '<path d="M16 18a4 4 0 0 0-8 0"/>',

  sunset:
    '<path d="M12 10V2"/>' +
    '<path d="m4.93 10.93 1.41 1.41"/>' +
    '<path d="M2 18h2"/>' +
    '<path d="M20 18h2"/>' +
    '<path d="m19.07 10.93-1.41 1.41"/>' +
    '<path d="M22 22H2"/>' +
    '<path d="m16 6-4 4-4-4"/>' +
    '<path d="M16 18a4 4 0 0 0-8 0"/>',

  sun:
    '<circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2"/>' +
    '<path d="M12 20v2"/>' +
    '<path d="m4.93 4.93 1.41 1.41"/>' +
    '<path d="m17.66 17.66 1.41 1.41"/>' +
    '<path d="M2 12h2"/>' +
    '<path d="M20 12h2"/>' +
    '<path d="m6.34 17.66-1.41 1.41"/>' +
    '<path d="m19.07 4.93-1.41 1.41"/>',

  moon:
    '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',

  cloud:
    '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',

  cloudSun:
    '<path d="M12 2v2"/>' +
    '<path d="M4.93 4.93l1.41 1.41"/>' +
    '<path d="M20 12h2"/>' +
    '<path d="M19.07 4.93l-1.41 1.41"/>' +
    '<path d="M15.95 12.65a4 4 0 0 0-5.93-4.57"/>' +
    '<path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',

  cloudRain:
    '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24"/>' +
    '<path d="M16 14v6"/>' +
    '<path d="M8 14v6"/>' +
    '<path d="M12 16v6"/>',

  cloudLightning:
    '<path d="M6 16.17A6 6 0 1 1 15.71 9h1.59a4.5 4.5 0 1 1 2.5 8.24"/>' +
    '<path d="m13 12-3 5h4l-3 5"/>',

  cloudFog:
    '<path d="M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 1 1 2.5 8.24"/>' +
    '<path d="M5 20h14"/>' +
    '<path d="M8 22h8"/>',

  snowflake:
    '<path d="M2 12h20"/>' +
    '<path d="M12 2v20"/>' +
    '<path d="m20 16-4-4 4-4"/>' +
    '<path d="m4 8 4 4-4 4"/>' +
    '<path d="m16 4-4 4-4-4"/>' +
    '<path d="m8 20 4-4 4 4"/>'
};


// Create a small SVG icon

function iconSVG(name, size) {

  if (!size) {
    size = 22;
  }

  const icon = ICONS[name] || ICONS.cloud;

  return `
    <svg
      class="icon-svg"
      viewBox="0 0 24 24"
      width="${size}"
      height="${size}"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">
      ${icon}
    </svg>
  `;
}


// Get the correct weather icon

function weatherIconName(code, isDay) {

  if (code === 0 || code === 1) {
    if (isDay === 0) {
      return "moon";
    }

    return "sun";
  }

  if (code === 2) {
    return "cloudSun";
  }

  if (code === 3) {
    return "cloud";
  }

  if (code === 45 || code === 48) {
    return "cloudFog";
  }

  if (code === 71 || code === 73 || code === 75) {
    return "snowflake";
  }

  if (code === 95 || code === 96 || code === 99) {
    return "cloudLightning";
  }

  if (code >= 51) {
    return "cloudRain";
  }

  return "cloud";
}


// Large weather icon

function heroIconSVG(code, isDay) {

  const name = weatherIconName(code, isDay);
  const icon = ICONS[name] || ICONS.cloud;

  return `
    <svg
      class="hero-icon-svg"
      viewBox="0 0 24 24"
      width="150"
      height="150"
      fill="none"
      stroke="url(#heroGrad)"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">

      <defs>
        <linearGradient
          id="heroGrad"
          x1="0"
          y1="0"
          x2="24"
          y2="24"
          gradientUnits="userSpaceOnUse">

          <stop stop-color="#2563eb"/>
          <stop offset="1" stop-color="#7c3aed"/>

        </linearGradient>
      </defs>

      ${icon}
    </svg>
  `;
}


// Heart icon

function heartSVG(filled) {

  const color = "#ef4444";

  let fill = "none";

  if (filled) {
    fill = color;
  }

  return `
    <svg
      class="heart-svg ${filled ? "filled" : ""}"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="${fill}"
      stroke="${color}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true">

      ${ICONS.heart}

    </svg>
  `;
}


// HTML ELEMENTS

const $ = (id) => document.getElementById(id);

const els = {
  loading: $("loadingState"),
  error: $("errorState"),
  errorMsg: $("errorMessage"),
  dashboard: $("dashboard"),

  cityChips: $("cityChips"),

  searchForm: $("searchForm"),
  searchInput: $("searchInput"),
  searchError: $("searchError"),

  locationBtn: $("locationBtn"),
  retryBtn: $("retryBtn"),
  themeToggle: $("themeToggle"),

  otherCities: $("otherCities"),
  trendWrap: $("trendWrap"),

  heroCard: $("heroCard"),
  detailsGrid: $("detailsGrid"),

  hourlyForecast: $("hourlyForecast"),
  forecastGrid: $("forecastGrid"),

  favoritesList: $("favoritesList"),
  recentList: $("recentList"),

  weatherBg: null
};


// WEATHER BACKGROUND

function buildBackground() {

  const bg = document.createElement("div");

  bg.className = "weather-bg weather-cloudy";
  bg.id = "weatherBg";


  // Sun

  const sun = document.createElement("div");

  sun.className = "bg-sun";

  bg.appendChild(sun);


  // Moon

  const moon = document.createElement("div");

  moon.className = "bg-moon";

  bg.appendChild(moon);


  // Stars

  const stars = document.createElement("div");

  stars.className = "bg-stars";

  for (let i = 0; i < 40; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 65 + "%";
    star.style.animationDelay =
      Math.random() * 3 + "s";

    stars.appendChild(star);
  }

  bg.appendChild(stars);


  // Clouds

  const clouds = document.createElement("div");

  clouds.className = "bg-clouds";

  const cloudNames = ["c1", "c2", "c3"];

  cloudNames.forEach(function(name) {

    const cloud = document.createElement("div");

    cloud.className = "cloud " + name;

    clouds.appendChild(cloud);
  });

  bg.appendChild(clouds);


  // Mist

  const mist = document.createElement("div");

  mist.className = "bg-mist";

  for (let i = 1; i <= 3; i++) {

    const mistBlob = document.createElement("div");

    mistBlob.className = "mist-blob m" + i;

    mist.appendChild(mistBlob);
  }

  bg.appendChild(mist);


  // Rain

  const rain = document.createElement("div");

  rain.className = "bg-rain";

  for (let i = 0; i < 70; i++) {

    const drop = document.createElement("div");

    drop.className = "raindrop";

    drop.style.left = Math.random() * 100 + "%";

    drop.style.animationDuration =
      0.5 + Math.random() * 0.6 + "s";

    drop.style.animationDelay =
      Math.random() * 1.5 + "s";

    drop.style.opacity =
      0.4 + Math.random() * 0.4;

    rain.appendChild(drop);
  }

  bg.appendChild(rain);


  // Snow

  const snow = document.createElement("div");

  snow.className = "bg-snow";

  for (let i = 0; i < 50; i++) {

    const flake = document.createElement("div");

    flake.className = "snowflake";

    flake.style.left = Math.random() * 100 + "%";

    flake.style.animationDuration =
      4 + Math.random() * 4 + "s";

    flake.style.animationDelay =
      Math.random() * 5 + "s";

    flake.style.opacity =
      0.5 + Math.random() * 0.5;

    snow.appendChild(flake);
  }

  bg.appendChild(snow);


  // Lightning

  const lightning = document.createElement("div");

  lightning.className = "bg-lightning";

  bg.appendChild(lightning);


  // Dark overlay

  const veil = document.createElement("div");

  veil.className = "bg-veil";

  bg.appendChild(veil);


  document.body.prepend(bg);

  els.weatherBg = bg;
}


// Choose background based on weather

function themeForCode(code, isDay) {

  if (
    isDay === 0 &&
    (code === 0 || code === 1)
  ) {
    return "weather-night";
  }

  if (
    isDay === 0 &&
    code >= 51 &&
    code < 95
  ) {
    return "weather-rainy-night";
  }

  if (code === 0 || code === 1) {
    return "weather-sunny";
  }

  if (code === 2) {
    return "weather-partly-cloudy";
  }

  if (code === 3) {
    return "weather-cloudy";
  }

  if (code === 45 || code === 48) {
    return "weather-foggy";
  }

  if (code === 71 || code === 73 || code === 75) {
    return "weather-snowy";
  }

  if (code === 95 || code === 96 || code === 99) {
    return "weather-storm";
  }

  if (code >= 51) {
    return "weather-rainy";
  }

  return "weather-cloudy";
}


// Change background

function updateWeatherBackground(code, isDay) {

  if (!els.weatherBg) {
    return;
  }

  const theme = themeForCode(code, isDay);

  els.weatherBg.className =
    "weather-bg " + theme;
}


// START THE APP

function init() {

  buildBackground();

  loadFavorites();

  loadRecentSearches();

  loadTheme();

  renderCityChips();

  renderFavorites();

  renderRecentSearches();


  // Theme button

  els.themeToggle.addEventListener(
    "click",
    toggleTheme
  );


  // Search form

  els.searchForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      handleSearch();
    }
  );


  // Search input

  els.searchInput.addEventListener(
    "input",
    clearSearchError
  );


  // Current location

  els.locationBtn.addEventListener(
    "click",
    useCurrentLocation
  );


  // Retry

  els.retryBtn.addEventListener(
    "click",
    function() {

      loadWeather(state.currentCity);
    }
  );


  // Load default city

  loadWeather(state.currentCity);
}


// LOAD WEATHER

async function loadWeather(city) {

  showLoading();

  try {

    // Find the city coordinates

    const coords = await getCoordinates(city);

    if (!coords) {

      showError(
        "Sorry, we couldn't find weather data for this city."
      );

      return;
    }


    // Weather API

    const url =
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${coords.lat}` +
      `&longitude=${coords.lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility,is_day` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&timezone=auto` +
      `&forecast_days=5`;


    const response = await fetch(url);

    if (!response.ok) {

      throw new Error("Weather request failed");
    }


    const data = await response.json();


    // Save data

    state.currentCity =
      coords.name || city;

    state.weather = data;

    state.hourlyForecast =
      data.hourly || [];

    state.dailyForecast =
      data.daily || [];

    state.error = null;


    // Save recent search

    addRecentSearch(state.currentCity);


    // Update page

    render();

  } catch (error) {

    console.error(error);

    showError(
      "Unable to load weather data. Please check your connection and try again."
    );
  }
}


// FIND CITY COORDINATES

async function getCoordinates(city) {

  // First check our Ethiopian city list

  const knownCity = CITIES.find(
    function(item) {

      return (
        item.name.toLowerCase() ===
        city.toLowerCase()
      );
    }
  );


  if (knownCity) {

    return {
      name: knownCity.name,
      lat: knownCity.lat,
      lon: knownCity.lon
    };
  }


  // If it is not in our list,
  // search the geocoding API

  try {

    const url =
      `https://geocoding-api.open-meteo.com/v1/search?` +
      `name=${encodeURIComponent(city)}` +
      `&count=1` +
      `&language=en` +
      `&format=json`;

    const response = await fetch(url);

    const data = await response.json();


    if (
      data.results &&
      data.results.length > 0
    ) {

      const result = data.results[0];

      return {
        name: result.name,
        lat: result.latitude,
        lon: result.longitude
      };
    }

  } catch (error) {

    console.error(
      "Geocoding failed",
      error
    );
  }


  return null;
}


// LOAD WEATHER BY LOCATION

async function loadWeatherByCoordinates(
  latitude,
  longitude,
  placeName
) {

  showLoading();

  try {

    const url =
      `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility,is_day` +
      `&hourly=temperature_2m,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
      `&timezone=auto` +
      `&forecast_days=5`;


    const response = await fetch(url);

    if (!response.ok) {

      throw new Error(
        "Weather request failed"
      );
    }


    const data =
      await response.json();


    state.currentCity = placeName;

    state.weather = data;

    state.hourlyForecast =
      data.hourly || [];

    state.dailyForecast =
      data.daily || [];

    state.error = null;


    addRecentSearch(placeName);

    render();

  } catch (error) {

    console.error(error);

    showError(
      "Unable to load weather for your location."
    );
  }
}


// CURRENT LOCATION

function useCurrentLocation() {

  if (!navigator.geolocation) {

    showError(
      "Geolocation is not supported by your browser."
    );

    return;
  }


  showLoading();


  navigator.geolocation.getCurrentPosition(

    async function(position) {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;


      let placeName = "My Location";


      // Try to get the city name

      try {

        const url =
          `https://geocoding-api.open-meteo.com/v1/search?` +
          `latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&count=1` +
          `&language=en` +
          `&format=json`;

        const response =
          await fetch(url);

        const data =
          await response.json();


        if (
          data.results &&
          data.results[0]
        ) {

          placeName =
            data.results[0].name;
        }

      } catch (error) {

        // Keep "My Location"
      }


      loadWeatherByCoordinates(
        latitude,
        longitude,
        placeName
      );
    },


    function() {

      showError(
        "Location access was denied. Please search for a city instead."
      );
    }
  );
}


// MAIN RENDER FUNCTION

function render() {

  hideLoading();

  hideError();

  els.dashboard.hidden = false;


  // Restart the animation

  els.dashboard.classList.remove(
    "fade-in"
  );

  void els.dashboard.offsetWidth;

  els.dashboard.classList.add(
    "fade-in"
  );


  // Change weather background

  updateWeatherBackground(
    state.weather.current.weather_code,
    state.weather.current.is_day
  );


  // Update all parts of the page

  renderCityChips();

  renderCurrentWeather();

  renderWeatherDetails();

  renderDailyForecast();

  renderHourlyForecast();

  renderFavorites();

  renderRecentSearches();

  renderOtherCities();
}


// CURRENT WEATHER

function renderCurrentWeather() {

  const weather = state.weather;

  if (!weather) {
    return;
  }


  const current =
    weather.current;

  const info =
    describeCode(current.weather_code);


  const isFavorite =
    state.favorites.includes(
      state.currentCity
    );


  const date =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );


  const high =
    weather.daily.temperature_2m_max[0];

  const low =
    weather.daily.temperature_2m_min[0];


  els.heroCard.innerHTML = `

    <div class="hero-left">

      <div class="hero-city">

        ${state.currentCity}

        <button
          class="fav-btn ${isFavorite ? "active" : ""}"
          id="favBtn"
          aria-label="${
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }"
          aria-pressed="${isFavorite}">

          ${heartSVG(isFavorite)}

        </button>

      </div>


      <div class="hero-date">
        ${date}
      </div>


      <div class="hero-condition">

        ${iconSVG(
          weatherIconName(
            current.weather_code,
            current.is_day
          ),
          22
        )}

        ${info.desc}

      </div>


      <div class="hero-temp">
        ${Math.round(current.temperature_2m)}°C
      </div>


      <div class="hero-feels">
        Feels like
        ${Math.round(current.apparent_temperature)}°C
      </div>


      <div class="hero-hilo">

        <span class="high">
          ▲ ${Math.round(high)}°
        </span>

        <span class="low">
          ▼ ${Math.round(low)}°
        </span>

      </div>

    </div>


    <div class="hero-icon">
      ${heroIconSVG(
        current.weather_code,
        current.is_day
      )}
    </div>
  `;


  // Favorite button

  $("favBtn").addEventListener(
    "click",
    toggleFavorite
  );
}


// WEATHER DETAILS

function renderWeatherDetails() {

  const current =
    state.weather.current;

  const daily =
    state.weather.daily;


  const sunrise =
    new Date(
      daily.sunrise[0]
    ).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  const sunset =
    new Date(
      daily.sunset[0]
    ).toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );


  const details = [

    {
      icon: "droplet",
      label: "Humidity",
      value:
        `${current.relative_humidity_2m}%`
    },

    {
      icon: "wind",
      label: "Wind",
      value:
        `${Math.round(current.wind_speed_10m)} km/h`
    },

    {
      icon: "eye",
      label: "Visibility",
      value:
        `${(
          current.visibility / 1000
        ).toFixed(1)} km`
    },

    {
      icon: "gauge",
      label: "Pressure",
      value:
        `${Math.round(current.pressure_msl)} hPa`
    },

    {
      icon: "sunrise",
      label: "Sunrise",
      value: sunrise
    },

    {
      icon: "sunset",
      label: "Sunset",
      value: sunset
    }

  ];


  els.detailsGrid.innerHTML =
    details.map(function(item) {

      return `

        <article class="detail-card glass">

          <span
            class="detail-icon"
            aria-hidden="true">

            ${iconSVG(
              item.icon,
              24
            )}

          </span>


          <span class="detail-label">
            ${item.label}
          </span>


          <span class="detail-value">
            ${item.value}
          </span>

        </article>

      `;
    }).join("");
}


// 5 DAY FORECAST

function renderDailyForecast() {

  const daily =
    state.weather.daily;


  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];


  const today =
    new Date().getDay();


  els.forecastGrid.innerHTML =
    daily.time.map(function(date, index) {

      const info =
        describeCode(
          daily.weather_code[index]
        );


      let dayName;

      if (index === 0) {

        dayName = "Today";

      } else {

        dayName =
          days[(today + index) % 7];
      }


      return `

        <article class="forecast-card glass">

          <div class="forecast-day">
            ${dayName}
          </div>


          <div
            class="forecast-icon"
            aria-hidden="true">

            ${iconSVG(
              weatherIconName(
                daily.weather_code[index],
                1
              ),
              40
            )}

          </div>


          <div class="forecast-cond">
            ${info.desc}
          </div>


          <div class="forecast-temps">

            <span class="max">
              ${Math.round(
                daily.temperature_2m_max[index]
              )}°
            </span>

            <span class="min">
              ${Math.round(
                daily.temperature_2m_min[index]
              )}°
            </span>

          </div>

        </article>

      `;
    }).join("");
}


// HOURLY FORECAST

function renderHourlyForecast() {

  const hourly =
    state.weather.hourly;


  const now = new Date();


  let startIndex =
    hourly.time.findIndex(
      function(time) {

        return new Date(time) >= now;
      }
    );


  if (startIndex < 0) {
    startIndex = 0;
  }


  const hours = [];


  for (
    let i = startIndex;
    i < startIndex + 24 &&
    i < hourly.time.length;
    i++
  ) {

    hours.push({

      time:
        new Date(
          hourly.time[i]
        ).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            hour12: true
          }
        ),

      icon:
        weatherIconName(
          hourly.weather_code[i],
          1
        ),

      temp:
        Math.round(
          hourly.temperature_2m[i]
        )
    });
  }


  els.hourlyForecast.innerHTML =
    hours.map(function(hour) {

      return `

        <div class="hour-card glass">

          <div class="hour-time">
            ${hour.time}
          </div>


          <div
            class="hour-icon"
            aria-hidden="true">

            ${iconSVG(
              hour.icon,
              30
            )}

          </div>


          <div class="hour-temp">
            ${hour.temp}°
          </div>

        </div>

      `;
    }).join("");


  renderTrendChart(hours);
}


// TEMPERATURE GRAPH

function renderTrendChart(hours) {

  if (
    !hours ||
    hours.length === 0
  ) {

    els.trendWrap.innerHTML = "";

    return;
  }


  const width = 800;
  const height = 140;

  const paddingLeft = 34;
  const paddingRight = 14;
  const paddingTop = 14;
  const paddingBottom = 26;


  const chartWidth =
    width -
    paddingLeft -
    paddingRight;

  const chartHeight =
    height -
    paddingTop -
    paddingBottom;


  const temperatures =
    hours.map(function(hour) {

      return hour.temp;
    });


  let min =
    Math.min(...temperatures);

  let max =
    Math.max(...temperatures);


  if (min === max) {

    min = min - 1;
    max = max + 1;
  }


  const range = max - min;


  function getX(index) {

    return (
      paddingLeft +
      (index / (hours.length - 1)) *
      chartWidth
    );
  }


  function getY(temp) {

    return (
      paddingTop +
      (1 - (temp - min) / range) *
      chartHeight
    );
  }


  const linePoints =
    hours.map(function(hour, index) {

      return (
        getX(index) +
        "," +
        getY(hour.temp)
      );

    }).join(" ");


  const areaPoints =
    paddingLeft +
    "," +
    (paddingTop + chartHeight) +
    " " +
    linePoints +
    " " +
    (paddingLeft + chartWidth) +
    "," +
    (paddingTop + chartHeight);


  // Grid lines

  let grid = "";


  for (let i = 0; i <= 2; i++) {

    const y =
      paddingTop +
      (i / 2) *
      chartHeight;


    grid += `

      <line
        x1="${paddingLeft}"
        y1="${y}"
        x2="${width - paddingRight}"
        y2="${y}"
        class="trend-grid"/>

    `;
  }


  // Temperature labels

  const labels = `

    <text
      x="${paddingLeft - 6}"
      y="${paddingTop + 4}"
      class="trend-axis"
      text-anchor="end">

      ${max}°

    </text>


    <text
      x="${paddingLeft - 6}"
      y="${paddingTop + chartHeight + 4}"
      class="trend-axis"
      text-anchor="end">

      ${min}°

    </text>

  `;


  // Time labels

  let timeLabels = "";

  const step =
    Math.max(
      1,
      Math.floor(hours.length / 6)
    );


  for (
    let i = 0;
    i < hours.length;
    i += step
  ) {

    timeLabels += `

      <text
        x="${getX(i)}"
        y="${height - 8}"
        class="trend-axis"
        text-anchor="middle">

        ${hours[i].time}

      </text>

    `;
  }


  // Dots

  let dots = "";


  hours.forEach(function(hour, index) {

    dots += `

      <circle
        cx="${getX(index)}"
        cy="${getY(hour.temp)}"
        r="3.5"
        class="trend-dot">

        <title>
          ${hour.time} — ${hour.temp}°
        </title>

      </circle>

    `;
  });


  els.trendWrap.innerHTML = `

    <svg
      class="trend-svg"
      viewBox="0 0 ${width} ${height}"
      role="img"
      aria-label="Hourly temperature trend">

      ${grid}


      <polygon
        points="${areaPoints}"
        class="trend-area"/>


      <polyline
        points="${linePoints}"
        class="trend-line"
        fill="none"
        vector-effect="non-scaling-stroke"/>


      ${dots}

      ${labels}

      ${timeLabels}

    </svg>

  `;
}


// CITY BUTTONS

function renderCityChips() {

  els.cityChips.innerHTML =
    CITIES.map(function(city) {

      let active = "";

      if (
        city.name ===
        state.currentCity
      ) {

        active = "active";
      }


      return `

        <button
          class="chip ${active}"
          data-city="${city.name}">

          ${city.name}

        </button>

      `;

    }).join("");


  const buttons =
    els.cityChips.querySelectorAll(
      ".chip"
    );


  buttons.forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        loadWeather(
          button.dataset.city
        );
      }
    );
  });
}


// FAVORITES

function addFavorite() {

  if (
    !state.favorites.includes(
      state.currentCity
    )
  ) {

    state.favorites.push(
      state.currentCity
    );

    saveFavorites();

    renderFavorites();

    renderCurrentWeather();
  }
}


function removeFavorite(city) {

  state.favorites =
    state.favorites.filter(
      function(item) {

        return item !== city;
      }
    );


  saveFavorites();

  renderFavorites();

  renderCurrentWeather();
}


function toggleFavorite() {

  if (
    state.favorites.includes(
      state.currentCity
    )
  ) {

    removeFavorite(
      state.currentCity
    );

  } else {

    addFavorite();
  }
}


// SHOW FAVORITES

async function renderFavorites() {

  if (
    state.favorites.length === 0
  ) {

    els.favoritesList.innerHTML = `

      <div class="empty-fav">

        <span
          class="empty-fav-icon"
          aria-hidden="true">

          ${iconSVG("heart", 28)}

        </span>


        <p class="empty-fav-title">
          No favorite cities yet
        </p>


        <p class="empty-fav-sub">
          Save a city to quickly check
          its weather anytime.
        </p>

      </div>

    `;

    return;
  }


  // Show cards first

  els.favoritesList.innerHTML =
    state.favorites.map(function(city) {

      return `

        <div
          class="fav-card glass"
          data-fav="${city}"
          role="button"
          tabindex="0">

          <span class="fav-icon">

            ${iconSVG("cloud", 24)}

          </span>


          <span class="fav-info">

            <span class="fav-name">
              ${city}
            </span>

            <span class="fav-cond">
              Loading...
            </span>

          </span>


          <span class="fav-temp">
            --°
          </span>


          <button
            class="fav-remove"
            data-fav="${city}"
            aria-label="Remove ${city} from favorites"
            type="button">

            ${iconSVG("x", 16)}

          </button>

        </div>

      `;

    }).join("");


  // Click favorite card

  const cards =
    els.favoritesList.querySelectorAll(
      ".fav-card"
    );


  cards.forEach(function(card) {

    card.addEventListener(
      "click",
      function(event) {

        if (
          event.target.closest(
            ".fav-remove"
          )
        ) {

          return;
        }


        loadWeather(
          card.dataset.fav
        );
      }
    );
  });


  // Remove favorite

  const removeButtons =
    els.favoritesList.querySelectorAll(
      ".fav-remove"
    );


  removeButtons.forEach(
    function(button) {

      button.addEventListener(
        "click",
        function(event) {

          event.stopPropagation();

          removeFavorite(
            button.dataset.fav
          );
        }
      );
    }
  );


  // Get weather for favorites

  const results = [];


  for (
    const city of state.favorites
  ) {

    let latitude;
    let longitude;


    // Check Ethiopian cities

    const knownCity =
      CITIES.find(
        function(item) {

          return (
            item.name.toLowerCase() ===
            city.toLowerCase()
          );
        }
      );


    if (knownCity) {

      latitude = knownCity.lat;
      longitude = knownCity.lon;

    } else {

      // Find coordinates

      try {

        const geoUrl =
          `https://geocoding-api.open-meteo.com/v1/search?` +
          `name=${encodeURIComponent(city)}` +
          `&count=1` +
          `&language=en` +
          `&format=json`;


        const geoResponse =
          await fetch(geoUrl);

        const geoData =
          await geoResponse.json();


        if (
          !geoData.results ||
          !geoData.results[0]
        ) {

          results.push({
            city: city,
            temp: null,
            code: 3,
            isDay: 1
          });

          continue;
        }


        latitude =
          geoData.results[0].latitude;

        longitude =
          geoData.results[0].longitude;

      } catch (error) {

        results.push({
          city: city,
          temp: null,
          code: 3,
          isDay: 1
        });

        continue;
      }
    }


    // Get current weather

    try {

      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,weather_code,is_day` +
        `&timezone=auto`;


      const response =
        await fetch(weatherUrl);

      const data =
        await response.json();


      results.push({

        city: city,

        temp:
          Math.round(
            data.current.temperature_2m
          ),

        code:
          data.current.weather_code,

        isDay:
          data.current.is_day
      });

    } catch (error) {

      results.push({
        city: city,
        temp: null,
        code: 3,
        isDay: 1
      });
    }
  }


  // Update the cards

  results.forEach(function(result) {

    const card =
      els.favoritesList.querySelector(
        `.fav-card[data-fav="${result.city}"]`
      );


    if (!card) {
      return;
    }


    const info =
      describeCode(result.code);


    card.querySelector(
      ".fav-cond"
    ).textContent =
      info.desc;


    card.querySelector(
      ".fav-icon"
    ).innerHTML =
      iconSVG(
        weatherIconName(
          result.code,
          result.isDay
        ),
        24
      );


    card.querySelector(
      ".fav-temp"
    ).textContent =
      result.temp === null
        ? "--°"
        : `${result.temp}°`;
  });
}


// Save favorites

function saveFavorites() {

  localStorage.setItem(
    "ew_favorites",
    JSON.stringify(
      state.favorites
    )
  );
}


// Load favorites

function loadFavorites() {

  try {

    const saved =
      localStorage.getItem(
        "ew_favorites"
      );


    if (saved) {

      state.favorites =
        JSON.parse(saved);

    } else {

      state.favorites = [];
    }

  } catch (error) {

    state.favorites = [];
  }
}


// RECENT SEARCHES

function addRecentSearch(city) {

  // Remove old copy

  state.recentSearches =
    state.recentSearches.filter(
      function(item) {

        return item !== city;
      }
    );


  // Add city to beginning

  state.recentSearches.unshift(
    city
  );


  // Keep only five

  state.recentSearches =
    state.recentSearches.slice(0, 5);


  saveRecentSearches();

  renderRecentSearches();
}


function renderRecentSearches() {

  if (
    state.recentSearches.length === 0
  ) {

    els.recentList.innerHTML =
      `<p class="empty-note">
        No recent searches yet.
      </p>`;

    return;
  }


  els.recentList.innerHTML =
    state.recentSearches.map(
      function(city) {

        return `

          <button
            class="chip"
            data-recent="${city}">

            ${city}

          </button>

        `;
      }
    ).join("");


  const buttons =
    els.recentList.querySelectorAll(
      ".chip"
    );


  buttons.forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        loadWeather(
          button.dataset.recent
        );
      }
    );
  });
}


// Save recent searches

function saveRecentSearches() {

  localStorage.setItem(
    "ew_recent",
    JSON.stringify(
      state.recentSearches
    )
  );
}


// Load recent searches

function loadRecentSearches() {

  try {

    const saved =
      localStorage.getItem(
        "ew_recent"
      );


    if (saved) {

      state.recentSearches =
        JSON.parse(saved);

    } else {

      state.recentSearches = [];
    }

  } catch (error) {

    state.recentSearches = [];
  }
}


// SEARCH

function handleSearch() {

  const city =
    els.searchInput.value.trim();


  if (!city) {

    showSearchError(
      "Please enter a city name."
    );

    return;
  }


  clearSearchError();

  loadWeather(city);
}


function showSearchError(message) {

  els.searchError.innerHTML = `

    ${iconSVG("alert", 16)}

    <span>
      ${message}
    </span>

  `;


  els.searchError.classList.add(
    "show"
  );


  els.searchInput.classList.add(
    "invalid"
  );
}


function clearSearchError() {

  els.searchError.classList.remove(
    "show"
  );

  els.searchInput.classList.remove(
    "invalid"
  );
}


// LIGHT / DARK THEME

function applyTheme(theme) {

  if (theme === "dark") {

    document.documentElement.classList.add(
      "dark"
    );

  } else {

    document.documentElement.classList.remove(
      "dark"
    );
  }


  els.themeToggle.setAttribute(
    "aria-pressed",
    theme === "dark"
  );
}


function toggleTheme() {

  let nextTheme = "light";


  if (
    document.documentElement.classList.contains(
      "dark"
    )
  ) {

    nextTheme = "light";

  } else {

    nextTheme = "dark";
  }


  applyTheme(nextTheme);


  localStorage.setItem(
    "ew_theme",
    nextTheme
  );
}


function loadTheme() {

  const savedTheme =
    localStorage.getItem(
      "ew_theme"
    ) || "light";


  applyTheme(savedTheme);
}

// OTHER ETHIOPIAN CITIES

async function renderOtherCities() {

  // Get other cities

  const otherCities =
    CITIES.filter(
      function(city) {

        return (
          city.name !==
          state.currentCity
        );
      }
    ).slice(0, 5);


  // Show loading cards

  els.otherCities.innerHTML =
    otherCities.map(
      function(city) {

        return `

          <button
            class="other-city-card glass"
            data-city="${city.name}"
            type="button">

            <span class="other-city-icon">

              ${iconSVG(
                "cloud",
                30
              )}

            </span>


            <span class="other-city-info">

              <span class="other-city-name">
                ${city.name}
              </span>


              <span class="other-city-region">
                ${city.region}
              </span>


              <span class="other-city-cond">
                Loading...
              </span>

            </span>


            <span class="other-city-temp">
              --°
            </span>

          </button>

        `;
      }
    ).join("");


  // Add click event

  const buttons =
    els.otherCities.querySelectorAll(
      ".other-city-card"
    );


  buttons.forEach(function(button) {

    button.addEventListener(
      "click",
      function() {

        loadWeather(
          button.dataset.city
        );
      }
    );
  });


  // Get weather

  const results = [];


  for (
    const city of otherCities
  ) {

    try {

      const url =
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${city.lat}` +
        `&longitude=${city.lon}` +
        `&current=temperature_2m,weather_code,is_day` +
        `&timezone=auto`;


      const response =
        await fetch(url);


      const data =
        await response.json();


      results.push({

        name: city.name,

        temp:
          Math.round(
            data.current.temperature_2m
          ),

        code:
          data.current.weather_code,

        isDay:
          data.current.is_day
      });

    } catch (error) {

      results.push({

        name: city.name,
        temp: null,
        code: 3,
        isDay: 1

      });
    }
  }



  results.forEach(function(result) {

    const card =
      els.otherCities.querySelector(
        `.other-city-card[data-city="${result.name}"]`
      );


    if (!card) {
      return;
    }


    const info =
      describeCode(result.code);


    card.querySelector(
      ".other-city-cond"
    ).textContent =
      info.desc;


    card.querySelector(
      ".other-city-icon"
    ).innerHTML =
      iconSVG(
        weatherIconName(
          result.code,
          result.isDay
        ),
        30
      );


    card.querySelector(
      ".other-city-temp"
    ).textContent =
      result.temp === null
        ? "--°"
        : `${result.temp}°`;
  });
}


// LOADING AND ERROR

function showLoading() {

  state.loading = true;

  els.loading.hidden = false;

  els.dashboard.hidden = true;

  els.error.hidden = true;
}


function hideLoading() {

  state.loading = false;

  els.loading.hidden = true;
}


function showError(message) {

  state.loading = false;

  state.error = message;

  els.loading.hidden = true;

  els.dashboard.hidden = true;

  els.error.hidden = false;

  els.errorMsg.textContent =
    message;
}


function hideError() {

  state.error = null;

  els.error.hidden = true;
}


// START

init();