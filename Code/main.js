let rates = {};
let btcRate = 0;

// Fetch live fiat currency rates
async function fetchRates() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();
  rates = data.rates;
}

// Fetch Bitcoin rate
async function fetchBitcoinRate() {
  const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
  const data = await response.json();
  btcRate = 1 / data.bpi.USD.rate_float;
}

// Convert currency
async function convertCurrency(baseCurrency) {
  if (Object.keys(rates).length === 0) {
    await fetchRates();
    await fetchBitcoinRate();
  }

  let value;
  if (baseCurrency === "BTC") {
    value = document.getElementById("bitcoin").value;
    value = value / btcRate;
  } else {
    value = document.getElementById(baseCurrency.toLowerCase()).value;
    value = value / rates[baseCurrency];
  }

  if (!value) return;

  document.getElementById("usd").value = (value * rates.USD).toFixed(2);
  document.getElementById("euro").value = (value * rates.EUR).toFixed(2);
  document.getElementById("pound").value = (value * rates.GBP).toFixed(2);
  document.getElementById("cad").value = (value * rates.CAD).toFixed(2);
  document.getElementById("rupee").value = (value * rates.INR).toFixed(2);
  document.getElementById("bitcoin").value = (value * btcRate).toFixed(5);
}

// Clear fields
function reset() {
  document.querySelectorAll("input").forEach(input => input.value = "");
}

// Load rates on page load
fetchRates();
fetchBitcoinRate();
