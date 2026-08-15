async function getExchangeRate(){
    try{
        const response=await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
        const data=await response.json();
        render(data)

    }
    catch(err){
          console.error(err)
    }
function render(data){
    console.log(data)
}
}
getExchangeRate()