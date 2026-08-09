function subtotal(...prices) {
    return prices.reduce((total, price) => total + price, 0);
}
function discountBy(rate) {
    return (amount) => amount * (1 - rate);
}
function withVat(amount, vatRate = 0.15) {
    return amount * (1 + vatRate);
}
function toETB(amount) {
    return `${amount.toFixed(2)} ETB`;
}
function makeReceiptMaker() {
    let orderNumber = 0;

    return (amount) => {
        orderNumber++;
        return `#${orderNumber}: ${toETB(amount)}`;
    };
}

module.exports = {subtotal,discountBy,withVat,toETB,makeReceiptMaker
};

const memberDiscount = discountBy(0.10);
const makeReceipt = makeReceiptMaker();
const order1 = withVat(memberDiscount(subtotal(400, 600, 200)));
const order2 = withVat(memberDiscount(subtotal(300, 500)));
const order3 = withVat(memberDiscount(subtotal(500, 100)));
console.log(makeReceipt(order1));
console.log(makeReceipt(order2));
console.log(makeReceipt(order3));
