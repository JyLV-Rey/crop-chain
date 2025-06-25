function findBestAssignment(G) {
  const n = G.length;
  let minCost = Infinity;
  let bestAssignment = [];
  let iteration = 0;

  function ASSIGNMENT(i, usedBuyers, currentCost, currentAssign) {
    iteration++; // Count each function entry (node in the search tree)

    // Base case
    if (i === n) {
      if (currentCost < minCost) {
        minCost = currentCost;
        bestAssignment = [...currentAssign];
      }
      return;
    }

    for (let j = 0; j < n; j++) {
      if (!usedBuyers.has(j)) {
        const nextCost = currentCost + G[i][j];
        if (nextCost < minCost) {
          usedBuyers.add(j);
          ASSIGNMENT(i + 1, usedBuyers, nextCost, [...currentAssign, [i, j]]);
          usedBuyers.delete(j); // backtrack
        }
      }
    }
  }

  ASSIGNMENT(0, new Set(), 0, []);
  return { bestAssignment, minCost, iteration };
}


// Example usage:
const costMatrix = [
  [9, 2, 7, 8],
  [6, 4, 3, 7],
  [5, 8, 1, 8],
  [7, 6, 9, 4]
];

const result = findBestAssignment(costMatrix);
console.log("Best Assignment:", result.bestAssignment);
console.log("Minimum Cost:", result.minCost);
console.log("Number of Iterations:", result.iteration);
console.log("Number of Assignments:", result.bestAssignment);
