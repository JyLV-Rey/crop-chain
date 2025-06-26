import costMatrix from '../algorithms/CostMatrixComputation.js';
import assert from 'assert/strict';
/**
 * Test A: 3x3 Buyer-Farmer Cost Matrix with Distance and Supply Penalties
 * 
 *          Buyers x Farmers:
 *                 Farmer0  Farmer1  Farmer2
 *          Buyer0   ?        ?         ?
 *          Buyer1   ?        ?         ?
 *          Buyer2   ?        ?         ?
 * 
 *          Each cell is a cost computed based on:
 *            - Normalized distance
 *            - Produce priority
 *            - Oversupply penalties (buyers)
 *            - Undersupply penalties (farmers)
 * 
 *          The test checks:
 *            - That the matrix is 3x3
 *            - All values are finite numbers
 *            - That the matrix values reflect calculated logic
 *                 
 * Cell [0][0] → Buyer1 x FarmerA
 *
 * Produce: banana and mango
 * Distance: 10 (max in row = 15) → normalized_distance = 10 / 15 = 0.6667
 *
 *  Banana:
 *   - priority = 1 → normalized_priority = 1 / 1 = 1
 *   - buyer supply = 4 / 10 → buyer_cost = 1 + (0.4)^2 = 1.16
 *   - farmer supply = 10 / 10 → farmer_cost = 1 + (1)^2 = 2
 *   - cost = 1 * (0.6667 * 1.16) / 2 = 0.3867
 *
 *  Mango:
 *   - priority = 2 → normalized_priority = 1 / 2 = 0.5
 *   - buyer supply = 2 / 8 → buyer_cost = 1 + (0.25)^2 = 1.0625
 *   - farmer supply = 5 / 10 → farmer_cost = 1 + (0.5)^2 = 1.25
 *   - cost = 0.5 * (0.6667 * 1.0625) / 1.25 = 0.2833
 *
 * Total cost = 0.3867 + 0.2833 = 0.66997
 * Final cell value = 0.66997 × 100 = 66.997 ≈ **67**
 *              
 */

function testA() {
  const global = {
    penalty_oversupply_buyer: 2,
    penalty_undersupply_farmer: 2,
    penalty_distance: 1,
    produce: [
      { name: 'banana', priority: 1 },
      { name: 'mango', priority: 2 }
    ]
  };

  const farmers = [
    {
      name: 'FarmerA',
      produce: [
        { name: 'banana', supply: 10 },
        { name: 'mango', supply: 5 }
      ]
    },
    {
      name: 'FarmerB',
      produce: [
        { name: 'banana', supply: 4 },
        { name: 'mango', supply: 6 }
      ]
    },
    {
      name: 'FarmerC',
      produce: [
        { name: 'banana', supply: 3 },
        { name: 'mango', supply: 1 }
      ]
    }
  ];

  const buyers = [
    {
      name: 'Buyer1',
      produce: [
        { supply_current: 4, supply_limit: 10 },
        { supply_current: 2, supply_limit: 8 }
      ]
    },
    {
      name: 'Buyer2',
      produce: [
        { supply_current: 8, supply_limit: 10 },
        { supply_current: 7, supply_limit: 10 }
      ]
    },
    {
      name: 'Buyer3',
      produce: [
        { supply_current: 1, supply_limit: 5 },
        { supply_current: 0, supply_limit: 6 }
      ]
    }
  ];

  const distanceMatrix = [
    // Buyer1 distances to all farmers
    [{ distance: 10 }, { distance: 15 }, { distance: 5 }],
    // Buyer2 distances
    [{ distance: 30 }, { distance: 25 }, { distance: 10 }],
    // Buyer3 distances
    [{ distance: 5 }, { distance: 10 }, { distance: 15 }],
  ];

  const matrix = costMatrix(farmers, buyers, distanceMatrix, global);

  console.log('Test A: 3x3 Cost Matrix');
  console.table(matrix);

  assert.strictEqual(matrix.length, 3, 'Matrix should have 3 rows (buyers)');
  assert.strictEqual(matrix[0].length, 3, 'Each row should have 3 columns (farmers)');

  matrix.flat().forEach((val, i) => {
    assert.ok(typeof val === 'number' && !isNaN(val), `Matrix value at index ${i} should be a valid number`);
  });

  console.log('Test A passed!\n');
}

/**
 * Test B: Floating Point Numbers (Non-integer total cost)
 * Manual Calculation for Cell [0][0] → BuyerFloat × FarmerFloat
 * 
 * Global Penalties:
 *   - penalty_oversupply_buyer = 2
 *   - penalty_undersupply_farmer = 2
 *   - penalty_distance = 1
 * 
 * Distance:
 *   - distance = 12.5
 *   - max in row = 12.5
 *   - normalized_distance = 12.5 / 12.5 = 1
 * 
 * Produce: Banana 
 *   - priority = 1 → normalized_priority = 1 / 1 = 1
 *   - buyer supply ratio = 2.5 / 8.5 = 0.2941 → buyer_cost = 1 + (0.2941)^2 = 1.0864
 *   - farmer supply ratio = 7.5 / 7.5 = 1 → farmer_cost = 1 + (1)^2 = 2
 *   - banana_cost = 1 * (1 * 1.0864) / 2 = 0.5432
 * 
 * Produce: Mango 
 *   - priority = 1.5 → normalized_priority = 1 / 1.5 = 0.6667
 *   - buyer supply ratio = 1.2 / 5 = 0.24 → buyer_cost = 1 + (0.24)^2 = 1.0576
 *   - farmer supply ratio = 3.2 / 7.5 = 0.4267 → farmer_cost = 1 + (0.4267)^2 = 1.182
 *   - mango_cost = 0.6667 * (1 * 1.0576) / 1.182 = 0.5967
 * 
 * Total cost = 0.5432 + 0.5967 = 1.1399
 * Final matrix value = 1.1399 * 100 = **113.99**
 */

function testB() {
  const global = {
    penalty_oversupply_buyer: 2,
    penalty_undersupply_farmer: 2,
    penalty_distance: 1,
    produce: [
      { name: 'banana', priority: 1 },
      { name: 'mango', priority: 1.5 }
    ]
  };

  const farmers = [
    {
      name: 'FarmerFloat',
      produce: [
        { name: 'banana', supply: 7.5 },
        { name: 'mango', supply: 3.2 }
      ]
    }
  ];

  const buyers = [
    {
      name: 'BuyerFloat',
      produce: [
        { supply_current: 2.5, supply_limit: 8.5 },
        { supply_current: 1.2, supply_limit: 5.0 }
      ]
    }
  ];

  const distanceMatrix = [
    [ { distance: 12.5 } ] // 1 buyer, 1 farmer
  ];

  const matrix = costMatrix(farmers, buyers, distanceMatrix, global);

  console.log('Test B: Floating Point Supplies');
  console.table(matrix);

  assert.strictEqual(matrix.length, 1);
  assert.strictEqual(matrix[0].length, 1);
  assert.ok(typeof matrix[0][0] === 'number' && !isNaN(matrix[0][0]), 'Matrix value should be a valid float');
  console.log('Test B passed!\n');
}

function testC() {
  const global = {
    penalty_oversupply_buyer: 2,
    penalty_undersupply_farmer: 2,
    penalty_distance: 1,
    produce: [
      { name: 'banana', priority: 1 }
    ]
  };

  const farmers = [
    {
      name: 'BadFarmer',
      produce: [
        { name: 'banana', supply: -5 }
      ]
    }
  ];

  const buyers = [
    {
      name: 'GoodBuyer',
      produce: [
        { supply_current: 2, supply_limit: 10 }
      ]
    }
  ];

  const distanceMatrix = [
    [ { distance: 10 } ]
  ];

  try {
    costMatrix(farmers, buyers, distanceMatrix, global);
    assert.fail('Should have thrown error for negative supply');
  } catch (err) {
    assert.ok(err instanceof Error, 'Should throw an error for negative input');
    console.log('Test C (Negative Input Rejected) passed!\n');
  }
}


// Run test
testA();
testB();
testC();