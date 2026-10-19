const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");

initializeUserAccounts();

if (passwordInput && passwordToggle) {
    passwordToggle.addEventListener("click", () => {
        const isVisible = passwordInput.type === "text";
        passwordInput.type = isVisible ? "password" : "text";
        passwordToggle.setAttribute("aria-pressed", String(!isVisible));
        passwordToggle.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const message = document.getElementById("loginMessage");

        const users = getUsers();
        const account = users.find(user =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password &&
            (user.status || "Active") === "Active"
        );

        if (account) {
            account.lastLogin = new Date().toISOString();
            saveUsers(users);
            localStorage.setItem("cafeCoreThemePreference", "neon-light");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("loggedUser", account.username);
            window.location.href = "features.html";
        } else {
            message.textContent = "Invalid username or password, or this account is inactive.";
            message.style.color = "#b51f2d";
        }
    });
}

const loginButton = document.querySelector(".login-btn");

if (loginButton) {
    loginButton.addEventListener("pointermove", function (event) {
        const bounds = loginButton.getBoundingClientRect();
        loginButton.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        loginButton.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    });
}