function vat(amount, rate = 0.15) {
    return amount + (amount * rate);
}
const vatArrow = (amount, rate = 0.15) => amount + (amount * rate);
console.log(vat(2000));       
console.log(vatArrow(2000));  
// 2

function makeCounter() {
    let count = 0; 

    return function () {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log(counter());
console.log(counter()); 
console.log(counter());
// 3

const discountBy = (rate) => (price) => price - (price * rate);
const memberPrice = discountBy(0.10); 
const salePrice = discountBy(0.30)
console.log(memberPrice(1000)); 
console.log(salePrice(1000));  

// 4

function applyToAll(list, fn) {
    return list.map(fn);
}
const prices = [100, 500, 1000, 2000];
const pricesWithVat = applyToAll(prices, vat);
console.log(pricesWithVat);

// 5
const cities = ["Addis Ababa","Mekelle","Bahir Dar", "Hawassa","Dire Dawa"];
cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});

