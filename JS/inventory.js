const stockForm = document.getElementById("stockForm");
const stockModal = document.getElementById("stockModal");
const stockTableBody = document.getElementById("stockTableBody");
const stockCategoryFilter = document.getElementById("stockCategoryFilter");
const stockStatusFilter = document.getElementById("stockStatusFilter");
const stockSearchFilter = document.getElementById("stockSearchFilter");
const appliedStockFilters = { category: "all", status: "all", search: "" };

function openStockModal(id = null) {
    if (!canManagePage("stocks")) return;
    stockModal.classList.add("show");

    if (id) {
        const stocks = getStocks();
        const item = stocks.find(stock => stock.id === id);

        if (!item) return;

        document.getElementById("stockModalTitle").textContent = "Edit Supply";
        document.getElementById("stockId").value = item.id;
        document.getElementById("stockName").value = item.name;
        document.getElementById("stockCategory").value = item.category;
        document.getElementById("stockQuantityInput").value = item.quantity;
        document.getElementById("stockUnit").value = item.unit;
        document.getElementById("stockMinimum").value = item.minimum;
        document.getElementById("stockSupplier").value = item.supplier;
    } else {
        document.getElementById("stockModalTitle").textContent = "Add Supply";
        stockForm.reset();
        document.getElementById("stockId").value = "";
        document.getElementById("stockMinimum").value = String(getInventorySettings().lowStockThreshold);
    }
}

function closeStockModal() {
    stockModal.classList.remove("show");
}

function renderStocks() {
    const stocks = getStocks();
    const canManageStocks = canManagePage("stocks");
    document.getElementById("addStockButton").hidden = !canManageStocks;
    document.getElementById("stockActionsHeading").hidden = !canManageStocks;
    const filtered = stocks.filter(item => {
        const matchesSearch = String(item.name || "").toLowerCase().includes(appliedStockFilters.search);
        const matchesCategory = appliedStockFilters.category === "all" || item.category === appliedStockFilters.category;
        const status = getStockStatus(item);
        const matchesStatus = appliedStockFilters.status === "all" || status === appliedStockFilters.status;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    stockTableBody.innerHTML = "";

    if (filtered.length === 0) {
        stockTableBody.innerHTML = `
            <tr>
                <td colspan="${canManageStocks ? 7 : 6}">
                    <div class="empty-state">${stocks.length ? "No supplies match the selected filters." : "No supplies found."}</div>
                </td>
            </tr>
        `;
    } else {
        filtered.forEach(item => {
            const status = getStockStatus(item);

            stockTableBody.innerHTML += `
                <tr>
                    <td><strong>${item.name}</strong></td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>${item.minimum}</td>
                    <td>
                        <span class="status ${getStatusClass(status)}">${status}</span>
                    </td>
                    ${canManageStocks ? `<td>
                        <button class="action-btn" onclick="openStockModal('${item.id}')">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteStock('${item.id}')">Delete</button>
                    </td>` : ""}
                </tr>
            `;
        });
    }

    updateStockSummary(stocks);
}

function updateStockSummary(stocks) {
    const lowStock = stocks.filter(item => Number(item.quantity) > 0 && Number(item.quantity) <= Number(item.minimum));
    const outOfStock = stocks.filter(item => Number(item.quantity) <= 0);
    const totalQuantity = stocks.reduce((total, item) => total + Number(item.quantity), 0);

    document.getElementById("stockTotal").textContent = stocks.length;
    document.getElementById("stockLow").textContent = lowStock.length;
    document.getElementById("stockOut").textContent = outOfStock.length;
    document.getElementById("stockQuantity").textContent = totalQuantity;
}

stockForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!canManagePage("stocks")) return;

    const stocks = getStocks();
    const id = document.getElementById("stockId").value;

    const item = {
        id: id || generateId("STK"),
        name: document.getElementById("stockName").value.trim(),
        category: document.getElementById("stockCategory").value,
        quantity: Number(document.getElementById("stockQuantityInput").value),
        unit: document.getElementById("stockUnit").value,
        minimum: Number(document.getElementById("stockMinimum").value),
        supplier: document.getElementById("stockSupplier").value.trim() || "Not Assigned"
    };

    if (id) {
        const index = stocks.findIndex(stock => stock.id === id);

        if (index !== -1) {
            stocks[index] = item;
        }
    } else {
        stocks.push(item);
    }

    saveStocks(stocks);
    closeStockModal();
    renderStocks();
});

function deleteStock(id) {
    if (!canManagePage("stocks")) return;
    const stocks = getStocks();
    const item = stocks.find(stock => stock.id === id);

    if (!item) return;

    const confirmed = confirm(`Delete ${item.name} from inventory?`);

    if (!confirmed) return;

    const index = stocks.findIndex(stock => stock.id === id);
    stocks.splice(index, 1);
    saveStocks(stocks);
    renderStocks();
}

document.getElementById("stockFilterApply").addEventListener("click", () => {
    appliedStockFilters.category = stockCategoryFilter.value;
    appliedStockFilters.status = stockStatusFilter.value;
    appliedStockFilters.search = stockSearchFilter.value.trim().toLowerCase();
    renderStocks();
});

document.getElementById("stockFilterReset").addEventListener("click", () => {
    stockCategoryFilter.value = "all";
    stockStatusFilter.value = "all";
    stockSearchFilter.value = "";
    appliedStockFilters.category = "all";
    appliedStockFilters.status = "all";
    appliedStockFilters.search = "";
    renderStocks();
});

document.addEventListener("DOMContentLoaded", renderStocks);