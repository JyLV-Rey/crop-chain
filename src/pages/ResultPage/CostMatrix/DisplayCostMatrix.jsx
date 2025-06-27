import { useEffect, useState } from "react";
import DisplaySolution from "./DisplaySolution";

function DisplayCostMatrix({ costMatrix, buyers, farmers, global, distanceMatrix, bestAssignment }) {
  const [displayIndex, setDisplayIndex] = useState({});
  const [selectedSolution, setSelectedSolution] = useState();

  useEffect(() => {
    console.log(displayIndex);
  }, [displayIndex]);

  if (!bestAssignment?.bestAssignment) return null;

  function isAssigned(farmerIndex, buyerIndex) {
    return bestAssignment.bestAssignment.some(
      ([assignedFarmer, assignedBuyer]) =>
        assignedFarmer === farmerIndex && assignedBuyer === buyerIndex
    );
  }

  return (
    <div className="flex flex-row w-fit gap-10 justify-between p-5 rounded-lg shadow-2xl">
      <div className="flex flex-col text-xs h-full gap-2">
        {/* Column Header: Buyers */}
        <div className="flex flex-row w-full justify-between">
          <div className="rounded-md shadow-lg bg-amber-100 text-amber-800 font-extrabold w-40 p-2 text-center">
            Cost
          </div>
          {buyers.map((buyer, index) => (
            <div
              key={index}
              className="rounded-md shadow-lg bg-emerald-100 text-emerald-800 font-extrabold w-35 p-2 text-center"
            >
              {buyer.store_name}
            </div>
          ))}
        </div>

        {/* Rows: Farmers */}
        {farmers.map((farmer, farmerIndex) => (
          <div key={farmerIndex} className="flex flex-row justify-between gap-2 items-center">
            <div className="rounded-md shadow-lg bg-purple-200 text-purple-800 font-extrabold w-40 p-2 text-center">
              {farmer.farm_name}
            </div>
            {buyers.map((buyer, buyerIndex) => (
              <button
                key={buyerIndex}
                onClick={() =>
                  setDisplayIndex({ buyer_index: buyerIndex, farmer_index: farmerIndex })
                }
                className={`hover:scale-105 duration-200 hover:bg-amber-100 hover:text-amber-700 shadow-lg font-bold cursor-pointer rounded-md w-35 p-2 text-center ${
                  isAssigned(farmerIndex, buyerIndex)
                    ? "bg-blue-100 text-blue-800"
                    : "bg-neutral-100"
                }`}
              >
                {costMatrix[farmerIndex][buyerIndex]?.toFixed(2)}
              </button>
            ))}
          </div>
        ))}

        {/* Display Computation Info */}
        {displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined && (
          <>
            <p className="text-lg">
              <span className="font-bold">Total Recursive Iterations:</span>{" "}
              {bestAssignment.iteration}
            </p>
            <p className="text-lg p-2 bg-blue-100 w-fit text-blue-800 rounded-xl">
              <span className="font-bold">Total Minimum Cost:</span>{" "}
              {bestAssignment.minCost.toFixed(2)}
            </p>

            <p className="text-sm font-extrabold mt-5 text-neutral-700">View Computation (p)</p>
            <div className="flex flex-row justify-between gap-2 items-center text-neutral-600 font-semibold">
              <button
                onClick={() => setSelectedSolution(-1)}
                className="bg-neutral-100 flex-grow shadow-lg p-2 hover:scale-105 hover:bg-purple-100 hover:text-purple-700 font-bold cursor-pointer"
              >
                Total Computation
              </button>
              {global.produce.map((produce, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSolution(index)}
                  className="bg-neutral-100 flex-grow shadow-lg p-2 hover:scale-105 cursor-pointer hover:bg-blue-100 hover:text-blue-700"
                >
                  {produce.type}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* DisplaySolution Panel */}
      {displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined && (
        <DisplaySolution
          farmerIndex={displayIndex.farmer_index}
          buyerIndex={displayIndex.buyer_index}
          solutionIndex={selectedSolution}
          distanceMatrix={distanceMatrix}
          totalCost={costMatrix[displayIndex.farmer_index][displayIndex.buyer_index]}
        />
      )}
    </div>
  );
}

export default DisplayCostMatrix;
