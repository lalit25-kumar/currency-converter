const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

// Sample currency list
const currencyList = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD"];

currencyList.forEach(currency => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.text = option2.text = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

convertBtn.addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || isNaN(amount)) {
    result.textContent = "Please enter a valid amount";
    return;
  }

  // ✅ API Key & Dynamic URL
  const apiKey = "535115e6082bceb99759ed53"; // ← Yaha apni key rakho
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[to]; // ✅ Correct key is conversion_rates
      const convertedAmount = (amount * rate).toFixed(2);
      result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    })
    .catch(error => {
      console.error("Error fetching exchange rates:", error);
      result.textContent = "Error fetching exchange rate.";
    });
});
