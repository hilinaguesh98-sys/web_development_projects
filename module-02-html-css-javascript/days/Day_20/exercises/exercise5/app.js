const status = document.querySelector("#status");
const rate = document.querySelector("#rate");

async function getEtbRate() {
    status.textContent = "Loading…";
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        rate.textContent = `1 USD = ${data.rates.ETB} ETB`;
        status.textContent = "Exchange rate loaded successfully!";
    } catch (err) {
        status.textContent = "Sorry, we couldn't load the exchange rate.";
        console.error(err);
    }
}

getEtbRate();