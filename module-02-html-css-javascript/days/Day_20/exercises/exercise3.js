// wrong url
async function getExchangeRate(){
    try{
        const response=await fetch("https://this-api-does-not-exist-12345.com/data");
        console.log(response)
    }
    catch(err){
          console.error(err.message)
    }
}
getExchangeRate()

// real url
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