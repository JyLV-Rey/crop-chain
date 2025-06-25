import { useEffect, useState } from "react";
import getDistanceMatrix from "../../../features/Distance";
import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import DisplayDistanceMatrix from "./DisplayDistanceMatrix";

function DistanceMatrix() {
  const { farmers, buyers } = useGlobalData();

  const [distanceMatrix , setDistanceMatrix] = useState([]);

  useEffect(() => {
    async function fetchDistanceMatrix() {
      const matrix = await getDistanceMatrix(buyers, farmers);
      setDistanceMatrix(matrix);
    }
    fetchDistanceMatrix();
  }, []);

  console.log(distanceMatrix);

  return (
      <DisplayDistanceMatrix distanceMatrix={distanceMatrix} buyers={buyers} farmers={farmers} />
  );
}

export default DistanceMatrix;