const shipmentForm = document.getElementById("shipmentForm");
const shipmentModal = document.getElementById("shipmentModal");
const shipmentTableBody = document.getElementById("shipmentTableBody");
const shipmentIdInput = document.getElementById("shipmentId");
const shipmentTypeFilter = document.getElementById("shipmentTypeFilter");
const shipmentStatusFilter = document.getElementById("shipmentStatusFilter");
const shipmentDateFrom = document.getElementById("shipmentDateFrom");
const shipmentDateTo = document.getElementById("shipmentDateTo");
const shipmentSearchFilter = document.getElementById("shipmentSearchFilter");
const appliedShipmentFilters = { type: "all", status: "all", dateFrom: "", dateTo: "", search: "" };
const shipmentType = document.getElementById("shipmentType");
const shipmentSupply = document.getElementById("shipmentSupply");
const shipmentSupplier = document.getElementById("shipmentSupplier");
const shipmentBuyer = document.getElementById("shipmentBuyer");
const shipmentSupplierGroup = document.getElementById("shipmentSupplierGroup");
const shipmentBuyerGroup = document.getElementById("shipmentBuyerGroup");
const shipmentSupplierHint = document.getElementById("shipmentSupplierHint");
const shipmentStatusGroup = document.getElementById("shipmentStatusGroup");
const shipmentStatus = document.getElementById("shipmentStatus");
const shipmentDriverGroup = document.getElementById("shipmentDriverGroup");
const shipmentDriver = document.getElementById("shipmentDriver");
const receiveModal = document.getElementById("receiveModal");
const incomingShipmentList = document.getElementById("incomingShipmentList");

function openReceiveSupplies() {
    if (!canManagePage("shipment")) return;
    renderIncomingReceipts();
    receiveModal.classList.add("show");
}

function closeReceiveSupplies() {
    receiveModal.classList.remove("show");
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}

function normalizeCategory(category) {
    const normalized = String(category ?? "").trim().toLowerCase();
    return normalized === "beans" ? "coffee beans" : normalized;
}

function populateShipmentProducts() {
    const stocks = getStocks();
    shipmentSupply.innerHTML = '<option value="">Select a product</option>' + stocks.map(item => `
        <option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} (${escapeHtml(item.quantity)} ${escapeHtml(item.unit)} available)</option>
    `).join("");
    shipmentSupply.disabled = shipmentType.value === "" || stocks.length === 0;
}

function populateShipmentDrivers() {
    const drivers = getUsers().filter(user => user.role === "Driver");
    shipmentDriver.innerHTML = '<option value="">Select a driver</option>' + drivers.map(driver => `
        <option value="${escapeHtml(driver.id)}">${escapeHtml(driver.fullName)} (@${escapeHtml(driver.username)})</option>
    `).join("");
}

function populateShipmentBuyers() {
    const buyerOptions = document.getElementById("shipmentBuyerOptions");
    if (!buyerOptions) return;
    buyerOptions.innerHTML = getBuyers()
        .filter(buyer => (buyer.status || "Active") === "Active")
        .map(buyer => `<option value="${escapeHtml(buyer.name)}"></option>`)
        .join("");
}

function updateShipmentSuppliers() {
    const selectedStock = getStocks().find(item => String(item.id) === shipmentSupply.value);
    const activeSuppliers = getSuppliers().filter(item => item.status === "Active");
    const category = normalizeCategory(selectedStock?.category);
    const matchingSuppliers = category
        ? activeSuppliers.filter(item => normalizeCategory(item.category) === category)
        : activeSuppliers;
    const suppliers = matchingSuppliers.length > 0 ? matchingSuppliers : activeSuppliers;

    shipmentSupplier.innerHTML = '<option value="">Select a supplier</option>' + suppliers.map(item => `
        <option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}${matchingSuppliers.length === 0 && category ? ` (${escapeHtml(item.category)})` : ""}</option>
    `).join("");
    shipmentSupplier.disabled = shipmentType.value !== "Incoming" || suppliers.length === 0;
    shipmentSupplierHint.textContent = suppliers.length === 0
        ? "No active suppliers found. Add a supplier before recording this incoming shipment."
        : matchingSuppliers.length === 0 && category
            ? "No exact category match. Choose from your active suppliers."
            : category
                ? `Recommended active suppliers for ${selectedStock.name}.`
                : "Choose from your active suppliers.";
}

function updateShipmentFields(preserveValues = false) {
    const isIncoming = shipmentType.value === "Incoming";
    const isOutgoing = shipmentType.value === "Outgoing";
    const isEditing = Boolean(shipmentIdInput.value);
    const deliveredOption = shipmentStatus.querySelector('option[value="Delivered"]');

    shipmentSupplierGroup.hidden = !isIncoming;
    shipmentBuyerGroup.hidden = !isOutgoing;
    shipmentSupplier.disabled = !isIncoming;
    shipmentSupplier.required = isIncoming;
    shipmentBuyer.disabled = !isOutgoing;
    shipmentBuyer.required = isOutgoing;
    shipmentStatusGroup.hidden = !isIncoming && !isEditing;
    shipmentStatus.disabled = !isIncoming && !isEditing;
    shipmentStatus.required = isIncoming || isEditing;
    shipmentDriverGroup.hidden = !isOutgoing;
    shipmentDriver.disabled = !isOutgoing;
    shipmentDriver.required = isOutgoing;
    deliveredOption.hidden = isIncoming && !isEditing;
    deliveredOption.disabled = isIncoming && !isEditing;

    if (!preserveValues) {
        shipmentBuyer.value = "";
        shipmentStatus.value = "Pending";
    }

    populateShipmentProducts();
    updateShipmentSuppliers();
    populateShipmentDrivers();
    populateShipmentBuyers();
}

function renderIncomingReceipts() {
    const incoming = getShipments().filter(item => item.type === "Incoming").slice().reverse();

    if (incoming.length === 0) {
        incomingShipmentList.innerHTML = '<div class="empty-state">No incoming supplies to receive.</div>';
        return;
    }

    const stages = ["Order placed", "In transit", "Received"];
    incomingShipmentList.innerHTML = incoming.map(item => {
        const status = item.status;
        const currentStep = status === "Delivered" ? 2 : status === "In Transit" ? 1 : 0;
        const currentLocation = status === "Delivered"
            ? "Received by CafeCore"
            : status === "In Transit"
                ? `On the way from ${escapeHtml(item.supplier)}`
                : status === "Cancelled"
                    ? "Shipment cancelled"
                    : "Waiting for supplier dispatch";
        const timeline = status === "Cancelled"
            ? '<p class="driver-cancelled">This incoming shipment was cancelled.</p>'
            : `<ol class="driver-timeline">${stages.map((stage, index) => `
                <li class="${index < currentStep ? "complete" : index === currentStep ? "current" : ""}">${stage}</li>
            `).join("")}</ol>`;
        const action = status === "In Transit"
            ? `<button class="primary-btn" onclick="receiveIncomingShipment('${escapeHtml(item.id)}')">Confirm Received</button>`
            : status === "Delivered"
                ? '<button class="secondary-btn" disabled>Received</button>'
                : status === "Pending"
                    ? '<span class="driver-recipient">Available after supplier dispatch</span>'
                    : "";

        return `
            <article class="driver-shipment-card">
                <div class="driver-card-top">
                    <div>
                        <h3>${escapeHtml(item.tracking)} · ${escapeHtml(item.supply)}</h3>
                        <p>${escapeHtml(item.quantity)} units · ${escapeHtml(formatDate(item.date))}</p>
                        <p class="driver-recipient">Supplier: ${escapeHtml(item.supplier)}</p>
                    </div>
                    <span class="status ${getStatusClass(status)}">${escapeHtml(status)}</span>
                </div>
                <div class="driver-current-location">${currentLocation}</div>
                ${timeline}
                ${action ? `<div class="driver-shipment-action">${action}</div>` : ""}
            </article>
        `;
    }).join("");
}

function receiveIncomingShipment(id) {
    if (!canManagePage("shipment")) return;
    const shipments = getShipments();
    const shipment = shipments.find(item => item.id === id && item.type === "Incoming");

    if (!shipment || shipment.status !== "In Transit") return;

    shipment.status = "Delivered";
    saveShipments(shipments);
    renderShipments();
    renderIncomingReceipts();
}

function openShipmentModal(id = "") {
    if (!canManagePage("shipment")) return;
    shipmentForm.reset();
    shipmentIdInput.value = id;
    document.getElementById("shipmentModalTitle").textContent = id ? "Edit Shipment" : "Add Shipment";
    document.getElementById("shipmentModalDescription").textContent = id
        ? "Update the shipment record"
        : "Create a new shipment record";

    const shipment = id ? getShipments().find(item => item.id === id) : null;
    if (id && !shipment) return;
    if (shipment) {
        shipmentType.value = shipment.type;
        updateShipmentFields(true);
        const stock = getStocks().find(item => item.name === shipment.supply);
        if (stock) {
            shipmentSupply.value = stock.id;
        } else {
            shipmentSupply.add(new Option(`${shipment.supply} (not in stocks)`, "__missing__"));
            shipmentSupply.value = "__missing__";
        }
        updateShipmentSuppliers();
        if (shipment.type === "Incoming" && !Array.from(shipmentSupplier.options).some(option => option.value === shipment.supplier)) {
            shipmentSupplier.add(new Option(shipment.supplier, shipment.supplier));
        }
        shipmentSupplier.value = shipment.type === "Incoming" ? shipment.supplier : "";
        shipmentBuyer.value = shipment.type === "Outgoing" ? shipment.supplier : "";
        shipmentDriver.value = shipment.assignedDriverId || "";
        shipmentStatus.value = shipment.status;
        document.getElementById("shipmentQuantity").value = shipment.quantity;
        document.getElementById("shipmentDate").value = shipment.date;
    } else {
        updateShipmentFields(true);
        document.getElementById("shipmentDate").value = new Date().toISOString().split("T")[0];
    }

    shipmentModal.classList.add("show");
}

function closeShipmentModal() {
    shipmentModal.classList.remove("show");
}

function renderShipments() {
    const shipments = getShipments();
    const canManageShipments = canManagePage("shipment");
    document.querySelector(".receive-supply-trigger").hidden = !canManageShipments;
    document.querySelector('#page-shipment .shipment-toolbar-actions > .primary-btn').hidden = !canManageShipments;
    document.getElementById("shipmentActionsHeading").hidden = !canManageShipments;
    const filtered = shipments.filter(item => {
        const date = String(item.date || "");
        const searchText = `${item.tracking || ""} ${item.supply || ""}`.toLowerCase();
        return (appliedShipmentFilters.type === "all" || item.type === appliedShipmentFilters.type) &&
            (appliedShipmentFilters.status === "all" || item.status === appliedShipmentFilters.status) &&
            (!appliedShipmentFilters.dateFrom || date >= appliedShipmentFilters.dateFrom) &&
            (!appliedShipmentFilters.dateTo || date <= appliedShipmentFilters.dateTo) &&
            searchText.includes(appliedShipmentFilters.search);
    });

    shipmentTableBody.innerHTML = "";

    if (filtered.length === 0) {
        shipmentTableBody.innerHTML = `
            <tr>
                <td colspan="${canManageShipments ? 8 : 7}">
                    <div class="empty-state">${shipments.length ? "No shipments match the selected filters." : "No shipment records found."}</div>
                </td>
            </tr>
        `;
    } else {
        filtered.slice().reverse().forEach(item => {
            shipmentTableBody.innerHTML += `
                <tr>
                    <td><strong>${escapeHtml(item.tracking)}</strong></td>
                    <td>${escapeHtml(item.type)}</td>
                    <td>${escapeHtml(item.supply)}</td>
                    <td>${escapeHtml(item.supplier)}${item.assignedDriver ? `<small class="shipment-driver">Driver: ${escapeHtml(item.assignedDriver)}</small>` : ""}</td>
                    <td>${escapeHtml(item.quantity)}</td>
                    <td>${escapeHtml(formatDate(item.date))}</td>
                    <td>
                        <span class="status ${getStatusClass(item.status)}">${escapeHtml(item.status)}</span>
                    </td>
                    ${canManageShipments ? `<td>
                        <button class="action-btn" onclick="openShipmentModal('${escapeHtml(item.id)}')">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteShipment('${escapeHtml(item.id)}')">Delete</button>
                    </td>` : ""}
                </tr>
            `;
        });
    }

    updateShipmentSummary(shipments);
}

function updateShipmentSummary(shipments) {
    const incoming = shipments.filter(item => item.type === "Incoming");
    const outgoing = shipments.filter(item => item.type === "Outgoing");
    const pending = shipments.filter(item => item.status === "Pending" || item.status === "In Transit");

    document.getElementById("shipmentTotal").textContent = shipments.length;
    document.getElementById("incomingCount").textContent = incoming.length;
    document.getElementById("outgoingCount").textContent = outgoing.length;
    document.getElementById("shipmentPending").textContent = pending.length;
}

shipmentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!canManagePage("shipment")) return;

    const shipments = getShipments();
    const type = shipmentType.value;
    const selectedStock = getStocks().find(item => String(item.id) === shipmentSupply.value);
    const selectedDriver = type === "Outgoing"
        ? getUsers().find(user => user.id === shipmentDriver.value && user.role === "Driver")
        : null;

    if (type === "Outgoing" && !selectedDriver) {
        shipmentDriver.setCustomValidity("Select a driver for this outgoing shipment.");
        shipmentDriver.reportValidity();
        shipmentDriver.setCustomValidity("");
        return;
    }

    const shipment = {
        id: shipmentIdInput.value || generateId("SHP"),
        tracking: "SHP-" + Math.floor(10000 + Math.random() * 90000),
        type,
        supply: selectedStock ? selectedStock.name : shipments.find(item => item.id === shipmentIdInput.value)?.supply || "",
        supplier: type === "Outgoing" ? shipmentBuyer.value.trim() : shipmentSupplier.value,
        quantity: Number(document.getElementById("shipmentQuantity").value),
        date: document.getElementById("shipmentDate").value,
        status: type === "Outgoing" && !shipmentIdInput.value ? "Pending" : document.getElementById("shipmentStatus").value,
        assignedDriverId: selectedDriver?.id || "",
        assignedDriver: selectedDriver?.fullName || ""
    };

    if (shipmentIdInput.value) {
        const index = shipments.findIndex(item => item.id === shipmentIdInput.value);
        if (index === -1) return;
        shipment.tracking = shipments[index].tracking;
        Object.assign(shipments[index], shipment);
    } else {
        shipments.push(shipment);
    }
    saveShipments(shipments);

    closeShipmentModal();
    renderShipments();
});

function deleteShipment(id) {
    if (!canManagePage("shipment")) return;
    const confirmed = confirm("Delete this shipment record?");

    if (!confirmed) return;

    const shipments = getShipments();
    const index = shipments.findIndex(item => item.id === id);
    if (index === -1) return;
    shipments.splice(index, 1);
    saveShipments(shipments);
    renderShipments();
}

document.getElementById("shipmentFilterApply").addEventListener("click", () => {
    appliedShipmentFilters.type = shipmentTypeFilter.value;
    appliedShipmentFilters.status = shipmentStatusFilter.value;
    appliedShipmentFilters.dateFrom = shipmentDateFrom.value;
    appliedShipmentFilters.dateTo = shipmentDateTo.value;
    appliedShipmentFilters.search = shipmentSearchFilter.value.trim().toLowerCase();
    renderShipments();
});

document.getElementById("shipmentFilterReset").addEventListener("click", () => {
    shipmentTypeFilter.value = "all";
    shipmentStatusFilter.value = "all";
    shipmentDateFrom.value = "";
    shipmentDateTo.value = "";
    shipmentSearchFilter.value = "";
    Object.assign(appliedShipmentFilters, { type: "all", status: "all", dateFrom: "", dateTo: "", search: "" });
    renderShipments();
});

shipmentType.addEventListener("change", updateShipmentFields);
shipmentSupply.addEventListener("change", updateShipmentSuppliers);

document.addEventListener("DOMContentLoaded", function () {
    renderShipments();
});