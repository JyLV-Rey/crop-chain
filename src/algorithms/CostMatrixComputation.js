function costMatrix(farmers, buyers, distanceMatrix, global) {
  const matrix = [];

  const penalty_oversupply = global.penalty_oversupply_buyer;
  const penalty_undersupply = global.penalty_undersupply_farmer;
  const penalty_distance = global.penalty_distance;

  buyers.forEach((buyer, buyerIndex) => {
      const innerMatrix = [];

      farmers.forEach((farmer, farmerIndex) => {
         let total_fruit_cost = 0;

         farmer.produce.forEach((produce, produceIndex) => {
           const { distance } = distanceMatrix[buyerIndex][farmerIndex];
           const distance_cost = Math.pow(distance, penalty_distance);

           const buyer_supply = buyer.produce[produceIndex];
           const buyer_supply_max = buyer_supply.supply_limit;
           const buyer_supply_current = buyer_supply.supply_current;

           const farmer_supply = produce.supply;

           const buyer_cost = 1 + (Math.pow((buyer_supply_current / buyer_supply_max), penalty_oversupply));
           const farmer_cost = 1 + (Math.pow(farmer_supply, penalty_undersupply));

           const total_cost = (distance_cost * buyer_cost) / farmer_cost;

           total_fruit_cost += total_cost;
         })
         innerMatrix.push(total_fruit_cost * 100);
      })
      matrix.push(innerMatrix);
   })
   return matrix;
}

export default costMatrix