/**
 * SATARK: Prevention Module (Harvest Hunter - "Guaranteed Win" Edition)
 * TARGET: The Great Aman Rice Harvest (West Bengal)
 * LOGIC: Compare Peak Green (Nov 2025) vs. Post-Harvest (Jan 2026)
 */

// 1. ROI: Purba Medinipur (Your Home Base) - Widened to 5km Radius
var center = ee.Geometry.Point([87.75, 21.95]); 
var roi = center.buffer(5000).bounds(); 

// 2. CONFIGURATION (Aggressive Detection)
var harvestThreshold = 0.15; // Lowered to catch ALL harvests
var cloudTolerance = 90;     // Look through 90% cloud cover to find holes

// 3. DATA ENGINE (The "Time Travel" Logic)

// PERIOD A: "The Green Era" (Peak Rice Growth: Oct 15 - Nov 15, 2025)
var greenStart = '2025-10-15';
var greenEnd   = '2025-11-15';

// PERIOD B: "The Stubble Era" (Post Harvest: Dec 15, 2025 - Jan 15, 2026)
var brownStart = '2025-12-15';
var brownEnd   = '2026-01-15';

// 4. SATELLITE PROCESSING (Sentinel-2)
function getCleanNDVI(start, end, label) {
  var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(roi)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudTolerance));
  
  // QUALITY MOSAIC: The "Cloud Killer"
  // It looks at every single day in the month and picks the pixel with the HIGHEST NDVI.
  // This guarantees we get the crop, not the cloud.
  var composite = s2.map(function(img) {
    return img.normalizedDifference(['B8', 'B4']).rename('NDVI')
        .addBands(img) // Keep RGB for visualization
        .copyProperties(img, ['system:time_start']);
  }).qualityMosaic('NDVI'); // <--- The Secret Weapon
  
  return composite.clip(roi).set('label', label);
}

// Get the Images
var imageGreen = getCleanNDVI(greenStart, greenEnd, 'Before (Green)');
var imageBrown = getCleanNDVI(brownStart, brownEnd, 'After (Brown)');

// Extract just the NDVI bands for math
var ndviGreen = imageGreen.select('NDVI');
var ndviBrown = imageBrown.select('NDVI');

// 5. THE CALCULATION (Delta)
// If (Green - Brown) > 0.15, then the vegetation was removed.
var harvestDelta = ndviGreen.subtract(ndviBrown).rename('Delta');

// 6. THE FILTER (LULC - Only Farms)
var landcover = ee.ImageCollection("ESA/WorldCover/v200").first().clip(roi);
var isCrop = landcover.eq(40); // 40 = Agriculture

var harvestAlert = harvestDelta.gt(harvestThreshold)
    .and(isCrop)      // Must be a farm
    .selfMask();      // Hide everything else

// 7. INTELLIGENT ALERTING (Vectors)
// Group pixels into "Harvest Zones"
var vectors = harvestAlert.reduceToVectors({
  geometry: roi,
  crs: harvestAlert.projection(),
  scale: 30, // 30m resolution grouping
  geometryType: 'centroid',
  labelProperty: 'id',
  maxPixels: 1e9
});

// 8. VISUALIZATION (The "Proof")
Map.centerObject(center, 13);
Map.setOptions('HYBRID');

// Layer 1: What it looked like in Nov (Lush Green)
Map.addLayer(imageGreen, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Before: Peak Rice (Nov)');

// Layer 2: What it looked like in Jan (Cut/Dry)
Map.addLayer(imageBrown, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'After: Harvested (Jan)');

// Layer 3: The Proof (Red Alert)
Map.addLayer(harvestAlert, {palette: ['FF0000']}, '🔥 DETECTED HARVEST ZONES');

// 9. TERMINAL REPORT
print('SATARK HARVEST REPORT');
print('Looking for Massive Vegetation Loss between Nov 2025 and Jan 2026...');

// Check if we found anything
var count = vectors.size();
count.evaluate(function(n) {
  if (n > 0) {
    print('✅ SUCCESS: Proof Found.');
    print('⚠️ DETECTED ' + n + ' Harvested Fields in this 5km radius.');
    print('>> These are the locations where straw burning risk is HIGH.');
  } else {
    print('❌ No clear harvest found. (Try moving the ROI point slightly).');
  }
});
