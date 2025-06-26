function getUtilizationColor(num) {
  if (num >= 0) return "bg-red-100 text-red-800";
  return "bg-emerald-100 text-emerald-800";
}

export default function AggregateProduceSummary({ produceList, farmer, buyer }) {
  const stats = produceList.map((_, index) => {
    const buyerCurrent = buyer.produce?.[index]?.supply_current || 0;
    const buyerLimit = buyer.produce?.[index]?.supply_limit || 0;
    const farmerSupply = farmer.produce?.[index]?.supply || 0;

    const newSupply = buyerCurrent + farmerSupply;
    const utilization = buyerLimit > 0 ? newSupply / buyerLimit : 0;
    const utilizationDiff = newSupply - buyerLimit;

    return {
      newSupply,
      buyerLimit,
      utilizationPercent: utilization * 100,
      utilizationDiff,
    };
  });

  const totalFarmerSupply = stats.reduce((sum, s) => sum + (s.newSupply - (s.buyerLimit - s.utilizationDiff)), 0);
  const totalBuyerCurrent = stats.reduce((sum, s) => sum + (s.newSupply - s.utilizationDiff - totalFarmerSupply), 0);
  const totalBuyerLimit = stats.reduce((sum, s) => sum + s.buyerLimit, 0);
  const totalNewSupply = stats.reduce((sum, s) => sum + s.newSupply, 0);
  const totalUtilizationDiff = totalNewSupply - totalBuyerLimit;

  const avgUtilization = stats.reduce((sum, s) => sum + s.utilizationPercent, 0) / stats.length;

  return (
    <div className="flex flex-col shadow-xl/6 rounded-lg p-4 w-full text-sm bg-neutral-100 mb-3">
      <p className="font-extrabold text-lg">Aggregate Summary</p>
      <p>
        <span className="font-bold">Total Farmer Supply:</span> {totalFarmerSupply.toFixed(2)} kg
      </p>
      <p>
        <span className="font-bold">Total Buyer Current Supply:</span> {totalBuyerCurrent.toFixed(2)} kg
      </p>
      <p>
        <span className="font-bold">Total Buyer Limit:</span> {totalBuyerLimit.toFixed(2)} kg
      </p>
      <p>
        <span className="font-bold">Total New Supply:</span> {totalNewSupply.toFixed(2)} kg
      </p>
      <p className={`${getUtilizationColor(totalUtilizationDiff)} p-1 rounded-lg w-fit mt-2`}>
        <span className="font-bold">Utilization:</span>{" "}
        {Math.abs(totalUtilizationDiff).toFixed(2)} kg{" "}
        {totalUtilizationDiff >= 0 ? "over" : "under"} the total supply limit
      </p>
      <p className="mt-1">
        <span className="font-bold">Average Utilization:</span> {avgUtilization.toFixed(1)}%
      </p>
    </div>
  );
}
