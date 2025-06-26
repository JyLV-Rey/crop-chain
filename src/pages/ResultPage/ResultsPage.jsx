import { useEffect, useState } from "react";
import NavBar from "../../features/NavBar";
import getDistanceMatrix from "../../features/Distance";
import DisplayDistanceMatrix from "./DistanceMatrix/DisplayDistanceMatrix";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import costMatrix from "../../algorithms/CostMatrixComputation";
import DisplayCostMatrix from "./CostMatrix/DisplayCostMatrix";
import { InlineMath } from "react-katex";
import AssignmentPanel from "./AssignmentPanel/AssignmentPanel";
import assignProblemSolver from "../../algorithms/assignmentProblem";
import data from './mock-output.json'
import { Link } from "react-router-dom";

function ResultsPage() {
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

  return(
    <>
      <div>
        <NavBar />
        <div className="flex flex-col gap-10 mt-10 p-10 min-w-screen">

          <div className="flex flex-col text-neutral-700">
            <h1 className="text-3xl font-extrabold">Distance Matrix</h1>
            <p className="text-lg">These are the distances between each farmer and buyer. This is calclulated by the Valhalla Routing System. To view the route to the location, you can simply click on the distance.</p>
            <div className="self-center mt-2">
              <DisplayDistanceMatrix distanceMatrix={distanceMatrix} buyers={buyers} farmers={farmers} />
            </div>
          </div>

          <div className="flex flex-col text-neutral-800">

            <h1 className="text-3xl font-extrabold">Cost Matrix</h1>
            <p className="text-lg">These are the costs between each farmer and buyer assigned by our heuristic function. Tap the cost to view the solution and the formula used to calculate the cost.</p>
            <p className="italic">(Note: The costs are multiplied by 100 to scale for visual purposes only.)</p>

            <div className="flex text-3xl flex-row justify-center align-top gap-5">
              <div className="mt-2 flex flex-col w-fit  self-center text-center">
                <p className="text-lg font-extrabold">Given Parameters:</p>
                <InlineMath math={`\\alpha = ${global.penalty_undersupply_farmer}`} />
                <InlineMath math={`\\beta = ${global.penalty_distance}`} />
                <InlineMath math={`\\delta = ${global.penalty_oversupply_buyer}`} />
              </div>
              <div className="mt-2 flex flex-col w-fit self-center text-center">
                <p className="text-lg font-extrabold mb-5">Formula:</p>
                <InlineMath math={`C_{bfp} = P_f \\frac{d_{bf}^\\beta \\left(1 + \\left( \\frac{b_{bp}}{b_p^{\\text{max}}} \\right)^\\delta \\right)}{1 + s_{bp}^\\alpha}`} />
              </div>
            </div>

            <div className="mt-5 self-center">
              <DisplayCostMatrix costMatrix={finalCostMatrix} buyers={buyers} farmers={farmers} global={global} distanceMatrix={distanceMatrix} bestAssignment={bestAssignment} />
            </div>

            <Link to="/Assignment/Metric/Statistics/" className="hover:text-2xl hover:text-purple-500 font-bold hover:font-extrabold hover:border-2 hover:border-purple-400 hover:bg-purple-200 p-8 rounded-xl hover:scale-105 text-purple-50 text-xl border-purple-50 bg-purple-500 text-center self-center w-fit duration-200 ease-(--my-beizer) m-15">
              View Running Statistics
            </Link>
            
            <div className='flex flex-col text-neutral-800 mt-10'>
              <h1 className="text-3xl font-extrabold">Results</h1>
              <p className="text-lg">These are the resulting assignments of buyers to farmers based on the minimum cost calculated by the assignment algorithm.</p>
              <p>If you wish to view the statistics and the performace of the program please proceed to the statistics page.</p>
              <AssignmentPanel farmers={farmers} buyers={buyers} distanceMatrix={distanceMatrix} global={global} bestAssignment={bestAssignment} costMatrix={finalCostMatrix} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultsPage;
