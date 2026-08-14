const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const error = document.getElementById("error");
const userCount = document.getElementById("userCount");

const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function updateUserCount() {
    const users = getUsers();
    userCount.textContent = users.length;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    error.textContent = "";

    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    if (!phoneRegex.test(phone)) {
        error.textContent = "Phone must match 09... or +2519....";
        return;
    }

    const users = getUsers();

    users.push({
        name: name,
        phone: phone
    });

    localStorage.setItem("users", JSON.stringify(users));

    form.reset();
    updateUserCount();
});

updateUserCount();