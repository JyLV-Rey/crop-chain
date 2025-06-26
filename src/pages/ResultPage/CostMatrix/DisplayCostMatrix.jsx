import { useEffect, useState } from "react";
import DisplaySolution from "./DisplaySolution";

function DisplayCostMatrix({ costMatrix, buyers, farmers, global, distanceMatrix, bestAssignment }) {

  const [displayIndex , setDisplayIndex] = useState({});
  const [selectedSolution, setSelectedSolution] = useState();

  useEffect(() => {
    console.log(displayIndex);
  }, [displayIndex]);

  if(bestAssignment.bestAssignment == undefined) return(<></>);

  function isAssigned(farmerIndex, buyerIndex) {
    return bestAssignment.bestAssignment.some(
      ([assignedFarmer, assignedBuyer]) =>
        assignedFarmer === farmerIndex && assignedBuyer === buyerIndex
    );
  }

  return(
    <>
      <div className="flex flex-row w-fit gap-10 justify-between p-5 rounded-lg shadow-2xl">
        <div className="flex flex-col text-xs h-full gap-2">
          <div className={`flex flex-row w-full justify-between`}>
            <div className="rounded-md shadow-lg bg-amber-100 text-amber-800 font-extrabold w-40   text-bold p-2 text-center">
              <p>
                Cost
              </p>
            </div>
            {
              farmers.map((farmer, index) => (
                <div key={index} className="rounded-md shwdow-lg bg-purple-200 text-purple-800 font-extrabold w-25 p-2 text-center">
                  <p>
                    {farmer.farm_name}
                  </p>
                </div>
              ))
            }
          </div>
          {
            costMatrix.map((row, buyersIndex) => (
              <div key={buyersIndex} className={`flex flex-row justify-between gap-2 items-center`}>
                <div className="rounded-md shadow-lg bg-emerald-100 text-emerald-800 font-extrabold w-40  text-bold p-2 text-center">
                  <p>
                    {buyers[buyersIndex].store_name}
                  </p>
                </div>
                {
                  row.map((cost, farmersIndex) => (
                    <button key={farmersIndex} onClick={() => {setDisplayIndex({buyer_index: buyersIndex, farmer_index: farmersIndex})}} className={`hover:scale-120 duration-200 ease-(--my-beizer) hover:bg-amber-100 hover:text-amber-700 shadow-lg font-bold cursor-pointer rounded-md w-25 text-bold p-2 text-center ${isAssigned(buyersIndex, farmersIndex) ? "bg-blue-100 text-blue-800" : "bg-neutral-100"}`}>
                      <p>
                        {cost.toFixed(2)}
                      </p>
                    </button>
                  ))
                }
              </div>
            ))
          }
          {
            displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined &&
            <>
              <p className="text-lg"><span className="font-bold">Total Recursive Iterations</span> = {bestAssignment.iteration}</p>
              <p className="text-lg p-2 bg-blue-100 w-fit text-blue-800 rounded-xl"><span className="font-bold">Total Minimum Cost</span> = {bestAssignment.minCost.toFixed(2)}</p>
              <p className="text-sm font-extrabold mt-5 text-neutral-700">View Computation (f)</p>
              <div className="flex flex-row justify-between gap-2 items-center text-neutral-600 font-semibold">
                <button onClick={() => {setSelectedSolution(-1)}} className="bg-neutral-100 flex-grow shadow-lg p-2 hover:scale-105 duration-200 ease-(--my-beizer) hover:bg-emerald-100 hover:text-emerald-700 font-bold hover:font-extrabold cursor-pointer">Total Computation</button>
                {
                  global.produce.map((produce, index) => (
                      <button key={index} onClick={() => {setSelectedSolution(index)}} className="bg-neutral-100 flex-grow shadow-lg p-2 hover:scale-105 duration-200 ease-(--my-beizer) cursor-pointer hover:bg-blue-100 hover:text-blue-700 hover:text-bold">{produce.type}</button>
                  ))
                }
              </div>
            </>
          }
        </div>
        {
          displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined &&
            <DisplaySolution costMatrix={costMatrix} farmerIndex={displayIndex.farmer_index} buyerIndex={displayIndex.buyer_index} solutionIndex={selectedSolution} distanceMatrix={distanceMatrix} />
        }
      </div>
    </>
  )
  
}

export default DisplayCostMatrix