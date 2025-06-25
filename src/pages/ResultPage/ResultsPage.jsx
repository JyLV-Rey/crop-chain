import { useEffect, useState } from "react";
import NavBar from "../../features/NavBar";
import getDistanceMatrix from "../../features/Distance";
import DisplayDistanceMatrix from "./DistanceMatrix/DisplayDistanceMatrix";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import costMatrix from "./CostMatrix/CostMatrix";

function ResultsPage() {
  const { farmers, buyers, global } = useGlobalData();

  const [distanceMatrix , setDistanceMatrix] = useState([]);

  useEffect(() => {
    async function fetchDistanceMatrix() {
      const matrix = await getDistanceMatrix(buyers, farmers);
      setDistanceMatrix(matrix);
    }
    fetchDistanceMatrix();
  }, []);

  if(distanceMatrix.length !== 0) {
    console.log(costMatrix(farmers, buyers, distanceMatrix, global));
  }

//  console.log(distanceMatrix);
  return(
    <>
      <div>
        <NavBar />
        <div className="flex flex-col gap-10 mt-20 p-10">

          <div className="flex flex-col text-neutral-700">
            <h1 className="text-3xl font-extrabold">Distance Matrix</h1>
            <p className="text-lg">These are the distances between each farmer and buyer. This is calclulated by the Valhalla Routing System. To view the route to the location, you can simply click on the distance.</p>
            <div className="self-center mt-2">
              <DisplayDistanceMatrix distanceMatrix={distanceMatrix} buyers={buyers} farmers={farmers} />
            </div>
          </div>

          <div className="flex flex-col text-neutral-700">
            <h1 className="text-3xl font-extrabold">Cost Matrix</h1>
            <p className="text-lg">These are the costs between each farmer and buyer assigned by our heuristic function. Tap the cost to view the solution and the formula used to calculate the cost.</p>
            <div className="self-center">
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ResultsPage;