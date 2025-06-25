export default function CostMatrixComputation(size = 5) {
  const costMatrix = [];

  // Initialize the matrix rows
  for (let i = 0; i < size; i++) {
    costMatrix.push([]);
  }

  // Fill the matrix with random decimals from 0 to 100
  for (let i = 0; i < costMatrix.length; i++) {
    for (let j = 0; j < costMatrix.length; j++) {
      const randomCost = Math.random() * 100;
      costMatrix[i].push(parseFloat(randomCost.toFixed(2)));
    }
  }

  return costMatrix;
}
