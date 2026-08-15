const list = document.querySelector("#list");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const refresh = document.querySelector("#refresh");

async function load() {
    loading.textContent = "Loading...";
    error.textContent = "";
    list.innerHTML = "";

    try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (!data.meals) {
            throw new Error("No meals found");
        }

        data.meals.forEach(function(meal) {
            const li = document.createElement("li");
            li.textContent = meal.strMeal;
            list.appendChild(li);
        });
    } catch (err) {
        error.textContent = "Sorry, we couldn't load the dishes. Please try again.";
        console.error(err);
    } finally {
        loading.textContent = "";
    }
}

load();
refresh.addEventListener("click", load);