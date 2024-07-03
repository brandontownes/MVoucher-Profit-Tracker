document.addEventListener("DOMContentLoaded", async function () {
  const { cardanoPrice, percentageGain,milkPrice } = await fetchPrices();
  fetchWalletInfo(cardanoPrice, percentageGain, milkPrice); 
});

async function fetchPrices() {
  const response = await fetch("/prices");
  const data = await response.json();
  const cardanoPrice = parseFloat(data.cardano.usd);
  const milkPrice = parseFloat(data["muesliswap-milk"].usd);
  
  // Calculate percentage gain or loss for current ADA price compared to Milk price
  const percentageGain = ((milkPrice - cardanoPrice) / cardanoPrice) * 100;

  // calcuate max. starting cash value  
  document.getElementById("cardanoPrice").textContent =
    `ADA $${data.cardano.usd}`;
  document.getElementById("milkPrice").textContent =
    `MILK/USD $${data["muesliswap-milk"].usd}`;
  document.getElementById("percentageGain").textContent = `${percentageGain.toFixed(2)}%`;

  return { cardanoPrice, percentageGain, milkPrice };
}
async function fetchWalletInfo(cardanoPrice, percentageGain, milkPrice) {
  const response = await fetch("/wallet");
  const data = await response.json();  
  console.log(data);

  // filter for a specific token and display its quantity
  const specificTokenUnit = "a2936e00439913f1ac105c29883c013322360247c409343028b831be4d564f5543484552"; // MVOUCHER asset_id
  const specificToken = data.amount.find(token => token.unit === specificTokenUnit);

  if (specificToken) {
    let walletBalance = (Number(specificToken.quantity) / 1000000).toFixed(5);
    document.getElementById("walletBalance").textContent =
      `Balance: ${walletBalance}`;

    let maxCashPrice = walletBalance * cardanoPrice;
    document.getElementById("maxCash").textContent =
      `$${(maxCashPrice).toFixed(3)}`;

    let maxGains = walletBalance * milkPrice;
    document.getElementById("maxGain").textContent =
      `$${(maxGains).toFixed(3)}`;

  }

}