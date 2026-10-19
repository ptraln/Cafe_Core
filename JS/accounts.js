function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function initializeUserAccounts() {
    const users = getUsers();
    let changed = false;
    if (!users.some(user => user.username.toLowerCase() === "admin")) {
        users.push({ id: "USR-admin", username: "admin", fullName: "Administrator", email: "", password: "admin123", role: "Admin", status: "Active", createdAt: new Date().toISOString(), lastLogin: "" });
        changed = true;
    }
    const defaultAccounts = [
        { id: "USR-driver", username: "driver", fullName: "Driver", email: "group4inventorysysdriver@gmail.com", password: "driver123", role: "Driver" },
        { id: "USR-manager", username: "manager", fullName: "Manager", email: "group4inventorysysmanager@gmail.com", password: "manager123", role: "Manager" },
        { id: "USR-employee", username: "employee", fullName: "Employee", email: "group4inventorysysemployee@gmail.com", password: "employee123", role: "Staff" }
    ];
    defaultAccounts.forEach(account => {
        if (users.some(user => user.username.toLowerCase() === account.username)) return;
        users.push({
            ...account,
            status: "Active",
            createdAt: new Date().toISOString(),
            lastLogin: ""
        });
        changed = true;
    });
    users.forEach(user => {
        if (!user.status) {
            user.status = "Active";
            changed = true;
        }
        if (typeof user.email !== "string") {
            user.email = "";
            changed = true;
        }
    });
    if (changed) {
        saveUsers(users);
    }
}

function getCurrentUser() {
    const username = localStorage.getItem("loggedUser");
    return getUsers().find(user => user.username === username) || null;
}

function escapeAccountHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}