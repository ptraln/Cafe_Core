const ROLE_PERMISSIONS_KEY = "rolePermissions";
const appliedUserFilters = { role: "all", status: "all", search: "" };
const ROLE_NAMES = ["Admin", "Staff", "Driver", "Manager"];
const PERMISSION_LEVELS = ["Full Access", "View Only", "No Access"];
const SUB_FEATURE_PAGE_KEYS = ["users", "roles", "log"];
const INVENTORY_CATEGORIES_KEY = "inventoryCategories";
const INVENTORY_UNITS_KEY = "inventoryUnits";
const INVENTORY_SETTINGS_KEY = "inventorySettings";
const NOTIFICATION_PREFERENCES_KEY = "notificationPreferences";
const ANNOUNCEMENTS_KEY = "announcements";
const THEME_PREFERENCE_KEY = "cafeCoreThemePreference";
const PASSWORD_CHANGE_REQUESTS_KEY = "passwordChangeRequests";
const ADD_INVENTORY_CATEGORY_OPTION = "__add_new_category__";
const DEFAULT_INVENTORY_UNITS = ["pcs", "kg", "L", "packs", "boxes", "bottles"];
const SYSTEM_VERSION = "1.0.0";
const DEFAULT_INVENTORY_CATEGORIES = [
    { name: "Milk", emoji: "🥛" },
    { name: "Beans", emoji: "☕", label: "Coffee Beans" },
    { name: "Sugar", emoji: "🍬" },
    { name: "Syrups", emoji: "🍯" },
    { name: "Cups", emoji: "🥤" },
    { name: "Pearls", emoji: "🧋" },
    { name: "Powdered Flavors", emoji: "🍫" }
];
const SAMPLE_BUYERS = [
    ["BUY-sample-01", "Big Brew", "Sample Contact 1", "09000010001"],
    ["BUY-sample-02", "Starbucks", "Sample Contact 2", "09000010002"],
    ["BUY-sample-03", "Kapehan Central", "Sample Contact 3", "09000010003"],
    ["BUY-sample-04", "Brew District Cafe", "Sample Contact 4", "09000010004"],
    ["BUY-sample-05", "Daily Grind Coffee", "Sample Contact 5", "09000010005"],
    ["BUY-sample-06", "Bean There Cafe", "Sample Contact 6", "09000010006"],
    ["BUY-sample-07", "Tambayan Coffee House", "Sample Contact 7", "09000010007"],
    ["BUY-sample-08", "Moonlight Cafe", "Sample Contact 8", "09000010008"],
    ["BUY-sample-09", "Northside Cafe", "Sample Contact 9", "09000010009"],
    ["BUY-sample-10", "Sunrise Brew Cafe", "Sample Contact 10", "09000010010"]
].map(([id, name, contact, phone], index) => ({
    id,
    name,
    contact,
    phone,
    email: `buyer${index + 1}@example.com`,
    status: "Active"
}));
const SAMPLE_SUPPLIERS = [
    ["SUP-sample-01", "Fresh Dairy Supply Demo", "Milk"],
    ["SUP-sample-02", "Premium Coffee Traders Demo", "Coffee Beans"],
    ["SUP-sample-03", "Sweet Supply Co. Demo", "Sugar"],
    ["SUP-sample-04", "Flavor House Demo", "Syrups"],
    ["SUP-sample-05", "Cafe Packaging PH Demo", "Cups"],
    ["SUP-sample-06", "Bubble Supply Demo", "Pearls"],
    ["SUP-sample-07", "Cocoa & Cream Depot", "Powdered Flavors"],
    ["SUP-sample-08", "Metro Beverage Ingredients", "Syrups"],
    ["SUP-sample-09", "Harvest Valley Foods", "Sugar"],
    ["SUP-sample-10", "CupWorks Packaging", "Cups"]
].map(([id, name, category], index) => ({
    id,
    name,
    contact: `Sample Contact ${index + 1}`,
    phone: `090000200${String(index + 1).padStart(2, "0")}`,
    email: `supplier${index + 1}@example.com`,
    category,
    status: "Active"
}));
const SAMPLE_STOCKS = [
    ["STK-sample-01", "Oat Milk", "Milk", 24, "L", 8, "Fresh Dairy Supply Demo"],
    ["STK-sample-02", "Robusta Coffee Beans", "Beans", 18, "kg", 5, "Premium Coffee Traders Demo"],
    ["STK-sample-03", "Brown Sugar", "Sugar", 30, "kg", 10, "Sweet Supply Co. Demo"],
    ["STK-sample-04", "Caramel Syrup", "Syrups", 12, "bottles", 4, "Flavor House Demo"],
    ["STK-sample-05", "16oz Paper Cups", "Cups", 100, "pcs", 25, "Cafe Packaging PH Demo"],
    ["STK-sample-06", "Coffee Jelly", "Pearls", 15, "packs", 5, "Bubble Supply Demo"],
    ["STK-sample-07", "Chocolate Powder", "Powdered Flavors", 10, "kg", 3, "Cocoa & Cream Depot"],
    ["STK-sample-08", "Condensed Milk", "Milk", 20, "cans", 6, "Fresh Dairy Supply Demo"],
    ["STK-sample-09", "Matcha Powder", "Powdered Flavors", 8, "kg", 2, "Cocoa & Cream Depot"],
    ["STK-sample-10", "Strawberry Syrup", "Syrups", 9, "bottles", 3, "Metro Beverage Ingredients"],
    ["STK-sample-11", "Chocolate Syrup", "Syrups", 2, "bottles", 10, "Metro Beverage Ingredients"],
    ["STK-sample-12", "Fresh Milk", "Milk", 3, "L", 10, "Fresh Dairy Supply Demo"],
    ["STK-sample-13", "Arabica Coffee Beans", "Beans", 2, "kg", 8, "Premium Coffee Traders Demo"],
    ["STK-sample-14", "White Sugar", "Sugar", 4, "kg", 12, "Sweet Supply Co. Demo"],
    ["STK-sample-15", "Tapioca Pearls", "Pearls", 2, "packs", 8, "Bubble Supply Demo"],
    ["STK-sample-16", "12oz Paper Cups", "Cups", 10, "pcs", 50, "Cafe Packaging PH Demo"]
].map(([id, name, category, quantity, unit, minimum, supplier]) => ({
    id,
    name,
    category,
    quantity,
    unit,
    minimum,
    supplier
}));
const SAMPLE_SHIPMENTS = [
    ["SHP-sample-01", "SHP-1001", "Incoming", "Oat Milk", "Fresh Dairy Supply Demo", "Big Brew", 24, "2026-10-01", "Delivered"],
    ["SHP-sample-02", "SHP-1002", "Incoming", "Robusta Coffee Beans", "Premium Coffee Traders Demo", "Starbucks", 12, "2026-10-02", "In Transit"],
    ["SHP-sample-03", "SHP-1003", "Incoming", "Brown Sugar", "Sweet Supply Co. Demo", "Brew District Cafe", 20, "2026-10-03", "Pending"],
    ["SHP-sample-04", "SHP-1004", "Incoming", "Caramel Syrup", "Flavor House Demo", "Daily Grind Coffee", 8, "2026-10-04", "Delivered"],
    ["SHP-sample-05", "SHP-1005", "Incoming", "16oz Paper Cups", "Cafe Packaging PH Demo", "Bean There Cafe", 50, "2026-10-05", "In Transit"],
    ["SHP-sample-06", "SHP-1006", "Outgoing", "Coffee Jelly", "Tambayan Coffee House", "Big Brew", 6, "2026-10-01", "Delivered"],
    ["SHP-sample-07", "SHP-1007", "Outgoing", "Chocolate Powder", "Moonlight Cafe", "Starbucks", 4, "2026-10-02", "In Transit"],
    ["SHP-sample-08", "SHP-1008", "Outgoing", "Condensed Milk", "Northside Cafe", "Brew District Cafe", 10, "2026-10-03", "Pending"],
    ["SHP-sample-09", "SHP-1009", "Outgoing", "Matcha Powder", "Sunrise Brew Cafe", "Daily Grind Coffee", 3, "2026-10-04", "Delivered"],
    ["SHP-sample-10", "SHP-1010", "Outgoing", "Strawberry Syrup", "Kapehan Central", "Bean There Cafe", 5, "2026-10-05", "Pending"]
].map(([id, tracking, type, supply, supplier, buyer, quantity, date, status]) => ({
    id,
    tracking,
    type,
    supply,
    supplier: type === "Incoming" ? supplier : buyer,
    quantity,
    date,
    status,
    assignedDriverId: type === "Outgoing" ? "USR-driver" : "",
    assignedDriver: type === "Outgoing" ? "Driver" : "",
    ...(type === "Outgoing" && status === "Delivered" ? { deliveredAt: `${date}T15:00:00.000Z` } : {}),
    ...(status === "In Transit" ? { startedAt: `${date}T09:00:00.000Z` } : {})
}));
const ROLE_PERMISSION_PAGES = [
    { key: "dashboard", label: "Dashboard / My Deliveries" },
    { key: "driver-history", label: "Delivery History" },
    { key: "stocks", label: "Stocks & Supplies" },
    { key: "shipment", label: "Shipment Tracker" },
    { key: "suppliers", label: "Suppliers" },
    { key: "buyers", label: "Buyers" },
    { key: "reports", label: "Low Stocks" },
    { key: "users", label: "User Role Management" },
    { key: "roles", label: "Role Permissions" },
    { key: "log", label: "Log Update" }
];

function getDefaultRolePermissions() {
    return Object.fromEntries(ROLE_PERMISSION_PAGES.map(({ key }) => [
        key,
        {
            Admin: "Full Access",
            Staff: ["users", "roles", "log"].includes(key) ? "No Access" : "Full Access",
            Driver: ["dashboard", "driver-history"].includes(key) ? "Full Access" : key === "stocks" ? "View Only" : "No Access",
            Manager: ["users", "roles"].includes(key) ? "No Access" : key === "log" ? "View Only" : "Full Access"
        }
    ]));
}

function getRoleDisplayName(role) {
    return role === "Staff" ? "Employee" : role;
}

function getRolePermissions() {
    const defaults = getDefaultRolePermissions();
    const stored = localStorage.getItem(ROLE_PERMISSIONS_KEY);
    if (!stored) return defaults;

    try {
        const saved = JSON.parse(stored);
        ROLE_PERMISSION_PAGES.forEach(({ key }) => {
            ROLE_NAMES.forEach(role => {
                const value = saved?.[key]?.[role];
                if (PERMISSION_LEVELS.includes(value)) defaults[key][role] = value;
            });
        });
    } catch (error) {
        console.error("Unable to read saved role permissions.", error);
    }
    ["users", "roles", "log"].forEach(key => {
        if (defaults[key]) defaults[key].Driver = "No Access";
    });
    ["users", "roles"].forEach(key => {
        if (defaults[key]) defaults[key].Manager = "No Access";
    });
    if (defaults.log) defaults.log.Manager = "View Only";
    return defaults;
}

function saveRolePermissions(permissions) {
    const previous = getRolePermissions();
    localStorage.setItem(ROLE_PERMISSIONS_KEY, JSON.stringify(permissions));
    const changes = ROLE_PERMISSION_PAGES.flatMap(({ key, label }) => ROLE_NAMES
        .filter(role => previous[key][role] !== permissions[key][role])
        .map(role => `${label} · ${getRoleDisplayName(role)}: ${previous[key][role]} → ${permissions[key][role]}`));
    if (changes.length) {
        recordSystemActivity("Updated", "Role Permissions", changes.join("; "));
    }
}

function getPagePermission(pageKey, role = getCurrentUser()?.role) {
    if (!role || !ROLE_NAMES.includes(role)) return "No Access";
    if (SUB_FEATURE_PAGE_KEYS.includes(pageKey) && role === "Driver") return "No Access";
    if (["users", "roles"].includes(pageKey) && role === "Manager") return "No Access";
    if (pageKey === "log" && role === "Manager") return "View Only";
    return getRolePermissions()[pageKey]?.[role] || "No Access";
}

function canAccessPage(pageKey, role = getCurrentUser()?.role) {
    return getPagePermission(pageKey, role) !== "No Access";
}

function canManagePage(pageKey) {
    return getPagePermission(pageKey) === "Full Access";
}

function setupRolePermissionsPage() {
    const rows = document.getElementById("rolePermissionsRows");
    const editButton = document.getElementById("editPermissionsButton");
    const cancelButton = document.getElementById("cancelPermissionsButton");
    const saveButton = document.getElementById("savePermissionsButton");
    if (!rows || !editButton || !cancelButton || !saveButton) return;

    let editing = false;

    const renderRows = () => {
        const permissions = getRolePermissions();
        rows.innerHTML = ROLE_PERMISSION_PAGES.map(({ key, label }) => `
            <tr data-permission-page="${key}">
                <td>${label}</td>
                ${ROLE_NAMES.map(role => {
                    const value = getPagePermission(key, role);
                    const disabled = SUB_FEATURE_PAGE_KEYS.includes(key) && ["Driver", "Manager"].includes(role);
                    return `<td>${editing
                        ? `<select class="permission-select" data-permission-role="${role}" aria-label="${label} access for ${getRoleDisplayName(role)}"${disabled ? " disabled" : ""}>${PERMISSION_LEVELS.map(level => `<option value="${level}"${value === level ? " selected" : ""}>${level}</option>`).join("")}</select>`
                        : `<span class="permission-value permission-value-${value.toLowerCase().replace(" ", "-")}">${value}</span>`}</td>`;
                }).join("")}
            </tr>
        `).join("");
        editButton.hidden = editing || !canManagePage("roles");
        cancelButton.hidden = !editing;
        saveButton.hidden = !editing;
        rows.closest(".permissions-panel").classList.toggle("permissions-editing", editing);
    };

    editButton.addEventListener("click", () => {
        if (!canManagePage("roles")) return;
        editing = true;
        renderRows();
    });
    cancelButton.addEventListener("click", () => {
        editing = false;
        renderRows();
    });
    saveButton.addEventListener("click", () => {
        if (!canManagePage("roles")) return;

        const permissions = getRolePermissions();
        rows.querySelectorAll("[data-permission-page]").forEach(row => {
            const key = row.dataset.permissionPage;
            row.querySelectorAll(".permission-select").forEach(select => {
                permissions[key][select.dataset.permissionRole] = select.value;
            });
        });

        if (ROLE_PERMISSION_PAGES.some(({ key }) => permissions[key].Admin !== "Full Access")) {
            window.alert("Admin access must remain Full Access.");
            return;
        }
        if (!window.confirm("Save these role permission changes?")) return;

        saveRolePermissions(permissions);
        editing = false;
        renderRows();
        setupRoleNavigation();
        renderStocks();
        renderShipments();
        renderSuppliers();
        renderBuyers();
        enforceCurrentPageAccess();
    });

    renderRows();
}

function enforceCurrentPageAccess() {
    const currentPage = document.querySelector(".app-page:not([hidden])")?.dataset.page;
    const accessDeniedPanel = document.getElementById("accessDeniedPanel");
    if (currentPage && canAccessPage(currentPage)) {
        accessDeniedPanel.hidden = true;
        return;
    }
    const firstAllowed = Array.from(document.querySelectorAll("#mainNavigation [data-nav]"))
        .find(link => canAccessPage(link.dataset.nav));
    if (firstAllowed) {
        showAppPage(firstAllowed.dataset.nav);
        return;
    }

    document.querySelectorAll(".app-page").forEach(page => { page.hidden = true; });
    document.querySelectorAll("#mainNavigation .nav-link").forEach(link => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
        link.setAttribute("aria-expanded", "false");
    });
    accessDeniedPanel.hidden = false;
}

function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true" && !window.location.pathname.endsWith("login.html")) {
        window.location.href = "login.html";
        return;
    }

    if (isLoggedIn === "true") {
        const currentUser = getCurrentUser();
        if (!currentUser || (currentUser.status || "Active") !== "Active") {
            logout();
        }
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
}

function setupSidebarToggle() {
    const sidebar = document.querySelector(".sidebar");
    const toggle = document.querySelector(".sidebar-logo-toggle");
    if (!sidebar || !toggle) return;

    const isExpanded = localStorage.getItem("sidebarExpanded") === "true";
    sidebar.classList.toggle("expanded", isExpanded);
    toggle.setAttribute("aria-expanded", String(isExpanded));
    toggle.setAttribute("aria-label", isExpanded ? "Close navigation" : "Open navigation");

    toggle.addEventListener("click", () => {
        const expanded = sidebar.classList.toggle("expanded");
        localStorage.setItem("sidebarExpanded", String(expanded));
        toggle.setAttribute("aria-expanded", String(expanded));
        toggle.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
    });
}

function setupRoleNavigation() {
    const user = getCurrentUser();
    const nav = document.getElementById("mainNavigation");
    if (!nav || !user) return;

    const featureDefinitions = [
        { key: "dashboard", icon: user.role === "Driver" ? "⇄" : "▣", label: user.role === "Driver" ? "My Deliveries" : "Dashboard" },
        ...(user.role === "Driver" ? [{ key: "driver-history", icon: "◷", label: "Delivery History" }] : []),
        { key: "stocks", icon: "▤", label: "Stocks & Supplies" },
        { key: "shipment", icon: "⇄", label: "Shipment Tracker" },
        { key: "suppliers", icon: "♜", label: "Suppliers" },
        { key: "buyers", icon: "♙", label: "Buyers" },
        {
            key: "reports",
            icon: "⚠",
            label: "Low Stocks",
            count: getLowStockItems().length
        }
    ];
    const subFeatureDefinitions = user.role === "Driver" ? [] : [
        { key: "users", icon: "♙", label: "User Role Management" },
        { key: "roles", icon: "▤", label: "Role Permissions" },
        { key: "log", icon: "▧", label: "Log Update" }
    ].filter(feature => canAccessPage(feature.key));

    const allowedFeatures = featureDefinitions.filter(feature => canAccessPage(feature.key));
    const createSection = (className, title, definitions) => {
        const section = document.createElement("div");
        section.className = `nav-section ${className}`;
        const heading = document.createElement("h2");
        heading.className = "nav-section-title";
        heading.textContent = title;
        section.appendChild(heading);

        definitions.forEach(({ key, icon, label, count }) => {
            const link = document.createElement("a");
            link.href = "#";
            link.className = "nav-link";
            link.dataset.nav = key;
            link.innerHTML = `<span>${icon}</span>${label}${count ? ` <small class="nav-count">${count}</small>` : ""}`;
            section.appendChild(link);
        });
        return section;
    };

    nav.replaceChildren();
    nav.appendChild(createSection("nav-features", "Features", allowedFeatures));
    if (subFeatureDefinitions.length) {
        nav.appendChild(createSection("nav-subfeatures", "Sub Feature", subFeatureDefinitions));
    }

    const currentPage = document.querySelector(".app-page:not([hidden])");
    if (currentPage) {
        const currentKey = currentPage.dataset.page;
        const currentLink = nav.querySelector(`[data-nav="${currentKey}"]`);
        currentLink?.classList.add("active");
        currentLink?.setAttribute("aria-current", "page");
        currentLink?.setAttribute("aria-expanded", "true");
    }
}

function setupFeatureNavigation() {
    const nav = document.getElementById("mainNavigation");
    if (!nav || nav.dataset.featureToggleBound === "true") return;
    nav.dataset.featureToggleBound = "true";
    document.addEventListener("click", event => {
        const link = event.target instanceof Element ? event.target.closest("[data-nav]") : null;
        if (!link) return;
        const key = link.dataset.nav;
        if (!key) return;
        event.preventDefault();
        showAppPage(key);
    });
}

function setupFilterPanelToggles() {
    document.querySelectorAll(".filter-toggle-btn[aria-controls]").forEach(button => {
        const panel = document.getElementById(button.getAttribute("aria-controls"));
        if (!panel) return;

        const syncExpandedState = () => button.setAttribute("aria-expanded", String(panel.open));
        button.addEventListener("click", () => {
            panel.open = !panel.open;
            syncExpandedState();
        });
        panel.addEventListener("toggle", syncExpandedState);
        syncExpandedState();
    });
}

function setupFeaturePageToolbars() {
    const toolbarTargets = [
        ["#page-stocks .feature-page-actions", "#page-stocks .table-toolbar"],
        ["#page-shipment .feature-page-actions", "#page-shipment .table-toolbar"],
        ["#page-suppliers .feature-page-actions", "#supplierFeatureToolbar"],
        ["#page-users .feature-page-actions", "#page-users .user-table-toolbar"]
    ];

    toolbarTargets.forEach(([actionsSelector, toolbarSelector]) => {
        const actions = document.querySelector(actionsSelector);
        const toolbar = document.querySelector(toolbarSelector);
        if (actions && toolbar) toolbar.appendChild(actions);
    });
}

function showAppPage(key) {
    const target = document.querySelector(`.app-page[data-page="${key}"]`);
    const user = getCurrentUser();
    if (!target || !user) return;

    if (!canAccessPage(key)) return;

    if (!target.hidden) return;

    document.getElementById("accessDeniedPanel").hidden = true;
    document.querySelectorAll(".app-page").forEach(page => {
        page.hidden = page !== target;
    });

    document.querySelectorAll("#mainNavigation .nav-link").forEach(link => {
        const active = link.dataset.nav === key;
        link.classList.toggle("active", active);
        if (active) {
            link.setAttribute("aria-expanded", "true");
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
            link.setAttribute("aria-expanded", "false");
        }
    });

    if (key === "users") renderAccountManagement();
    if (key === "log") renderActivityLog();
    window.scrollTo(0, 0);
}

function getStocks() {
    return JSON.parse(localStorage.getItem("stocks")) || [];
}

function getShipments() {
    return JSON.parse(localStorage.getItem("shipments")) || [];
}

function getSuppliers() {
    return JSON.parse(localStorage.getItem("suppliers")) || [];
}

function getBuyers() {
    return JSON.parse(localStorage.getItem("buyers")) || [];
}

function normalizeInventoryCategory(name) {
    const normalized = String(name || "").trim().toLowerCase();
    return normalized === "beans" ? "coffee beans" : normalized;
}

function getInventoryCategories() {
    const saved = JSON.parse(localStorage.getItem(INVENTORY_CATEGORIES_KEY) || "[]");
    const overrides = new Map(saved.filter(category => category.baseName).map(category => [category.baseName, category]));
    const categories = DEFAULT_INVENTORY_CATEGORIES
        .filter(category => !overrides.get(category.name)?.deleted)
        .map(category => {
            const override = overrides.get(category.name);
            return override ? { ...category, ...override, name: override.name || category.name } : { ...category };
        });
    const names = new Set(categories.map(category => category.name.toLowerCase()));

    saved.forEach(category => {
        const name = String(category.name || "").trim();
        if (!name || category.baseName || names.has(name.toLowerCase())) return;
        categories.push({ name, emoji: String(category.emoji || "📦") });
        names.add(name.toLowerCase());
    });

    getStocks().forEach(item => {
        const name = String(item.category || "").trim();
        if (!name || categories.some(category => normalizeInventoryCategory(category.name) === normalizeInventoryCategory(name))) return;
        categories.push({ name, emoji: "📦" });
    });

    return categories;
}

function getInventoryUnits() {
    const saved = JSON.parse(localStorage.getItem(INVENTORY_UNITS_KEY) || "[]")
        .map(unit => typeof unit === "string" ? { unit: unit.trim() } : unit)
        .filter(item => item && typeof item.unit === "string");
    const overrides = new Map(saved.filter(item => item.baseUnit).map(item => [item.baseUnit, item]));
    const units = DEFAULT_INVENTORY_UNITS
        .filter(unit => !overrides.get(unit)?.deleted)
        .map(unit => overrides.get(unit)?.unit || unit);
    saved.forEach(item => {
        if (!item.unit || item.baseUnit || units.some(unit => unit.toLowerCase() === item.unit.toLowerCase())) return;
        units.push(item.unit);
    });
    return Array.from(new Set(units));
}

function getInventorySettings() {
    const saved = JSON.parse(localStorage.getItem(INVENTORY_SETTINGS_KEY) || "{}");
    const threshold = Number(saved.lowStockThreshold);
    return { lowStockThreshold: Number.isFinite(threshold) && threshold >= 0 ? threshold : 10 };
}

function getNotificationPreferences(user = getCurrentUser()) {
    const preferences = JSON.parse(localStorage.getItem(NOTIFICATION_PREFERENCES_KEY) || "{}");
    return preferences[user?.id] || { lowStockAlerts: true, shipmentUpdates: true };
}

function getAnnouncements() {
    return JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY) || "[]");
}

function populateInventoryCategorySelects() {
    const categories = getInventoryCategories();
    const selects = [
        [document.getElementById("stockCategory"), ""],
        [document.getElementById("stockCategoryFilter"), "all"],
        [document.getElementById("supplierCategory"), ""],
        [document.getElementById("supplierCategoryFilter"), "all"]
    ];

    selects.forEach(([select, allValue]) => {
        if (!select) return;
        const selectedValue = select.value;
        const options = allValue
            ? [new Option("All Categories", allValue)]
            : [new Option("Select category", "")];
        categories.forEach(category => {
            options.push(new Option(category.label || category.name, category.name));
        });
        if (select.id === "stockCategory") {
            options.push(new Option("+ Add New Category", ADD_INVENTORY_CATEGORY_OPTION));
        }
        if (select.id === "supplierCategory" || select.id === "supplierCategoryFilter") {
            getSuppliers().forEach(supplier => {
                const name = String(supplier.category || "").trim();
                if (name && !categories.some(category => category.name === name)) {
                    options.push(new Option(name, name));
                }
            });
        }
        select.replaceChildren(...options);
        if (Array.from(select.options).some(option => option.value === selectedValue)) {
            select.value = selectedValue;
        }
    });
}

function populateInventoryUnitSelect() {
    const select = document.getElementById("stockUnit");
    if (!select) return;
    const selectedValue = select.value;
    select.replaceChildren(...getInventoryUnits().map(unit => new Option(unit, unit)));
    if (Array.from(select.options).some(option => option.value === selectedValue)) {
        select.value = selectedValue;
    }
}

function renderAdminInventorySettings() {
    const categoryList = document.getElementById("settingsCategoryList");
    const unitList = document.getElementById("settingsUnitList");
    if (!categoryList || !unitList) return;

    categoryList.innerHTML = getInventoryCategories().map(category => `
        <li class="settings-managed-item">
            <span>${escapeAccountHtml(category.emoji)} ${escapeAccountHtml(category.label || category.name)}</span>
            <span class="settings-item-actions">
                <button type="button" class="action-btn" data-settings-action="edit-category" data-category-name="${escapeAccountHtml(category.name)}">Edit</button>
                <button type="button" class="action-btn delete-btn" data-settings-action="delete-category" data-category-name="${escapeAccountHtml(category.name)}">Delete</button>
            </span>
        </li>
    `).join("");
    unitList.innerHTML = getInventoryUnits().map(unit => `
        <li class="settings-managed-item">
            <span>${escapeAccountHtml(unit)}</span>
            <span class="settings-item-actions">
                <button type="button" class="action-btn" data-settings-action="edit-unit" data-unit-name="${escapeAccountHtml(unit)}">Edit</button>
                <button type="button" class="action-btn delete-btn" data-settings-action="delete-unit" data-unit-name="${escapeAccountHtml(unit)}">Delete</button>
            </span>
        </li>
    `).join("");
}

function saveAdminInventorySettings(event) {
    event.preventDefault();
    if (!isCurrentUserAdmin()) return;
    const threshold = Number(document.getElementById("defaultLowStockThreshold").value);
    const feedback = document.getElementById("adminSettingsFeedback");
    if (!Number.isFinite(threshold) || threshold < 0) {
        feedback.textContent = "Enter a valid minimum quantity of zero or more.";
        return;
    }

    localStorage.setItem(INVENTORY_SETTINGS_KEY, JSON.stringify({ lowStockThreshold: threshold }));
    feedback.textContent = "Inventory settings saved.";
    document.getElementById("stockMinimum").value = String(threshold);
    renderStocks();
    renderLowStocksPage();
    loadDashboard();
    updateNotificationBadge();
}

function addSettingsCategory(event) {
    event.preventDefault();
    if (!isCurrentUserAdmin()) return;
    const nameInput = document.getElementById("settingsNewCategoryName");
    const emojiInput = document.getElementById("settingsNewCategoryEmoji");
    const feedback = document.getElementById("adminSettingsFeedback");
    const name = nameInput.value.trim();
    const emoji = emojiInput.value.trim();
    if (!name || !emoji) {
        feedback.textContent = "Enter both a category name and emoji.";
        return;
    }
    if (getInventoryCategories().some(category =>
        normalizeInventoryCategory(category.name) === normalizeInventoryCategory(name)
    )) {
        feedback.textContent = "That category already exists.";
        return;
    }
    const categories = JSON.parse(localStorage.getItem(INVENTORY_CATEGORIES_KEY) || "[]");
    categories.push({ name, emoji });
    localStorage.setItem(INVENTORY_CATEGORIES_KEY, JSON.stringify(categories));
    nameInput.value = "";
    emojiInput.value = "";
    feedback.textContent = `${name} category added.`;
    populateInventoryCategorySelects();
    renderAdminInventorySettings();
    loadDashboard();
}

function addSettingsUnit(event) {
    event.preventDefault();
    if (!isCurrentUserAdmin()) return;
    const input = document.getElementById("settingsNewUnit");
    const unit = input.value.trim();
    const feedback = document.getElementById("adminSettingsFeedback");
    if (!unit) {
        feedback.textContent = "Enter a unit name.";
        return;
    }
    if (getInventoryUnits().some(item => item.toLowerCase() === unit.toLowerCase())) {
        feedback.textContent = "That unit already exists.";
        return;
    }
    const units = JSON.parse(localStorage.getItem(INVENTORY_UNITS_KEY) || "[]");
    units.push(unit);
    localStorage.setItem(INVENTORY_UNITS_KEY, JSON.stringify(units));
    input.value = "";
    feedback.textContent = `${unit} unit added.`;
    populateInventoryUnitSelect();
    renderAdminInventorySettings();
}

function handleAdminSettingsListAction(event) {
    if (!isCurrentUserAdmin()) return;
    const button = event.target.closest("[data-settings-action]");
    if (!button) return;
    const action = button.dataset.settingsAction;
    const categories = JSON.parse(localStorage.getItem(INVENTORY_CATEGORIES_KEY) || "[]");

    if (action === "edit-category") {
        const name = button.dataset.categoryName;
        const category = getInventoryCategories().find(item => item.name === name);
        if (!category) return;
        const baseCategory = DEFAULT_INVENTORY_CATEGORIES.find(item => item.name === name);
        const storedCategory = categories.find(item => item.name === name) ||
            categories.find(item => item.baseName === name);
        const updatedName = window.prompt("Category name", category.name)?.trim();
        if (!updatedName) return;
        const updatedEmoji = window.prompt("Dashboard emoji", category.emoji || "📦")?.trim();
        if (!updatedEmoji) return;
        if (getInventoryCategories().some(item =>
            item.name !== name && normalizeInventoryCategory(item.name) === normalizeInventoryCategory(updatedName)
        )) {
            document.getElementById("adminSettingsFeedback").textContent = "That category name already exists.";
            return;
        }
        const oldName = category.name;
        const updatedCategory = {
            ...(storedCategory || {}),
            ...(baseCategory ? { baseName: baseCategory.name } : {}),
            name: updatedName,
            label: updatedName,
            emoji: updatedEmoji,
            deleted: false
        };
        if (storedCategory) categories[categories.indexOf(storedCategory)] = updatedCategory;
        else categories.push(updatedCategory);
        localStorage.setItem(INVENTORY_CATEGORIES_KEY, JSON.stringify(categories));
        ["stocks", "suppliers"].forEach(key => {
            const records = JSON.parse(localStorage.getItem(key) || "[]");
            records.forEach(item => {
                if (normalizeInventoryCategory(item.category) === normalizeInventoryCategory(oldName)) item.category = updatedName;
            });
            localStorage.setItem(key, JSON.stringify(records));
        });
        populateInventoryCategorySelects();
        renderAdminInventorySettings();
        renderStocks();
        renderSuppliers();
        loadDashboard();
        return;
    }

    if (action === "delete-category") {
        const name = button.dataset.categoryName;
        const inUse = ["stocks", "suppliers"].some(key =>
            JSON.parse(localStorage.getItem(key) || "[]").some(item =>
                normalizeInventoryCategory(item.category) === normalizeInventoryCategory(name)
            )
        );
        if (inUse) {
            document.getElementById("adminSettingsFeedback").textContent = "This category is used by a product or supplier. Reassign them before deleting it.";
            return;
        }
        if (!window.confirm(`Delete category "${name}"?`)) return;
        const baseCategory = DEFAULT_INVENTORY_CATEGORIES.find(item => item.name === name);
        const storedCategory = categories.find(item => item.name === name) ||
            categories.find(item => item.baseName === name);
        if (baseCategory) {
            if (storedCategory) Object.assign(storedCategory, { name: "", deleted: true, baseName: baseCategory.name });
            else categories.push({ name: "", deleted: true, baseName: baseCategory.name });
            localStorage.setItem(INVENTORY_CATEGORIES_KEY, JSON.stringify(categories));
        } else {
            localStorage.setItem(INVENTORY_CATEGORIES_KEY, JSON.stringify(categories.filter(item => item.name !== name)));
        }
    } else if (action === "edit-unit") {
        const oldUnit = button.dataset.unitName;
        const updatedUnit = window.prompt("Unit name", oldUnit)?.trim();
        if (!updatedUnit || updatedUnit === oldUnit) return;
        if (getInventoryUnits().some(unit => unit.toLowerCase() === updatedUnit.toLowerCase())) {
            document.getElementById("adminSettingsFeedback").textContent = "That unit already exists.";
            return;
        }
        const units = JSON.parse(localStorage.getItem(INVENTORY_UNITS_KEY) || "[]")
            .map(item => typeof item === "string" ? { unit: item } : item);
        const baseUnit = DEFAULT_INVENTORY_UNITS.find(unit =>
            (units.find(item => item.baseUnit === unit)?.unit || unit) === oldUnit
        );
        const storedUnit = units.find(item => item.unit === oldUnit) ||
            (baseUnit && units.find(item => item.baseUnit === baseUnit));
        const replacement = { ...(storedUnit || {}), ...(baseUnit ? { baseUnit } : {}), unit: updatedUnit, deleted: false };
        if (storedUnit) units[units.indexOf(storedUnit)] = replacement;
        else units.push(replacement);
        localStorage.setItem(INVENTORY_UNITS_KEY, JSON.stringify(units));
        const stocks = JSON.parse(localStorage.getItem("stocks") || "[]");
        stocks.forEach(item => {
            if (item.unit === oldUnit) item.unit = updatedUnit;
        });
        localStorage.setItem("stocks", JSON.stringify(stocks));
        populateInventoryUnitSelect();
    } else if (action === "delete-unit") {
        const unit = button.dataset.unitName;
        if (JSON.parse(localStorage.getItem("stocks") || "[]").some(item => item.unit === unit)) {
            document.getElementById("adminSettingsFeedback").textContent = "This unit is used by a product. Reassign those products before deleting it.";
            return;
        }
        if (!window.confirm(`Delete unit "${unit}"?`)) return;
        const units = JSON.parse(localStorage.getItem(INVENTORY_UNITS_KEY) || "[]")
            .map(item => typeof item === "string" ? { unit: item } : item);
        const baseUnit = DEFAULT_INVENTORY_UNITS.find(item =>
            (units.find(saved => saved.baseUnit === item)?.unit || item) === unit
        );
        if (baseUnit) {
            const storedUnit = units.find(item => item.unit === unit) ||
                units.find(item => item.baseUnit === baseUnit);
            if (storedUnit) Object.assign(storedUnit, { unit: "", deleted: true, baseUnit });
            else units.push({ unit: "", deleted: true, baseUnit });
        } else {
            const unitIndex = units.findIndex(item => item.unit === unit);
            if (unitIndex !== -1) units.splice(unitIndex, 1);
        }
        localStorage.setItem(INVENTORY_UNITS_KEY, JSON.stringify(units));
        populateInventoryUnitSelect();
    }
    document.getElementById("adminSettingsFeedback").textContent = "Settings updated.";
    populateInventoryCategorySelects();
    renderAdminInventorySettings();
    loadDashboard();
}

function addInventoryCategory() {
    if (!canManagePage("stocks")) return;
    const nameInput = document.getElementById("newCategoryName");
    const emojiInput = document.getElementById("newCategoryEmoji");
    const message = document.getElementById("categoryFormMessage");
    const name = nameInput.value.trim();
    const emoji = emojiInput.value.trim();
    if (!name || !emoji) {
        message.textContent = "Enter a category name and its emoji.";
        message.classList.add("form-error");
        return;
    }

    const categories = JSON.parse(localStorage.getItem(INVENTORY_CATEGORIES_KEY) || "[]");
    if (getInventoryCategories().some(category =>
        normalizeInventoryCategory(category.name) === normalizeInventoryCategory(name)
    )) {
        message.textContent = "That category already exists.";
        message.classList.add("form-error");
        return;
    }

    categories.push({ name, emoji });
    localStorage.setItem(INVENTORY_CATEGORIES_KEY, JSON.stringify(categories));
    populateInventoryCategorySelects();
    document.getElementById("stockCategory").value = name;
    closeInventoryCategoryModal();
    loadDashboard();
}

function closeInventoryCategoryModal() {
    document.getElementById("categoryModal").classList.remove("show");
    document.getElementById("categoryForm").reset();
    const message = document.getElementById("categoryFormMessage");
    message.textContent = "The new category will be selected in Add Supply.";
    message.classList.remove("form-error");
}

function setupInventoryCategories() {
    populateInventoryCategorySelects();
    populateInventoryUnitSelect();
    const categorySelect = document.getElementById("stockCategory");
    if (categorySelect) {
        let selectedCategory = categorySelect.value;
        categorySelect.addEventListener("change", () => {
            if (categorySelect.value === ADD_INVENTORY_CATEGORY_OPTION) {
                categorySelect.value = selectedCategory;
                document.getElementById("categoryModal").classList.add("show");
                document.getElementById("newCategoryName").focus();
                return;
            }
            selectedCategory = categorySelect.value;
        });
    }
    document.getElementById("categoryForm").addEventListener("submit", event => {
        event.preventDefault();
        addInventoryCategory();
    });
    document.getElementById("closeCategoryModal").addEventListener("click", closeInventoryCategoryModal);
    document.getElementById("cancelCategoryButton").addEventListener("click", closeInventoryCategoryModal);
}

function getActivityLog() {
    return JSON.parse(localStorage.getItem("activityLog")) || [];
}

function initializeLocalStorageData() {
    ["stocks", "shipments", "suppliers", "buyers", "users", "activityLog"].forEach(key => {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify([]));
        }
    });

    const buyers = JSON.parse(localStorage.getItem("buyers")) || [];
    const renamedBuyers = [
        ["BUY-sample-01", "Big Brew (Sample)", "Big Brew"],
        ["BUY-sample-02", "Starbucks (Sample)", "Starbucks"]
    ];
    let buyersChanged = false;
    renamedBuyers.forEach(([id, previousName, name]) => {
        const buyer = buyers.find(item => item.id === id && item.name === previousName);
        if (!buyer) return;
        buyer.name = name;
        buyersChanged = true;
    });
    if (buyersChanged) localStorage.setItem("buyers", JSON.stringify(buyers));

    const appendMissingRecords = (key, samples) => {
        const records = JSON.parse(localStorage.getItem(key)) || [];
        const existingIds = new Set(records.map(item => String(item.id)));
        const existingNames = new Set(records.map(item => String(item.name || "").trim().toLowerCase()));
        samples.forEach(item => {
            if (existingIds.has(String(item.id)) || existingNames.has(item.name.trim().toLowerCase())) return;
            records.push(item);
            existingIds.add(String(item.id));
            existingNames.add(item.name.trim().toLowerCase());
        });
        localStorage.setItem(key, JSON.stringify(records));
    };

    const stocks = JSON.parse(localStorage.getItem("stocks")) || [];
    const oldLowStockProduct = stocks.find(item =>
        item.id === "STK-sample-11" && item.name === "Low Stock Demo Product"
    );
    if (oldLowStockProduct) {
        Object.assign(oldLowStockProduct, SAMPLE_STOCKS.find(item => item.id === "STK-sample-11"));
        localStorage.setItem("stocks", JSON.stringify(stocks));
    }

    if (localStorage.getItem(INVENTORY_SETTINGS_KEY) === null) {
        localStorage.setItem(INVENTORY_SETTINGS_KEY, JSON.stringify({ lowStockThreshold: 10 }));
    }
    if (localStorage.getItem(INVENTORY_UNITS_KEY) === null) {
        localStorage.setItem(INVENTORY_UNITS_KEY, JSON.stringify([]));
    }

    appendMissingRecords("buyers", SAMPLE_BUYERS);
    appendMissingRecords("suppliers", SAMPLE_SUPPLIERS);
    appendMissingRecords("stocks", SAMPLE_STOCKS);

    const shipments = JSON.parse(localStorage.getItem("shipments")) || [];
    const sampleTrackingById = new Map(SAMPLE_SHIPMENTS.map(item => [item.id, item.tracking]));
    let shipmentsChanged = false;
    shipments.forEach(item => {
        const tracking = sampleTrackingById.get(item.id);
        if (tracking && item.tracking !== tracking) {
            item.tracking = tracking;
            shipmentsChanged = true;
        }
    });
    if (shipmentsChanged) localStorage.setItem("shipments", JSON.stringify(shipments));

    const existingShipmentIds = new Set(shipments.map(item => String(item.id)));
    const missingShipments = SAMPLE_SHIPMENTS.filter(item => !existingShipmentIds.has(item.id));
    if (missingShipments.length) {
        localStorage.setItem("shipments", JSON.stringify([...shipments, ...missingShipments]));
    }
}

function recordSystemActivity(action, entityType, details, actor = getCurrentUser()) {
    if (!actor || localStorage.getItem("isLoggedIn") !== "true") return;
    const entries = getActivityLog();
    entries.push({
        id: generateId("ACT"),
        action,
        entityType,
        details,
        actorId: actor.id,
        actorName: actor.fullName,
        actorRole: actor.role,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem("activityLog", JSON.stringify(entries));
    updateNotificationBadge();
}

function renderActivityLog() {
    const tableBody = document.getElementById("activityLogRows");
    const emptyState = document.getElementById("activityLogEmpty");
    if (!tableBody || !canAccessPage("log")) return;

    const currentUserIsAdmin = isCurrentUserAdmin();
    const deleteHeading = document.getElementById("activityDeleteHeading");
    const description = document.getElementById("activityLogDescription");
    if (deleteHeading) deleteHeading.hidden = !currentUserIsAdmin;
    if (description) {
        description.textContent = currentUserIsAdmin
            ? "Changes made to supplies, shipments, suppliers, buyers, and user accounts"
            : "Activity by employees, drivers, and managers. Admin activity is hidden.";
    }
    const query = (document.getElementById("activitySearch")?.value || "").trim().toLowerCase();
    const type = document.getElementById("activityTypeFilter")?.value || "all";
    const visibleEntries = getActivityLog().filter(entry =>
        currentUserIsAdmin || entry.actorRole !== "Admin"
    );
    const entries = visibleEntries.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter(entry => (type === "all" || entry.entityType === type) &&
            (!query || `${entry.action} ${entry.entityType} ${entry.details} ${entry.actorName} ${entry.actorRole}`.toLowerCase().includes(query)));

    tableBody.innerHTML = entries.map(entry => `
        <tr>
            <td><span class="activity-action">${escapeAccountHtml(entry.action)}</span><small class="user-secondary">${escapeAccountHtml(entry.entityType)}</small></td>
            <td>${escapeAccountHtml(entry.details)}</td>
            <td>${escapeAccountHtml(entry.actorName || "Unknown")}<small class="user-secondary">${escapeAccountHtml(entry.actorId || "")}</small></td>
            <td><span class="role-label">${escapeAccountHtml(getRoleDisplayName(entry.actorRole || "—"))}</span></td>
            <td>${new Date(entry.createdAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })}</td>
            ${currentUserIsAdmin ? `<td><button type="button" class="action-btn delete-btn" data-delete-activity="${escapeAccountHtml(entry.id)}">Delete</button></td>` : ""}
        </tr>
    `).join("");
    emptyState.hidden = entries.length > 0;
    emptyState.textContent = visibleEntries.length ? "No activity matches your search." : "No system updates have been recorded yet.";
}

function setupActivityLogPage() {
    const search = document.getElementById("activitySearch");
    const typeFilter = document.getElementById("activityTypeFilter");
    if (!search || !typeFilter) return;
    search.addEventListener("input", renderActivityLog);
    typeFilter.addEventListener("change", renderActivityLog);
    document.getElementById("activityLogRows").addEventListener("click", event => {
        const deleteButton = event.target.closest("[data-delete-activity]");
        if (!deleteButton || !isCurrentUserAdmin()) return;
        const entryId = deleteButton.dataset.deleteActivity;
        const entries = getActivityLog();
        const entry = entries.find(item => item.id === entryId);
        if (!entry || !window.confirm("Delete this activity record?")) return;
        localStorage.setItem("activityLog", JSON.stringify(entries.filter(item => item.id !== entryId)));
        renderActivityLog();
        updateNotificationBadge();
    });
    renderActivityLog();
}

function saveStocks(data, { recordActivity = true } = {}) {
    const previous = getStocks();
    localStorage.setItem("stocks", JSON.stringify(data));
    if (recordActivity) {
        const oldById = new Map(previous.map(item => [String(item.id), item]));
        const newById = new Map(data.map(item => [String(item.id), item]));
        data.forEach(item => {
            const oldItem = oldById.get(String(item.id));
            if (!oldItem) {
                recordSystemActivity("Added", "Supply", `${item.name} · ${item.quantity} ${item.unit}`);
                return;
            }
            const changes = [
                ["name", "name"], ["category", "category"], ["quantity", "quantity"],
                ["unit", "unit"], ["minimum", "minimum stock"], ["supplier", "supplier"]
            ].filter(([key]) => String(oldItem[key] ?? "") !== String(item[key] ?? ""))
                .map(([key, label]) => `${label}: ${oldItem[key] ?? "—"} → ${item[key] ?? "—"}`);
            if (changes.length) recordSystemActivity("Updated", "Supply", `${item.name} · ${changes.join("; ")}`);
        });
        previous.forEach(item => {
            if (!newById.has(String(item.id))) recordSystemActivity("Deleted", "Supply", item.name);
        });
    }
    setupRoleNavigation();
    updateNotificationBadge();
    renderLowStocksPage();
    renderStocks();
    loadReports();
    loadDashboard();
}

function saveBuyers(data, { recordActivity = true } = {}) {
    const previous = getBuyers();
    localStorage.setItem("buyers", JSON.stringify(data));
    if (!recordActivity) return;

    const oldById = new Map(previous.map(item => [String(item.id), item]));
    const newById = new Map(data.map(item => [String(item.id), item]));
    data.forEach(item => {
        const oldItem = oldById.get(String(item.id));
        if (!oldItem) {
            recordSystemActivity("Added", "Buyer", item.name);
            return;
        }
        const changedFields = ["name", "contact", "phone", "email", "status"]
            .filter(key => String(oldItem[key] ?? "") !== String(item[key] ?? ""));
        if (changedFields.length) recordSystemActivity("Updated", "Buyer", `${item.name} · ${changedFields.join(", ")}`);
    });
    previous.forEach(item => {
        if (!newById.has(String(item.id))) recordSystemActivity("Deleted", "Buyer", item.name);
    });
}

function saveShipments(data, { recordActivity = true } = {}) {
    const previous = getShipments();
    localStorage.setItem("shipments", JSON.stringify(data));
    if (!recordActivity) return;

    const oldById = new Map(previous.map(item => [String(item.id), item]));
    const newById = new Map(data.map(item => [String(item.id), item]));
    data.forEach(item => {
        const oldItem = oldById.get(String(item.id));
        const label = `${item.tracking || item.id} · ${item.type || "Shipment"} · ${item.supply || "Supply"}`;
        if (!oldItem) {
            recordSystemActivity("Added", "Shipment", `${label} · ${item.quantity} units · ${item.status}`);
            return;
        }
        const changedFields = ["tracking", "type", "supply", "supplier", "quantity", "date", "status", "assignedDriverId", "assignedDriver"]
            .filter(key => String(oldItem[key] ?? "") !== String(item[key] ?? ""));
        if (changedFields.length) {
            const details = changedFields.map(key => `${key}: ${oldItem[key] ?? "—"} → ${item[key] ?? "—"}`).join("; ");
            recordSystemActivity("Updated", "Shipment", `${label} · ${details}`);
        }
    });
    previous.forEach(item => {
        if (!newById.has(String(item.id))) {
            recordSystemActivity("Deleted", "Shipment", `${item.tracking || item.id} · ${item.type || "Shipment"} · ${item.supply || "Supply"}`);
        }
    });
    loadReports();
}

function saveSuppliers(data, { recordActivity = true } = {}) {
    const previous = getSuppliers();
    localStorage.setItem("suppliers", JSON.stringify(data));
    if (!recordActivity) return;

    const oldById = new Map(previous.map(item => [String(item.id), item]));
    const newById = new Map(data.map(item => [String(item.id), item]));
    data.forEach(item => {
        const oldItem = oldById.get(String(item.id));
        if (!oldItem) {
            recordSystemActivity("Added", "Supplier", item.name);
            return;
        }
        const changedFields = ["name", "contact", "phone", "email", "category", "status"]
            .filter(key => String(oldItem[key] ?? "") !== String(item[key] ?? ""));
        if (changedFields.length) recordSystemActivity("Updated", "Supplier", `${item.name} · ${changedFields.join(", ")}`);
    });
    previous.forEach(item => {
        if (!newById.has(String(item.id))) recordSystemActivity("Deleted", "Supplier", item.name);
    });
    loadReports();
}

function setupProfileExperience() {
    initializeUserAccounts();
    const currentUser = getCurrentUser();
    const topbars = document.querySelectorAll(".app-page .topbar");
    if (!currentUser || !topbars.length) return;

    topbars.forEach(topbar => {
        if (topbar.querySelector(".topbar-controls")) return;
        topbar.querySelector(".user-info")?.remove();

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "profile-trigger";
        trigger.setAttribute("aria-label", "Open profile");
        trigger.innerHTML = `${renderProfileAvatar(currentUser, "user-icon")}<span class="profile-trigger-copy"><strong>${escapeAccountHtml(currentUser.fullName)}</strong><small>${escapeAccountHtml(getRoleDisplayName(currentUser.role))}</small></span>`;
        trigger.addEventListener("click", () => openProfileModal("information"));
        const controls = document.createElement("div");
        controls.className = "topbar-controls";

        const notification = document.createElement("button");
        notification.type = "button";
        notification.className = "topbar-icon-btn notification-trigger";
        notification.setAttribute("aria-label", "Notifications");
        notification.title = "Notifications";
        notification.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path><path d="M10 21h4"></path></svg><span class="notification-badge" hidden></span>';
        notification.addEventListener("click", openNotificationCenter);

        const settings = document.createElement("button");
        settings.type = "button";
        settings.className = "topbar-icon-btn";
        settings.setAttribute("aria-label", "Settings");
        settings.title = "Settings";
        settings.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8.1l-.2.1h-3.4l-.1-.2a1.7 1.7 0 0 0-1.5-1h-.3a1.7 1.7 0 0 0-1.3.8l-.1.2-3.3-.9v-.2a1.7 1.7 0 0 0-.8-1.6l-.2-.1.1-3.4.2-.1a1.7 1.7 0 0 0 .9-1.5v-.3a1.7 1.7 0 0 0-.8-1.3l-.2-.1.9-3.3h.2a1.7 1.7 0 0 0 1.6-.8l.1-.2 3.4.1.1.2a1.7 1.7 0 0 0 1.5.9h.3a1.7 1.7 0 0 0 1.3-.8l.1-.2 3.3.9v.2a1.7 1.7 0 0 0 .8 1.6l.2.1-.1 3.4-.2.1a1.7 1.7 0 0 0-1 1.5v.3a1.7 1.7 0 0 0 .8 1.3z"></path></svg>';
        settings.addEventListener("click", () => openProfileModal("settings"));

        controls.append(notification, settings, trigger);
        topbar.appendChild(controls);
    });

    setupNotificationCenter();
    if (document.getElementById("profileModal")) return;
    const modal = document.createElement("div");
    modal.id = "profileModal";
    modal.className = "modal profile-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "profileModalTitle");
    modal.innerHTML = `
        <div class="modal-content profile-modal-content">
            <div class="modal-header"><div><h2 id="profileModalTitle">My Profile</h2><p id="profileModalSubtitle"></p></div><button type="button" class="close-btn" aria-label="Close profile" onclick="closeProfileModal()">&times;</button></div>
            <section class="profile-panel" id="profileInformationPanel">
                <div class="profile-overview">
                    <div id="profileAvatarPreview"></div>
                    <div><h3 id="profileDisplayName"></h3><p id="profileAccountRole"></p></div>
                </div>
                <dl class="profile-details">
                    <div><dt>Last name</dt><dd id="profileLastName"></dd></div>
                    <div><dt>First name</dt><dd id="profileFirstName"></dd></div>
                    <div><dt>Middle initial</dt><dd id="profileMiddleInitial"></dd></div>
                    <div><dt>Gender</dt><dd id="profileGender"></dd></div>
                    <div><dt>Email</dt><dd id="profileEmail"></dd></div>
                    <div><dt>Contact number</dt><dd id="profileContact"></dd></div>
                    <div><dt>Role</dt><dd id="profileRole"></dd></div>
                    <div><dt>Username</dt><dd id="profileUsername"></dd></div>
                </dl>
            </section>
            <section class="profile-panel" id="profileSettingsPanel" hidden>
                <nav class="settings-menu" id="settingsMenu" aria-label="Settings sections">
                    <p class="settings-menu-label">Account</p>
                    <button type="button" class="settings-menu-item" data-settings-page="profile">
                        <span><strong>Edit profile</strong><small>Update your personal information and photo</small></span><span aria-hidden="true">›</span>
                    </button>
                    <button type="button" class="settings-menu-item" data-settings-page="password">
                        <span><strong>Change password</strong><small>Update your account password</small></span><span aria-hidden="true">›</span>
                    </button>
                    <button type="button" class="settings-menu-item" data-settings-page="notifications">
                        <span><strong>Notifications</strong><small>Choose which updates you receive</small></span><span aria-hidden="true">›</span>
                    </button>
                    <p class="settings-menu-label">System</p>
                    <button type="button" class="settings-menu-item admin-settings-menu-item" data-settings-page="inventory" hidden>
                        <span><strong>Inventory settings</strong><small>Manage threshold, categories, and units</small></span><span aria-hidden="true">›</span>
                    </button>
                    <button type="button" class="settings-menu-item" data-settings-page="appearance">
                        <span><strong>Appearance</strong><small>Choose light or dark mode</small></span><span aria-hidden="true">›</span>
                    </button>
                    <button type="button" class="settings-menu-item" data-settings-page="about">
                        <span><strong>About this system</strong><small>Version and account role</small></span><span aria-hidden="true">›</span>
                    </button>
                </nav>
                <section class="settings-section settings-detail-page" id="settingsProfileSection" data-settings-panel="profile" hidden>
                    <h3>Edit profile</h3>
                    <form id="editProfileForm" class="profile-form profile-edit-form">
                        <div class="profile-avatar-editor">
                            <div id="editProfileAvatarPreview"></div>
                            <div class="form-group"><label for="profilePhoto">Profile photo</label><input id="profilePhoto" type="file" accept="image/png,image/jpeg,image/webp"><small class="form-hint">Optional. JPG, PNG, or WebP; up to 5 MB.</small></div>
                        </div>
                        <div class="profile-form-grid">
                            <div class="form-group"><label for="profileLastNameInput">Last name</label><input id="profileLastNameInput" type="text" maxlength="60" required></div>
                            <div class="form-group"><label for="profileFirstNameInput">First name</label><input id="profileFirstNameInput" type="text" maxlength="60" required></div>
                            <div class="form-group"><label for="profileMiddleInitialInput">Middle initial</label><input id="profileMiddleInitialInput" type="text" maxlength="5"></div>
                            <div class="form-group"><label for="profileGenderInput">Gender</label><select id="profileGenderInput"><option value="">Prefer not to say</option><option value="Female">Female</option><option value="Male">Male</option><option value="Non-binary">Non-binary</option><option value="Other">Other</option></select></div>
                            <div class="form-group"><label for="profileEmailInput">Email</label><input id="profileEmailInput" type="email" maxlength="120"></div>
                            <div class="form-group"><label for="profileContactInput">Contact number</label><input id="profileContactInput" type="tel" maxlength="30"></div>
                        </div>
                        <p class="profile-feedback" id="editProfileFeedback" role="status"></p>
                        <div class="profile-form-actions"><button type="button" class="secondary-btn" id="cancelEditProfile">Cancel</button><button type="submit" class="primary-btn">Save Profile</button></div>
                    </form>
                </section>
                <section class="settings-section settings-detail-page" id="settingsPasswordSection" data-settings-panel="password" hidden>
                    <h3>Change password</h3>
                    <p class="profile-description">Password changes by non-Admin accounts will be sent to an Admin for approval.</p>
                    <form id="changePasswordForm" class="profile-form">
                        <div class="form-group"><label for="currentPassword">Current password</label><input id="currentPassword" type="password" required autocomplete="current-password"></div>
                        <div class="form-group"><label for="newPassword">New password</label><input id="newPassword" type="password" minlength="6" required autocomplete="new-password"></div>
                        <div class="form-group"><label for="confirmNewPassword">Confirm new password</label><input id="confirmNewPassword" type="password" minlength="6" required autocomplete="new-password"></div>
                        <button type="submit" class="primary-btn">Update password</button>
                        <p class="profile-feedback" id="changePasswordFeedback" role="status"></p>
                    </form>
                </section>
                <section class="settings-section settings-detail-page" id="settingsNotificationsSection" data-settings-panel="notifications" hidden>
                    <h3>Notification preferences</h3>
                    <label class="settings-toggle-row"><span><strong>Low stock alerts</strong><small>Notify me when supplies reach their minimum level.</small></span><input type="checkbox" id="lowStockPreference"></label>
                    <label class="settings-toggle-row"><span><strong>Shipment updates</strong><small>Notify me when shipment records are updated.</small></span><input type="checkbox" id="shipmentPreference"></label>
                </section>
                <section class="settings-section settings-detail-page admin-settings-section" id="adminSettingsSection" data-settings-panel="inventory" hidden>
                    <h3>Admin-only settings</h3>
                    <form id="adminThresholdForm" class="settings-inline-form">
                        <div class="form-group"><label for="defaultLowStockThreshold">Default low-stock threshold</label><input type="number" id="defaultLowStockThreshold" min="0" required><small class="form-hint">Used as the default minimum for new supplies. Existing supplies keep their individual minimum.</small></div>
                        <button type="submit" class="primary-btn">Save threshold</button>
                    </form>
                    <div class="settings-management-grid">
                        <section>
                            <h4>Manage categories</h4>
                            <form id="settingsCategoryForm" class="settings-inline-form">
                                <input type="text" id="settingsNewCategoryName" maxlength="40" placeholder="Category name" aria-label="New category name" required>
                                <input type="text" id="settingsNewCategoryEmoji" maxlength="8" placeholder="Emoji" aria-label="Category emoji" required>
                                <button type="submit" class="secondary-btn">Add</button>
                            </form>
                            <ul class="settings-managed-list" id="settingsCategoryList"></ul>
                        </section>
                        <section>
                            <h4>Manage units</h4>
                            <form id="settingsUnitForm" class="settings-inline-form">
                                <input type="text" id="settingsNewUnit" maxlength="20" placeholder="Unit name" aria-label="New unit name" required>
                                <button type="submit" class="secondary-btn">Add</button>
                            </form>
                            <ul class="settings-managed-list" id="settingsUnitList"></ul>
                        </section>
                    </div>
                    <p class="profile-feedback" id="adminSettingsFeedback" role="status"></p>
                </section>
                <section class="settings-section settings-detail-page" id="settingsAboutSection" data-settings-panel="about" hidden>
                    <button type="button" class="settings-back-button" data-settings-back>‹ Settings</button>
                    <h3>About this system</h3>
                    <dl class="profile-details settings-about-details">
                        <div><dt>Version</dt><dd>${SYSTEM_VERSION}</dd></div>
                        <div><dt>Last updated</dt><dd>October 5, 2026</dd></div>
                        <div><dt>Logged in as</dt><dd id="settingsLoggedInAs"></dd></div>
                    </dl>
                </section>
                <section class="settings-section settings-detail-page" id="settingsAppearanceSection" data-settings-panel="appearance" hidden>
                    <h3>Appearance</h3>
                    <label class="settings-toggle-row" for="themePreference">
                        <span><strong>Color theme</strong><small>Apply your preferred theme across every feature.</small></span>
                        <select id="themePreference" aria-label="Color theme">
                            <option value="neon-light">Light</option>
                            <option value="neon-dark">Dark</option>
                        </select>
                    </label>
                </section>
            </section>
        </div>`;
    modal.addEventListener("click", event => {
        if (event.target === modal) closeProfileModal();
        const pageButton = event.target.closest("[data-settings-page]");
        if (pageButton) {
            const currentPage = document.querySelector(".settings-detail-page:not([hidden])")?.dataset.settingsPanel;
            showSettingsPage(currentPage === pageButton.dataset.settingsPage ? "" : pageButton.dataset.settingsPage);
        }
    });
    document.body.appendChild(modal);
    document.querySelectorAll(".settings-menu-item[data-settings-page]").forEach(button => {
        const entry = document.createElement("div");
        entry.className = "settings-menu-entry";
        button.parentNode.insertBefore(entry, button);
        entry.appendChild(button);
        const panel = document.querySelector(`[data-settings-panel="${button.dataset.settingsPage}"]`);
        if (panel) entry.appendChild(panel);
    });

    document.getElementById("changePasswordForm").addEventListener("submit", changeOwnPassword);
    document.getElementById("cancelEditProfile").addEventListener("click", closeEditProfile);
    document.getElementById("editProfileForm").addEventListener("submit", saveOwnProfile);
    document.getElementById("profilePhoto").addEventListener("change", previewProfilePhoto);
    document.getElementById("lowStockPreference").addEventListener("change", saveNotificationPreferences);
    document.getElementById("shipmentPreference").addEventListener("change", saveNotificationPreferences);
    document.getElementById("themePreference").addEventListener("change", event => setTheme(event.target.value));
    document.getElementById("adminThresholdForm").addEventListener("submit", saveAdminInventorySettings);
    document.getElementById("settingsCategoryForm").addEventListener("submit", addSettingsCategory);
    document.getElementById("settingsUnitForm").addEventListener("submit", addSettingsUnit);
    document.getElementById("settingsCategoryList").addEventListener("click", handleAdminSettingsListAction);
    document.getElementById("settingsUnitList").addEventListener("click", handleAdminSettingsListAction);
    document.querySelector(".admin-settings-menu-item").hidden = !isCurrentUserAdmin();
    updateProfileContent();
}

function setTheme(theme) {
    const selectedTheme = theme === "neon-dark" ? "neon-dark" : "neon-light";
    document.body.dataset.theme = selectedTheme;
    localStorage.setItem(THEME_PREFERENCE_KEY, selectedTheme);
    const themePreference = document.getElementById("themePreference");
    if (themePreference) themePreference.value = selectedTheme;
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_PREFERENCE_KEY);
    setTheme(savedTheme === "neon-dark" ? "neon-dark" : "neon-light");
}

function isCurrentUserAdmin() {
    return getCurrentUser()?.role === "Admin";
}

function getProfileNameParts(user) {
    if (user.firstName || user.lastName) {
        return {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            middleInitial: user.middleInitial || ""
        };
    }
    const parts = String(user.fullName || "").trim().split(/\s+/).filter(Boolean);
    return {
        firstName: parts[0] || "",
        lastName: parts.length > 1 ? parts[parts.length - 1] : "",
        middleInitial: parts.length > 2 ? parts.slice(1, -1).map(part => `${part[0]}.`).join(" ") : ""
    };
}

function getProfileDisplayName(user) {
    const { firstName, lastName, middleInitial } = getProfileNameParts(user);
    const firstAndMiddle = [firstName, middleInitial].filter(Boolean).join(" ");
    return [lastName, firstAndMiddle].filter(Boolean).join(", ") || user.fullName || user.username;
}

function renderProfileAvatar(user, className = "profile-avatar") {
    const photo = /^data:image\/(?:png|jpeg|webp);base64,/i.test(user.profilePhoto || "") ? user.profilePhoto : "";
    const initial = (user.firstName || getProfileNameParts(user).firstName || user.fullName || user.username || "?")
        .trim().charAt(0).toUpperCase();
    return photo
        ? `<span class="${className}"><img src="${escapeAccountHtml(photo)}" alt=""></span>`
        : `<span class="${className}" aria-hidden="true">${escapeAccountHtml(initial)}</span>`;
}

function updateProfileContent() {
    const user = getCurrentUser();
    if (!user) return;
    const { firstName, lastName, middleInitial } = getProfileNameParts(user);
    document.getElementById("profileModalTitle").textContent = "My Profile";
    document.getElementById("profileModalSubtitle").textContent = "Account information";
    document.getElementById("profileDisplayName").textContent = getProfileDisplayName(user);
    document.getElementById("profileAvatarPreview").innerHTML = renderProfileAvatar(user, "profile-avatar profile-avatar-large");
    document.getElementById("profileAccountRole").textContent = getRoleDisplayName(user.role);
    document.getElementById("profileLastName").textContent = lastName || "—";
    document.getElementById("profileFirstName").textContent = firstName || "—";
    document.getElementById("profileMiddleInitial").textContent = middleInitial || "—";
    document.getElementById("profileGender").textContent = user.gender || "—";
    document.getElementById("profileEmail").textContent = user.email || "—";
    document.getElementById("profileContact").textContent = user.contactNumber || "—";
    document.getElementById("profileUsername").textContent = user.username;
    document.getElementById("profileRole").textContent = getRoleDisplayName(user.role);
    document.getElementById("editProfileAvatarPreview").innerHTML = renderProfileAvatar(user, "profile-avatar profile-avatar-large");
    document.getElementById("profileLastNameInput").value = lastName;
    document.getElementById("profileFirstNameInput").value = firstName;
    document.getElementById("profileMiddleInitialInput").value = middleInitial;
    document.getElementById("profileGenderInput").value = user.gender || "";
    document.getElementById("profileEmailInput").value = user.email || "";
    document.getElementById("profileContactInput").value = user.contactNumber || "";
    document.getElementById("settingsLoggedInAs").textContent = getRoleDisplayName(user.role);
    const preferences = getNotificationPreferences(user);
    document.getElementById("lowStockPreference").checked = preferences.lowStockAlerts !== false;
    document.getElementById("shipmentPreference").checked = preferences.shipmentUpdates !== false;
    const themePreference = document.getElementById("themePreference");
    if (themePreference) themePreference.value = document.body.dataset.theme || "neon-light";
    document.getElementById("adminSettingsSection").hidden = !isCurrentUserAdmin();
    document.querySelector(".admin-settings-menu-item").hidden = !isCurrentUserAdmin();
    document.getElementById("defaultLowStockThreshold").value = String(getInventorySettings().lowStockThreshold);
    document.querySelectorAll(".profile-trigger").forEach(trigger => {
        trigger.innerHTML = `${renderProfileAvatar(user, "user-icon")}<span class="profile-trigger-copy"><strong>${escapeAccountHtml(user.fullName)}</strong><small>${escapeAccountHtml(getRoleDisplayName(user.role))}</small></span>`;
    });
    renderAdminInventorySettings();
    updateNotificationBadge();
}

function openProfileModal(view = "information") {
    updateProfileContent();
    const showSettings = view === "settings";
    document.getElementById("profileInformationPanel").hidden = showSettings;
    document.getElementById("profileSettingsPanel").hidden = !showSettings;
    const currentUser = getCurrentUser();
    document.getElementById("profileModalTitle").textContent = showSettings
        ? "Settings"
        : currentUser ? getProfileDisplayName(currentUser) : "My Profile";
    document.getElementById("profileModalSubtitle").textContent = showSettings ? "Account, inventory, and system preferences" : "Account information";
    if (showSettings) showSettingsPage();
    document.getElementById("profileModal").classList.add("show");
}

function showSettingsPage(page = "") {
    const menu = document.getElementById("settingsMenu");
    if (!menu) return;
    const isAdmin = isCurrentUserAdmin();
    document.querySelectorAll("[data-settings-panel]").forEach(panel => {
        panel.hidden = !page || panel.dataset.settingsPanel !== page || (page === "inventory" && !isAdmin);
    });
    menu.querySelectorAll("[data-settings-page]").forEach(button => {
        button.setAttribute("aria-expanded", String(button.dataset.settingsPage === page));
    });
    document.getElementById("profileModalTitle").textContent = "Settings";
    document.getElementById("profileModalSubtitle").textContent = "Choose a setting to manage";
}

function closeProfileModal() {
    document.getElementById("profileModal").classList.remove("show");
}

function closeEditProfile() {
    document.getElementById("profilePhoto").value = "";
    document.getElementById("profilePhoto").dataset.photo = "";
    document.getElementById("editProfileFeedback").textContent = "";
    showSettingsPage();
    updateProfileContent();
}

async function previewProfilePhoto(event) {
    const file = event.target.files?.[0];
    const feedback = document.getElementById("editProfileFeedback");
    if (!file) return;
    event.target.dataset.photo = "";
    document.getElementById("editProfileAvatarPreview").innerHTML =
        renderProfileAvatar(getCurrentUser(), "profile-avatar profile-avatar-large");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
        feedback.textContent = "Choose a JPG, PNG, or WebP image smaller than 5 MB.";
        event.target.value = "";
        return;
    }

    try {
        const image = await createImageBitmap(file);
        const canvas = document.createElement("canvas");
        const size = 256;
        const scale = Math.min(size / image.width, size / image.height);
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        image.close();
        const photo = canvas.toDataURL("image/jpeg", 0.82);
        document.getElementById("editProfileAvatarPreview").innerHTML =
            `<span class="profile-avatar profile-avatar-large"><img src="${photo}" alt=""></span>`;
        event.target.dataset.photo = photo;
        feedback.textContent = "";
    } catch (error) {
        console.error("Unable to process profile photo.", error);
        feedback.textContent = "Unable to read that image. Please choose another file.";
    }
}

function saveOwnProfile(event) {
    event.preventDefault();
    const currentUser = getCurrentUser();
    const feedback = document.getElementById("editProfileFeedback");
    if (!currentUser) return;
    const users = getUsers();
    const user = users.find(account => account.id === currentUser.id);
    if (!user) return;

    const email = document.getElementById("profileEmailInput").value.trim();
    if (users.some(account => account.id !== user.id && email &&
        String(account.email || "").toLowerCase() === email.toLowerCase()
    )) {
        feedback.textContent = "That email address is already in use.";
        return;
    }

    user.lastName = document.getElementById("profileLastNameInput").value.trim();
    user.firstName = document.getElementById("profileFirstNameInput").value.trim();
    user.middleInitial = document.getElementById("profileMiddleInitialInput").value.trim();
    user.gender = document.getElementById("profileGenderInput").value;
    user.email = email;
    user.contactNumber = document.getElementById("profileContactInput").value.trim();
    user.fullName = [user.firstName, user.middleInitial, user.lastName].filter(Boolean).join(" ");
    const photo = document.getElementById("profilePhoto").dataset.photo;
    if (photo) user.profilePhoto = photo;
    try {
        saveUsers(users);
    } catch (error) {
        console.error("Unable to save profile changes.", error);
        feedback.textContent = "Unable to save changes. The profile photo may be too large.";
        return;
    }
    document.getElementById("profilePhoto").dataset.photo = "";
    document.getElementById("profilePhoto").value = "";
    recordSystemActivity("Updated", "User Account", `${user.fullName} updated their profile`);
    updateProfileContent();
    setupRoleNavigation();
}

function saveNotificationPreferences() {
    const user = getCurrentUser();
    if (!user) return;
    const preferences = JSON.parse(localStorage.getItem(NOTIFICATION_PREFERENCES_KEY) || "{}");
    preferences[user.id] = {
        lowStockAlerts: document.getElementById("lowStockPreference").checked,
        shipmentUpdates: document.getElementById("shipmentPreference").checked
    };
    localStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(preferences));
    updateNotificationBadge();
    const center = document.getElementById("notificationCenter");
    if (center?.classList.contains("show")) setNotificationTab(center.dataset.activeTab || "alerts");
}

function getPasswordChangeRequests() {
    const requests = JSON.parse(localStorage.getItem(PASSWORD_CHANGE_REQUESTS_KEY) || "[]");
    return Array.isArray(requests) ? requests : [];
}

function createPasswordChangeRequest(targetUser, requestedPassword, requestedBy = getCurrentUser()) {
    if (!targetUser || !requestedBy) return { ok: false, message: "Unable to identify the account for this request." };
    const requests = getPasswordChangeRequests();
    if (requests.some(request => request.userId === targetUser.id && request.status === "Pending")) {
        return { ok: false, message: "A password change request is already pending for this account." };
    }

    const availableApprovers = getUsers().filter(user =>
        user.role === "Admin" &&
        (user.status || "Active") === "Active" &&
        user.id !== requestedBy.id
    );
    if (requestedBy.role === "Admin" && availableApprovers.length === 0) {
        return { ok: false, message: "Another active Admin account is required to approve this password change." };
    }
    if (requestedBy.role !== "Admin" && !getUsers().some(user => user.role === "Admin" && (user.status || "Active") === "Active")) {
        return { ok: false, message: "No active Admin is available to approve this password change." };
    }

    requests.push({
        id: generateId("PWD"),
        userId: targetUser.id,
        userName: targetUser.fullName,
        userRole: targetUser.role,
        requestedById: requestedBy.id,
        requestedByName: requestedBy.fullName,
        requestedPassword,
        createdAt: new Date().toISOString(),
        status: "Pending"
    });
    localStorage.setItem(PASSWORD_CHANGE_REQUESTS_KEY, JSON.stringify(requests));
    recordSystemActivity("Password Change Requested", "User Account", `${targetUser.fullName} · awaiting Admin approval`, requestedBy);
    updateNotificationBadge();
    return { ok: true };
}

function changeOwnPassword(event) {
    event.preventDefault();
    const currentUser = getCurrentUser();
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    const feedback = document.getElementById("changePasswordFeedback");
    if (!currentUser) return;
    if (currentUser.password !== currentPassword) {
        feedback.textContent = "Current password is incorrect.";
        return;
    }
    if (newPassword !== confirmNewPassword) {
        feedback.textContent = "New passwords do not match.";
        return;
    }
    const users = getUsers();
    const user = users.find(account => account.id === currentUser.id);
    if (!user) return;
    if (user.role !== "Admin") {
        const result = createPasswordChangeRequest(user, newPassword, currentUser);
        if (!result.ok) {
            feedback.textContent = result.message;
            return;
        }
        event.target.reset();
        feedback.textContent = "Your password request has been sent. Please wait for Admin approval.";
        return;
    }
    user.password = newPassword;
    saveUsers(users);
    recordSystemActivity("Password Changed", "User Account", `${user.fullName} changed their password`);
    event.target.reset();
    feedback.textContent = "Your password was updated.";
}

function setupUserManagementPage() {
    const accountList = document.getElementById("accountList");
    if (!accountList) return;
    document.getElementById("addUserButton").addEventListener("click", () => openUserModal());
    document.getElementById("closeUserModal").addEventListener("click", closeUserModal);
    document.getElementById("cancelUserForm").addEventListener("click", closeUserModal);
    document.getElementById("userForm").addEventListener("submit", saveManagedUser);
    document.getElementById("userFilterApply").addEventListener("click", () => {
        appliedUserFilters.role = document.getElementById("userRoleFilter").value;
        appliedUserFilters.status = document.getElementById("userStatusFilter").value;
        appliedUserFilters.search = document.getElementById("userSearchFilter").value.trim().toLowerCase();
        renderAccountManagement();
    });
    document.getElementById("userFilterReset").addEventListener("click", () => {
        document.getElementById("userRoleFilter").value = "all";
        document.getElementById("userStatusFilter").value = "all";
        document.getElementById("userSearchFilter").value = "";
        Object.assign(appliedUserFilters, { role: "all", status: "all", search: "" });
        renderAccountManagement();
    });
    accountList.addEventListener("click", handleUserListAction);
    document.getElementById("userModal").addEventListener("click", event => {
        if (event.target.id === "userModal") closeUserModal();
    });
    renderAccountManagement();
}

function getLowStockItems() {
    return getStocks().filter(item => getStockStatus(item) !== "Available");
}

function renderLowStocksPage() {
    const tableBody = document.getElementById("reportTableBody");
    const emptyState = document.getElementById("lowStockEmptyState");
    if (!tableBody || !emptyState) return;

    const lowStockItems = getLowStockItems();
    tableBody.innerHTML = lowStockItems.map(item => {
        const status = getStockStatus(item);
        return `
            <tr>
                <td><strong>${escapeAccountHtml(item.name)}</strong></td>
                <td>${escapeAccountHtml(item.category)}</td>
                <td>${escapeAccountHtml(item.quantity)} ${escapeAccountHtml(item.unit)}</td>
                <td>${escapeAccountHtml(item.minimum)} ${escapeAccountHtml(item.unit)}</td>
                <td><span class="status ${getStatusClass(status)}">${escapeAccountHtml(status)}</span></td>
            </tr>`;
    }).join("");
    emptyState.hidden = lowStockItems.length > 0;
    tableBody.closest("table").hidden = lowStockItems.length === 0;
    const count = document.getElementById("lowStockPageCount");
    if (count) count.textContent = String(lowStockItems.length);
}

function renderDriverDeliveryList(container, history = false) {
    const user = getCurrentUser();
    if (!container || user?.role !== "Driver") return;

    const deliveries = getShipments().filter(item =>
        item.type === "Outgoing" &&
        item.assignedDriverId === user.id &&
        (history ? item.status === "Delivered" : item.status === "Pending" || item.status === "In Transit")
    );
    if (history) {
        deliveries.sort((left, right) => Date.parse(right.deliveredAt || right.date) - Date.parse(left.deliveredAt || left.date));
    } else {
        deliveries.reverse();
    }

    if (deliveries.length === 0) {
        container.innerHTML = history
            ? '<div class="empty-state">You have no completed deliveries yet.</div>'
            : '<div class="empty-state">No deliveries are currently assigned to you.</div>';
        return;
    }

    container.innerHTML = deliveries.map(shipment => {
        const action = history
            ? ""
            : !canManagePage("dashboard")
                ? ""
            : shipment.status === "Pending"
                ? `<button type="button" class="primary-btn" onclick="startAssignedDelivery('${escapeAccountHtml(shipment.id)}')">Start Delivery</button>`
                : `<button type="button" class="primary-btn" onclick="completeAssignedDelivery('${escapeAccountHtml(shipment.id)}')">Mark as Complete</button>`;
        const completed = history && shipment.deliveredAt
            ? `<p class="driver-recipient">Completed: ${escapeAccountHtml(new Date(shipment.deliveredAt).toLocaleString())}</p>`
            : "";

        return `
            <article class="driver-shipment-card">
                <div class="driver-card-top">
                    <div>
                        <h3>${escapeAccountHtml(shipment.tracking)}</h3>
                        <p class="driver-recipient">Destination: ${escapeAccountHtml(shipment.supplier)}</p>
                        <p>Items: ${escapeAccountHtml(shipment.supply)} · ${escapeAccountHtml(shipment.quantity)} units</p>
                        <p class="driver-recipient">Date: ${escapeAccountHtml(formatDate(shipment.date))}</p>
                        ${completed}
                    </div>
                    <span class="status ${getStatusClass(shipment.status)}">${escapeAccountHtml(shipment.status)}</span>
                </div>
                <div class="driver-shipment-action">${action}</div>
            </article>`;
    }).join("");
}

function startAssignedDelivery(shipmentId) {
    const user = getCurrentUser();
    if (user?.role !== "Driver" || !canManagePage("dashboard")) return;
    const shipments = getShipments();
    const shipment = shipments.find(item =>
        item.id === shipmentId &&
        item.type === "Outgoing" &&
        item.assignedDriverId === user.id &&
        item.status === "Pending"
    );
    if (!shipment) return;

    shipment.status = "In Transit";
    shipment.startedAt = new Date().toISOString();
    saveShipments(shipments);
    renderDriverDeliveryList(document.getElementById("myDeliveriesList"));
}

function completeAssignedDelivery(shipmentId) {
    const user = getCurrentUser();
    if (user?.role !== "Driver" || !canManagePage("dashboard")) return;
    const shipments = getShipments();
    const shipment = shipments.find(item =>
        item.id === shipmentId &&
        item.type === "Outgoing" &&
        item.assignedDriverId === user.id &&
        item.status === "In Transit"
    );
    if (!shipment) return;

    shipment.status = "Delivered";
    shipment.deliveredAt = new Date().toISOString();
    saveShipments(shipments);
    renderDriverDeliveryList(document.getElementById("myDeliveriesList"));
}

function setupDriverDashboard() {
    const user = getCurrentUser();
    const driverDashboard = document.getElementById("driverDashboard");
    if (user?.role !== "Driver" || !driverDashboard) return;

    document.querySelector(".dashboard-content").hidden = true;
    driverDashboard.hidden = false;
    document.querySelector(".topbar h1").textContent = "My Deliveries";
    renderDriverDeliveryList(document.getElementById("myDeliveriesList"));
}

function setupDriverHistory() {
    const user = getCurrentUser();
    const list = document.getElementById("deliveryHistoryList");
    if (user?.role === "Driver" && list) renderDriverDeliveryList(list, true);
}

function openUserModal(userId = "") {
    if (!isCurrentUserAdmin()) return;
    const form = document.getElementById("userForm");
    const user = userId ? getUsers().find(account => account.id === userId) : null;
    if (userId && !user) return;
    form.reset();
    document.getElementById("userId").value = user?.id || "";
    document.getElementById("userModalTitle").textContent = user ? "Edit User" : "Create Account";
    document.getElementById("userModalDescription").textContent = user ? "Update the selected user account." : "Add a user and assign their role.";
    document.getElementById("userPassword").required = !user;
    document.getElementById("passwordOptionalNote").textContent = user
        ? user.id === getCurrentUser()?.id ? "(leave blank to keep current)" : "(Admin approval required)"
        : "";
    document.getElementById("saveUserButton").textContent = user ? "Save Changes" : "Create Account";
    document.getElementById("userFormFeedback").textContent = "";
    if (user) {
        document.getElementById("userFullName").value = user.fullName;
        document.getElementById("userEmail").value = user.email || "";
        document.getElementById("userUsername").value = user.username;
        document.getElementById("userRole").value = user.role;
        document.getElementById("userStatus").value = user.status || "Active";
        const isEditingSelf = user.id === getCurrentUser()?.id;
        document.getElementById("userRole").disabled = isEditingSelf;
        document.getElementById("userStatus").disabled = isEditingSelf;
    } else {
        document.getElementById("userRole").disabled = false;
        document.getElementById("userStatus").disabled = false;
        document.getElementById("userStatus").value = "Active";
    }
    document.getElementById("userModal").classList.add("show");
}

function closeUserModal() {
    document.getElementById("userModal").classList.remove("show");
}

function saveManagedUser(event) {
    event.preventDefault();
    if (!isCurrentUserAdmin()) return;
    const users = getUsers();
    const id = document.getElementById("userId").value;
    const existing = id ? users.find(account => account.id === id) : null;
    if (id && !existing) return;

    const username = document.getElementById("userUsername").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const password = document.getElementById("userPassword").value;
    const feedback = document.getElementById("userFormFeedback");
    if (users.some(account => account.id !== id && account.username.toLowerCase() === username.toLowerCase())) {
        feedback.textContent = "That username is already in use.";
        return;
    }
    if (users.some(account => account.id !== id && (account.email || "").toLowerCase() === email.toLowerCase())) {
        feedback.textContent = "That email address is already in use.";
        return;
    }
    if (!existing && !password) {
        feedback.textContent = "Enter a password for the new account.";
        return;
    }

    const currentUserId = getCurrentUser()?.id;
    const isSelf = existing?.id === currentUserId;
    let activity = null;
    if (existing) {
        const previousPassword = existing.password;
        const previousUser = { fullName: existing.fullName, email: existing.email, username: existing.username, role: existing.role, status: existing.status || "Active" };
        const requestsPasswordApproval = Boolean(password && password !== previousPassword && !isSelf);
        existing.fullName = document.getElementById("userFullName").value.trim();
        existing.email = email;
        existing.username = username;
        if (password && !requestsPasswordApproval) existing.password = password;
        if (!isSelf) {
            existing.role = document.getElementById("userRole").value;
            existing.status = document.getElementById("userStatus").value;
        }
        const changedFields = ["fullName", "email", "username", "role", "status"]
            .filter(key => String(previousUser[key] ?? "") !== String(existing[key] ?? ""));
        if (requestsPasswordApproval) changedFields.push("password change requested");
        if (changedFields.length) activity = ["Updated", "User Account", `${existing.fullName} · ${changedFields.join(", ")}`];
        if (requestsPasswordApproval) {
            const requestResult = createPasswordChangeRequest(existing, password);
            if (!requestResult.ok) {
                feedback.textContent = requestResult.message;
                return;
            }
        }
    } else {
        const newUser = {
            id: generateId("USR"),
            fullName: document.getElementById("userFullName").value.trim(),
            email,
            username,
            password,
            role: document.getElementById("userRole").value,
            status: document.getElementById("userStatus").value,
            createdAt: new Date().toISOString(),
            lastLogin: ""
        };
        users.push(newUser);
        activity = ["Created", "User Account", `${newUser.fullName} · ${getRoleDisplayName(newUser.role)}`];
    }

    saveUsers(users);
    if (activity) recordSystemActivity(...activity);
    closeUserModal();
    renderAccountManagement();
    setupRoleNavigation();
    updateNotificationBadge();
}

function handleUserListAction(event) {
    if (!canManagePage("users")) return;
    const button = event.target.closest("[data-user-action]");
    if (!button) return;
    const userId = button.dataset.userId;
    if (button.dataset.userAction === "edit") {
        openUserModal(userId);
    } else if (button.dataset.userAction === "status") {
        setManagedUserStatus(userId, button.dataset.nextStatus);
    } else if (button.dataset.userAction === "delete") {
        deleteManagedUser(userId);
    }
}

function setManagedUserStatus(userId, status) {
    if (!isCurrentUserAdmin() || !["Active", "Inactive", "Suspended"].includes(status)) return;
    const users = getUsers();
    const user = users.find(account => account.id === userId);
    if (!user) return;
    if (user.id === getCurrentUser()?.id) return;
    if (user.role === "Admin" && (user.status || "Active") === "Active" && status !== "Active" &&
        !users.some(account => account.id !== user.id && account.role === "Admin" && (account.status || "Active") === "Active")) {
        window.alert("At least one active Admin account must remain.");
        return;
    }
    user.status = status;
    saveUsers(users);
    recordSystemActivity("Status Changed", "User Account", `${user.fullName} · ${status}`);
    renderAccountManagement();
    setupRoleNavigation();
    updateNotificationBadge();
}

function deleteManagedUser(userId) {
    if (!isCurrentUserAdmin()) return;
    const users = getUsers();
    const user = users.find(account => account.id === userId);
    if (!user || user.id === getCurrentUser()?.id) return;
    if (user.role === "Admin" && (user.status || "Active") === "Active" &&
        !users.some(account => account.id !== user.id && account.role === "Admin" && (account.status || "Active") === "Active")) {
        window.alert("The last active Admin account cannot be deleted.");
        return;
    }
    if (!window.confirm(`Delete the account for ${user.fullName}? This cannot be undone.`)) return;
    const userIndex = users.findIndex(account => account.id === userId);
    users.splice(userIndex, 1);
    saveUsers(users);
    recordSystemActivity("Deleted", "User Account", `${user.fullName} · ${getRoleDisplayName(user.role)}`);
    renderAccountManagement();
    setupRoleNavigation();
    updateNotificationBadge();
}

function renderAccountManagement() {
    const accountList = document.getElementById("accountList");
    if (!accountList || !canAccessPage("users")) return;
    const canManageUsers = canManagePage("users");
    document.getElementById("addUserButton").hidden = !canManageUsers;
    document.getElementById("userActionsHeading").hidden = !canManageUsers;
    const users = getUsers();
    const visibleUsers = users.filter(user => {
        const status = user.status || "Active";
        const matchesQuery = `${user.fullName || ""} ${user.username || ""}`.toLowerCase().includes(appliedUserFilters.search);
        const matchesRole = appliedUserFilters.role === "all" || user.role === appliedUserFilters.role;
        const matchesStatus = appliedUserFilters.status === "all" || status === appliedUserFilters.status;
        return matchesQuery && matchesRole && matchesStatus;
    });
    accountList.innerHTML = visibleUsers.map(user => {
        const status = user.status || "Active";
        const isSelf = user.id === getCurrentUser()?.id;
        const nextStatus = status === "Active" ? "Inactive" : status === "Suspended" ? "Active" : "Suspended";
        const statusAction = status === "Active" ? "Deactivate" : status === "Inactive" ? "Activate" : "Unsuspend";
        return `
            <tr>
                <td><strong>${escapeAccountHtml(user.fullName)}</strong><small class="user-secondary">@${escapeAccountHtml(user.username)}</small></td>
                <td>${escapeAccountHtml(user.email || "—")}</td>
                <td><span class="role-label">${escapeAccountHtml(getRoleDisplayName(user.role))}</span></td>
                <td><span class="status user-status ${status.toLowerCase()}">${escapeAccountHtml(status)}</span></td>
                <td>${escapeAccountHtml(formatAccountDate(user.createdAt))}</td>
                <td>${escapeAccountHtml(formatAccountDate(user.lastLogin))}</td>
                ${canManageUsers ? `<td><div class="user-row-actions">
                    <button type="button" class="action-btn" data-user-action="edit" data-user-id="${escapeAccountHtml(user.id)}">Edit</button>
                    ${isSelf ? '<span class="current-account">You</span>' : `<button type="button" class="action-btn" data-user-action="status" data-user-id="${escapeAccountHtml(user.id)}" data-next-status="${nextStatus}">${statusAction}</button><button type="button" class="action-btn delete-btn" data-user-action="delete" data-user-id="${escapeAccountHtml(user.id)}">Delete</button>`}
                </div></td>` : ""}
            </tr>`;
    }).join("");
    document.getElementById("userListEmpty").hidden = visibleUsers.length > 0;
    document.getElementById("userListEmpty").textContent = users.length
        ? "No users match the selected filters."
        : "No users found.";
    document.getElementById("totalUsers").textContent = users.length;
    document.getElementById("activeAdmins").textContent = users.filter(user => user.role === "Admin" && (user.status || "Active") === "Active").length;
    document.getElementById("activeDrivers").textContent = users.filter(user => user.role === "Driver" && (user.status || "Active") === "Active").length;
    document.getElementById("inactiveUsers").textContent = users.filter(user => (user.status || "Active") !== "Active").length;
}

function formatAccountDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });
}

function updateNotificationBadge() {
    const count = getUnreadNotifications().length;
    document.querySelectorAll(".notification-badge").forEach(notice => {
        notice.hidden = count === 0;
        notice.textContent = count > 9 ? "9+" : String(count);
        const trigger = notice.closest(".notification-trigger");
        if (trigger) trigger.setAttribute("aria-label", count ? `Notifications, ${count} alerts` : "Notifications");
    });
    const lowStocksLink = document.querySelector('#mainNavigation [data-nav="reports"]');
    const lowStockCount = getLowStockItems().length;
    if (lowStocksLink) {
        let badge = lowStocksLink.querySelector(".nav-count");
        if (lowStockCount > 0) {
            if (!badge) {
                badge = document.createElement("small");
                badge.className = "nav-count";
                lowStocksLink.appendChild(badge);
            }
            badge.textContent = lowStockCount > 9 ? "9+" : String(lowStockCount);
            badge.setAttribute("aria-label", `${lowStockCount} low stock items`);
        } else {
            badge?.remove();
        }
    }
}

function getNotificationReadKey() {
    return `notificationRead:${getCurrentUser()?.id || "guest"}`;
}

function getReadNotifications() {
    return new Set(JSON.parse(localStorage.getItem(getNotificationReadKey()) || "[]"));
}

function getNotificationItems(type) {
    const preferences = getNotificationPreferences();
    const lowStockAlerts = (preferences.lowStockAlerts === false ? [] : getLowStockItems()).map(item => ({
        id: `alert:stock:${item.id}:${item.quantity}:${item.minimum}`,
        type: "alerts",
        title: `${getStockStatus(item)}: ${item.name}`,
        details: `${item.quantity} ${item.unit} remaining · minimum ${item.minimum} ${item.unit}`,
        page: "reports",
        date: ""
    }));
    const passwordChangeAlerts = isCurrentUserAdmin()
        ? getPasswordChangeRequests()
            .filter(request => request.status === "Pending" && request.requestedById !== getCurrentUser()?.id)
            .map(request => ({
                id: `password-request:${request.id}`,
                requestId: request.id,
                type: "alerts",
                title: "Password change approval needed",
                details: `${request.userName} (${getRoleDisplayName(request.userRole)}) is waiting for password approval.`,
                page: "users",
                date: request.createdAt
            }))
        : [];

    const activityMessages = getActivityLog()
        .filter(entry => (getCurrentUser()?.role !== "Manager" || entry.actorRole !== "Admin") &&
            (entry.entityType !== "Shipment" || preferences.shipmentUpdates !== false))
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
        .map(entry => ({
            id: `message:${entry.id}`,
            type: "messages",
            title: `${entry.action} ${entry.entityType}`,
            details: `${entry.details} · ${entry.actorName}`,
            page: ({
                Supply: "stocks",
                Shipment: "shipment",
                Supplier: "suppliers",
                Buyer: "buyers",
                "Role Permissions": "roles",
                "User Account": isCurrentUserAdmin() ? "users" : "dashboard"
            })[entry.entityType] || "dashboard",
            date: entry.createdAt
        }));

    const news = [{
        id: "news:low-stock-report",
        type: "news",
        title: "Inventory update",
        details: "Low stock alerts and inventory reports are available in the Low Stocks view.",
        page: "reports",
        date: ""
    }, ...getAnnouncements()
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(announcement => ({
            id: `announcement:${announcement.id}`,
            type: "news",
            title: announcement.title,
            details: `${announcement.message} · Posted by ${announcement.authorName}`,
            page: "dashboard",
            date: announcement.createdAt
        }))];

    return {
        alerts: [...passwordChangeAlerts, ...lowStockAlerts],
        messages: activityMessages,
        news
    }[type] || [];
}

function getUnreadNotifications() {
    const read = getReadNotifications();
    return ["alerts", "messages", "news"]
        .flatMap(type => getNotificationItems(type))
        .filter(notification => !read.has(notification.id));
}

function renderNotificationItems(type) {
    const list = document.getElementById("notificationList");
    if (!list) return;

    const read = getReadNotifications();
    const notifications = getNotificationItems(type);
    const announcementForm = type === "news" && isCurrentUserAdmin() ? `
        <form class="announcement-compose" id="announcementForm">
            <strong>Post an announcement</strong>
            <label for="announcementTitle">Title</label>
            <input id="announcementTitle" name="title" type="text" maxlength="100" required>
            <label for="announcementMessage">Message</label>
            <textarea id="announcementMessage" name="message" rows="3" maxlength="500" required></textarea>
            <button type="submit" class="primary-btn">Publish to all users</button>
            <p class="profile-feedback" id="announcementFeedback" role="status" aria-live="polite"></p>
        </form>` : "";
    const notificationItems = notifications.map(notification => `
        <button type="button" class="notification-item${read.has(notification.id) ? " is-read" : ""}" data-notification-id="${escapeAccountHtml(notification.id)}" data-notification-page="${escapeAccountHtml(notification.page)}" data-password-request-id="${escapeAccountHtml(notification.requestId || "")}">
            <span class="notification-item-copy">
                <strong>${escapeAccountHtml(notification.title)}</strong>
                <span>${escapeAccountHtml(notification.details)}</span>
                ${notification.date ? `<small>${escapeAccountHtml(new Date(notification.date).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" }))}</small>` : ""}
            </span>
            ${read.has(notification.id) ? "" : '<span class="notification-unread-dot" aria-label="Unread"></span>'}
        </button>
    `).join("");
    list.innerHTML = `${announcementForm}${notificationItems || `<p class="notification-empty">No ${type} right now.</p>`}`;
}

function setNotificationTab(type) {
    const center = document.getElementById("notificationCenter");
    if (!center || !["alerts", "messages", "news"].includes(type)) return;

    center.querySelectorAll("[data-notification-tab]").forEach(tab => {
        const selected = tab.dataset.notificationTab === type;
        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", String(selected));
    });
    renderNotificationItems(type);
}

function openNotificationCenter() {
    const center = document.getElementById("notificationCenter");
    if (!center) return;
    setNotificationTab(center.dataset.activeTab || "alerts");
    center.classList.add("show");
    center.setAttribute("aria-hidden", "false");
}

function closeNotificationCenter() {
    const center = document.getElementById("notificationCenter");
    if (!center) return;
    center.classList.remove("show");
    center.setAttribute("aria-hidden", "true");
}

function setupNotificationCenter() {
    if (document.getElementById("notificationCenter")) return;

    const center = document.createElement("div");
    center.id = "notificationCenter";
    center.className = "modal notification-modal";
    center.setAttribute("aria-hidden", "true");
    center.innerHTML = `
        <section class="modal-content notification-center-content" role="dialog" aria-modal="true" aria-labelledby="notificationCenterTitle">
            <header class="modal-header">
                <div><h2 id="notificationCenterTitle">Notifications</h2><p>Alerts, messages, and news for your account</p></div>
                <button type="button" class="close-btn" data-notification-close aria-label="Close notifications">&times;</button>
            </header>
            <div class="notification-tabs" role="tablist" aria-label="Notification types">
                <button type="button" class="notification-tab active" role="tab" aria-selected="true" data-notification-tab="alerts">Alerts</button>
                <button type="button" class="notification-tab" role="tab" aria-selected="false" data-notification-tab="messages">Messages</button>
                <button type="button" class="notification-tab" role="tab" aria-selected="false" data-notification-tab="news">News</button>
            </div>
            <div class="notification-list" id="notificationList" role="tabpanel"></div>
        </section>`;
    center.addEventListener("click", event => {
        if (event.target === center || event.target.closest("[data-notification-close]")) {
            closeNotificationCenter();
            return;
        }

        const tab = event.target.closest("[data-notification-tab]");
        if (tab) {
            center.dataset.activeTab = tab.dataset.notificationTab;
            setNotificationTab(tab.dataset.notificationTab);
            return;
        }

        const item = event.target.closest("[data-notification-id]");
        if (!item) return;
        const read = getReadNotifications();
        read.add(item.dataset.notificationId);
        localStorage.setItem(getNotificationReadKey(), JSON.stringify(Array.from(read)));
        updateNotificationBadge();
        closeNotificationCenter();
        if (item.dataset.passwordRequestId) {
            openPasswordChangeRequest(item.dataset.passwordRequestId);
            return;
        }
        showAppPage(item.dataset.notificationPage);
    });
    center.addEventListener("submit", event => {
        const form = event.target.closest("#announcementForm");
        if (!form) return;
        event.preventDefault();
        if (!isCurrentUserAdmin()) {
            window.alert("Only an Admin can post announcements.");
            return;
        }

        const titleInput = form.elements.title;
        const messageInput = form.elements.message;
        const title = titleInput.value.trim();
        const message = messageInput.value.trim();
        const feedback = document.getElementById("announcementFeedback");
        if (!title || !message) {
            feedback.textContent = "Enter both a title and message.";
            return;
        }

        const announcements = getAnnouncements();
        announcements.push({
            id: generateId("ANN"),
            title,
            message,
            authorId: getCurrentUser().id,
            authorName: getCurrentUser().fullName,
            createdAt: new Date().toISOString()
        });
        localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
        updateNotificationBadge();
        renderNotificationItems("news");
        document.getElementById("announcementFeedback").textContent = "Announcement published for all users.";
    });
    document.body.appendChild(center);
    setupPasswordRequestReviewModal();
}

function setupPasswordRequestReviewModal() {
    if (document.getElementById("passwordRequestModal")) return;
    const modal = document.createElement("div");
    modal.id = "passwordRequestModal";
    modal.className = "modal password-request-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <section class="modal-content" role="dialog" aria-modal="true" aria-labelledby="passwordRequestTitle">
            <header class="modal-header">
                <div><h2 id="passwordRequestTitle">Password change request</h2><p id="passwordRequestSubtitle"></p></div>
                <button type="button" class="close-btn" data-password-request-close aria-label="Close password request">&times;</button>
            </header>
            <dl class="profile-details password-request-details">
                <div><dt>Account</dt><dd id="passwordRequestUser"></dd></div>
                <div><dt>Role</dt><dd id="passwordRequestRole"></dd></div>
                <div><dt>Requested by</dt><dd id="passwordRequestRequester"></dd></div>
                <div><dt>Requested</dt><dd id="passwordRequestDate"></dd></div>
            </dl>
            <p class="profile-feedback" id="passwordRequestFeedback" role="status"></p>
            <div class="modal-actions">
                <button type="button" class="secondary-btn" data-password-request-action="reject">Reject</button>
                <button type="button" class="primary-btn" data-password-request-action="approve">Approve</button>
            </div>
        </section>`;
    modal.addEventListener("click", event => {
        if (event.target === modal || event.target.closest("[data-password-request-close]")) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
            return;
        }
        const actionButton = event.target.closest("[data-password-request-action]");
        if (actionButton) resolvePasswordChangeRequest(actionButton.dataset.passwordRequestAction);
    });
    document.body.appendChild(modal);
}

function openPasswordChangeRequest(requestId) {
    const request = getPasswordChangeRequests().find(item => item.id === requestId && item.status === "Pending");
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "Admin" || !request || request.requestedById === currentUser.id) {
        window.alert("This password request is no longer available for your account.");
        return;
    }
    const modal = document.getElementById("passwordRequestModal");
    modal.dataset.requestId = request.id;
    document.getElementById("passwordRequestSubtitle").textContent = "Review this request before changing the account password.";
    document.getElementById("passwordRequestUser").textContent = request.userName;
    document.getElementById("passwordRequestRole").textContent = getRoleDisplayName(request.userRole);
    document.getElementById("passwordRequestRequester").textContent = request.requestedByName;
    document.getElementById("passwordRequestDate").textContent = new Date(request.createdAt).toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" });
    document.getElementById("passwordRequestFeedback").textContent = "";
    modal.querySelectorAll("[data-password-request-action]").forEach(button => {
        button.disabled = false;
    });
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function resolvePasswordChangeRequest(action) {
    if (!["approve", "reject"].includes(action) || !isCurrentUserAdmin()) return;
    const modal = document.getElementById("passwordRequestModal");
    const requestId = modal?.dataset.requestId;
    const requests = getPasswordChangeRequests();
    const request = requests.find(item => item.id === requestId && item.status === "Pending");
    const feedback = document.getElementById("passwordRequestFeedback");
    if (!request) {
        feedback.textContent = "This request has already been handled.";
        return;
    }
    if (request.requestedById === getCurrentUser()?.id) {
        feedback.textContent = "You cannot approve or reject a request that you submitted.";
        return;
    }
    if (action === "approve") {
        const users = getUsers();
        const user = users.find(account => account.id === request.userId);
        if (!user) {
            feedback.textContent = "The requested account no longer exists. Reject this request to clear it.";
            return;
        }
        if (typeof request.requestedPassword !== "string" || request.requestedPassword.length < 6) {
            feedback.textContent = "The requested password is invalid. Reject this request and ask the user to submit it again.";
            return;
        }
        user.password = request.requestedPassword;
        saveUsers(users);
        request.status = "Approved";
        request.decidedAt = new Date().toISOString();
        request.decidedById = getCurrentUser().id;
        request.decidedByName = getCurrentUser().fullName;
        request.requestedPassword = "";
        recordSystemActivity("Password Change Approved", "User Account", `${user.fullName} · approved by ${getCurrentUser().fullName}`);
    } else {
        request.status = "Rejected";
        request.decidedAt = new Date().toISOString();
        request.decidedById = getCurrentUser().id;
        request.decidedByName = getCurrentUser().fullName;
        request.requestedPassword = "";
        recordSystemActivity("Password Change Rejected", "User Account", `${request.userName} · rejected by ${getCurrentUser().fullName}`);
    }
    localStorage.setItem(PASSWORD_CHANGE_REQUESTS_KEY, JSON.stringify(requests));
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    updateNotificationBadge();
    const center = document.getElementById("notificationCenter");
    if (center?.classList.contains("show")) setNotificationTab(center.dataset.activeTab || "alerts");
}

function generateId(prefix) {
    return prefix + Date.now() + Math.floor(Math.random() * 1000);
}

function getStockStatus(item) {
    if (Number(item.quantity) <= 0) {
        return "Out of Stock";
    }

    const hasMinimum = item.minimum !== null && item.minimum !== undefined && String(item.minimum).trim() !== "";
    const minimum = hasMinimum ? Number(item.minimum) : getInventorySettings().lowStockThreshold;
    if (Number(item.quantity) <= minimum) {
        return "Low Stock";
    }

    return "Available";
}

function getStatusClass(status) {
    if (status === "Available" || status === "Active" || status === "Delivered") {
        return "available";
    }

    if (status === "Low Stock" || status === "Pending") {
        return "low";
    }

    if (status === "Out of Stock" || status === "Inactive" || status === "Cancelled") {
        return "out";
    }

    if (status === "In Transit") {
        return "transit";
    }

    return "";
}

function formatDate(date) {
    if (!date) {
        return "";
    }

    return new Date(date + "T00:00:00").toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function loadDashboard() {
    const stocks = getStocks();
    const shipments = getShipments();

    const lowStock = stocks.filter(item => Number(item.quantity) <= Number(item.minimum));
    const availableStock = stocks.reduce((total, item) => total + Number(item.quantity), 0);
    const pending = shipments.filter(item => item.status === "Pending" || item.status === "In Transit");

    const totalProducts = document.getElementById("totalProducts");
    const lowStockCount = document.getElementById("lowStockCount");
    const availableStockElement = document.getElementById("availableStock");
    const pendingShipments = document.getElementById("pendingShipments");

    if (totalProducts) totalProducts.textContent = stocks.length;
    if (lowStockCount) lowStockCount.textContent = lowStock.length;
    if (availableStockElement) availableStockElement.textContent = availableStock;
    if (pendingShipments) pendingShipments.textContent = pending.length;

    const loggedUser = document.getElementById("loggedUser");

    if (loggedUser) {
        loggedUser.textContent = localStorage.getItem("loggedUser") || "Administrator";
    }

    const alertContainer = document.getElementById("dashboardLowStock");

    if (alertContainer) {
        alertContainer.innerHTML = "";

        if (lowStock.length === 0) {
            alertContainer.innerHTML = '<div class="empty-state">All supplies have sufficient stock.</div>';
        } else {
            lowStock.slice(0, 5).forEach(item => {
                alertContainer.innerHTML += `
                    <div class="alert-item">
                        <div>
                            <strong>${item.name}</strong>
                            <span>${item.quantity} ${item.unit} remaining</span>
                        </div>
                        <span class="status low">Low Stock</span>
                    </div>
                `;
            });
        }
    }

    const shipmentContainer = document.getElementById("dashboardShipments");

    if (shipmentContainer) {
        shipmentContainer.innerHTML = "";

        if (shipments.length === 0) {
            shipmentContainer.innerHTML = '<div class="empty-state">No shipment records found.</div>';
        } else {
            shipments.slice(-5).reverse().forEach(item => {
                shipmentContainer.innerHTML += `
                    <div class="shipment-item">
                        <div>
                            <strong>${item.tracking}</strong>
                            <small>${item.supply} · ${item.type}</small>
                        </div>
                        <span class="status ${getStatusClass(item.status)}">${item.status}</span>
                    </div>
                `;
            });
        }
    }

    const categoryGrid = document.getElementById("dashboardCategoryGrid");
    if (categoryGrid) {
        const categories = getInventoryCategories();
        const displayedCategories = categories.filter((category, index) =>
            !categories.slice(0, index).some(previous =>
                normalizeInventoryCategory(previous.name) === normalizeInventoryCategory(category.name)
            )
        );
        categoryGrid.innerHTML = displayedCategories.map(category => {
            const count = stocks.filter(item =>
                normalizeInventoryCategory(item.category) === normalizeInventoryCategory(category.name)
            ).length;
            const heading = category.label || category.name;
            return `
                <div class="category-card">
                    <span>${escapeAccountHtml(category.emoji)}</span>
                    <h3>${escapeAccountHtml(heading)}</h3>
                    <p>${count} items</p>
                </div>
            `;
        }).join("");
    }
}

function loadReports() {
    const stocks = getStocks();
    const shipments = getShipments();
    const suppliers = getSuppliers();

    const lowStock = getLowStockItems();
    const incoming = shipments.filter(item => item.type === "Incoming");

    const reportProducts = document.getElementById("reportProducts");
    const reportLowStock = document.getElementById("reportLowStock");
    const reportIncoming = document.getElementById("reportIncoming");
    const reportSuppliers = document.getElementById("reportSuppliers");

    if (reportProducts) reportProducts.textContent = stocks.length;
    if (reportLowStock) reportLowStock.textContent = lowStock.length;
    if (reportIncoming) reportIncoming.textContent = incoming.length;
    if (reportSuppliers) reportSuppliers.textContent = suppliers.length;
}

document.addEventListener("DOMContentLoaded", function () {
    initializeTheme();
    initializeLocalStorageData();
    initializeUserAccounts();
    checkLogin();
    setupSidebarToggle();
    setupRoleNavigation();
    setupRolePermissionsPage();
    setupProfileExperience();
    setupUserManagementPage();
    setupActivityLogPage();
    setupDriverDashboard();
    setupDriverHistory();
    setupInventoryCategories();
    setupFeatureNavigation();
    setupFeaturePageToolbars();
    setupFilterPanelToggles();
    renderLowStocksPage();
    loadDashboard();
    loadReports();
    enforceCurrentPageAccess();
});

window.addEventListener("storage", event => {
    if (event.key === THEME_PREFERENCE_KEY) {
        setTheme(event.newValue);
    } else if (event.key === PASSWORD_CHANGE_REQUESTS_KEY) {
        updateNotificationBadge();
        const center = document.getElementById("notificationCenter");
        if (center?.classList.contains("show")) setNotificationTab(center.dataset.activeTab || "alerts");
    } else if (event.key === ANNOUNCEMENTS_KEY) {
        updateNotificationBadge();
        const center = document.getElementById("notificationCenter");
        if (center?.classList.contains("show")) setNotificationTab(center.dataset.activeTab || "alerts");
    } else if (event.key === "stocks") {
        setupRoleNavigation();
        updateNotificationBadge();
        renderLowStocksPage();
        loadReports();
        loadDashboard();
    } else if (event.key === "users") {
        setupRoleNavigation();
        renderAccountManagement();
        const user = getCurrentUser();
        if (!user || (user.status || "Active") !== "Active") {
            logout();
        } else {
            enforceCurrentPageAccess();
        }
    } else if (event.key === ROLE_PERMISSIONS_KEY) {
        setupRoleNavigation();
        renderAccountManagement();
        renderStocks();
        renderShipments();
        renderSuppliers();
        renderBuyers();
        enforceCurrentPageAccess();
    } else if (event.key === "shipments") {
        loadDashboard();
        loadReports();
        setupDriverDashboard();
        setupDriverHistory();
        if (typeof renderShipments === "function") renderShipments();
    } else if (event.key === "activityLog") {
        renderActivityLog();
    } else if (event.key === "suppliers") {
        renderSuppliers();
        loadReports();
    } else if (event.key === "buyers") {
        renderBuyers();
    } else if (event.key === INVENTORY_CATEGORIES_KEY) {
        populateInventoryCategorySelects();
        loadDashboard();
    }
});