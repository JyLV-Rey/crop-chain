import { useEffect, useState } from "react";
import NavBar from "../../features/NavBar";
import getDistanceMatrix from "../../features/Distance";
import DisplayDistanceMatrix from "./DistanceMatrix/DisplayDistanceMatrix";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import costMatrix from "../../algorithms/CostMatrixComputation";
import DisplayCostMatrix from "./CostMatrix/DisplayCostMatrix";
import { BlockMath, InlineMath } from "react-katex";

function ResultsPage() {
  const { farmers, buyers, global } = useGlobalData();

  const [distanceMatrix , setDistanceMatrix] = useState([]);
  const [finalCostMatrix, setFinalCostMatrix] = useState([]);

  useEffect(() => {
    async function fetchMatrixes() {
      const matrix = await getDistanceMatrix(buyers, farmers);

      setDistanceMatrix(matrix);
      ;
    }
    fetchMatrixes();
  }, []);

  useEffect (() => {
    if (distanceMatrix.length > 0) setFinalCostMatrix(costMatrix(farmers, buyers, distanceMatrix, global));
  }, [distanceMatrix]);

  return(
    <>
      <div>
        <NavBar />
        <div className="flex flex-col gap-10 mt-10 p-10">

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

            <div className="flex flex-row justify-center align-top gap-5">
              <div className="mt-2 flex flex-col w-fit   self-center text-center">
                <p className="text-lg font-extrabold">Given Parameters:</p>
                <InlineMath math={`\\alpha = ${global.penalty_undersupply_farmer}`} />
                <InlineMath math={`\\beta = ${global.penalty_distance}`} />
                <InlineMath math={`\\delta = ${global.penalty_oversupply_buyer}`} />
              </div>
              <div className="mt-2 flex flex-col w-fit text-lg self-center text-center">
                <p className="text-lg font-extrabold mb-5">Formula:</p>
                <InlineMath math={`C_{bfp} = \\frac{d_{bf}^\\beta \\cdot \\left(1 + \\left( \\frac{b_{bp}}{b_p^{\\text{max}}} \\right)^\\delta \\right)}{(s_{bp} + 1)^\\alpha}`} />
              </div>
            </div>


            <div className="mt-5 self-center">
              <DisplayCostMatrix costMatrix={finalCostMatrix} buyers={buyers} farmers={farmers} global={global} distanceMatrix={distanceMatrix} />

            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ResultsPage;