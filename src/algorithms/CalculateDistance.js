function getDistanceOnlyCostMatrix(farmers, buyers, distanceMatrix) {
  const matrix = [];

  farmers.forEach((farmer, farmerIndex) => {
    const innerMatrix = [];

    buyers.forEach((buyer, buyerIndex) => {
      const { distance } = distanceMatrix[farmerIndex][buyerIndex];

      innerMatrix.push(distance);
    });

    matrix.push(innerMatrix);
  });

  return matrix;
}

export default getDistanceOnlyCostMatrix;
