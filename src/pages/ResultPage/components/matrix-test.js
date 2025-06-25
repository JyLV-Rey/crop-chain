import CostMatrixComputation from './CostMatrixComputation.js';

const distances = [
  [10, 20, 30],
  [15, 25, 35],
  [20, 10, 40]
];

const supplies = [5, 10, 15];       // farmer i
const buyerStocks = [50, 30, 20];   // buyer j
const bMax = 100;
const alpha = 1;
const delta = 0.5;

const matrix = CostMatrixComputation({
  distances,
  supplies,
  buyerStocks,
  bMax,
  alpha,
  delta
});

console.table(matrix);
