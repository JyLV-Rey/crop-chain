// components/GlobalSummaryStats.jsx
import React from "react";

function GlobalSummaryStats({ buyers, farmers, bestAssignment, global }) {
  const produceList = global.produce;

  const stats = produceList.map((_, pIndex) => {
    const totals = {
      totalBuyerLimit: 0,
      totalBuyerCurrent: 0,
      totalFarmerSupply: 0,
      totalNewSupply: 0,
      oversupplied: 0,
      undersupplied: 0,
      totalUtilizationDiff: 0,
    };

    bestAssignment.bestAssignment.forEach(([farmerIndex, buyerIndex]) => {
      const buyer = buyers[buyerIndex];
      const farmer = farmers[farmerIndex];

      const buyerLimit = buyer.produce[pIndex].supply_limit;
      const buyerCurrent = buyer.produce[pIndex].supply_current;
      const farmerSupply = farmer.produce[pIndex].supply;

      const newSupply = buyerCurrent + farmerSupply;
      const utilizationDiff = newSupply - buyerLimit;

      totals.totalBuyerLimit += buyerLimit;
      totals.totalBuyerCurrent += buyerCurrent;
      totals.totalFarmerSupply += farmerSupply;
      totals.totalNewSupply += newSupply;
      totals.totalUtilizationDiff += utilizationDiff;

      if (utilizationDiff > 0) {
        totals.oversupplied += utilizationDiff;
      } else {
        totals.undersupplied += -utilizationDiff;
      }
    });

    return {
      produce: produceList[pIndex].type,
      ...totals,
      avgUtilization: (totals.totalNewSupply / totals.totalBuyerLimit) * 100,
    };
  });

  const totalAssignments = bestAssignment.bestAssignment.length;
  const totalProduceTypes = stats.length;
  const totalOversupply = stats.reduce((sum, s) => sum + s.oversupplied, 0);
  const totalUndersupply = stats.reduce((sum, s) => sum + s.undersupplied, 0);
  const averageUtilization =
    stats.reduce((sum, s) => sum + s.avgUtilization, 0) / totalProduceTypes;

  const totalFarmerContributions = stats.reduce(
    (sum, s) => sum + s.totalFarmerSupply,
    0
  );
  const totalBuyerLimits = stats.reduce((sum, s) => sum + s.totalBuyerLimit, 0);

  return (
    <div className="flex flex-col gap-6 text-sm bg-neutral rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-extrabold text-center">Global Summary Statistics</h2>
      <div className="flex flex-row flex-wrap gap-2 justify-center w-full">
        

        {/* GLOBAL PRODUCE STATS */}
        <div className="bg-neutral-100 rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold mb-2">Global Produce Stats</h3>
          {stats.map((s, index) => (
            <div key={index} className="mb-3">
              <p className="text-lg">
                <strong>{s.produce}</strong>: {s.totalFarmerSupply} kg delivered to buyers (Avg Utilization: {s.avgUtilization.toFixed(1)}%)
              </p>
              <p className="text-neutral-500 text-sm">
                Shows total volume and efficiency for this specific produce.
              </p>
            </div>
          ))}
        </div>

        {/* DELIVERY STATS */}
        <div className="bg-neutral-100 rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold mb-2">Global Delivery Stats</h3>

          <p className="text-lg">
            <strong>Total Assignments:</strong> {totalAssignments}
          </p>
          <p className="text-neutral-500 text-sm">
            Number of farmer-to-buyer pairings created during assignment.
          </p>

          <p className="text-lg">
            <strong>Total Farmer Contribution:</strong> {totalFarmerContributions.toFixed(2)} kg
          </p>
          <p className="text-neutral-500 text-sm">
            Total kilograms of produce delivered by all assigned farmers.
          </p>

          <p className="text-lg">
            <strong>Total Buyer Limit:</strong> {totalBuyerLimits.toFixed(2)} kg
          </p>
          <p className="text-neutral-500 text-sm">
            Sum of maximum supply capacity across all buyers.
          </p>
        </div>

        {/* UTILIZATION STATS */}
        <div className="bg-neutral-100 rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold mb-2">Global Utilization Stats</h3>

          <p className="text-lg">
            <strong>Total Oversupply:</strong> {totalOversupply.toFixed(2)} kg
          </p>
          <p className="text-neutral-500 text-sm">
            Total excess deliveries that exceed buyer limits.
          </p>

          <p className="text-lg">
            <strong>Total Undersupply:</strong> {totalUndersupply.toFixed(2)} kg
          </p>
          <p className="text-neutral-500 text-sm">
            Total shortfall where buyers received less than their supply limit.
          </p>

          <p className="text-lg">
            <strong>Average Utilization:</strong> {averageUtilization.toFixed(1)}%
          </p>
          <p className="text-neutral-500 text-sm">
            Average percentage of demand fulfilled across all produce types.
          </p>
        </div>

        {/* FARMER CONTRIBUTION */}
        <div className="bg-neutral-100 rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold mb-2">Farmer Contribution Insight</h3>

          <p className="text-lg">
            The assigned farmers contributed a total of <strong>{totalFarmerContributions.toFixed(2)} kg</strong> of produce.
          </p>
          <p className="text-neutral-500 text-sm">
            Indicates the overall effort from the farmer side in the network.
          </p>

          <p className="text-lg">
            This represents <strong>{(totalFarmerContributions / totalBuyerLimits * 100).toFixed(1)}%</strong> of buyer demand.
          </p>
          <p className="text-neutral-500 text-sm">
            Compares total deliveries to total buyer capacity across all produce types.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GlobalSummaryStats;
