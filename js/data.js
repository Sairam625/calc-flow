/**
 * CalciFlow — Centralized Data & State Store
 * Provides consistent, reactive mock data across all modules.
 */

const CalciFlowInitialData = {
  metrics: {
    wasteCollected: 12450, // kg
    caco3Recovered: 9850, // kg
    batchesProcessed: 342,
    qualityPassRate: 95.2, // %
    wasteDivertedTons: 12.45, // tons
    activeBuyers: 48,
    avgPurity: 94.8, // %
    rejectionRate: 4.8, // %
    co2SavedKg: 8420, // kg CO2e estimated
    activePickups: 14
  },

  inventory: {
    rawEggshell: 1450, // kg
    cleanedShell: 980,
    driedShell: 820,
    groundMaterial: 640,
    processedCaCO3: 1220,
    gradeAStock: 850,
    gradeBStock: 290,
    rejectedStock: 80,
    maxCapacity: {
      rawEggshell: 3000,
      cleanedShell: 2500,
      driedShell: 2000,
      groundMaterial: 1500,
      processedCaCO3: 2000,
      gradeAStock: 1500,
      gradeBStock: 1000
    }
  },

  batches: [
    {
      id: "CF-2026-001",
      source: "Royal Orchid Hotel",
      facility: "Bengaluru Central Plant - Unit 1",
      weight: 180,
      purity: 95.8,
      grade: "Grade A",
      status: "Ready for Supply",
      date: "2026-09-08",
      moisture: 1.4,
      particleSize: 68, // µm
      contamination: 0.1,
      ph: 8.9,
      score: 96,
      color: "Bright White (L* 94.2)",
      confidence: 98,
      recommendation: "Approved for High-Spec Polymer & Optical Coating Applications",
      traceability: [
        { stage: "Source Generation", time: "2026-09-07 07:30", desc: "Collected 180kg shell waste from Royal Orchid Hotel main kitchen.", operator: "K. Murthy (Logistics)" },
        { stage: "Logistics Transfer", time: "2026-09-07 11:15", desc: "Transit via sanitized container #CF-TR-04 to Bengaluru Facility.", operator: "CalciFlow Fleet" },
        { stage: "De-membrane & Sanitization", time: "2026-09-07 14:00", desc: "Hydro-acoustic wash at 65°C and food-grade bio-sanitizer.", operator: "Plant Op R. Sharma" },
        { stage: "Thermal Desiccation", time: "2026-09-07 18:30", desc: "Fluidized bed dryer reduced moisture from 28.5% to 1.4%.", operator: "Automated Line A" },
        { stage: "Planetary Micronization", time: "2026-09-08 09:10", desc: "Ground to median particle size D50 = 68 µm.", operator: "Grinding Bay 2" },
        { stage: "Quality Testing & Certification", time: "2026-09-08 11:45", desc: "Laboratory assay confirmed 95.8% CaCO3 purity, Grade A (96/100).", operator: "Central Lab QA Station" },
        { stage: "Hermetic Silo Storage", time: "2026-09-08 14:00", desc: "Sealed in nitrogen-flushed Silo Bay A-3 awaiting customer dispatch.", operator: "Warehouse Inventory" }
      ]
    },
    {
      id: "CF-2026-002",
      source: "Crust & Crumb Bakery Hub",
      facility: "Bengaluru Central Plant - Unit 1",
      weight: 120,
      purity: 93.4,
      grade: "Grade A",
      status: "Approved",
      date: "2026-09-09",
      moisture: 1.7,
      particleSize: 72,
      contamination: 0.3,
      ph: 8.7,
      score: 92,
      color: "Off-White (L* 91.5)",
      confidence: 96,
      recommendation: "Suitable for Industrial Plastics, Rubber Reinforcement, & Paper Coatings",
      traceability: [
        { stage: "Source Generation", time: "2026-09-08 08:00", desc: "Collected 120kg bakery shell waste.", operator: "A. Singh" },
        { stage: "Logistics Transfer", time: "2026-09-08 12:30", desc: "Transfer completed.", operator: "Fleet 02" },
        { stage: "Processing & Drying", time: "2026-09-08 16:00", desc: "Cleaned, sanitized, and dried to 1.7% moisture.", operator: "Plant Op M. Das" },
        { stage: "Grinding & AI Grading", time: "2026-09-09 10:15", desc: "Grade A assigned with 92/100 composite index.", operator: "CalciFlow AI Core" }
      ]
    },
    {
      id: "CF-2026-003",
      source: "Golden Valley Hatchery & Farm",
      facility: "Hosur Satellite Processing Plant",
      weight: 310,
      purity: 90.2,
      grade: "Grade B",
      status: "Testing",
      date: "2026-09-10",
      moisture: 2.3,
      particleSize: 85,
      contamination: 0.8,
      ph: 8.5,
      score: 84,
      color: "Pale Cream (L* 88.0)",
      confidence: 94,
      recommendation: "Optimal for Agricultural Soil Remediation, Concrete Precast & Animal Feed Supplements",
      traceability: [
        { stage: "Source Generation", time: "2026-09-09 06:45", desc: "Hatchery bulk eggshell waste aggregated.", operator: "S. Nair" },
        { stage: "Thermal Processing", time: "2026-09-09 15:30", desc: "Intensive sanitization cycle completed.", operator: "Plant Op P. Kumar" },
        { stage: "Quality Testing", time: "2026-09-10 14:00", desc: "Undergoing secondary validation testing.", operator: "Lab Analyst T. Varma" }
      ]
    },
    {
      id: "CF-2026-004",
      source: "Taj Gateway Caterers",
      facility: "Bengaluru Central Plant - Unit 1",
      weight: 210,
      purity: 96.4,
      grade: "Grade A",
      status: "Ready for Supply",
      date: "2026-09-10",
      moisture: 1.2,
      particleSize: 65,
      contamination: 0.1,
      ph: 9.0,
      score: 98,
      color: "Ultra-White (L* 95.8)",
      confidence: 99,
      recommendation: "Pharmaceutical & High-Precision Specialty Polymer Grade",
      traceability: [
        { stage: "Source Generation", time: "2026-09-09 10:00", desc: "Single-origin clean culinary eggshell collected.", operator: "Logistics Team A" },
        { stage: "Full Refining Suite", time: "2026-09-10 08:30", desc: "Triple wash and acoustic micronization.", operator: "Plant Op R. Sharma" },
        { stage: "AI Grading", time: "2026-09-10 16:00", desc: "Highest recorded purity of 96.4%. Score: 98/100.", operator: "CalciFlow AI Core" }
      ]
    },
    {
      id: "CF-2026-005",
      source: "Spice Garden Bistro",
      facility: "Bengaluru Central Plant - Unit 1",
      weight: 85,
      purity: 82.5,
      grade: "Grade C",
      status: "Rejected",
      date: "2026-09-07",
      moisture: 4.8,
      particleSize: 110,
      contamination: 2.4,
      ph: 7.8,
      score: 61,
      color: "Brownish Mottled",
      confidence: 92,
      recommendation: "REJECTED for Industrial Supply. Re-routed to Composting / Non-critical Soil Filler.",
      traceability: [
        { stage: "Source Generation", time: "2026-09-06 19:00", desc: "Bistro evening waste collected.", operator: "K. Murthy" },
        { stage: "Inspection & Grading", time: "2026-09-07 11:00", desc: "High organic food residue detected. AI auto-rejection triggered.", operator: "CalciFlow AI Core" }
      ]
    },
    {
      id: "CF-2026-006",
      source: "Metro Food Processing Unit 4",
      facility: "Bengaluru Central Plant - Unit 2",
      weight: 450,
      purity: 94.9,
      grade: "Grade A",
      status: "Processing",
      date: "2026-09-11",
      moisture: 1.6,
      particleSize: 70,
      contamination: 0.2,
      ph: 8.8,
      score: 94,
      color: "Bright White (L* 93.9)",
      confidence: 97,
      recommendation: "Currently in grinding chamber. Projected Grade A for polymer applications.",
      traceability: [
        { stage: "Source Intake", time: "2026-09-11 08:00", desc: "450kg commercial food processing waste accepted.", operator: "Dock Supervisor G. Reddy" },
        { stage: "Active Grinding", time: "2026-09-11 10:30", desc: "Processing in planetary mill Unit 5.", operator: "Line Operator B" }
      ]
    }
  ],

  collectionPoints: [
    {
      id: "CP-001",
      name: "Crust & Crumb Master Bakery",
      type: "Bakery Chain",
      location: "Indiranagar 100ft Road, Bengaluru",
      dailyGen: 45,
      collected: 680,
      lastPickup: "Yesterday, 3:30 PM",
      nextPickup: "Today, 4:00 PM",
      status: "Pickup Due",
      contact: "+91 98450 11203",
      assignedVehicle: "EV-Van CF-03",
      coordinates: { x: 38, y: 44 }
    },
    {
      id: "CP-002",
      name: "Grand Imperial Luxury Hotel",
      type: "Hospitality Hotel",
      location: "Whitefield IT Corridor, Bengaluru",
      dailyGen: 95,
      collected: 1420,
      lastPickup: "Today, 10:00 AM",
      nextPickup: "Tomorrow, 10:00 AM",
      status: "Active",
      contact: "+91 97311 88921",
      assignedVehicle: "EV-Van CF-01",
      coordinates: { x: 76, y: 32 }
    },
    {
      id: "CP-003",
      name: "Sunrise Agro & Egg Processors",
      type: "Food Processing Plant",
      location: "Peenya Industrial Area Stage 2",
      dailyGen: 280,
      collected: 4120,
      lastPickup: "2 days ago",
      nextPickup: "URGENT OVERDUE",
      status: "Pickup Due",
      contact: "+91 94480 55102",
      assignedVehicle: "Heavy Truck CF-HT-01",
      coordinates: { x: 22, y: 24 }
    },
    {
      id: "CP-004",
      name: "Olive & Basil Italian Bistro",
      type: "Restaurant",
      location: "Koramangala 5th Block, Bengaluru",
      dailyGen: 35,
      collected: 490,
      lastPickup: "Today, 8:30 AM",
      nextPickup: "Tomorrow, 8:30 AM",
      status: "Active",
      contact: "+91 99010 33499",
      assignedVehicle: "EV-Van CF-02",
      coordinates: { x: 48, y: 68 }
    },
    {
      id: "CP-005",
      name: "Urban Valley Poultry Co-op",
      type: "Poultry & Hatchery Hub",
      location: "Yelahanka New Town, Bengaluru",
      dailyGen: 160,
      collected: 2340,
      lastPickup: "3 days ago",
      nextPickup: "Today, 6:00 PM",
      status: "Active",
      contact: "+91 98860 77412",
      assignedVehicle: "Medium Van CF-MV-04",
      coordinates: { x: 42, y: 16 }
    },
    {
      id: "CP-006",
      name: "Metropolitan Central Caterers",
      type: "Commercial Catering",
      location: "Jayanagar 4th Block, Bengaluru",
      dailyGen: 60,
      collected: 810,
      lastPickup: "5 days ago",
      nextPickup: "Pending Verification",
      status: "Inactive",
      contact: "+91 98451 44520",
      assignedVehicle: "Unassigned",
      coordinates: { x: 30, y: 72 }
    }
  ],

  marketplace: [
    {
      id: "PROD-A1",
      name: "CalciFlow Ultra-Pure CaCO₃ (Grade A)",
      grade: "Grade A",
      purity: "95.8%",
      particleSize: "< 75 µm (D50: 68 µm)",
      availableKg: 850,
      pricePerKg: 42,
      minOrderKg: 50,
      moisture: "1.4%",
      whiteness: "94.5% L*",
      certStatus: "Certified",
      recommendedUse: "Polymer compounding, PVC masterbatches, paper mineral coating, premium adhesives",
      badge: "High Demand",
      batchSource: "CF-2026-001 / CF-2026-004"
    },
    {
      id: "PROD-B1",
      name: "CalciFlow Agro-Mineral CaCO₃ (Grade B)",
      grade: "Grade B",
      purity: "91.5%",
      particleSize: "75 – 120 µm",
      availableKg: 290,
      pricePerKg: 26,
      minOrderKg: 100,
      moisture: "2.1%",
      whiteness: "88.2% L*",
      certStatus: "Agronomic Certified",
      recommendedUse: "Acid soil neutralization, fertilizer carrier, eco-concrete precast, animal feed calcium supplement",
      badge: "Eco-Value",
      batchSource: "CF-2026-003"
    },
    {
      id: "PROD-X1",
      name: "CalciFlow Micronized Calcite-X (Grade A+)",
      grade: "Grade A+",
      purity: "96.5%",
      particleSize: "< 45 µm (Superfine)",
      availableKg: 340,
      pricePerKg: 58,
      minOrderKg: 25,
      moisture: "1.0%",
      whiteness: "96.0% L*",
      certStatus: "Precision Grade Tested",
      recommendedUse: "Specialty technical coatings, engineering plastics, medical-grade rubber fillers",
      badge: "Specialty",
      batchSource: "CF-2026-004"
    }
  ],

  orders: [
    {
      id: "ORD-8491",
      buyer: "Apex Polymer Industries Pvt Ltd",
      contactPerson: "Dr. Arvind Rao",
      materialGrade: "Grade A",
      quantity: 350,
      unitPrice: 42,
      totalAmount: 14700,
      status: "Delivered",
      orderDate: "2026-09-08",
      expectedDelivery: "2026-09-10",
      trackingLocation: "Delivered to Whitefield Compound",
      batchRef: "CF-2026-001",
      certId: "CERT-CF-2026-001"
    },
    {
      id: "ORD-8492",
      buyer: "DecoCrete Sustainable Precast",
      contactPerson: "Rajeshwar Iyer",
      materialGrade: "Grade B",
      quantity: 500,
      unitPrice: 26,
      totalAmount: 13000,
      status: "Dispatched",
      orderDate: "2026-09-10",
      expectedDelivery: "2026-09-12",
      trackingLocation: "Fleet Truck #KA-03-F-2210 en route Hosur Road",
      batchRef: "CF-2026-003",
      certId: "CERT-CF-2026-003"
    },
    {
      id: "ORD-8493",
      buyer: "Kisan Agro Innovations Corp",
      contactPerson: "Sunita Deshmukh",
      materialGrade: "Grade B",
      quantity: 200,
      unitPrice: 26,
      totalAmount: 5200,
      status: "Processing",
      orderDate: "2026-09-11",
      expectedDelivery: "2026-09-13",
      trackingLocation: "Packing in 25kg moisture-barrier Kraft bags",
      batchRef: "CF-2026-003",
      certId: "CERT-CF-2026-003"
    },
    {
      id: "ORD-8494",
      buyer: "Zenith Specialty Papers Ltd",
      contactPerson: "V. Anand",
      materialGrade: "Grade A",
      quantity: 400,
      unitPrice: 42,
      totalAmount: 16800,
      status: "Confirmed",
      orderDate: "2026-09-11",
      expectedDelivery: "2026-09-14",
      trackingLocation: "Order verified, awaiting final nitrogen silo draw",
      batchRef: "CF-2026-004",
      certId: "CERT-CF-2026-004"
    }
  ],

  plantMachines: [
    {
      id: "M-01",
      name: "Automated Waste Reception & Hopper",
      code: "REC-01",
      stage: "Stage 1 — Reception",
      status: "running",
      throughput: "145 kg/h",
      temp: "24.2 °C",
      power: "3.2 kW",
      efficiency: "98.5%",
      health: 99,
      notes: "Operating steadily with zero input blockages."
    },
    {
      id: "M-02",
      name: "Dual-Wavelength Optical Sorter",
      code: "SRT-02",
      stage: "Stage 2 — Sorting",
      status: "running",
      throughput: "135 kg/h",
      temp: "28.0 °C",
      power: "4.1 kW",
      efficiency: "96.8%",
      health: 97,
      notes: "Rejecting foreign organic matter & non-shell particulates."
    },
    {
      id: "M-03",
      name: "Hydro-Sonic Washer & Sanitizer",
      code: "WSH-03",
      stage: "Stage 3 — Washing",
      status: "running",
      throughput: "125 kg/h",
      temp: "65.4 °C",
      power: "7.8 kW",
      efficiency: "95.2%",
      health: 94,
      notes: "Thermal sanitization loop holding 65°C target."
    },
    {
      id: "M-04",
      name: "Fluidized Bed Thermal Desiccator",
      code: "DRY-04",
      stage: "Stage 4 — Drying",
      status: "running",
      throughput: "115 kg/h",
      temp: "105.1 °C",
      power: "12.4 kW",
      efficiency: "94.0%",
      health: 92,
      notes: "Moisture continuously dropping from 28% to 1.5%."
    },
    {
      id: "M-05",
      name: "Planetary Micro-Ball Mill Grinder",
      code: "GRD-05",
      stage: "Stage 5 — Grinding",
      status: "running",
      throughput: "98 kg/h",
      temp: "42.8 °C",
      power: "15.2 kW",
      efficiency: "92.4%",
      health: 91,
      notes: "Precision micronization maintaining D50 = 68-72 µm."
    },
    {
      id: "M-06",
      name: "Calcite Phase Chemical Refiner",
      code: "REF-06",
      stage: "Stage 6 — Refinement",
      status: "running",
      throughput: "92 kg/h",
      temp: "54.6 °C",
      power: "6.5 kW",
      efficiency: "97.1%",
      health: 96,
      notes: "Organic membrane separation and calcite stabilization."
    },
    {
      id: "M-07",
      name: "Quality Assay & Inspection Station",
      code: "QA-07",
      stage: "Stage 7 — Lab Quality Certification",
      status: "running",
      throughput: "90 kg/h",
      temp: "22.5 °C",
      power: "1.8 kW",
      efficiency: "99.4%",
      health: 99,
      notes: "Online high-precision laboratory assay and quality scoring active."
    },
    {
      id: "M-08",
      name: "Hermetic Silo Storage & Packer",
      code: "SLO-08",
      stage: "Stage 8 — Storage & Dispatch",
      status: "running",
      throughput: "88 kg/h",
      temp: "20.1 °C",
      power: "2.5 kW",
      efficiency: "98.2%",
      health: 98,
      notes: "Nitrogen purged environment preventing moisture reabsorption."
    }
  ],

  iotSensors: {
    dryerTemp: { value: 104.8, unit: "°C", min: 100, max: 110, status: "Normal" },
    moistureContent: { value: 1.52, unit: "%", min: 1.0, max: 2.0, status: "Optimal" },
    ambientHumidity: { value: 41.5, unit: "% RH", min: 35, max: 60, status: "Normal" },
    millVibration: { value: 1.18, unit: "mm/s", min: 0.5, max: 2.5, status: "Optimal" },
    throughputKgH: { value: 94.6, unit: "kg/h", min: 80, max: 120, status: "Normal" },
    systemEnergyKw: { value: 53.4, unit: "kW", min: 45, max: 65, status: "Normal" },
    chamberPressure: { value: 101.3, unit: "kPa", min: 98, max: 104, status: "Normal" },
    particleD50: { value: 68.4, unit: "µm", min: 60, max: 75, status: "Optimal" }
  },

  alerts: [
    { id: "ALT-1", type: "warning", time: "10 mins ago", text: "Collection point 'Sunrise Agro' (CP-003) exceeded pickup threshold: 280kg pending." },
    { id: "ALT-2", type: "info", time: "35 mins ago", text: "Batch CF-2026-006 completed cleaning cycle; grinding initiated in Unit 5." },
    { id: "ALT-3", type: "success", time: "1 hour ago", text: "Laboratory Quality Certification completed for Batch CF-2026-004: Grade A certified (Score 98/100)." },
    { id: "ALT-4", type: "alert", time: "3 hours ago", text: "Grade A available stock is below 1,000 kg buffer (current: 850 kg)." }
  ]
};

// Global State Instance with LocalStorage Persistence
class CalciFlowStore {
  constructor() {
    this.storageKey = "calciflow_platform_state_v1";
    this.data = this.loadState();
    this.listeners = [];
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Using default CalciFlow initial data", e);
    }
    return JSON.parse(JSON.stringify(CalciFlowInitialData));
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.error("Failed to save CalciFlow state", e);
    }
    this.notify();
  }

  resetState() {
    this.data = JSON.parse(JSON.stringify(CalciFlowInitialData));
    this.saveState();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this.data); } catch (e) { console.error(e); }
    });
  }

  // Cross-module connected actions

  // 1. Schedule / Complete a Pickup
  schedulePickup(pointId, pickupQuantityKg) {
    const pt = this.data.collectionPoints.find(p => p.id === pointId);
    if (!pt) return null;

    const qty = Number(pickupQuantityKg) || pt.dailyGen || 50;
    pt.collected += qty;
    pt.lastPickup = "Just now";
    pt.nextPickup = "Tomorrow, 9:00 AM";
    pt.status = "Active";

    // System-wide connected impact:
    // Raw inventory increases
    this.data.inventory.rawEggshell += qty;
    this.data.metrics.wasteCollected += qty;
    this.data.metrics.wasteDivertedTons = Number(((this.data.metrics.wasteCollected) / 1000).toFixed(2));
    this.data.metrics.co2SavedKg += Math.round(qty * 0.68);

    this.data.alerts.unshift({
      id: "ALT-" + Date.now(),
      type: "success",
      time: "Just now",
      text: `Pickup completed at ${pt.name}: ${qty}kg transferred to Raw Inventory.`
    });

    this.saveState();
    return pt;
  }

  // 2. Perform AI Grading on a Batch
  gradeBatch(batchParams) {
    // Multivariate realistic algorithm
    const purity = Number(batchParams.purity) || 94.5;
    const moisture = Number(batchParams.moisture) || 1.6;
    const particleSize = Number(batchParams.particleSize) || 72;
    const contamination = Number(batchParams.contamination) || 0.2;
    const ph = Number(batchParams.ph) || 8.8;
    const weight = Number(batchParams.weight) || 150;
    const source = batchParams.source || "Aggregated Collection Center";

    // Score calculation
    let score = 50;
    score += (purity - 80) * 2.5; // +37.5 for 95%
    score -= (moisture - 1.0) * 8.0; // penalty for moisture > 1%
    score -= (particleSize - 60) * 0.3; // penalty for coarser particle size
    score -= contamination * 15.0; // severe penalty for contamination
    if (ph >= 8.5 && ph <= 9.2) score += 5; // optimal pH bonus

    score = Math.max(20, Math.min(99, Math.round(score)));

    let grade = "Grade C";
    let recommendation = "Rejected or downgraded for non-critical filler";
    let status = "Testing";

    if (score >= 95 && purity >= 96 && particleSize <= 50 && moisture <= 1.5 && contamination <= 0.3) {
      grade = "Grade A+";
      recommendation = "Approved for specialty micronized calcite, high-end engineering polymers, and medical rubber.";
      status = "Ready for Supply";
    } else if (score >= 90 && purity >= 93 && moisture <= 2.0 && contamination <= 0.5) {
      grade = "Grade A";
      recommendation = "Approved for high-grade industrial polymers, masterbatches, and paper coatings.";
      status = "Ready for Supply";
    } else if (score >= 75 && purity >= 88 && moisture <= 3.0 && contamination <= 1.2) {
      grade = "Grade B";
      recommendation = "Approved for agricultural soil conditioner, concrete precast, and industrial mortar.";
      status = "Approved";
    } else {
      grade = "Grade C";
      recommendation = "Non-compliant with industrial standards. Re-routed to agricultural composting filler.";
      status = "Rejected";
    }

    const newBatch = {
      id: batchParams.id || `CF-2026-${String(this.data.batches.length + 1).padStart(3, "0")}`,
      source: source,
      facility: "Bengaluru Central Plant - Unit 1",
      weight: weight,
      purity: Number(purity.toFixed(1)),
      grade: grade,
      status: status,
      date: new Date().toISOString().split("T")[0],
      moisture: Number(moisture.toFixed(1)),
      particleSize: Math.round(particleSize),
      contamination: Number(contamination.toFixed(1)),
      ph: Number(ph.toFixed(1)),
      score: score,
      color: (grade === "Grade A+" || grade === "Grade A") ? "Ultra-White (L* 96.0)" : (grade === "Grade B" ? "Off-White (L* 89.0)" : "Mottled Grey"),
      confidence: Math.round(93 + Math.random() * 6),
      recommendation: recommendation,
      traceability: [
        { stage: "Source Intake", time: "Today 08:30", desc: `Intake of ${weight}kg eggshell waste from ${source}.`, operator: "Logistics Team" },
        { stage: "Washing & Drying", time: "Today 11:00", desc: `Desiccated to ${moisture}% moisture and de-membraned.`, operator: "Automated Line" },
        { stage: "Grinding Mill", time: "Today 13:15", desc: `Micronized to ${particleSize} µm.`, operator: "Ball Mill Operator" },
        { stage: "Quality Testing & Certification", time: "Just now", desc: `Laboratory assay evaluated purity at ${purity}% with ${score}/100 score. Classified as ${grade}.`, operator: "Central Lab QA Station" }
      ]
    };

    // Update existing or push new
    const existingIndex = this.data.batches.findIndex(b => b.id === newBatch.id);
    if (existingIndex >= 0) {
      this.data.batches[existingIndex] = newBatch;
    } else {
      this.data.batches.unshift(newBatch);
    }

    // Connected state effects:
    if (grade === "Grade A") {
      this.data.inventory.gradeAStock += weight;
      this.data.inventory.processedCaCO3 += weight;
      this.data.metrics.caco3Recovered += weight;
    } else if (grade === "Grade B") {
      this.data.inventory.gradeBStock += weight;
      this.data.inventory.processedCaCO3 += weight;
      this.data.metrics.caco3Recovered += weight;
    } else {
      this.data.inventory.rejectedStock += weight;
    }

    this.data.metrics.batchesProcessed += 1;
    this.data.alerts.unshift({
      id: "ALT-" + Date.now(),
      type: grade === "Grade A" ? "success" : (grade === "Grade B" ? "info" : "alert"),
      time: "Just now",
      text: `Batch ${newBatch.id} graded by AI: ${newBatch.grade} (${newBatch.score}/100) — Added to ${grade} inventory.`
    });

    this.saveState();
    return newBatch;
  }

  // 3. Place a Marketplace Order
  placeOrder(productId, buyerName, contactPerson, quantityKg) {
    const product = this.data.marketplace.find(p => p.id === productId);
    if (!product) return { success: false, message: "Product not found" };

    const qty = Number(quantityKg);
    if (isNaN(qty) || qty <= 0) return { success: false, message: "Invalid quantity" };

    // Check inventory stock
    let targetStockKey = (product.grade === "Grade A" || product.grade === "Grade A+") ? "gradeAStock" : "gradeBStock";
    if (this.data.inventory[targetStockKey] < qty) {
      return { success: false, message: `Insufficient stock. Only ${this.data.inventory[targetStockKey]}kg available.` };
    }

    // Decrement inventory
    this.data.inventory[targetStockKey] -= qty;
    this.data.inventory.processedCaCO3 -= qty;
    product.availableKg -= qty;

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      buyer: buyerName || "Industrial Manufacturer",
      contactPerson: contactPerson || "Procurement Officer",
      materialGrade: product.grade,
      quantity: qty,
      unitPrice: product.pricePerKg,
      totalAmount: qty * product.pricePerKg,
      status: "Confirmed",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDelivery: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
      trackingLocation: "Order placed, queued for nitrogen silo dispatch",
      batchRef: product.batchSource.split(" / ")[0],
      certId: `CERT-${product.batchSource.split(" / ")[0]}`
    };

    this.data.orders.unshift(newOrder);
    this.data.alerts.unshift({
      id: "ALT-" + Date.now(),
      type: "info",
      time: "Just now",
      text: `New order ${orderId} confirmed for ${qty}kg ${product.grade} by ${newOrder.buyer}. Inventory updated.`
    });

    this.saveState();
    return { success: true, order: newOrder };
  }

  // 4. Advance machine status or simulate IoT jitter
  tickSensors() {
    const s = this.data.iotSensors;
    // Subtle realistic variations
    s.dryerTemp.value = Number((104.5 + (Math.random() * 1.6 - 0.8)).toFixed(1));
    s.moistureContent.value = Number((1.5 + (Math.random() * 0.15 - 0.07)).toFixed(2));
    s.ambientHumidity.value = Number((41.5 + (Math.random() * 1.0 - 0.5)).toFixed(1));
    s.millVibration.value = Number((1.18 + (Math.random() * 0.12 - 0.06)).toFixed(2));
    s.throughputKgH.value = Number((94.5 + (Math.random() * 2.5 - 1.2)).toFixed(1));
    s.systemEnergyKw.value = Number((53.4 + (Math.random() * 1.2 - 0.6)).toFixed(1));
    s.particleD50.value = Number((68.2 + (Math.random() * 1.2 - 0.6)).toFixed(1));
  }
}

// Instantiate global store
window.CalciFlowState = new CalciFlowStore();
