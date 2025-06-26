//  ASSIGNMENT PROBLEM SOLVER

/**
 * 
 * Input:   G  == costMatrix  (farmers × buyers)
 * Output: { iterations, assignments, minCost }
 *
 * Internally we call an inner recursive helper named assignment()
 * that explores the search tree using classic Branch-and-Bound.
 */

function assignProblemSolver(G) {
  /**
    Step 1:  Define and initialize
  **/
  const n = G.length;              // number of farmers / buyers
  let minCost        = Infinity;   // current global best (upper bound)
  let bestAssignment = [];         // list of [farmerIdx, buyerIdx]
  let iteration      = 0;          // # of recursive calls (search-tree nodes)

  /**
   * Step 2:  Recursive Branch-and-Bound helper
   * ------------------------------------------
   * @param {number} i            – index of farmer we’re assigning now
   * @param {Set}    usedBuyers   – buyers already taken along current path
   * @param {number} currentCost  – accumulated cost so far on this path
   * @param {Array}  currentAssign– partial assignment built so far
   *
   * The helper tries every still-free buyer for farmer i, but cuts off
   * any branch whose partial cost already exceeds the best known solution
   * (minCost).  That defines the “bound”.
   */

  function assignment(i, usedBuyers, currentCost, currentAssign) {
    /* Step 2.1:  Count this node for stats */
    iteration++;

    /* Step 2.2:  BASE CASE –- all farmers processed */
    if (i === n) {
      if (currentCost < minCost) {         // found a strictly better solution
        minCost        = currentCost;      // update global best
        bestAssignment = [...currentAssign];
      }
      return;                              // backtrack
    }

    /* Step 2.3:  Try pairing farmer i with every still-available buyer j */
    for (let j = 0; j < n; j++) {
      if (!usedBuyers.has(j)) {                          // buyer j is free
        const nextCost = currentCost + G[i][j];          // incremental cost

        /* Step 2.3.1:  BOUND CHECK – prune if hopeless */
        if (nextCost < minCost) {                        // still promising
          usedBuyers.add(j);                             // mark buyer as used
          assignment(                                   // dive deeper
            i + 1,                                      // next farmer
            usedBuyers,
            nextCost,
            [...currentAssign, [i, j]]                  // extend partial sol.
          );
          usedBuyers.delete(j);                         // backtrack
        }
      }
    }
  }

  /**
   * Step 3:  Kick off recursion   *
   */
  assignment(0, new Set(), 0, []);

  /**
   * Step 4:  Package the answer   *
   */
  return {
    iterations: iteration,                // # of iterations
    assignments: bestAssignment,          // stays as list of [i, j] pairs
    minCost                               // total minimum cost
  };
}

export default assignProblemSolver;
