/**
 * CalciFlow — Main Application Logic
 * Integrates all modules, state reactivity, role simulation, and interactive flows.
 */

document.addEventListener("DOMContentLoaded", () => {
  const store = window.CalciFlowState;

  // State cache
  let currentRole = "Admin";
  let activeViewId = "view-landing";
  let selectedBatchId = "CF-2026-001";
  let selectedMachineId = "M-05";
  let activeTourStep = 1;

  // DOM Elements
  const navBtns = document.querySelectorAll(".nav-btn, .sidebar-btn");
  const viewSections = document.querySelectorAll(".view-section");
  const roleDisplay = document.getElementById("current-role-label");
  const roleBtn = document.getElementById("btn-role-switcher");
  const roleModal = document.getElementById("modal-role-select");
  const pickupModal = document.getElementById("modal-schedule-pickup");
  const orderModal = document.getElementById("modal-order-checkout");
  const certModal = document.getElementById("modal-certificate");
  const batchDetailModal = document.getElementById("modal-batch-detail");
  const toastContainer = document.getElementById("toast-container");

  // Show Toast Notification
  function showToast(message, type = "info") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    const badgeLabel = type === "success" ? "SUCCESS" : (type === "warning" ? "WARNING" : "INFO");
    const badgeClass = type === "success" ? "badge-green" : (type === "warning" ? "badge-amber" : "badge-blue");
    toast.innerHTML = `<span class="badge ${badgeClass}" style="font-size: 0.68rem; padding: 0.15rem 0.5rem; letter-spacing:0.04em;">${badgeLabel}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Navigation Controller
  function navigateToView(viewId) {
    activeViewId = viewId;

    // Toggle active view
    viewSections.forEach(section => {
      if (section.id === viewId) {
        section.classList.add("active-view");
      } else {
        section.classList.remove("active-view");
      }
    });

    // Update active nav buttons
    navBtns.forEach(btn => {
      if (btn.getAttribute("data-target") === viewId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    renderCurrentView();
  }

  // Bind Navigation Clicks
  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (target) navigateToView(target);
    });
  });

  // Action links with data-navigate
  document.querySelectorAll("[data-navigate]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.getAttribute("data-navigate");
      if (target) navigateToView(target);
    });
  });

  // Role Management
  function setRole(roleName) {
    currentRole = roleName;
    if (roleDisplay) roleDisplay.textContent = roleName;
    showToast(`Active Persona set to: ${roleName}`, "info");
    closeAllModals();
    renderCurrentView();
  }

  if (roleBtn) {
    roleBtn.addEventListener("click", () => {
      openModal(roleModal);
    });
  }

  document.querySelectorAll(".role-select-item").forEach(item => {
    item.addEventListener("click", () => {
      const r = item.getAttribute("data-role");
      if (r) setRole(r);
    });
  });

  // Modal Helpers
  function openModal(modal) {
    if (modal) modal.classList.add("active-modal");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("active-modal"));
  }

  document.querySelectorAll(".modal-close-btn, [data-modal-close]").forEach(btn => {
    btn.addEventListener("click", closeAllModals);
  });

  document.querySelectorAll(".modal-backdrop").forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) closeAllModals();
    });
  });

  // -------------------------------------------------------------
  // Renderers for Views
  // -------------------------------------------------------------

  function renderCurrentView() {
    renderGlobalMetrics();
    if (activeViewId === "view-dashboard" || activeViewId === "view-landing") {
      renderOverviewStats();
      renderAlerts();
    }
    if (activeViewId === "view-batches") {
      renderBatchesTable();
    }
    if (activeViewId === "view-traceability") {
      renderTraceabilityView(selectedBatchId);
    }
    if (activeViewId === "view-plant") {
      renderPlantMachines();
    }
    if (activeViewId === "view-collection") {
      renderCollectionPoints();
    }
    if (activeViewId === "view-inventory") {
      renderInventoryBars();
    }
    if (activeViewId === "view-marketplace") {
      renderMarketplace();
    }
    if (activeViewId === "view-orders") {
      renderOrdersTable();
    }
    if (activeViewId === "view-impact") {
      renderImpactMetrics();
    }
  }

  // 1. Global Headline Metrics
  function renderGlobalMetrics() {
    const m = store.data.metrics;
    const bindMap = {
      "stat-waste-collected": `${m.wasteCollected.toLocaleString()} kg`,
      "stat-caco3-recovered": `${m.caco3Recovered.toLocaleString()} kg`,
      "stat-batches-count": `${m.batchesProcessed}`,
      "stat-pass-rate": `${m.qualityPassRate}%`,
      "stat-waste-diverted": `${m.wasteDivertedTons} tons`,
      "stat-co2-offset": `${m.co2SavedKg.toLocaleString()} kg CO₂e`
    };

    for (const [id, val] of Object.entries(bindMap)) {
      document.querySelectorAll(`.${id}`).forEach(el => el.textContent = val);
    }
  }

  // 2. Overview Dashboard
  function renderOverviewStats() {
    const inv = store.data.inventory;
    const gradeAEl = document.getElementById("dash-grade-a-stock");
    const rawStockEl = document.getElementById("dash-raw-stock");
    const pendingBatchesEl = document.getElementById("dash-testing-batches");

    if (gradeAEl) gradeAEl.textContent = `${inv.gradeAStock.toLocaleString()} kg`;
    if (rawStockEl) rawStockEl.textContent = `${inv.rawEggshell.toLocaleString()} kg`;

    const testingCount = store.data.batches.filter(b => b.status === "Testing" || b.status === "Processing").length;
    if (pendingBatchesEl) pendingBatchesEl.textContent = testingCount;
  }

  function renderAlerts() {
    const listEl = document.getElementById("dashboard-alerts-list");
    if (!listEl) return;
    listEl.innerHTML = store.data.alerts.slice(0, 4).map(a => `
      <div class="alert-item alert-${a.type}" style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem 1rem; background: rgba(255,255,255,0.02); border-left: 3px solid ${a.type === 'warning' ? '#f59e0b' : (a.type === 'success' ? '#10b981' : '#38bdf8')}; border-radius: 4px; margin-bottom: 0.5rem;">
        <span style="font-size: 0.75rem; color: var(--text-muted); min-width: 65px;">${a.time}</span>
        <span style="font-size: 0.85rem; color: var(--text-main);">${a.text}</span>
      </div>
    `).join("");
  }

  // 3. Batches Table
  function renderBatchesTable(filterGrade = "All", searchQuery = "") {
    const tbody = document.getElementById("batches-table-body");
    if (!tbody) return;

    let list = store.data.batches;

    if (filterGrade !== "All") {
      list = list.filter(b => b.grade === filterGrade);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(b => b.id.toLowerCase().includes(q) || b.source.toLowerCase().includes(q));
    }

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem; color: var(--text-muted);">No batches match filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(b => {
      const badgeClass = b.grade === "Grade A+" ? "badge-blue" : (b.grade === "Grade A" ? "badge-green" : (b.grade === "Grade B" ? "badge-cyan" : "badge-red"));
      const statusBadge = b.status === "Ready for Supply" ? "badge-green" : (b.status === "Rejected" ? "badge-red" : "badge-amber");
      return `
        <tr>
          <td><span class="table-clickable-id" onclick="window.viewBatchTrace('${b.id}')">${b.id}</span></td>
          <td>${b.source}</td>
          <td><strong>${b.weight} kg</strong></td>
          <td><span style="font-family: var(--font-mono);">${b.purity}%</span></td>
          <td><span class="badge ${badgeClass}">${b.grade} (${b.score})</span></td>
          <td><span class="badge ${statusBadge}">${b.status}</span></td>
          <td style="color: var(--text-muted); font-size: 0.8rem;">${b.date}</td>
          <td>
            <div style="display:flex; gap:0.4rem;">
              <button class="btn btn-outline btn-sm" onclick="window.viewBatchTrace('${b.id}')">Trace</button>
              <button class="btn btn-secondary btn-sm" onclick="window.openCertModal('${b.id}')">Cert</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Batch Filter Listeners
  const gradeFilterSelect = document.getElementById("batch-grade-filter");
  const batchSearchInput = document.getElementById("batch-search-input");

  if (gradeFilterSelect) {
    gradeFilterSelect.addEventListener("change", () => {
      renderBatchesTable(gradeFilterSelect.value, batchSearchInput ? batchSearchInput.value : "");
    });
  }
  if (batchSearchInput) {
    batchSearchInput.addEventListener("input", () => {
      renderBatchesTable(gradeFilterSelect ? gradeFilterSelect.value : "All", batchSearchInput.value);
    });
  }

  // 4. Traceability View
  function renderTraceabilityView(batchId) {
    const batch = store.data.batches.find(b => b.id === batchId) || store.data.batches[0];
    if (!batch) return;
    selectedBatchId = batch.id;

    const bIdEl = document.getElementById("trace-batch-id");
    const bSourceEl = document.getElementById("trace-source");
    const bGradeEl = document.getElementById("trace-grade");
    const bTimelineEl = document.getElementById("trace-timeline-nodes");

    if (bIdEl) bIdEl.textContent = batch.id;
    if (bSourceEl) bSourceEl.textContent = `${batch.source} (${batch.weight} kg)`;
    if (bGradeEl) {
      bGradeEl.className = `badge ${batch.grade === 'Grade A+' ? 'badge-blue' : (batch.grade === 'Grade A' ? 'badge-green' : (batch.grade === 'Grade B' ? 'badge-cyan' : 'badge-red'))}`;
      bGradeEl.textContent = `${batch.grade} • Score ${batch.score}/100`;
    }

    if (bTimelineEl) {
      bTimelineEl.innerHTML = batch.traceability.map(t => `
        <div class="trace-node">
          <div class="trace-node-bullet"></div>
          <div class="trace-node-card">
            <div class="trace-node-meta">
              <span style="font-weight: 700; color: var(--accent-calcite); font-size: 0.92rem;">${t.stage}</span>
              <span style="font-family: var(--font-mono);">${t.time}</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.4rem;">${t.desc}</p>
            <div style="font-size: 0.76rem; color: var(--text-dim); display:flex; align-items:center; gap:0.4rem;">
              <span>Verified Operator:</span> <strong style="color: var(--text-muted);">${t.operator}</strong>
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  window.viewBatchTrace = function(batchId) {
    selectedBatchId = batchId;
    navigateToView("view-traceability");
    renderTraceabilityView(batchId);
  };

  // 5. Digital Twin: Live Plant
  function renderPlantMachines() {
    const listEl = document.getElementById("plant-machines-grid");
    if (!listEl) return;

    listEl.innerHTML = store.data.plantMachines.map(m => {
      const isSelected = m.id === selectedMachineId;
      return `
        <div class="machine-card ${isSelected ? 'selected-machine' : ''}" onclick="window.selectMachine('${m.id}')">
          <div class="machine-card-header">
            <span style="font-size: 0.72rem; color: var(--accent-calcite); font-weight: 700;">${m.code}</span>
            <span class="machine-status-dot status-${m.status}"></span>
          </div>
          <h4 style="font-size: 0.95rem; margin-bottom: 0.6rem;">${m.name}</h4>
          <div class="machine-telemetry-pill">
            <span>Throughput</span>
            <span>${m.throughput}</span>
          </div>
          <div class="machine-telemetry-pill">
            <span>Operating Temp</span>
            <span>${m.temp}</span>
          </div>
          <div class="machine-telemetry-pill">
            <span>Power Draw</span>
            <span>${m.power}</span>
          </div>
          <div class="machine-telemetry-pill">
            <span>Efficiency</span>
            <span style="color: #34d399;">${m.efficiency}</span>
          </div>
        </div>
      `;
    }).join("");

    renderSelectedMachineTelemetry();
  }

  window.selectMachine = function(machineId) {
    selectedMachineId = machineId;
    renderPlantMachines();
  };

  function renderSelectedMachineTelemetry() {
    const machine = store.data.plantMachines.find(m => m.id === selectedMachineId) || store.data.plantMachines[0];
    if (!machine) return;

    const nameEl = document.getElementById("active-machine-name");
    const codeEl = document.getElementById("active-machine-code");
    const notesEl = document.getElementById("active-machine-notes");
    const healthEl = document.getElementById("active-machine-health");

    if (nameEl) nameEl.textContent = machine.name;
    if (codeEl) codeEl.textContent = `${machine.code} • ${machine.stage}`;
    if (notesEl) notesEl.textContent = machine.notes;
    if (healthEl) healthEl.textContent = `${machine.health}% Operational Health`;
  }

  // 7. Collection Network Map & Pickup Modal
  function renderCollectionPoints() {
    const pinsContainer = document.getElementById("map-pins-container");
    const pointsListEl = document.getElementById("collection-points-list");

    if (pinsContainer) {
      pinsContainer.innerHTML = store.data.collectionPoints.map(p => {
        const statusClass = p.status === "Active" ? "status-active" : (p.status === "Pickup Due" ? "status-due" : "status-inactive");
        return `
          <div class="map-pin ${statusClass}" style="left: ${p.coordinates.x}%; top: ${p.coordinates.y}%;" onclick="window.showCollectionPointDetail('${p.id}')">
            <div class="map-pin-inner">
              <span style="font-size: 0.72rem; font-weight: 800;">${p.id.replace("CP-", "")}</span>
            </div>
          </div>
        `;
      }).join("");
    }

    if (pointsListEl) {
      pointsListEl.innerHTML = store.data.collectionPoints.map(p => `
        <div style="padding: 0.85rem 1rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 0.65rem; cursor: pointer;" onclick="window.showCollectionPointDetail('${p.id}')">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <strong style="font-size: 0.9rem; color: var(--text-main);">${p.name}</strong>
            <span class="badge ${p.status === 'Active' ? 'badge-green' : (p.status === 'Pickup Due' ? 'badge-amber' : 'badge-red')}">${p.status}</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-muted); display:flex; justify-content: space-between;">
            <span>Daily: ~${p.dailyGen} kg</span>
            <span>Total Collected: ${p.collected.toLocaleString()} kg</span>
          </div>
        </div>
      `).join("");
    }
  }

  window.showCollectionPointDetail = function(pointId) {
    const p = store.data.collectionPoints.find(item => item.id === pointId);
    if (!p) return;

    document.getElementById("popup-point-name").textContent = p.name;
    document.getElementById("popup-point-type").textContent = `${p.type} • ${p.location}`;
    document.getElementById("popup-daily-gen").textContent = `${p.dailyGen} kg/day`;
    document.getElementById("popup-collected").textContent = `${p.collected.toLocaleString()} kg`;
    document.getElementById("popup-last-pickup").textContent = p.lastPickup;
    document.getElementById("popup-next-pickup").textContent = p.nextPickup;
    document.getElementById("popup-vehicle").textContent = p.assignedVehicle;

    const schedBtn = document.getElementById("popup-btn-schedule");
    if (schedBtn) {
      schedBtn.onclick = () => {
        openPickupModal(p.id);
      };
    }
  };

  function openPickupModal(pointId) {
    const pt = store.data.collectionPoints.find(p => p.id === pointId) || store.data.collectionPoints[0];
    document.getElementById("pickup-point-select").value = pt.id;
    document.getElementById("pickup-qty-input").value = pt.dailyGen;
    openModal(pickupModal);
  }

  const btnConfirmPickup = document.getElementById("btn-confirm-pickup");
  if (btnConfirmPickup) {
    btnConfirmPickup.addEventListener("click", () => {
      const ptId = document.getElementById("pickup-point-select").value;
      const qty = document.getElementById("pickup-qty-input").value;
      store.schedulePickup(ptId, qty);
      closeAllModals();
      showToast(`Pickup scheduled! ${qty}kg incoming eggshell credited to Raw Inventory.`, "success");
      renderCurrentView();
    });
  }

  // 8. Inventory Bars
  function renderInventoryBars() {
    const inv = store.data.inventory;
    const stages = [
      { id: "rawEggshell", name: "Raw Eggshell Intake", current: inv.rawEggshell, max: inv.maxCapacity.rawEggshell, unit: "kg" },
      { id: "cleanedShell", name: "Cleaned & De-membraned", current: inv.cleanedShell, max: inv.maxCapacity.cleanedShell, unit: "kg" },
      { id: "driedShell", name: "Thermal Desiccated Shell", current: inv.driedShell, max: inv.maxCapacity.driedShell, unit: "kg" },
      { id: "groundMaterial", name: "Micronized Powder", current: inv.groundMaterial, max: inv.maxCapacity.groundMaterial, unit: "kg" },
      { id: "gradeAStock", name: "Grade A Industrial Calcite", current: inv.gradeAStock, max: inv.maxCapacity.gradeAStock, unit: "kg" },
      { id: "gradeBStock", name: "Grade B Agro/Mineral Filler", current: inv.gradeBStock, max: inv.maxCapacity.gradeBStock, unit: "kg" }
    ];

    const container = document.getElementById("inventory-bars-container");
    if (!container) return;

    container.innerHTML = stages.map(s => {
      const pct = Math.min(100, Math.round((s.current / s.max) * 100));
      return `
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <strong style="font-size: 0.95rem; color: var(--text-main);">${s.name}</strong>
            <span style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--accent-calcite);"><strong>${s.current.toLocaleString()}</strong> / ${s.max.toLocaleString()} ${s.unit} (${pct}%)</span>
          </div>
          <div style="height: 8px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); overflow: hidden;">
            <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #10b981, var(--accent-calcite)); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 9. Marketplace & Order Placement
  function renderMarketplace() {
    const grid = document.getElementById("marketplace-products-grid");
    if (!grid) return;

    grid.innerHTML = store.data.marketplace.map(p => {
      let gradeBadgeClass = 'badge-green';
      if (p.grade === 'Grade A+') gradeBadgeClass = 'badge-blue';
      else if (p.grade === 'Grade A') gradeBadgeClass = 'badge-green';
      else if (p.grade === 'Grade B') gradeBadgeClass = 'badge-slate';

      return `
      <div class="marketplace-card">
        <div>
          <div class="prod-grade-badge">
            <span class="badge ${gradeBadgeClass}">${p.grade}</span>
            <span class="badge badge-slate">${p.badge}</span>
          </div>
          <h3 class="prod-title">${p.name}</h3>
          <div class="prod-price">₹${p.pricePerKg} <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: normal;">/ kg</span></div>
          <ul class="prod-specs-list">
            <li><span>CaCO₃ Purity</span><strong>${p.purity}</strong></li>
            <li><span>Particle Size</span><strong>${p.particleSize}</strong></li>
            <li><span>Moisture</span><strong>${p.moisture}</strong></li>
            <li><span>Whiteness</span><strong>${p.whiteness}</strong></li>
            <li><span>Available Stock</span><strong style="color: var(--accent-calcite);">${p.availableKg} kg</strong></li>
            <li><span>Certification</span><strong style="color: #059669;">${p.certStatus}</strong></li>
          </ul>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.5rem;">${p.recommendedUse}</p>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="window.openOrderCheckout('${p.id}')">
          Request Batch / Order
        </button>
      </div>
    `;
    }).join("");
  }

  window.openOrderCheckout = function(prodId) {
    const prod = store.data.marketplace.find(p => p.id === prodId);
    if (!prod) return;

    document.getElementById("order-prod-id").value = prod.id;
    document.getElementById("order-prod-name").textContent = prod.name;
    document.getElementById("order-prod-price").textContent = `₹${prod.pricePerKg}/kg`;
    document.getElementById("order-prod-stock").textContent = `${prod.availableKg} kg available`;
    document.getElementById("order-qty-input").value = prod.minOrderKg;

    function updateTotal() {
      const q = Number(document.getElementById("order-qty-input").value) || 0;
      document.getElementById("order-calc-total").textContent = `₹${(q * prod.pricePerKg).toLocaleString()}`;
    }

    document.getElementById("order-qty-input").oninput = updateTotal;
    updateTotal();
    openModal(orderModal);
  };

  const btnConfirmOrder = document.getElementById("btn-confirm-order");
  if (btnConfirmOrder) {
    btnConfirmOrder.addEventListener("click", () => {
      const prodId = document.getElementById("order-prod-id").value;
      const buyerName = document.getElementById("order-buyer-name").value;
      const contactPerson = document.getElementById("order-buyer-contact").value;
      const qty = document.getElementById("order-qty-input").value;

      const res = store.placeOrder(prodId, buyerName, contactPerson, qty);
      if (res.success) {
        closeAllModals();
        showToast(`Order ${res.order.id} placed successfully for ${qty}kg! Available inventory updated.`, "success");
        renderCurrentView();
      } else {
        alert(res.message);
      }
    });
  }

  // 10. Orders Table
  function renderOrdersTable() {
    const tbody = document.getElementById("orders-table-body");
    if (!tbody) return;

    tbody.innerHTML = store.data.orders.map(o => {
      const statusClass = o.status === "Delivered" ? "badge-green" : (o.status === "Dispatched" ? "badge-cyan" : "badge-amber");
      return `
        <tr>
          <td><strong style="font-family: var(--font-mono); color: var(--accent-calcite);">${o.id}</strong></td>
          <td>
            <strong>${o.buyer}</strong><br>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${o.contactPerson}</span>
          </td>
          <td><span class="badge ${o.materialGrade === 'Grade A+' ? 'badge-blue' : (o.materialGrade === 'Grade A' ? 'badge-green' : 'badge-slate')}">${o.materialGrade}</span></td>
          <td><strong>${o.quantity} kg</strong></td>
          <td><strong>₹${o.totalAmount.toLocaleString()}</strong></td>
          <td><span class="badge ${statusClass}">${o.status}</span></td>
          <td style="font-size: 0.8rem; color: var(--text-muted);">${o.expectedDelivery}</td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="alert('Live Tracking: ${o.trackingLocation}')">Track</button>
          </td>
        </tr>
      `;
    }).join("");
  }

  // 11. Official Laboratory Quality Certificate Modal
  window.openCertModal = function(batchId) {
    const batch = store.data.batches.find(b => b.id === batchId) || store.data.batches[0];
    if (!batch) return;

    document.getElementById("cert-doc-batch-id").textContent = batch.id;
    document.getElementById("cert-doc-cert-id").textContent = `CERT-CF-${batch.id}`;
    document.getElementById("cert-doc-date").textContent = batch.date;
    document.getElementById("cert-doc-source").textContent = batch.source;
    document.getElementById("cert-doc-facility").textContent = batch.facility;
    document.getElementById("cert-doc-weight").textContent = `${batch.weight} kg`;
    document.getElementById("cert-doc-purity").textContent = `${batch.purity}%`;
    document.getElementById("cert-doc-moisture").textContent = `${batch.moisture}%`;
    document.getElementById("cert-doc-particle").textContent = `${batch.particleSize} µm`;
    document.getElementById("cert-doc-score").textContent = `${batch.score} / 100`;
    document.getElementById("cert-doc-grade").textContent = batch.grade;
    document.getElementById("cert-doc-rec").textContent = batch.recommendation;

    openModal(certModal);
  };

  const btnPrintCert = document.getElementById("btn-print-cert");
  if (btnPrintCert) {
    btnPrintCert.addEventListener("click", () => {
      window.print();
    });
  }

  // 12. Sustainability Impact View
  function renderImpactMetrics() {
    // Already synced via renderGlobalMetrics
  }

  // 13. Simulated Live IoT Stream Ticker
  setInterval(() => {
    store.tickSensors();
    const s = store.data.iotSensors;

    const sensorDryer = document.getElementById("sensor-val-dryer");
    const sensorMoist = document.getElementById("sensor-val-moisture");
    const sensorVibe = document.getElementById("sensor-val-vibration");
    const sensorThrough = document.getElementById("sensor-val-throughput");
    const sensorKw = document.getElementById("sensor-val-power");
    const sensorPart = document.getElementById("sensor-val-particle");

    if (sensorDryer) sensorDryer.textContent = `${s.dryerTemp.value} °C`;
    if (sensorMoist) sensorMoist.textContent = `${s.moistureContent.value} %`;
    if (sensorVibe) sensorVibe.textContent = `${s.millVibration.value} mm/s`;
    if (sensorThrough) sensorThrough.textContent = `${s.throughputKgH.value} kg/h`;
    if (sensorKw) sensorKw.textContent = `${s.systemEnergyKw.value} kW`;
    if (sensorPart) sensorPart.textContent = `${s.particleD50.value} µm`;
  }, 2200);

  // 14. 7-Stage Interactive Pipeline Stepper
  const pipeTabs = document.querySelectorAll(".pipe-tab");
  const pipeStagesData = [
    {
      num: "Stage 01",
      title: "Waste Collection & Intake",
      lead: "Aggregated Eggshell Supply Chain",
      desc: "Raw eggshells collected in real-time from registered restaurants, bakeries, hotels, and hatcheries using geo-routed electric logistics vehicles.",
      metrics: ["Input Capacity: 2,500 kg/day", "Automated Weight Scale & RFID Tagging", "Bio-degradable sealed intake bins"]
    },
    {
      num: "Stage 02",
      title: "Optical Impurity Sorting",
      lead: "Dual-Wavelength Machine Vision Sorting",
      desc: "High-speed optical inspection rejects non-calcium contaminants, packaging debris, and spoiled organic residue, ensuring 99.1% input purity.",
      metrics: ["Throughput: 135 kg/h", "Rejection Sensitivity: 0.1 mm", "Optical Spectrum: 450nm - 850nm"]
    },
    {
      num: "Stage 03",
      title: "Hydro-Sonic Wash & De-Membrane",
      lead: "Acoustic Cavitation & Sanitization",
      desc: "Ultrasonic transducers strip the inner collagen membrane from the calcium shell while food-safe biological wash eliminates Salmonella and pathogens.",
      metrics: ["Water Recirculation: 94%", "Pathogen Clearance: 99.99%", "Sonic Frequency: 40 kHz"]
    },
    {
      num: "Stage 04",
      title: "Fluidized Thermal Desiccation",
      lead: "Rapid Moisture Reduction",
      desc: "Fluidized bed dryer exposes cleaned shell granules to controlled 105°C laminar airflow, driving moisture levels below 1.5% in under 12 minutes.",
      metrics: ["Inlet Moisture: 28% → Target: < 1.5%", "Air Speed: 1.8 m/s", "Zero Calcite Phase Degradation"]
    },
    {
      num: "Stage 05",
      title: "Planetary Micronization",
      lead: "Superfine Calcite Grinding Mill",
      desc: "Tungsten carbide planetary ball mills grind desalted shell matrix to narrow particle size distribution (D50 = 65–75 µm) demanded by plastics and coatings.",
      metrics: ["Target D50: < 75 µm", "Specific Surface Area: 4.8 m²/g", "Active Cooling Chamber"]
    },
    {
      num: "Stage 06",
      title: "Chemical & Calcite Refinement",
      lead: "Phase Stabilization & Surface Treatment",
      desc: "Stearic acid coating or mineral stabilization tailored to buyer requirements, enhancing dispersion compatibility in polymer matrixes.",
      metrics: ["CaCO₃ Crystal Structure: Calcite 98%", "Hydrophobic Treatment Available", "Batch Retention: 98.5%"]
    },
    {
      num: "Stage 07",
      title: "Lab Quality Assay & Certification",
      lead: "Standardized Industrial Mineral Qualification",
      desc: "Comprehensive laboratory assay testing verifies CaCO₃ purity %, moisture levels, and particle size curves, issuing verified lot certification according to ASTM standards.",
      metrics: ["Assay Precision: 99.8%", "ASTM D1199 Standard", "Direct Cryptographic Ledger Minting"]
    }
  ];

  pipeTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      pipeTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const stage = pipeStagesData[index];
      const titleEl = document.getElementById("pipe-stage-title");
      const leadEl = document.getElementById("pipe-stage-lead");
      const descEl = document.getElementById("pipe-stage-desc");
      const metricsEl = document.getElementById("pipe-stage-metrics");

      if (titleEl) titleEl.textContent = `${stage.num}: ${stage.title}`;
      if (leadEl) leadEl.textContent = stage.lead;
      if (descEl) descEl.textContent = stage.desc;
      if (metricsEl) {
        metricsEl.innerHTML = stage.metrics.map(m => `
          <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.88rem; color:var(--text-main);">
            <span style="color:var(--brand-blue); font-weight:700;">—</span> ${m}
          </div>
        `).join("");
      }
    });
  });


  // Listen to store updates
  store.subscribe(() => {
    renderCurrentView();
  });

  // Initial render
  renderCurrentView();
});
