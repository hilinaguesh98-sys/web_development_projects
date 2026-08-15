async function getProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) { throw new Error(`HTTP ${response.status}`); }
         const data = await response.json();
         const firstTwo = data.products.slice(0, 2);
         const responses = await Promise.all(
            firstTwo.map(product =>fetch(`https://dummyjson.com/products/${product.id}`)));
            responses.forEach(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
        });
        const details = await Promise.all(
            responses.map(response => response.json())
        );
        render(details);
    } catch (err) {
        console.error(err);
    }}
function render(data) {
    console.log(data);
}
getProducts();