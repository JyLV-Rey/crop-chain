import React from "react";
import AlphaCostChart from "../ResultPage/components/AlphaCostChart";
import DistanceCostChart from "../ResultPage/components/DistanceCostChart";
import AssignementResultChart from "./components/AssignementResultChart";

function ResultsPage() {
  return (
    <>
      {/* Add your Chart.js graph here */}
      <div className="p-8" >
        <AlphaCostChart />
      </div>

      {/* Add your Chart.js graph here */}
      <div className="p-8">
        <DistanceCostChart />
      </div>

      {/* Add your Chart.js graph here */}
      <div className="p-8">
        <AssignementResultChart />
      </div>
    </>
  );
}

export default ResultsPage;