const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 

for(let select of dropdowns) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD') {
            newOption.selected = currCode;
        }
        if(select.name === 'to' && currCode === 'INR') {
            newOption.selected = currCode;
        }
        select.append(newOption);
    }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        })
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <= 0) {
        amtVal = 1; 
        amount.value = "1";
    }
    // console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();
    let rate = data[from][to];
    let finalAmt = amtVal * rate;
    console.log(finalAmt);

    msg.innerText = `${amtVal} ${from.toUpperCase()} = ${finalAmt} ${to.toUpperCase()}`;


}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.document.addEventListener("load", () => {
    updateExchangeRate();
});

