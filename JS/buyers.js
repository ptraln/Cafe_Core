const buyerForm = document.getElementById("buyerForm");
const buyerModal = document.getElementById("buyerModal");
const buyerGrid = document.getElementById("buyerGrid");

function openBuyerModal(id = "") {
    if (!canManagePage("buyers")) return;
    buyerForm.reset();
    document.getElementById("buyerId").value = "";
    document.getElementById("buyerModalTitle").textContent = id ? "Edit Buyer" : "Add Buyer";

    if (id) {
        const buyer = getBuyers().find(item => item.id === id);
        if (!buyer) return;
        document.getElementById("buyerId").value = buyer.id;
        document.getElementById("buyerName").value = buyer.name;
        document.getElementById("buyerContact").value = buyer.contact;
        document.getElementById("buyerPhone").value = buyer.phone;
        document.getElementById("buyerEmail").value = buyer.email || "";
        document.getElementById("buyerStatus").value = buyer.status || "Active";
    }

    buyerModal.classList.add("show");
}

function closeBuyerModal() {
    buyerModal.classList.remove("show");
}

function renderBuyers() {
    if (!buyerGrid) return;
    const buyers = getBuyers();
    const canManageBuyers = canManagePage("buyers");
    document.querySelector('#page-buyers .page-actions button').hidden = !canManageBuyers;
    buyerGrid.innerHTML = buyers.length
        ? buyers.map(buyer => `
            <article class="supplier-card">
                <div class="supplier-top">
                    <div class="supplier-icon">♙</div>
                    <span class="status ${getStatusClass(buyer.status || "Active")}">${escapeAccountHtml(buyer.status || "Active")}</span>
                </div>
                <h3>${escapeAccountHtml(buyer.name)}</h3>
                <div class="supplier-info">
                    <p><strong>Contact:</strong> ${escapeAccountHtml(buyer.contact)}</p>
                    <p><strong>Phone:</strong> ${escapeAccountHtml(buyer.phone)}</p>
                    <p><strong>Email:</strong> ${escapeAccountHtml(buyer.email || "Not provided")}</p>
                </div>
                ${canManageBuyers ? `<div class="supplier-actions">
                    <button type="button" class="action-btn" onclick="openBuyerModal('${escapeAccountHtml(buyer.id)}')">Edit</button>
                    <button type="button" class="action-btn delete-btn" onclick="deleteBuyer('${escapeAccountHtml(buyer.id)}')">Delete</button>
                </div>` : ""}
            </article>
        `).join("")
        : '<div class="panel"><div class="empty-state">No buyers found.</div></div>';

    document.getElementById("buyerTotal").textContent = String(buyers.length);
    document.getElementById("activeBuyerCount").textContent = String(buyers.filter(buyer => (buyer.status || "Active") === "Active").length);
    document.getElementById("inactiveBuyerCount").textContent = String(buyers.filter(buyer => buyer.status === "Inactive").length);
}

buyerForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!canManagePage("buyers")) return;

    const buyers = getBuyers();
    const id = document.getElementById("buyerId").value;
    const buyer = {
        id: id || generateId("BUY"),
        name: document.getElementById("buyerName").value.trim(),
        contact: document.getElementById("buyerContact").value.trim(),
        phone: document.getElementById("buyerPhone").value.trim(),
        email: document.getElementById("buyerEmail").value.trim(),
        status: document.getElementById("buyerStatus").value
    };

    if (id) {
        const index = buyers.findIndex(item => item.id === id);
        if (index === -1) return;
        buyers[index] = buyer;
    } else {
        buyers.push(buyer);
    }

    saveBuyers(buyers);
    closeBuyerModal();
    renderBuyers();
});

function deleteBuyer(id) {
    if (!canManagePage("buyers")) return;
    const buyers = getBuyers();
    const buyer = buyers.find(item => item.id === id);
    if (!buyer || !window.confirm(`Delete ${buyer.name}?`)) return;
    const index = buyers.findIndex(item => item.id === id);
    buyers.splice(index, 1);
    saveBuyers(buyers);
    renderBuyers();
}

document.addEventListener("DOMContentLoaded", renderBuyers);
