const supplierForm = document.getElementById("supplierForm");
const supplierModal = document.getElementById("supplierModal");
const supplierGrid = document.getElementById("supplierGrid");
const supplierCategoryFilter = document.getElementById("supplierCategoryFilter");
const supplierStatusFilter = document.getElementById("supplierStatusFilter");
const supplierSearchFilter = document.getElementById("supplierSearchFilter");
const appliedSupplierFilters = { category: "all", status: "all", search: "" };

function openSupplierModal(id = null) {
    if (!canManagePage("suppliers")) return;
    supplierModal.classList.add("show");

    if (id) {
        const suppliers = getSuppliers();
        const supplier = suppliers.find(item => item.id === id);

        if (!supplier) return;

        document.getElementById("supplierId").value = supplier.id;
        document.getElementById("supplierName").value = supplier.name;
        document.getElementById("supplierContact").value = supplier.contact;
        document.getElementById("supplierPhone").value = supplier.phone;
        document.getElementById("supplierEmail").value = supplier.email;
        document.getElementById("supplierCategory").value = supplier.category;
        document.getElementById("supplierStatus").value = supplier.status;
    } else {
        supplierForm.reset();
        document.getElementById("supplierId").value = "";
    }
}

function closeSupplierModal() {
    supplierModal.classList.remove("show");
}

function renderSuppliers() {
    const suppliers = getSuppliers();
    const canManageSuppliers = canManagePage("suppliers");
    document.getElementById("supplierAddButton").hidden = !canManageSuppliers;
    updateSupplierSummary(suppliers);
    const filtered = suppliers.filter(supplier => {
        const matchesCategory = appliedSupplierFilters.category === "all" || supplier.category === appliedSupplierFilters.category;
        const matchesStatus = appliedSupplierFilters.status === "all" || (supplier.status || "Active") === appliedSupplierFilters.status;
        const matchesSearch = String(supplier.name || "").toLowerCase().includes(appliedSupplierFilters.search);
        return matchesCategory && matchesStatus && matchesSearch;
    });

    supplierGrid.innerHTML = "";

    if (filtered.length === 0) {
        supplierGrid.innerHTML = `
            <div class="panel">
                <div class="empty-state">${suppliers.length ? "No suppliers match the selected filters." : "No suppliers found."}</div>
            </div>
        `;
    } else {
        filtered.forEach(supplier => {
            supplierGrid.innerHTML += `
                <div class="supplier-card">

                    <div class="supplier-top">
                        <div class="supplier-icon">🏢</div>
                        <span class="status ${getStatusClass(supplier.status)}">${supplier.status}</span>
                    </div>

                    <h3>${supplier.name}</h3>

                    <div class="supplier-info">
                        <p><strong>Contact:</strong> ${supplier.contact}</p>
                        <p><strong>Phone:</strong> ${supplier.phone}</p>
                        <p><strong>Email:</strong> ${supplier.email || "Not provided"}</p>
                        <p><strong>Category:</strong> ${supplier.category}</p>
                    </div>

                    ${canManageSuppliers ? `<div class="supplier-actions">
                        <button class="action-btn" onclick="openSupplierModal('${supplier.id}')">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteSupplier('${supplier.id}')">Delete</button>
                    </div>` : ""}

                </div>
            `;
        });
    }

}

function updateSupplierSummary(suppliers) {
    const active = suppliers.filter(item => item.status === "Active");
    document.getElementById("supplierTotal").textContent = suppliers.length;
    document.getElementById("activeSupplierCount").textContent = active.length;
}

supplierForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!canManagePage("suppliers")) return;

    const suppliers = getSuppliers();
    const id = document.getElementById("supplierId").value;

    const supplier = {
        id: id || generateId("SUP"),
        name: document.getElementById("supplierName").value.trim(),
        contact: document.getElementById("supplierContact").value.trim(),
        phone: document.getElementById("supplierPhone").value.trim(),
        email: document.getElementById("supplierEmail").value.trim(),
        category: document.getElementById("supplierCategory").value,
        status: document.getElementById("supplierStatus").value
    };

    if (id) {
        const index = suppliers.findIndex(item => item.id === id);

        if (index !== -1) {
            suppliers[index] = supplier;
        }
    } else {
        suppliers.push(supplier);
    }

    saveSuppliers(suppliers);
    closeSupplierModal();
    renderSuppliers();
});

function deleteSupplier(id) {
    if (!canManagePage("suppliers")) return;
    const suppliers = getSuppliers();
    const supplier = suppliers.find(item => item.id === id);

    if (!supplier) return;

    const confirmed = confirm(`Delete ${supplier.name}?`);

    if (!confirmed) return;

    const index = suppliers.findIndex(item => item.id === id);
    suppliers.splice(index, 1);
    saveSuppliers(suppliers);
    renderSuppliers();
}

document.addEventListener("DOMContentLoaded", renderSuppliers);

document.getElementById("supplierFilterApply").addEventListener("click", () => {
    appliedSupplierFilters.category = supplierCategoryFilter.value;
    appliedSupplierFilters.status = supplierStatusFilter.value;
    appliedSupplierFilters.search = supplierSearchFilter.value.trim().toLowerCase();
    renderSuppliers();
});

document.getElementById("supplierFilterReset").addEventListener("click", () => {
    supplierCategoryFilter.value = "all";
    supplierStatusFilter.value = "all";
    supplierSearchFilter.value = "";
    appliedSupplierFilters.category = "all";
    appliedSupplierFilters.status = "all";
    appliedSupplierFilters.search = "";
    renderSuppliers();
});