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

  for (const farmer of farmers) {
    const row = [];

    for (const buyer of buyers) {
      const valhallaData = await getDistanceValhalla(farmer.location, buyer.location);

      row.push({
        ...valhallaData,
        buyer_location_name: "N/A",
        farmer_location_name: "N/A"
      });
    }

    matrix.push(row); // Now farmer is outer, buyer is inner
  }

  return matrix;
}
