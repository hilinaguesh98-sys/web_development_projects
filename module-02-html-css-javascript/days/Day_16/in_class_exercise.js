const bill= '3000';
const partysize=3;
const newbill=Number(bill);
let tip;
if(newbill>300){
    tip=newbill*0.1;
}
else{
    tip=newbill*0.05;
}
const totalbill=newbill+tip;
const billperperson=totalbill/partysize;
console.log(`Bill ${newbill} `);
console.log(`Tip ${tip}`);
console.log(`The total bill is ${totalbill} `);
console.log(`the bill per person is ${billperperson}`);
const paymentmethod='Telebirr';
let paymentfee;
switch(paymentmethod){
    case 'Telebirr':
        paymentfee=10;
        break
    case 'CBE Birr':
        paymentfee=5;
        break
    case 'Amole':
        paymentfee=15;
        break
    default:
        paymentfee=0;
}
const totalpayment=totalbill+paymentfee;
const paymentperperson=totalpayment/partysize;
console.log(`Service fee ${paymentfee}`);
console.log(`The total payment is ${totalpayment}`);
console.log(`the payment per person is ${paymentperperson}`);


// while i was practicing javascript, i made a program that calculates restaurant bill with tip and transaction fee between 4 people. it was supposed to show the correct total and how much each person should pay but the calculation was wrong because the bill was stored as a string instead of a number.

// The problem was by type conversion.i used typeof to check the value and realized it was a string so i fixed by converting it to a number with number() before calculating the total value. 

// const bill = "3000";

// const billAmount = Number(bill);

// console.log(billAmount * 0.1);

// after  that the program worked correctly this thought me to always  check the data type before doing calculations.
