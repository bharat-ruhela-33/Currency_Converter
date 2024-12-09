const API_KEY = 'fca_live_D0xVtoFaZBeSA6f1fpCahOIMHeGYUQC4ghcNmLbh';
const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_D0xVtoFaZBeSA6f1fpCahOIMHeGYUQC4ghcNmLbh';

const dropdowns = document.querySelectorAll(".dropdown select");

const btn= document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

 
for (let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        select.append(newOption);
        newOption.innerText= currCode;
        if(select.name==="from" && currCode=== "USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode=== "INR"){
            newOption.selected="selected";
        }
        newOption.value= currCode;
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newsrc;
};
async function convertCurrency(fromCurr,toCurr,amount) {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Extract the rates
        const rates = data.data;
        console.log(rates);
        // Check if the base and target currencies exist
        if (!rates[fromCurr] || !rates[toCurr]) {
            throw new Error(`Conversion rate for ${fromCurr} or ${toCurr} not available.`);
        }
        
        // Calculate the conversion rate from "from" to "to"
        const rate = rates[toCurr] / rates[fromCurr];
        const convertedAmount = amount * rate;
        msg.innerHTML = `${amount} ${fromCurr} =${convertedAmount} ${toCurr}`

    }
               
    catch (error) {
        console.error('Error fetching conversion rates:', error.message);
    }
}
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if(amtVal=== "" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    convertCurrency(fromCurr.value,toCurr.value,amtVal);
    
})