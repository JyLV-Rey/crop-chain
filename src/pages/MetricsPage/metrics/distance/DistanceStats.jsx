// --- New Component: DistanceStats.jsx ---
import DistanceChart from "../../component/ParamChart";
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
      <div className="text-lg bg-neutral-100 p-4 rounded-lg">
        <p className="font-bold text-2xl mb-2">Distance Metrics</p>

        <p><span className="font-bold">Current Total Distance:</span> {currentTotal.toFixed(2)} km</p>
        <p className="text-sm mb-2 text-neutral-600">Sum of all delivery distances from current farmer-to-buyer pairings.</p>

        <p><span className="font-bold">Best Total Distance:</span> {bestTotal.toFixed(2)} km</p>
        <p className="text-sm mb-2 text-neutral-600">Shortest possible total distance if optimized purely for travel efficiency.</p>

        <p><span className="font-bold">Difference:</span> {difference.toFixed(2)} km</p>
        <p className="text-sm mb-2 text-neutral-600">How many more kilometers are traveled in the current assignment compared to the best case.</p>

        <p><span className="font-bold">% Worse Than Best:</span> {percentDiff}%</p>
        <p className="text-sm mb-2 text-neutral-600">Relative increase in total distance due to current non-optimal routing.</p>

        <p><span className="font-bold">Average Distance per Assignment:</span> {averagePerAssignment} km</p>
        <p className="text-sm text-neutral-600">On average, how far a farmer travels per delivery assignment.</p>
      </div>
        </div>
      </div>
  );
}

export default DistanceStats;