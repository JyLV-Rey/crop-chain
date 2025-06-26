// --- New Component: DistanceStats.jsx ---
import DistanceChart from "../component/ParamChart";
function DistanceStats({ buyers, farmers, bestAssignment, bestDistanceAssignment, distanceMatrix }) {
  const currentTotal = bestAssignment.bestAssignment.reduce(
    (acc, [f, b]) => acc + Number(distanceMatrix[f][b].distance),
    0
  );

  const bestTotal = bestDistanceAssignment.bestAssignment.reduce(
    (acc, [f, b]) => acc + Number(distanceMatrix[f][b].distance),
    0
  );

  const difference = currentTotal - bestTotal;
  const percentDiff = ((difference / bestTotal) * 100).toFixed(2);
  const averagePerAssignment = (currentTotal / bestAssignment.bestAssignment.length).toFixed(2);
  const percentImprovement = 100 - (currentTotal / bestTotal) * 100;

  return (
      <div className='flex flex-row justify-around mt-4'> 
        <div className="w-1/2 h-auto">
          <DistanceChart
            buyers={buyers}
            farmers={farmers}
            currentAssignment={bestAssignment}
            bestAssignment={bestDistanceAssignment}
            matrix={distanceMatrix}
          />
        </div>

        <div className="text-lg bg-neutral-100">
          <p className="font-bold text-2xl mb-2">Distance Metrics</p>
          <p><span className="font-bold">Current Total Distance:</span> {currentTotal.toFixed(2)} km</p>
          <p><span className="font-bold">Best Total Distance:</span> {bestTotal.toFixed(2)} km</p>
          <p><span className="font-bold">Difference:</span> {difference.toFixed(2)} km</p>
          <p><span className="font-bold">% Worse Than Best:</span> {percentDiff}%</p>
          <p><span className="font-bold">Average Distance per Assignment:</span> {averagePerAssignment} km</p>
        </div>
      </div>
  );
}

export default DistanceStats;