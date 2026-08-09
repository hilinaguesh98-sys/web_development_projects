const createLoyalty = require("./loyalty");
const card = createLoyalty();
card.earn(250); 
card.redeem(10); 
console.log("Normal card balance:", card.balance());
card.redeem(100);
console.log("After excessive redemption:", card.balance());
const holiday = createLoyalty(
    etb => Math.floor(etb / 10) * 2
);
holiday.earn(250); 
console.log("Holiday card balance:", holiday.balance());
const secondCard = createLoyalty();
secondCard.earn(100);
console.log("Second card balance:", secondCard.balance());
console.log("Holiday card still has:", holiday.balance());
