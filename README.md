# SATARK PRIME: Cascaded AI & IoT Climate Defense Grid

[![DPGA Candidate](https://img.shields.io/badge/DPGA-Candidate-blue.svg)](#) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Hardware: CERN-OHL-S](https://img.shields.io/badge/Hardware-CERN_OHL_S-orange.svg)](#)

Project SATARK is an end-to-end, state-mandated digital public good designed to stop the $24 Billion agricultural hydrological hemorrhage in the Indo-Gangetic Plain. 

Rather than policing farmers after a fire has started, SATARK utilizes a cascaded architecture of orbital upscaling, offline IoT mesh networks, and hyper-localized behavioral economics to predict, intercept, and manage crop-residue burning before combustion occurs.

Currently undergoing pilot deployment in the Kolaghat Development Block under official mandates from the Government of West Bengal.

## The Architecture of Defense

SATARK PRIME operates on a 4-layer verification and interception pipeline:

### Layer 1: Prediction (The GIS Engine)
We track the fields before the match is lit. Using Google Earth Engine, we analyze Sentinel-2 and Landsat-8 data to track the NDVI (Normalized Difference Vegetation Index). By identifying the rapid shift from active green crop to brown harvested soil, the system generates a 14-day "High-Risk Window," allowing our ground operators to deploy balers and PUSA Decomposer ahead of the farmer's panic window.

### Layer 2: Rapid Response (The SwinIR Upscaler)
Satellites suffer from a spatial-temporal paradox: Low Earth Orbit (LEO) gives clear images but only passes twice a day. Geostationary (GEO) satellites provide 10-minute updates but the pixels are too massive to spot a 1-bigha fire. 
SATARK uses a **Cascaded SwinIR Vision Transformer** to artificially upscale low-resolution, high-frequency thermal anomaly feeds. We bypass orbital physics to create a synthetic, high-resolution, real-time fire detection grid.

### Layer 3: Ground Truth (IoT Chemical Signatures)
AI hallucinations cost political capital. To ensure 100% confidence, the SwinIR alerts are validated by an indigenous **ESP-NOW offline mesh network**. 
Bare-circuit Sentry Nodes equipped with MQ-135 and DHT-11 sensors are deployed in the fields. If the AI detects a thermal anomaly, but the ground sensors detect zero spike in particulate matter or carbon monoxide, the system flags a false positive. 

### Layer 4: The Smart Burn Protocol (The Compromise)
If a farmer absolutely cannot afford the labor to clear the field, SATARK shifts from prevention to mitigation. The system calculates local wind vectors, humidity, and the presence of a Thermal Inversion Layer (the "Gas Chamber" lid). It then calculates a precise meteorological window where burning will cause the least particulate stagnation, transmitting this "Safe Burn" window to the local administration.

## The Human API (Sociological Framework)

Code cannot hand a farmer a bottle of PUSA Decomposer. SATARK is physically executed by a decentralized network of student Guardians. 

To bridge the gap between orbital data and rural reality, this repository open-sources our complete sociological playbook, located in the `/sociology_framework` directory:
* **The 11th Gift Protocol:** Our operational psychology guidelines for approaching economically captive farmers. 
* **Mutual Cooperation Pacts:** The legal framework used to secure "Green Zones" of unburned land.
* **Biomass Transfer Manifests:** The physical ledger system to track the reallocation of straw.

## Licensing
To ensure this infrastructure remains a public good:
* **Software/AI:** GNU GPLv3
* **Hardware Circuitry:** CERN-OHL-S
* **Sociological Documentation:** CC BY-SA 4.0

## Deployment Status
* **Hardware:** MVP Phase
* **Software:** Active SwinIR Kaggle Pipeline
* **Field:** 1,000-Bigha Sandbox operational under WB Block Development Officer mandate.
