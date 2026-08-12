import { withVat, format, total } from "./pricing.js";
import { orders } from "./order.js";

const orderWithTotal = orders.map((order) => ({
    ...order,
    total: withVat(total(order.orderitem))
}));

const largeOrder = orderWithTotal.filter((order) => order.total > 500);

const overallTotal = orderWithTotal.reduce(
    (sum, order) => sum + order.total,
    0
);

orderWithTotal.forEach((order) => {
    console.log(
        `${order.orderid} - ${order.coustomername}: ${format(order.total)}`
    );
});

largeOrder.forEach((order) => {
    console.log(
        `Order ${order.orderid} - ${order.coustomername}: ${format(order.total)}`
    );
});

console.log(`Overall total is: ${format(overallTotal)}`);