const orders=[{name:"shiro",price:120},
    {name:"tibs",price:400},
    
]
export const withVat=orders.price.map(p=>p*0.15);

