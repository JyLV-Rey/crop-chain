/* ---------------------------------------------------------
 * QUICK UNIT-TEST for Branch-&-Bound assignment solver
 * ---------------------------------------------------------
 */

import assignProblemSolver from '../algorithms/assignmentProblem.js';
import assert from 'assert/strict';

/**
 * Test 1: Basic Eye-Solvable Matrix
 *          Matrix:
 *                 Buyer0  Buyer1  Buyer2
 *          Farmer0    4       1       3
 *          Farmer1    2       0       5
 *          Farmer2    3       2       2
 *
 *          Cheapest assignment = (0,1 , 1,0 , 2,2)
 *          Total cost = 1 + 2 + 2 = 5
 */
function test1() {
  const matrix = [
    [4, 1, 3],
    [2, 0, 5],
    [3, 2, 2],
  ];

  const { bestAssignment, minCost, iterations } = assignProblemSolver(matrix);
  assert.strictEqual(minCost, 5, 'Total minimum cost should be 5');
  const sortedPairs = bestAssignment.map(([f, b]) => `[${f},${b}]`).sort().join(',');
  assert.strictEqual(sortedPairs, '[0,1],[1,0],[2,2]', 'Optimal pairing should be ([0,1] , [1,0] , [2,2])');
  console.log('  Test 1 passed! C:');
  console.log(`   iterations explored: ${iterations}`);
  console.log(`   best assignment    : ${JSON.stringify(bestAssignment)}`);
  console.log(`   minimum cost       : ${minCost}`);
}

/**
 * Test 2: Infeasible Pairing (Infinity Penalty)
 *          Matrix:
 *                 Buyer0  Buyer1  Buyer2
 *          Farmer0  Inf     4       2
 *          Farmer1   1     Inf      6
 *          Farmer2   3      3     Inf
 *
 *          Expected result: must skip Inf pairs, find valid min path.
 *          Cheapest assignment = (0,2 , 1,0 , 2,1)
 *          Total cost = 2 + 1 + 3 = 6
 */
function test2() {
  const INF = Infinity;
  const matrix = [
    [INF, 4, 2],
    [1, INF, 6],
    [3, 3, INF],
  ];
  const { bestAssignment, minCost, iterations } = assignProblemSolver(matrix);
  assert.strictEqual(minCost, 6, 'Total minimum cost should be 6');
  const sortedPairs = bestAssignment.map(([f, b]) => `[${f},${b}]`).sort().join(',');
  assert.strictEqual(sortedPairs, '[0,2],[1,0],[2,1]', 'Expected valid assignment skipping infinities');
  console.log('  Test 2 passed! :V');
  console.log(`   iterations explored: ${iterations}`);
  console.log(`   best assignment    : ${JSON.stringify(bestAssignment)}`);
  console.log(`   minimum cost       : ${minCost}`);
}

/**
 * Test 3: All Diagonal Is Best
 *          Matrix:
 *                 Buyer0  Buyer1  Buyer2
 *          Farmer0    1      5      9
 *          Farmer1    6      1      8
 *          Farmer2    7      3      1
 *
 *          Cheapest assignment = (0,0 , 1,1 , 2,2)
 *          Total cost = 1 + 1 + 1 = 3
 */

function test3() {
  const matrix = [
    [1, 5, 9],
    [6, 1, 8],
    [7, 3, 1],
  ];
  const { bestAssignment, minCost, iterations } = assignProblemSolver(matrix);
  assert.strictEqual(minCost, 3, 'Total minimum cost should be 3');
  const sortedPairs = bestAssignment.map(([f, b]) => `[${f},${b}]`).sort().join(',');
  assert.strictEqual(sortedPairs, '[0,0],[1,1],[2,2]', 'Expected identity assignment');
  console.log('  Test 3 passed! :D');
  console.log(`   iterations explored: ${iterations}`);
  console.log(`   best assignment    : ${JSON.stringify(bestAssignment)}`);
  console.log(`   minimum cost       : ${minCost}`);
}

/**
 * Test 4: Floating Point Numbers (Non-integer total cost)
 *          Matrix:
 *                 Buyer0   Buyer1   Buyer2
 *          Farmer0    1.4      4.7      3.2
 *          Farmer1    3.3      1.9      2.5
 *          Farmer2    4.1      2.9      1.6
 *
 *          Cheapest assignment = (0,0 , 1,1 , 2,2)
 *          Total cost = 1.4 + 1.9 + 1.6 = 4.9
 */
function test4() {
  const matrix = [
    [1.4, 4.7, 3.2],
    [3.3, 1.9, 2.5],
    [4.1, 2.9, 1.6],
  ];
  
  const { bestAssignment, minCost, iterations } = assignProblemSolver(matrix);

  assert.ok(Math.abs(minCost - 4.9) < 1e-6, 'Total minimum cost should be approximately 4.9');
  const sortedPairs = bestAssignment.map(([f, b]) => `[${f},${b}]`).sort().join(',');
  assert.strictEqual(sortedPairs, '[0,0],[1,1],[2,2]', 'Expected optimal float-cost pairing');
  console.log('  Test 4 passed! :O');
  console.log(`   iterations explored: ${iterations}`);
  console.log(`   best assignment    : ${JSON.stringify(bestAssignment)}`);
  console.log(`   minimum cost       : ${minCost}`);
}

/**
 * Run All Tests
 */
function runAllTests() {
  test1();
  console.log('');
  test2();
  console.log('');
  test3();
  console.log('');
  test4();
  console.log('\n  all unit tests passed! :D');
}

runAllTests();
