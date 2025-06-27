// LEGACY FUNCTION THAT COMPUTES FOR THE COST MATRIX BUT THE VALUES ARE UNNORMALIZED

function costMatrix(
  farmers,
  buyers,
  distanceMatrix,
  global,
  disregardDistance = false,
  disregardUndersupply = false,
  disregardOversupply = false
) {
  const matrix = [];

  let penalty_oversupply = global.penalty_oversupply_buyer;
  let penalty_undersupply = global.penalty_undersupply_farmer;
  let penalty_distance = global.penalty_distance;

  if (disregardDistance) penalty_distance = 0;
  if (disregardUndersupply) penalty_undersupply = 0;
  if (disregardOversupply) penalty_oversupply = 0;

  farmers.forEach((farmer, farmerIndex) => {
    const innerMatrix = [];

    buyers.forEach((buyer, buyerIndex) => {
      let total_fruit_cost = 0;

      farmer.produce.forEach((produce, produceIndex) => {
        // Raw distance
        const { distance } = distanceMatrix[farmerIndex][buyerIndex];

        // Priority of the Produce
        let priority = global.produce[produceIndex].priority || 1;
        if (disregardOversupply && disregardUndersupply) priority = 1;

        // Supply of Buyer
        const buyer_supply = buyer.produce[produceIndex];
        const buyer_supply_max = buyer_supply.supply_limit;
        const buyer_supply_current = buyer_supply.supply_current;

        // Supply of Farmer
        const farmer_supply = produce.supply;

        // Cost Components (no normalization)
        const distance_cost = Math.pow(distance, penalty_distance);
        const buyer_cost = 1 + Math.pow(buyer_supply_current / buyer_supply_max, penalty_oversupply);
        const farmer_cost = 1 + Math.pow(farmer_supply, penalty_undersupply);
        const priority_weight = 1 / priority;

        // Total cost without normalization
        const total_cost = priority_weight * (distance_cost * buyer_cost) / farmer_cost;

        total_fruit_cost += total_cost;
      });

      innerMatrix.push(total_fruit_cost * 100); // Optional scale-up for solver stability
    });

    matrix.push(innerMatrix);
  });

  return matrix;
}

export default costMatrix;
