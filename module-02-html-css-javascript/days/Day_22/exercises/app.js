//1
const state = {
  rates: {},
  watchlist: [],
  selectedCurrency: "USD",
  amount: "",
  convertedResult: null,
  errorMessage: "",
  isLoading: false
};
// 2
state.rates = { USD: 0.0177, KES: 2.29, EUR: 0.0162 };

function render() {
  const select = document.querySelector("#currency-select");
  
  select.innerHTML = Object.keys(state.rates)
    .map(curr => `<option value="${curr}" ${curr === state.selectedCurrency ? "selected" : ""}>${curr}</option>`)
    .join("");
}

render(); 
//3
const API_URL = "https://open.er-api.com/v6/latest/ETB";

async function loadRates() {
  state.isLoading = true;
  state.errorMessage = "";
  render();

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    if (data.result !== "success") throw new Error("Failed to load rates.");
    
    state.rates = data.rates;
    state.isLoading = false;
  } catch (err) {
    state.isLoading = false;
    state.errorMessage = err.message || "Network request failed.";
  }

  render();
}

function render() {
  const statusDiv = document.querySelector("#status");
  const select = document.querySelector("#currency-select");

  if (state.isLoading) {
    statusDiv.textContent = "Loading live ETB rates...";
    return;
  } else if (state.errorMessage) {
    statusDiv.textContent = `Error: ${state.errorMessage}`;
    return;
  } else {
    statusDiv.textContent = "";
  }

  select.innerHTML = Object.keys(state.rates)
    .map(curr => `<option value="${curr}" ${curr === state.selectedCurrency ? "selected" : ""}>${curr}</option>`)
    .join("");
}

loadRates();
//4

document.querySelector("#convert-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const rawInput = document.querySelector("#amount-input").value.trim();
  const num = Number(rawInput);

  if (rawInput === "" || isNaN(num) || num <= 0) {
    state.errorMessage = "Please enter a valid positive number.";
    state.convertedResult = null;
  } else {
    state.errorMessage = "";
    state.amount = num;
    state.selectedCurrency = document.querySelector("#currency-select").value;
    
    const rate = state.rates[state.selectedCurrency];
    state.convertedResult = (num * rate).toFixed(4);
  }

  render();
});

function render() {
  const statusDiv = document.querySelector("#status");
  const select = document.querySelector("#currency-select");
  const resultDiv = document.querySelector("#result");

  if (state.isLoading) {
    statusDiv.textContent = "Loading live ETB rates...";
    return;
  }

  statusDiv.textContent = state.errorMessage ? `Error: ${state.errorMessage}` : "";

  select.innerHTML = Object.keys(state.rates)
    .map(curr => `<option value="${curr}" ${curr === state.selectedCurrency ? "selected" : ""}>${curr}</option>`)
    .join("");

  if (state.convertedResult !== null && !state.errorMessage) {
    resultDiv.textContent = `${state.amount} ETB = ${state.convertedResult} ${state.selectedCurrency}`;
  } else if (!state.errorMessage) {
    resultDiv.textContent = "";
  }
}
//5

document.querySelector("#add-watchlist-btn").addEventListener("click", () => {
  const selected = document.querySelector("#currency-select").value;
  if (selected && !state.watchlist.includes(selected)) {
    state.watchlist.push(selected);
    render();
  }
});

document.querySelector("#watchlist-ul").addEventListener("click", (e) => {
  const currencyToRemove = e.target.dataset.c;
  if (currencyToRemove) {
    state.watchlist = state.watchlist.filter(c => c !== currencyToRemove);
    render();
  }
});

function renderWatchlist() {
  const ul = document.querySelector("#watchlist-ul");
  
  if (state.watchlist.length === 0) {
    ul.innerHTML = "<li>Watchlist is empty.</li>";
    return;
  }

  ul.innerHTML = state.watchlist
    .map(curr => {
      const rate = state.rates[curr] ? (1 * state.rates[curr]).toFixed(4) : "—";
      return `
        <li>
          1 ETB = ${rate} ${curr}
          <button type="button" data-c="${curr}">Remove</button>
        </li>
      `;
    })
    .join("");
}
//6
const STORAGE_KEY = "birr_watch_state";

function save() {
  const dataToSave = {
    watchlist: state.watchlist,
    selectedCurrency: state.selectedCurrency
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.watchlist = parsed.watchlist || [];
      state.selectedCurrency = parsed.selectedCurrency || "USD";
    } catch (e) {
      console.error("Failed to parse stored state", e);
    }
  }
}

document.querySelector("#add-watchlist-btn").addEventListener("click", () => {
  const selected = document.querySelector("#currency-select").value;
  if (selected && !state.watchlist.includes(selected)) {
    state.watchlist.push(selected);
    save();
    render();
  }
});

document.querySelector("#watchlist-ul").addEventListener("click", (e) => {
  const currencyToRemove = e.target.dataset.c;
  if (currencyToRemove) {
    state.watchlist = state.watchlist.filter(c => c !== currencyToRemove);
    save();
    render();
  }
});

document.querySelector("#currency-select").addEventListener("change", (e) => {
  state.selectedCurrency = e.target.value;
  save();
  render();
});

async function init() {
  load();   //1   
  render();    // 2. 
  await loadRates(); // 3
}

init();
