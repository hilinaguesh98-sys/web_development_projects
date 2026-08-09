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


