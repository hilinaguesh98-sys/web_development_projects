const out = document.querySelector("#facts");
const form = document.querySelector("#search-form");
const input = document.querySelector("#country");

function render(container, label, value) {
    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = `${label}: `;
    p.append(strong, value);
    container.appendChild(p);
}

async function showCountry(name) {
    out.textContent = "Loading…";

    try {
        const res = await fetch(
            `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(name)}`,
            {
                headers: {
                    "Authorization": "Bearer rc_live_9c08cf3a3d90493b9ae0e2ddc3edec3c"
                }
            }
        );

        if (!res.ok) {
            throw new Error("Country not found");
        }

        const data = await res.json();
        console.log(data);

        const c = data.data.objects[0];

        out.innerHTML = "";

        render(out, "Capital", c.capital?.[0]?.name || "N/A");
        render(out, "Population", c.population?.toLocaleString() || "N/A");
        render(out, "Region", c.region || "N/A");

        const currencies = Object.values(c.currencies || {})
            .map(currency => currency.name)
            .join(", ");

        render(out, "Currency", currencies || "N/A");

        const flag = document.createElement("img");
        flag.src = c.flag?.svg || c.flag?.png;
        flag.alt = `Flag of ${c.names.common}`;

        out.appendChild(flag);

    } catch (err) {
        out.textContent = "Country not found";
        console.error(err);
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();
    showCountry(input.value.trim());
});

showCountry("Ethiopia");