import { useEffect, useState } from "react";
import NavBar from "../../features/NavBar";
import getDistanceMatrix from "../../features/Distance";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import getCostMatrix from "../../algorithms/CostMatrixComputation";
import assignProblemSolver from "../../algorithms/assignmentProblem";
import data from '../ResultPage/mock-output.json'
import DistanceStats from "./metrics/distance/DistanceStats";
import BuyerSaturationStats from "./metrics/oversupply/OversupplyStats";
import EachProduce from "./metrics/produce/EachProduce";
import AssignmentSummary from "./components/AssignmentSummary";
import GroupedBarChart from "./components/GroupedBarChart";
import LineChart from "./components/LineChart";
import GlobalSummaryStats from "./metrics/produce/TotalProduceAggregation";

function StatsPage() {
  const { farmers, buyers, global } = useGlobalData()

  const [distanceMatrix , setDistanceMatrix] = useState(data.distanceMatrix);
  const [costMatrix, setCostMatrix] = useState(data.finalCostMatrix);
  const [bestAssignment, setBestAssignment] = useState(data.bestAssignment);

  const [bestDistance, setBestDistance] = useState(data.finalCostMatrix);
  const [bestUndersupply, setBestUndersupply] = useState(data.finalCostMatrix);
  const [bestOversupply, setBestOversupply] = useState(data.finalCostMatrix);

  const [bestDistanceAssignment, setBestDistanceAssignment] = useState(data.bestAssignment);
  const [bestUndersupplyAssignment, setBestUndersupplyAssignment] = useState(data.bestAssignment);
  const [bestOversupplyAssignment, setBestOversupplyAssignment] = useState(data.bestAssignment);
  
  // awaits the distance matrix
  useEffect(() => {
    async function fetchMatrixes() {
      const matrix = await getDistanceMatrix(buyers, farmers);
      setDistanceMatrix(matrix);
    }

    if (buyers.length > 0 && farmers.length > 0) {
      fetchMatrixes();
    }
  }, [buyers, farmers]);

  // Gets the current cost matrix along with the perfect cost matrix per parameter
  useEffect (() => {
    if (distanceMatrix.length > 0) {
      setCostMatrix(getCostMatrix(farmers, buyers, distanceMatrix, global))
      setBestDistance(getCostMatrix(farmers, buyers, distanceMatrix, global, false, true, true));
      setBestUndersupply(getCostMatrix(farmers, buyers, distanceMatrix, global, true, false, true));
      setBestOversupply(getCostMatrix(farmers, buyers, distanceMatrix, global, true, true, false));
    };
  }, [buyers, distanceMatrix, farmers, global]);

  // assigns it to the matrix
  useEffect (() => {
    if (costMatrix.length > 0) {
      setBestAssignment(assignProblemSolver(costMatrix))
      setBestDistanceAssignment(assignProblemSolver(bestDistance));
      setBestUndersupplyAssignment(assignProblemSolver(bestUndersupply));
      setBestOversupplyAssignment(assignProblemSolver(bestOversupply));
    };
  }, [bestDistance, bestOversupply, bestUndersupply, costMatrix]);

  if (bestAssignment.bestAssignment.length !== 0) {
   // console.log(JSON.stringify({ distanceMatrix, finalCostMatrix, bestAssignment }, null, 2));
    console.log("Distance Matrix", distanceMatrix)
    console.log("Final Cost Matrix", costMatrix)
    console.log("Best Assignment", bestAssignment)

    console.log("Best Distance Assignment", bestDistanceAssignment)
    console.log("Best Undersupply Assignment", bestUndersupplyAssignment)
    console.log("Best Oversupply Assignment", bestOversupplyAssignment)
  };

  if (bestAssignment.bestAssignment.length !== 0 || bestDistanceAssignment.bestAssignment.length !== 0 || bestUndersupplyAssignment.bestAssignment.length !== 0 || bestOversupplyAssignment.bestAssignment.length !== 0) 
    return (
      <>
        <NavBar/>
        <div className="w-full mt-20 p-5">
          <div className="flex flex-col gap-10 text-neutral-700 text-lg font-medium">
            <div>
              <p className="font-extrabold text-5xl text-center">Statistics</p>
              <p className="font-semibold text-2xl text-center">Here are the statistics of the current session</p>
            </div>

              <div>
                <p className="font-bold text-3xl">Best Distance Comparison</p>
                <p>The theoretical perfect distance assignment is given by the blue data, the red data is the current assignment. This is to show how close/far the current assignment is from the perfect assignment in terms of distance</p>
                  <DistanceStats buyers={buyers} farmers={farmers} bestAssignment={bestAssignment} bestDistanceAssignment={bestDistanceAssignment} distanceMatrix={distanceMatrix}/>
              </div>

              <div>
              <p className="font-bold text-3xl">Best Oversupply Comparison</p>
              <p className="">
                This section compares how much more produce buyers are receiving than they can handle. It shows how the current assignment leads to excess delivery (oversupply), and how the optimal assignment reduces that waste while still meeting demand.
              </p>
                <BuyerSaturationStats buyers={buyers} farmers={farmers} bestAssignment={bestAssignment} bestUndersupplyAssignment={bestOversupplyAssignment} />
              </div>

              <div>
                <div className="flex flex-row">
                    <GroupedBarChart farmers={farmers} buyers={buyers} finalCostMatrix={costMatrix} bestAssignment={bestAssignment} />
                    <LineChart farmers={farmers} buyers={buyers} costMatrix={costMatrix} distanceMatrix={distanceMatrix } global={global} />
                </div>
                <AssignmentSummary bestAssignment={bestAssignment} farmers={farmers} buyers={buyers} finalCostMatrix={costMatrix} />
              </div>
              <GlobalSummaryStats buyers={buyers} farmers={farmers} bestAssignment={bestAssignment} global={global} />
              <div>
                <p className="font-bold text-3xl">Produce Distribution</p>
                <p>This is the metric of the how much the produce is distributed to the buyers, in relation to the utilization and efficiency</p>

                <EachProduce farmers={farmers} buyers={buyers} global={global} currentAssignment={bestAssignment} />
              </div>

          </div>
        </div>
      </>
    );
}

export default StatsPage
