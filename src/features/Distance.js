// getDistanceMatrix.js
const nominatimCache = new Map(); // To avoid redundant lookups

async function reverseGeocode({ latitude, longitude }) {
  const key = `${latitude},${longitude}`;
  if (nominatimCache.has(key)) return nominatimCache.get(key);

  const url = `http://localhost:3002/api/reverse?lat=${latitude}&lon=${longitude}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Nominatim error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  const locationName = data.display_name || "Unknown location";

  nominatimCache.set(key, locationName);
  return locationName;
}

async function getDistanceValhalla(start, end) {
  const url = 'http://localhost:3001/api/route';

  const payload = {
    locations: [
      { lat: start.latitude, lon: start.longitude },
      { lat: end.latitude, lon: end.longitude }
    ],
    costing: 'auto',
    directions_options: { units: 'kilometers' }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Valhalla error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  const summary = data.trip.summary;
  const leg = data.trip.legs[0];

  return {
    distance: summary.length,
    time: summary.time,
    maneuvers: leg.maneuvers,
    shape: leg.shape
  };
}

export default async function getDistanceMatrix(buyers, farmers) {
  const matrix = [];

  for (const buyer of buyers) {
    const row = [];

    // Get buyer's location name (cached)
    const buyerLocationName = await reverseGeocode(buyer.location);

    for (const farmer of farmers) {
      const farmerLocationName = await reverseGeocode(farmer.location);
      const valhallaData = await getDistanceValhalla(buyer.location, farmer.location);

      row.push({
        ...valhallaData,
        buyer_location_name: buyerLocationName,
        farmer_location_name: farmerLocationName
      });
    }

    matrix.push(row);
  }

  return matrix;
}
