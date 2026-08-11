
export const totalbytype=(txns,type)=>
    txns.filter(transaction=>transaction.type===type).reduce((sum,{amount})=>sum+amount,0);
export const createrecipts=(txns)=>
    txns.map(({customer,amount})=>`${customer}:${amount}ETB`)
export const correcttransaction=(transaction,newamount)=>({...transaction,amount:newamount});



