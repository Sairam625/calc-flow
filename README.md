# CalciFlow: Autonomous Biogenic Calcium Carbonate Refining Infrastructure

> **Important Notice:** This repository represents an interactive architectural prototype and proof-of-concept demonstration, not the final commercial production product. A comprehensive, production-grade enterprise platform (featuring live industrial PLC hardware integrations, distributed edge telemetry, and enterprise microservices) is currently under active engineering for final deployment.

CalciFlow is an end-to-end circular bio-refining platform that transforms high-volume eggshell bio-waste into certified Grade A and Grade A+ industrial-grade Calcium Carbonate (CaCO3). The platform bridges the gap between commercial waste generators, advanced physical refining operations, analytical quality assurance, and industrial B2B procurement for polymers, technical coatings, paper, and sustainable precast concrete.

---

## 1. Executive Summary & Problem Statement

### The Problem
- **Quarry Depletion & Heavy Emissions**: Conventional industrial calcium carbonate relies on open-pit limestone and marble quarrying. Quarrying consumes massive quantities of energy, destroys ecosystems, and generates significant carbon emissions during heavy rock blasting, transport, and energy-intensive fossil-fueled crushing.
- **Landfill Bio-Waste Burden**: Over 8 million metric tons of eggshells are discarded globally every year by commercial bakeries, food processors, industrial kitchens, and hatcheries. Discarded shells decompose in municipal landfills, releasing methane (CH4) and hydrogen sulfide (H2S) gases while generating foul odors and biohazard leachate.
- **Supply Inconsistency**: Historically, industrial buyers have hesitated to source recycled minerals due to perceived variance in chemical purity, pathogen contamination, moisture, and particle size distribution.

### The CalciFlow Solution
CalciFlow replaces open-pit quarry extraction with an automated circular refining model:
1. **Aggregated Bio-Feedstock Logistics**: Standardized intake and electric vehicle (EV) dispatch across registered commercial donor hubs.
2. **Digital Twin Plant Operations**: Telemetry monitoring across a 7-stage automated refining process (acoustic washing, thermal desiccation, organic membrane separation, and high-energy ball micronization).
3. **Standardized Laboratory Quality Certification**: ASTM D1199-compliant analytical assay testing verifying purity, moisture, and particle size metrics.
4. **Verifiable Cryptographic Custody**: Tamper-proof SHA-256 batch provenance linking every finished bag to its raw feedstock source, processing telemetry, and Certificate of Analysis (COA).
5. **Direct Industrial Marketplace**: Direct-to-factory allocation allowing polymer compounders, paint manufacturers, and precast producers to order certified bio-calcite at scale.

---

## 2. Mineral Grades & Technical Specifications

CalciFlow categorizes refined biogenic calcium carbonate into three distinct commercial tiers based on purity, particle fineness, and whiteness:

| Parameter | Grade A+ (Specialty Micronized) | Grade A (High Purity) | Grade B (Standard Purity) |
| :--- | :--- | :--- | :--- |
| **CaCO3 Assay Purity** | >= 96.5% | 93.0% - 96.4% | 88.0% - 92.9% |
| **Median Particle Size (D50)** | < 45 µm | 45 µm - 75 µm | 75 µm - 120 µm |
| **Moisture Content** | <= 0.8% | <= 1.5% | <= 2.5% |
| **Whiteness Index (L*)** | >= 95.5 (Ultra-White) | >= 92.0 (Bright White) | >= 88.0 (Off-White) |
| **Organic Residue** | < 0.15% | < 0.35% | < 0.80% |
| **pH (10% Slurry)** | 8.8 - 9.2 | 8.6 - 9.3 | 8.4 - 9.5 |
| **Compliance Standard** | ASTM D1199 Class GC / PC | ASTM D1199 Class PC | ASTM C595 / Soil Standard |
| **Target Industries** | Masterbatches, Medical Rubber, Optical Film | Industrial Coatings, Adhesives, Paper Pigment | Precast Concrete, Mortar, Soil Neutralization |
| **Indicative Price** | $280 / MT | $195 / MT | $130 / MT |

---

## 3. Platform Modules & Capabilities

### Module 1: Executive Overview & Life Cycle Assessment (LCA)
- Real-time platform KPI metrics: feedstock diverted (kg), certified yield (kg), net CO2e abatement, and laboratory pass rate.
- Comparative Life Cycle Assessment (LCA) engine calculating energy savings, water conservation, and quarry limestone displacement ratios.
- Technical benchmark matrix comparing CalciFlow against conventional quarry limestone and untreated eggshell waste across 6 critical operational vectors.

### Module 2: 7-Stage Refining Process Pipeline
Continuous physical process telemetry across seven industrial transformation stages:
1. **Intake & Washing**: Bio-sanitized hydro-acoustic cleaning to dissolve surface residues.
2. **Thermal Desiccation**: Fluidized-bed drying reducing raw shell moisture from ~28% to <1.5%.
3. **Membrane Separation**: Patented centrifugal air classification peeling and collecting the collagen-rich organic inner membrane for high-value biomedical/cosmetic secondary revenue.
4. **Crushing & Coarse Milling**: Hammermill reduction producing uniform 1-2 mm shell flakes.
5. **Ultra-Fine Micronization**: Continuous ceramic planetary ball milling achieving sub-45 µm particle distributions without thermal calcination.
6. **Chemical & Calcite Refinement**: Stearic acid surface modification and phase stabilization ensuring hydrophobic polymer compatibility.
7. **Lab Quality Assay & Certification**: Certified analytical laboratory verification against ASTM D1199 parameters with automatic Certificate of Analysis generation.

### Module 3: Digital Twin Plant Telemetry
- Real-time supervisory status of all plant machinery (Washing Station, Desiccator, Air Classifier, Ball Mill, Silos).
- Continuous live sensor mesh monitoring: throughput rates (kg/h), operating temperatures, motor vibration frequencies, power draw (kW), and operational efficiency.
- Instant alert dispatcher for operational threshold violations (temperature drift, bin overflow, maintenance warnings).

### Module 4: Batch Management & Provenance Ledger
- Comprehensive batch record ledger with multi-parameter filtering by grade, status, and origin.
- Complete chain-of-custody tracking from donor kitchen collection to finished warehouse silo.
- Cryptographic SHA-256 verification guaranteeing immutability for compliance and audit readiness.
- Instant digital Certificate of Analysis (COA) generation downloadable for quality assurance teams.

### Module 5: Feedstock Sourcing & Logistics Routing
- Intake ledger tracking registered commercial donor establishments (hotels, bakeries, food processing hubs, hatcheries).
- Real-time fill-level sensors with automated collection route dispatch to optimize electric transport logistics.
- Collection scheduling and driver assignment controls.

### Module 6: Factory Procurement & B2B Marketplace
- Real-time finished silo inventory breakdown across Grade A+, Grade A, and Grade B stock.
- Transparent volume pricing with multi-currency and unit conversions.
- Direct digital purchase order placement and order fulfillment tracking for industrial procurement managers.

### Module 7: Role-Based Operational Access Control
Switchable persona simulation tailored to specific supply chain stakeholders:
- **System Administrator**: Full platform visibility, KPI telemetry, and configuration control.
- **Refinery Plant Operator**: Digital twin machinery controls, sensor monitoring, and operational stage controls.
- **Feedstock Donor (Hotel/Bakery)**: Shell intake requests, pickup scheduling, and waste diversion credit tracking.
- **Industrial Buyer (Plastics/Coatings)**: Inventory reservation, COA auditing, and order placement.

---

## 4. System Architecture & Tech Stack

### Current Implementation (Front-End Prototype)
The interactive demonstrator is built as a zero-dependency, high-performance web application designed for instant execution without build steps:
- **Core Architecture**: Semantic HTML5 markup, clean structural layouts, and modular component hierarchy.
- **Styling Architecture**: Vanilla CSS3 using custom CSS variables (design tokens), flexible CSS Grid / Flexbox layouts, and light enterprise styling.
- **Application Logic**: Vanilla ECMAScript (ES6+) with state management encapsulated in a centralized `CalciFlowStore` class with `localStorage` persistence.
- **Data Layer**: Structured mock telemetry, machinery models, batch logs, and donor coordinates loaded from `js/data.js`.

### Production Deployment Architecture (Recommended Target Stack)

```
                    +---------------------------------------------+
                    |          INDUSTRIAL CLIENT INTERFACES       |
                    |  (Next.js / React 19 / TypeScript / Vite)   |
                    +----------------------+----------------------+
                                           | HTTPS / WSS
                    +----------------------v----------------------+
                    |              API GATEWAY                    |
                    |       (Kong / Envoy / Cloudflare)           |
                    +----------------------+----------------------+
                                           |
         +---------------------------------+---------------------------------+
         |                                 |                                 |
+--------v---------+             +---------v--------+              +---------v--------+
| LOGISTICS &      |             | REFINING &       |              | B2B MARKETPLACE  |
| SOURCING SERVICE |             | TELEMETRY CORE   |              | & ORDER SERVICE  |
| (Go / Gin)       |             | (FastAPI/Python) |              | (Node.js/NestJS) |
+--------+---------+             +---------+--------+              +---------+--------+
         |                                 |                                 |
         | MQTT / OPC UA                   | Sensor Streams                  | SQL Transactions
+--------v---------+             +---------v--------+              +---------v--------+
| FLEET TELEMATICS |             | INDUSTRIAL IOT   |              | TRANSACTIONAL    |
| (AWS IoT Core)   |             | (TimescaleDB)    |              | (PostgreSQL 16)  |
+------------------+             +---------+--------+              +------------------+
                                           |
                                 +---------v--------+
                                 | AUDIT LEDGER     |
                                 | (SHA-256 Merkle) |
                                 +------------------+
```

1. **Edge & Industrial IoT**:
   - **Protocol Support**: Modbus TCP/IP, OPC UA, and MQTT for connecting plant machinery (conveyors, dryers, ball mills, sensors).
   - **Edge Gateway**: AWS IoT Greengrass / Siemens SIMATIC Edge for low-latency local telemetry aggregation and emergency stop logic.
2. **Backend Microservices**:
   - **High-Throughput Ingestion**: Go (Golang) microservices for fleet telemetry and order processing.
   - **Analytical Processing**: Python (FastAPI, NumPy, Pandas) for real-time sensor analysis, calibration curve calculations, and LCA modeling.
3. **Data Storage & Audit**:
   - **Time-Series Telemetry**: TimescaleDB / InfluxDB for storing millisecond sensor telemetry.
   - **Relational Data**: PostgreSQL 16 for user identity, order ledger, and batch inventories.
   - **Cache & Message Broker**: Redis and Apache Kafka for asynchronous event streaming.
   - **Tamper-Proof Provenance**: Cryptographic SHA-256 Merkle tree ledger ensuring immutable custody logs for ISO compliance.

---

## 5. Directory Structure

```
calciflow/
|-- index.html              # Main application shell with multi-view architecture
|-- css/
|   `-- styles.css          # Design tokens, layouts, tables, and component styles
|-- js/
|   |-- app.js              # View router, modal logic, event listeners, and UI bindings
|   `-- data.js             # Initial state, batch records, donor hubs, and machine models
|-- docx/
|   |-- pt.txt                            # Raw problem statement and technical notes
|   |-- pitch_presentation_guide.md       # Step-by-step judge presentation script
|   |-- tech_stack_and_architecture.md    # Production architecture & cloud specifications
|   |-- implementation_flowchart.md       # Complete workflow and system flow documentation
|   `-- calciflow_implementation_flowchart.jpg # Visual system implementation diagram
|-- flow.png                # Implementation architecture flowchart diagram
|-- pipeline.png            # Visual asset of the refining pipeline
|-- pipeline_final.png      # High-resolution refining process diagram
`-- README.md               # Master project documentation
```

---

## 6. Getting Started & Local Usage

The application requires no external package managers, node dependencies, or build pipelines.

### Running Locally

#### Method 1: Direct File Opening
Double-click `index.html` in your file explorer or open it directly in any modern web browser (Chrome, Edge, Firefox, Safari):
```
file:///path/to/calciflow/index.html
```

#### Method 2: Local HTTP Server (Python)
If you prefer running via a local web server:
```bash
# Navigate to the project root
cd /path/to/calciflow

# Start Python HTTP server
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

#### Method 3: Visual Studio Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select **"Open with Live Server"**.

---

## 7. Business Model & Environmental Impact

### Commercial Revenue Streams
1. **Bio-Calcite Material Sales**: Direct bulk sales of Grade A+ ($280/MT), Grade A ($195/MT), and Grade B ($130/MT) to polymer, paint, and concrete manufacturers.
2. **Secondary Collagen Membrane Extraction**: Purified eggshell membrane sold as high-value bio-active powder to cosmetic and nutraceutical processors ($1,200+/MT).
3. **Feedstock Collection Tipping Fees**: Commercial waste management contracts with large food processing plants and hatcheries seeking certified zero-landfill compliance.
4. **Verified Carbon Offsets**: Monetization of verified Scope 1 & Scope 3 carbon abatement credits via industrial decarbonization registries.

### Environmental Benefits
- **Zero-Waste Diversion**: 100% of incoming shell biomass is utilized (calcium carbonate mineral + protein membrane).
- **Decarbonized Sourcing**: Eliminates blasting, heavy diesel transport, and calcination associated with quarry extraction.
- **Landfill Gas Abatement**: Halts landfill anaerobic digestion, preventing fugitive methane and toxic hydrogen sulfide emissions.

---

## 8. Standards & Quality Compliance

- **ASTM D1199**: Standard Specification for Calcium Carbonate Pigments (Class PC and GC compliance for particle size, purity, and oil absorption).
- **ISO 17025 Ready**: Standardized laboratory assay tracking compatible with accredited calibration and testing laboratories.
- **Cryptographic Traceability**: SHA-256 hash chaining of raw feedstock intake batches, processing temperatures, and final analytical assays.
