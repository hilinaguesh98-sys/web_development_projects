export const withVat = (amount) => {
    const rate = 0.15;
    return amount + amount * rate;
};

export const format = (amount) => {
    return `${amount} ETB`;
};

export const calculatePrice = (price, quantity) => {
    return price * quantity;
};

export const total = (amount) => {
    return amount.reduce((sum, { price, quantity }) => {
        return sum + calculatePrice(price, quantity);
    }, 0);
};
