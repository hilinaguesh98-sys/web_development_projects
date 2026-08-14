const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const quantityInput = document.querySelector("#quantity");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const emptyMessage = document.querySelector("#empty-message");
const nameError = document.querySelector("#name-error");
const priceError = document.querySelector("#price-error");
const searchInput = document.querySelector("#search");
const filterInput = document.querySelector("#filter");
const totalItemsEl = document.querySelector("#total-items");
const boughtItemsEl = document.querySelector("#bought-items");
const remainingItemsEl = document.querySelector("#remaining-items");
const itemCountEl = document.querySelector("#item-count");
const progress = document.querySelector("#progress");
const progressText = document.querySelector("#progress-text");
const clearBoughtButton = document.querySelector("#clear-bought");
const clearAllButton = document.querySelector("#clear-all");

let items = [];
form.addEventListener("submit", (e) => { 
    e.preventDefault();
    clearErrors();
    const name = nameInput.value.trim();
    const price = Number(priceInput.value);
    const quantity = Number(quantityInput.value);
    if (!name) {
        showNameError(
            "❌ Please enter an item name." );
         return;
    }
    const validName = /^[A-Za-z\s]+$/.test(name);
        if (!validName) {
            showNameError(
            "❌ Please use letters only." );
            return;
    }
    if (name.length < 2) {
        showNameError("❌ Please enter at least 2 letters." );
        return;
    }
    if (!price || price <= 0) {
        showPriceError("❌ Please enter a valid price.");
        return;
    }
    if (!quantity || quantity < 1) {
        return;
    }
    const newItem = { id: Date.now(), name: name, price: price, quantity: quantity, bought: false };
    items.push(newItem);
    renderItems();
    updateStats();
    form.reset();
    quantityInput.value = 1;});
function showNameError(message) {
    nameError.textContent = message;
     nameError.classList.add("show");
     nameInput.classList.add("input-error");
}
function showPriceError(message) {
    priceError.textContent = message;
    priceError.classList.add("show");
    priceInput.classList.add("input-error");
}
function clearErrors() {
    nameError.textContent = "";
    nameError.classList.remove("show");
    nameInput.classList.remove("input-error");
    priceError.textContent = "";
    priceError.classList.remove("show");
    priceInput.classList.remove("input-error");
}
function renderItems() {
    list.innerHTML = "";
    const search =
    searchInput.value
            .toLowerCase()
            .trim();
    const filter = filterInput.value;
    const filteredItems =
        items.filter((item) => {
            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(search);
        let matchesFilter = true;
        if (filter === "bought") {
             matchesFilter =item.bought;
            }
        if (filter === "remaining") {
            matchesFilter =!item.bought;
            }
            return (matchesSearch && matchesFilter );
        });
        filteredItems.forEach((item) => {
            addRow(item);
        });
        if (filteredItems.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display ="none";
    }
}
function addRow(item) {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    if (item.bought) {
        li.classList.add("bought");
    }
    const itemInfo = document.createElement("div");
    itemInfo.className ="item-info";
     const itemName = document.createElement("div");
     itemName.className ="item-name";
     itemName.textContent = item.name;
     const details = document.createElement("div");
     details.className ="item-details";
     const itemPrice = document.createElement("span");
     itemPrice.className ="item-price";
     const itemTotal = item.price * item.quantity;
     itemPrice.textContent =`${itemTotal.toFixed(2)} ETB`;
     const quantity = document.createElement("span");
     quantity.className = "quantity";
     quantity.textContent = `x${item.quantity}`;
     details.append(itemPrice,quantity);
     itemInfo.append(itemName,details);
     const buttons = document.createElement("div");
     buttons.className = "item-buttons";
     const buyButton = document.createElement("button");
      buyButton.className ="buy-button";
      buyButton.type ="button";
      buyButton.dataset.action = "buy";
      buyButton.textContent ="✓ Buy";
      const deleteButton = document.createElement("button");
      deleteButton.className = "del";
      deleteButton.type ="button";
      deleteButton.dataset.action = "delete";
      deleteButton.textContent = "×";
      buttons.append(buyButton,deleteButton);
      li.append( itemInfo, buttons );
 list.append(li);
}
list.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    const li = e.target.closest("li");
    const id =Number(li.dataset.id);
    const item =items.find(
            (item) => item.id === id
        );
    if (!item) return;
    if (
        button.dataset.action === "buy"
    ) {
         item.bought = true;
        renderItems();
        updateStats();
        return;
    }
     if (
        button.dataset.action === "delete"
    ) {
        items = items.filter( (item) => item.id !== id );
         renderItems();
          updateStats();
    }
});
searchInput.addEventListener("input", renderItems);
filterInput.addEventListener("change", renderItems);
clearBoughtButton.addEventListener("click",() => {
     items =items.filter((item) => !item.bought);
     renderItems();
     updateStats();
    }
);
clearAllButton.addEventListener("click",() => {
    if (items.length === 0) {
            return;
        }
    const confirmed =confirm("Are you sure you want to clear everything?" );
    if (!confirmed) return;
     items = [];
      renderItems();
       updateStats();
    }
);
function updateStats() {
    const totalItems =items.reduce(
            (total, item) =>
                total + item.quantity,0 );
    const boughtItems =
        items.filter((item) => item.bought)
            .reduce((total, item) =>total + item.quantity,0);
    const remainingItems =totalItems - boughtItems;
    const totalCost =items.reduce((total, item) =>total +item.price *item.quantity,0);
    totalItemsEl.textContent =totalItems;
    boughtItemsEl.textContent =boughtItems;
    remainingItemsEl.textContent = remainingItems;
    totalEl.textContent = totalCost.toFixed(2);
    itemCountEl.textContent =`${items.length} ${
         items.length === 1 ? "item": "items"}`;
         
  let percentage = 0;
  if (totalItems > 0) {
    percentage = Math.round( (boughtItems / totalItems) * 100);}
progress.style.width =`${percentage}%`;
 progressText.textContent =`${percentage}%`;
}
renderItems();
updateStats();