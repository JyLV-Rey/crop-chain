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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Valhalla error: ${res.status} - ${text}`);
  }

  const data = await res.json();
  const summary = data.trip.summary;

  return {
    distance: summary.length    // in minutes
  };
}

// Usage
export default async function getDistanceMatrix(buyers, farmers) {
  const matrix = [];

  for (const buyer of buyers) {
    const row = [];
    for (const farmer of farmers) {
      const distance = await getDistanceValhalla(buyer.location, farmer.location);
      row.push(distance);
    }
    matrix.push(row);
  }
  return matrix;
}





