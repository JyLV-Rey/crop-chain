export default function CostMatrixComputation({
  distances,     // 2D array: distances[i][j]
  supplies,      // 1D array: supplies[i]
  buyerStocks,   // 1D array: buyerStocks[j]
  bMax,          // scalar: max target stock
  alpha,         // scalar: supply exponent
  delta,         // scalar: oversupply penalty
  beta           // scalar: distance exponent (NEW)
}) {
  const costMatrix = [];

  for (let i = 0; i < distances.length; i++) {
    const row = [];
    for (let j = 0; j < distances[i].length; j++) {
      const d_ij = distances[i][j];
      const s_if = supplies[i];
      const b_jf = buyerStocks[j];

      const distanceComponent = Math.pow(d_ij, beta);
      const oversupplyPenalty = 1 + delta * (b_jf / bMax);
      const denominator = Math.pow(s_if, alpha);

      const cost = (distanceComponent * oversupplyPenalty) / denominator;

      row.push(parseFloat(cost.toFixed(2)));
    }
    costMatrix.push(row);
  }

  return costMatrix;
}
