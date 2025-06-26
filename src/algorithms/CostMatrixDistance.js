function pureDistanceCostMatrix(farmers, buyers, distanceMatrix) {
  const matrix = [];

  // Outer: farmer = row
  farmers.forEach((_, farmerIndex) => {
    const innerMatrix = [];

    // Inner: buyer = column
    buyers.forEach((_, buyerIndex) => {
      const { distance } = distanceMatrix[farmerIndex][buyerIndex]; // note: [buyer][farmer] shape

      // Use raw distance as cost (you can normalize if desired)
      innerMatrix.push(distance);
    });

    matrix.push(innerMatrix);
  });

  return matrix;
}

export default pureDistanceCostMatrix;