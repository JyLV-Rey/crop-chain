function getDistanceOnlyCostMatrix(farmers, buyers, distanceMatrix) {
  const matrix = [];

  // Flattened for global normalization
  const allDistances = distanceMatrix.flat().map(cell => cell.distance);
  const maxDistance = Math.max(...allDistances);

  farmers.forEach((farmer, farmerIndex) => {
    const innerMatrix = [];

    buyers.forEach((buyer, buyerIndex) => {
      const { distance } = distanceMatrix[farmerIndex][buyerIndex];
      const normalized_distance = distance / maxDistance;

      innerMatrix.push(normalized_distance * 100); // scaled to be consistent
    });

    matrix.push(innerMatrix);
  });

  return matrix;
}

export default getDistanceOnlyCostMatrix;
