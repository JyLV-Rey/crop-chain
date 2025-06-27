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
    (sum, s) => sum + (Number(s.totalFarmerSupply) || 0),
    0
  );
  const totalBuyerLimits = stats.reduce((sum, s) => sum + s.totalBuyerLimit, 0);

  return (
    <div className="flex flex-col gap-6 text-sm bg-neutral-600 rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-extrabold text-center mb-2 text-white">Global Summary Statistics</h2>
      <div className="flex flex-row flex-wrap gap-4 justify-center w-full">

        {/* GLOBAL PRODUCE STATS */}
        <div className="bg-blue-100 rounded-lg shadow-lg p-4 w-full max-w-md">
          <h3 className="text-xl font-bold text-blue-800 mb-2">Global Produce Stats</h3>
          {stats.map((s, index) => (
            <div key={index} className="mb-3">
              <p className="text-blue-900 text-lg font-semibold">
                {s.produce}: {s.totalFarmerSupply} kg delivered
              </p>
              <p className="text-sm text-blue-700">
                Avg Utilization: {s.avgUtilization.toFixed(1)}%
              </p>
            </div>
          ))}
        </div>

        {/* DELIVERY STATS */}
        <div className="bg-green-100 rounded-lg shadow-lg p-4 w-full max-w-md">
          <h3 className="text-xl font-bold text-green-800 mb-2">Global Delivery Stats</h3>
          <p className="text-green-900 text-lg">
            <strong>Total Assignments:</strong> {totalAssignments}
          </p>
          <p className="text-sm text-green-700">Number of farmer-to-buyer pairings.</p>

          <p className="text-green-900 text-lg mt-2">
            <strong>Farmer Contribution:</strong> {totalFarmerContributions.toFixed(2)} kg
          </p>
          <p className="text-sm text-green-700">Delivered by all assigned farmers.</p>

          <p className="text-green-900 text-lg mt-2">
            <strong>Buyer Limit:</strong> {totalBuyerLimits.toFixed(2)} kg
          </p>
          <p className="text-sm text-green-700">Total buyer demand.</p>
        </div>

        {/* UTILIZATION STATS */}
        <div className="bg-yellow-100 rounded-lg shadow-lg p-4 w-full max-w-md">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">Global Utilization Stats</h3>

          <p className="text-yellow-900 text-lg">
            <strong>Oversupply:</strong> {totalOversupply.toFixed(2)} kg
          </p>
          <p className="text-sm text-yellow-700">Exceeds buyer limits.</p>

          <p className="text-yellow-900 text-lg mt-2">
            <strong>Undersupply:</strong> {totalUndersupply.toFixed(2)} kg
          </p>
          <p className="text-sm text-yellow-700">Below buyer limits.</p>

          <p className="text-yellow-900 text-lg mt-2">
            <strong>Avg Utilization:</strong> {averageUtilization.toFixed(1)}%
          </p>
          <p className="text-sm text-yellow-700">Average fulfillment of demand.</p>
        </div>

        {/* FARMER CONTRIBUTION */}
        <div className="bg-purple-100 rounded-lg shadow-lg p-4 w-full max-w-md">
          <h3 className="text-xl font-bold text-purple-800 mb-2">Farmer Contribution Insight</h3>

          <p className="text-purple-900 text-lg">
            Farmers delivered <strong>{totalFarmerContributions.toFixed(2)} kg</strong>.
          </p>
          <p className="text-sm text-purple-700">
            Represents their total participation in supply.
          </p>

          <p className="text-purple-900 text-lg mt-2">
            This is <strong>{(totalFarmerContributions / totalBuyerLimits * 100).toFixed(1)}%</strong> of demand.
          </p>
          <p className="text-sm text-purple-700">
            Compares all deliveries to the full buyer demand.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GlobalSummaryStats;
