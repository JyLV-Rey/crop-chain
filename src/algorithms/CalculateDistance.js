function getDistanceOnlyCostMatrix(farmers, buyers, distanceMatrix) {
  const matrix = [];

  // Flattened for global normalization
  const allDistances = distanceMatrix.flat().map(cell => cell.distance);
  const maxDistance = Math.max(...allDistances);

  farmers.forEach((farmer, farmerIndex) => {
    const innerMatrix = [];

    buyers.forEach((buyer, buyerIndex) => {
      const { distance } = distanceMatrix[farmerIndex][buyerIndex];

      innerMatrix.push(distance); // scaled to be consistent
    });

    matrix.push(innerMatrix);
  });

  return matrix;
}

export default getDistanceOnlyCostMatrix;
