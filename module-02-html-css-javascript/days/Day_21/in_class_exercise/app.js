const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const error = document.querySelector("#error");
const count = document.querySelector("#count");

const phoneRegex = /^(09|07)\d{8}$/;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    error.textContent = "";

    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    if (!phoneRegex.test(phone)) {
        error.textContent = "Enter a valid Ethiopian phone number.";
        return;
    }

    const entry = {
        name: name,
        phone: phone
    };

    const people = JSON.parse(localStorage.getItem("signups")) || [];
    people.push(entry);

    localStorage.setItem("signups", JSON.stringify(people));

    form.reset();
    showCount();
});

function showCount() {
    const people = JSON.parse(localStorage.getItem("signups")) || [];
    count.textContent = `${people.length} people have signed up.`;
}

showCount();