# Project SATARK: Privacy Policy & Data Architecture

> **Architectural Mandate:** Project SATARK treats data privacy not as a legal afterthought, but as a hardcoded engineering constraint. Our system is built entirely on the principle of **Privacy by Design**. We do not collect, process, or store Personally Identifiable Information (PII).

---

## 1. Zero PII Guarantee

Project SATARK is an environmental triage and behavioral economics engine. It maps geographic risk and logistical friction, not individual identities. 

- The system structurally rejects the ingestion of names, biometric data, personal contact information, or precise individual geolocations.
- Field applications and grassroots network interfaces (Sociology Framework) operate on anonymized community trust nodes, ensuring no individual farmer or community member is tracked at a personal level.

---

## 2. Edge-Compute Data Minimization

Our hardware architecture guarantees privacy through immediate localized processing:

- **Acoustic and Thermal Processing:** Edge-nodes (Scout and Master nodes) equipped with sensors process raw environmental, thermal, and acoustic data locally on the micro-controller. 
- **Immediate Discard Protocol:** Raw audio or visual feeds are never transmitted over the network and are immediately dumped from volatile memory after processing.
- **Risk Index Transmission:** Only a lightweight, mathematical **Risk Index** (a quantified probability of fire or flood friction) is transmitted to the Supabase backend via MQTT.

---

## 3. Aggregated Telemetry for Evacuation Routing

When modeling evacuation friction and disaster triage routing, SATARK relies strictly on macroscopic data:

- **Anonymized Ping Density:** If telecom telemetry is utilized to map road congestion or population movement during a crisis, the system only ingests pre-aggregated, anonymized ping density data.
- **Mathematical Impossibility of Tracking:** It is mathematically and architecturally impossible to reverse-engineer this aggregated flow data to identify a specific device or human being.

---

## 4. Legal & Regulatory Compliance

Because SATARK structurally isolates itself from personal data, it operates in strict, default compliance with major global privacy frameworks:

- **Digital Personal Data Protection Act, 2023 (DPDPA - India):** Compliant via absolute data minimization and non-collection of personal digital data.
- **General Data Protection Regulation (GDPR - EU):** Compliant via core integration of "Privacy by Design" and structural anonymization.
- **Accessibility (WCAG 2.1 Level AA):** All frontend dashboards and public-facing interfaces are built to ensure accessibility for users with disabilities, preventing digital exclusion in disaster mitigation contexts.
