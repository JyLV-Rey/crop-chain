// components/ProduceAggregateStats.jsx

function ProduceAggregateStats({ produceList, buyer, farmer }) {
  const stats = produceList.map((_, index) => {
    const buyerCurrent = buyer.produce[index].supply_current;
    const buyerLimit = buyer.produce[index].supply_limit;
    const farmerSupply = farmer.produce[index].supply;
    const newSupply = buyerCurrent + farmerSupply;
    const utilization = newSupply / buyerLimit;
    const utilizationDiff = newSupply - buyerLimit;

    return {
      isOversupply: newSupply > buyerLimit,
      utilizationPercent: utilization * 100,
      utilizationDiff,
    };
  });

  const oversupplied = stats.filter(s => s.isOversupply);
  const avgUtilization = stats.reduce((sum, s) => sum + s.utilizationPercent, 0) / stats.length;
  const totalOversupply = stats.reduce((sum, s) => sum + (s.utilizationDiff > 0 ? s.utilizationDiff : 0), 0);
  const totalUndersupply = stats.reduce((sum, s) => sum + (s.utilizationDiff < 0 ? Math.abs(s.utilizationDiff) : 0), 0);
  const maxOver = Math.max(...stats.map(s => s.utilizationDiff));
  const maxUnder = Math.min(...stats.map(s => s.utilizationDiff));

  return (
    <div className="flex flex-col shadow-xl rounded-lg p-4 w-full text-sm gap-1 bg-neutral-100">
      <p className="text-xl font-bold mb-2">Aggregate Produce Statistics</p>
      <p><span className="font-bold">Oversupply %:</span> {(oversupplied.length / stats.length * 100).toFixed(1)}%</p>
      <p><span className="font-bold">Average Utilization:</span> {avgUtilization.toFixed(1)}%</p>
      <p><span className="font-bold">Number of Oversupplied Produce:</span> {oversupplied.length}</p>
      <p><span className="font-bold">Total Oversupplied (kg):</span> {totalOversupply.toFixed(2)} kg</p>
      <p><span className="font-bold">Total Undersupplied (kg):</span> {totalUndersupply.toFixed(2)} kg</p>
      <p><span className="font-bold">Max Oversupply (kg):</span> {maxOver.toFixed(2)} kg</p>
      <p><span className="font-bold">Max Undersupply (kg):</span> {Math.abs(maxUnder).toFixed(2)} kg</p>
    </div>
  );
}

export default ProduceAggregateStats;
