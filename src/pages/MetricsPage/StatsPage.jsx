import { useEffect, useState } from "react";
import NavBar from "../../features/NavBar";
import getDistanceMatrix from "../../features/Distance";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import costMatrix from "../../algorithms/CostMatrixComputation";
import assignProblemSolver from "../../algorithms/assignmentProblem";
import data from '../ResultPage/mock-output.json'
import HeatmapChart from "./component/HeatMap";

function StatsPage() {
  const { farmers, buyers, global } = useGlobalData();

  const [distanceMatrix , setDistanceMatrix] = useState(data.distanceMatrix);
  const [finalCostMatrix, setFinalCostMatrix] = useState(data.finalCostMatrix);
  const [bestAssignment, setBestAssignment] = useState(data.bestAssignment);

  useEffect(() => {
    async function fetchMatrixes() {
      const matrix = await getDistanceMatrix(buyers, farmers);
      setDistanceMatrix(matrix);
    }

    if (buyers.length > 0 && farmers.length > 0) {
      fetchMatrixes();
    }
  }, [buyers, farmers]);

  useEffect (() => {
    if (distanceMatrix.length > 0) setFinalCostMatrix(costMatrix(farmers, buyers, distanceMatrix, global));
  }, [buyers, distanceMatrix, farmers, global]);

  useEffect (() => {
    if (finalCostMatrix.length > 0) setBestAssignment(assignProblemSolver(finalCostMatrix));
  }, [finalCostMatrix]);

  if (bestAssignment.length !== 0) {
   // console.log(JSON.stringify({ distanceMatrix, finalCostMatrix, bestAssignment }, null, 2));
    console.log("Distance Matrix", distanceMatrix)
    console.log("Final Cost Matrix", finalCostMatrix)
    console.log("Best Assignment", bestAssignment)
  };
  return (
    <>
      <NavBar/>
      <div className="w-full mt-20 p-5">
        <div className="flex flex-col gap-1 text-neutral-700 text-lg font-medium">
          <p className="font-extrabold text-xl">Heat Map</p>
          <div>
            <HeatmapChart farmers={farmers} buyers={buyers} finalCostMatrix={finalCostMatrix} />
          </div>

        </div>
      </div>

    </>
  );
}

export default StatsPage