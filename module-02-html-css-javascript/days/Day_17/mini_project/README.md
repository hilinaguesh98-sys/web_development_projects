TeleBirr Loyalty Points Module
 small JavaScript loyalty-points module that uses closures and higher-order functions to manage customer points.
Features
. Keeps the points balance private using a closure.
. Allows customers to earn points.
. Allows customers to redeem points.
. Prevents the balance from going below zero.
. Supports custom earn rules.
. Each loyalty card has its own independent balance.

How It Works
The module is created using the createLoyalty() factory function:
function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
    let points = 0;
    return {
        earn(etb) {
            points += earnRule(etb);
        },

        redeem(amount) {
            points = Math.max(0, points - amount);
        },

        balance() {
            return points;
        }
    };
}

Private Balance
The variable points is declared inside createLoyalty():

let points = 0;

Because points is inside the function, code outside the function cannot directly access it.

There is also no way to directly set:
card.points = 1000;
This does not change the private balance.
The only way to interact with the balance is through the functions returned by the closure:
card.earn(250);
card.redeem(10);
card.balance();
The returned functions remember the points variable even after createLoyalty() has finished executing. This is the behavior known as a closure.

Higher-Order Earn Rule
The earnRule parameter is a function:
function createLoyalty(
    earnRule = etb => Math.floor(etb / 10)
)

The default rule gives:
1 point for every 10 ETB
For example:
const card = createLoyalty();
card.earn(250);
console.log(card.balance());
The result is:
25
A different rule can be passed without changing the module:
const holiday = createLoyalty(
    etb => Math.floor(etb / 10) * 2
);
holiday.earn(250);
console.log(holiday.balance());
The result is:
50
This makes the module flexible because different earning rules can be swapped in.

Redeeming Points
The redeem() function prevents the balance from becoming negative:
redeem(amount) {
    points = Math.max(0, points - amount);
}
For example:
const card = createLoyalty();
card.earn(100);
card.redeem(50);
console.log(card.balance());
Result:
0
The customer cannot have a negative points balance.

Independent Cards
Every time createLoyalty() is called, a new private points variable is created.
const card1 = createLoyalty();
const card2 = createLoyalty();
card1.earn(200);card2.earn(100);
console.log(card1.balance()); 
console.log(card2.balance()); 
Result:
20
10
The two cards have separate balances.

Pure Calculations and Side Effects

The loyalty module itself does not use console.log().
Its functions only calculate and update the loyalty state:
earn()
redeem()
balance()
Console output is kept in the demo script, which is the edge of the program.