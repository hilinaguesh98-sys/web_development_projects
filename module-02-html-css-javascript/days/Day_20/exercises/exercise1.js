async function getEtbRate() {
 const response = await fetch( "https://open.er-api.com/v6/latest/USD");
 if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
 const data = await response.json();
 return data.rates.ETB;
 }
 getEtbRate()
 .then(rate =>console.log(`1 USD is ${rate}`))
 .catch(error =>console.error(error));
