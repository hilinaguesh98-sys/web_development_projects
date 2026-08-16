const state = {
  rates: {},
  watchlist: JSON.parse(localStorage.getItem("birr_watchlist")) || ["USD", "EUR", "KES"],
  currency: localStorage.getItem("birr_last_currency") || "USD",
  amount: "",
  loading: true,
  error: null,
};

const API_URL = "https://open.er-api.com/v6/latest/ETB";

function saveStateToStorage() {
  localStorage.setItem("birr_watchlist", JSON.stringify(state.watchlist));
  localStorage.setItem("birr_last_currency", state.currency);
}

async function fetchRates() {
  state.loading = true;
  state.error = null;
  render();

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();

    if (data.result !== "success") throw new Error("Failed to load exchange rates");

    state.rates = data.rates;
    state.loading = false;
    
    if (!state.rates[state.currency]) {
      state.currency = Object.keys(state.rates)[0] || "USD";
    }
  } catch (err) {
    state.loading = false;
    state.error = err.message || "Failed to fetch live exchange rates.";
  }

  render();
}

function render() {
  const statusBanner = document.querySelector("#status-banner");
  const select = document.querySelector("#currency");
  const amountInput = document.querySelector("#amount");
  const amountError = document.querySelector("#amount-error");
  const resultBox = document.querySelector("#conversion-result");
  const addBtn = document.querySelector("#add-watchlist-btn");
  const watchlistContainer = document.querySelector("#watchlist-container");

  if (state.loading) {
    statusBanner.className = "status-banner loading";
    statusBanner.textContent = "Fetching latest ETB exchange rates...";
  } else if (state.error) {
    statusBanner.className = "status-banner error";
    statusBanner.textContent = `Error: ${state.error}`;
  } else {
    statusBanner.className = "status-banner hidden";
  }

  const currencyKeys = Object.keys(state.rates);
  select.disabled = state.loading || state.error || currencyKeys.length === 0;
  
  if (currencyKeys.length > 0) {
    select.innerHTML = currencyKeys
      .map(c => `<option value="${c}" ${c === state.currency ? "selected" : ""}>${c}</option>`)
      .join("");
  }

  amountInput.value = state.amount;
  let validationError = "";
  let convertedVal = null;

  if (state.amount !== "") {
    const num = Number(state.amount);
    if (isNaN(num)) {
      validationError = "Please enter a valid number.";
    } else if (num <= 0) {
      validationError = "Amount must be greater than zero.";
    } else if (state.rates[state.currency]) {
      convertedVal = (num * state.rates[state.currency]).toFixed(4);
    }
  }

  amountError.textContent = validationError;

  if (validationError) {
    resultBox.textContent = "Invalid input";
  } else if (convertedVal !== null) {
    resultBox.textContent = `${state.amount} ETB = ${convertedVal} ${state.currency}`;
  } else {
    resultBox.textContent = "Enter an amount to see conversion.";
  }

  const isAlreadyInWatchlist = state.watchlist.includes(state.currency);
  addBtn.disabled = state.loading || state.error || isAlreadyInWatchlist;

  if (state.watchlist.length === 0) {
    watchlistContainer.innerHTML = `<p class="empty-state">Your watchlist is empty.</p>`;
  } else {
    watchlistContainer.innerHTML = state.watchlist
      .map(curr => {
        const rate = state.rates[curr] ? state.rates[curr].toFixed(4) : "—";
        return `
          <div class="watchlist-item">
            <div>
              <strong>1 ETB</strong> = ${rate} ${curr}
            </div>
            <button class="btn btn-danger" data-remove="${curr}">Remove</button>
          </div>
        `;
      })
      .join("");
  }
}

function setupEvents() {
 
  document.querySelector("#amount").addEventListener("input", (e) => {
    state.amount = e.target.value;
    render();
  });

  document.querySelector("#currency").addEventListener("change", (e) => {
    state.currency = e.target.value;
    saveStateToStorage();
    render();
  });

  document.querySelector("#add-watchlist-btn").addEventListener("click", () => {
    if (state.currency && !state.watchlist.includes(state.currency)) {
      state.watchlist.push(state.currency);
      saveStateToStorage();
      render();
    }
  });

  document.querySelector("#watchlist-container").addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.remove) {
      const codeToRemove = target.dataset.remove;
      state.watchlist = state.watchlist.filter(c => c !== codeToRemove);
      saveStateToStorage();
      render();
    }
  });
}

setupEvents();
fetchRates();