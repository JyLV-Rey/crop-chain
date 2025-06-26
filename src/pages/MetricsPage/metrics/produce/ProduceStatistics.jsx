// components/ProduceStatistics.jsx
import ProduceAggregateStats from "../../../ResultPage/AssignmentPanel/AggregateProduceStatistics";
import AggregateProduceSummary from "./AggregateProduceSummary";
import BuyerSupplyChart from "./BuyerSupplyChart";

function higherColor(newSupply, maxSupply) {
  if (newSupply >= maxSupply) return "bg-red-100 text-red-800";
  else if (newSupply === maxSupply) return "bg-amber-100 text-amber-800";
  else return "bg-emerald-100 text-emerald-800";
}

function getUtilizationColor(num) {
  if (num >= 0) return "bg-red-100 text-red-800";
  return "bg-emerald-100 text-emerald-800";
}

function ProduceStatistics({ produceList, farmer, buyer, buyers, farmers, buyerIndex, farmerIndex }) {
  return (
    <>
      <div className="flex flex-row gap-3 text-xs flex-wrap h-full w-full justify-between  p-2">
        {produceList.map((produce, pIndex) => {
          const farmerSupply = farmer.produce[pIndex].supply;
          const buyerCurrent = buyer.produce[pIndex].supply_current;
          const buyerLimit = buyer.produce[pIndex].supply_limit;
          const newSupply = buyerCurrent + farmerSupply;
          const utilizationDiff = newSupply - buyerLimit;

          return (
            <div key={pIndex} className="flex flex-col flex-1 min-w-0 shadow-xl/6 rounded-lg p-2">
              <p className="font-extrabold text-lg">{produce.type}</p>
              <p>
                <span className="font-bold">Priority: </span>
                {produce.priority}</p>
              <p>
                <span className="font-bold">Farmer Supply: </span>
                {farmerSupply} kg</p>
              <p><span className="font-bold">Buyer Current Supply: </span>
              {buyerCurrent} kg</p>
              <p><span className="font-bold">Buyer Maximum Supply: </span>
              {buyerLimit} kg</p>
              <p className={`${higherColor(newSupply, buyerLimit)} p-1 rounded-lg font-bold mt-2 w-fit`}>
                <span className="font-bold">Buyer New Supply: </span>
                {newSupply} kg
              </p>
              <p className={`${getUtilizationColor(utilizationDiff)} p-1 rounded-lg w-fit mt-2`}>
                  <span className="font-bold">Utilization: </span>
                  {Math.abs(utilizationDiff)} kg{" "}
                  {newSupply >= buyerLimit ? "over" : "under"} the supply limit
              </p>
              <BuyerSupplyChart buyers={buyers} farmers={farmers} produceIndex={pIndex} buyerIndex={buyerIndex} selectedFarmerIndex={farmerIndex} />
            </div>
          );
        })}
      </div>
      <ProduceAggregateStats produceList={produceList} buyer={buyer} farmer={farmer} />
    </>
  );
}

export default ProduceStatistics;
