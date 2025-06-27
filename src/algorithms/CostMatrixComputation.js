function costMatrix(farmers, buyers, distanceMatrix, global, disregardDistance = false, disregardUndersupply = false, disregardOversupply = false) {
  const matrix = [];

  let penalty_oversupply = global.penalty_oversupply_buyer;
  let penalty_undersupply = global.penalty_undersupply_farmer;
  let penalty_distance = global.penalty_distance;

  // This is for the statistics page, i needed to compute for the perfect assignment disregarding each individual parameter.
  if (disregardDistance) {
    penalty_distance = 0;
  }

  if (disregardUndersupply) {
    penalty_undersupply = 0;
  }

  if (disregardOversupply) {
    penalty_oversupply = 0;
  }

  // note to self always ddouble check the indexes, it's hard to debug
  // Outer loop is now farmers (rows of the matrix)
  farmers.forEach((farmer, farmerIndex) => {
    const innerMatrix = [];

    // Inner loop is buyers (columns of the matrix)
    buyers.forEach((buyer, buyerIndex) => {
      let total_fruit_cost = 0;

      farmer.produce.forEach((produce, produceIndex) => {

        // Distances
        const { distance } = distanceMatrix[farmerIndex][buyerIndex];
        const rowDistances = distanceMatrix[buyerIndex].map(cell => cell.distance);
        const distance_cost = distance / Math.max(...rowDistances);

        // Priority of the Produce
        let priority = global.produce[produceIndex].priority || 1;
        if(disregardOversupply && disregardUndersupply) priority = 1; // perfect assignment disregarding the priorities

        // Supply of Buyer
        const buyer_supply = buyer.produce[produceIndex];
        const buyer_supply_max = buyer_supply.supply_limit;
        const buyer_supply_current = buyer_supply.supply_current;

        // Supply of Farmer
        const farmer_supply_max = Math.max(1e-6, ...farmer.produce.map(p => p.supply));
        const farmer_supply = produce.supply;

        // Normalization Methods
        const normalized_distance = Math.pow(distance_cost, penalty_distance);
        const normalized_priority = 1 / (priority); // higher priority = lower cost
        const farmer_supply_normalized = farmer_supply / farmer_supply_max;

        // Finalizing the Costs
        const buyer_cost = 1 + (Math.pow((buyer_supply_current / buyer_supply_max), penalty_oversupply));
        const farmer_cost = 1 + (Math.pow(farmer_supply_normalized, penalty_undersupply));

        const total_cost = normalized_priority * (normalized_distance * buyer_cost) / farmer_cost;

        // Adding the total fruit costs
        total_fruit_cost += total_cost;
      });
      // append outerr row 
      innerMatrix.push(total_fruit_cost * 100);
    });

    // Appending the Inner Row
    matrix.push(innerMatrix);
  });

  return matrix;
}

export default costMatrix;
