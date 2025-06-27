import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import { BlockMath, InlineMath } from "react-katex";

function DisplaySolution({ farmerIndex, buyerIndex, solutionIndex = 0, distanceMatrix, totalCost }) {
  const { farmers, buyers, global } = useGlobalData();

  const alpha = global.penalty_undersupply_farmer;
  const beta = global.penalty_distance;
  const delta = global.penalty_oversupply_buyer;

  const distance = distanceMatrix[farmerIndex][buyerIndex].distance;
  const rowDistances = distanceMatrix[farmerIndex].map(cell => cell.distance);
  const normalized_distance = distance / Math.max(...rowDistances);

  const farmer = farmers[farmerIndex];
  const buyer = buyers[buyerIndex];

  const farmerSupplyMax = Math.max(1e-6, ...farmer.produce.map(p => p.supply));

  if (solutionIndex === -1) {
    let symbolicSum = "";
    let numericSum = "";
    let sum = 0;

    global.produce.forEach((produce, produceIndex) => {
      const type = produce.type;
      const priority = produce.priority || 1;
      const normalizedPriority = 1 / (priority + 1e-6);

      const supplyFarmer = farmer.produce[produceIndex].supply;
      const buyerCurrent = buyer.produce[produceIndex].supply_current;
      const buyerLimit = buyer.produce[produceIndex].supply_limit;

      const normalizedFarmerSupply = supplyFarmer / farmerSupplyMax;
      const buyerCost = 1 + Math.pow(buyerCurrent / buyerLimit, delta);
      const farmerCost = 1 + Math.pow(normalizedFarmerSupply, alpha);

      const cost = normalizedPriority *
        (Math.pow(normalized_distance, beta) * buyerCost) /
        farmerCost;

      symbolicSum += `C_{${type}} + `;
      numericSum += `${cost.toFixed(2)} + `;
      sum += cost;
    });

    symbolicSum = symbolicSum.slice(0, -3);
    numericSum = numericSum.slice(0, -3);

    return (
      <div className="flex flex-col text-sm text-neutral-700">
        <p className="font-extrabold text-xl">Total Computation (All Produce Types)</p>
        <p><span className="font-bold">Farmer:</span> {farmer.farm_name}</p>
        <p><span className="font-bold">Buyer:</span> {buyer.store_name}</p>
        <br />

        <hr className="my-4" />

        <BlockMath math={`${symbolicSum}`} />
        <BlockMath math={`= ${numericSum}`} />
        <BlockMath math={`C_{total} = ${sum.toFixed(4)}`} />
        <BlockMath math={`C_{total} \\texttt{(scaled)} = ${(sum * 100).toFixed(4)}`} />
      </div>
    );
  }

  // Single-produce view
  const produceType = global.produce[solutionIndex].type;
  const supplyFarmer = farmer.produce[solutionIndex].supply;
  const buyerCurrent = buyer.produce[solutionIndex].supply_current;
  const buyerLimit = buyer.produce[solutionIndex].supply_limit;

  const normalizedFarmerSupply = supplyFarmer / farmerSupplyMax;
  const priority = global.produce[solutionIndex].priority || 1;
  const normalizedPriority = 1 / (priority + 1e-6);
  const buyerCost = 1 + Math.pow(buyerCurrent / buyerLimit, delta);
  const farmerCost = 1 + Math.pow(normalizedFarmerSupply, alpha);

  const cost =
    normalizedPriority *
    (Math.pow(normalized_distance, beta) * buyerCost) /
    farmerCost;

  return (
    <div className="flex flex-col text-sm text-neutral-700">
      <p className="font-extrabold text-xl">Cost for {produceType}</p>
      <p><span className="font-bold">Farmer:</span> {farmer.farm_name}</p>
      <p><span className="font-bold">Buyer:</span> {buyer.store_name}</p>
      <br />

      <div className="flex flex-row gap-10">
        <div className="flex flex-col mt-2 gap-2">
          <InlineMath math={`d = ${distance.toFixed(2)}`} />
          <InlineMath math={`\\tilde{d} = \\frac{${distance.toFixed(2)}}{${Math.max(...rowDistances).toFixed(2)}} = ${normalized_distance.toFixed(4)}`} />
          <InlineMath math={`s = ${supplyFarmer}`} />
          <InlineMath math={`\\tilde{s} = \\frac{${supplyFarmer}}{${farmerSupplyMax.toFixed(2)}} = ${normalizedFarmerSupply.toFixed(4)}`} />
          <InlineMath math={`b = ${buyerCurrent}`} />
          <InlineMath math={`b^{max} = ${buyerLimit}`} />
          <InlineMath math={`P_{${produceType}} = ${priority}`} />
          <InlineMath math={`\\tilde{P}_{${produceType}} = \\frac{1}{${priority}} = ${normalizedPriority.toFixed(4)}`} />
        </div>

        <div className="flex flex-col mt-2">
          <BlockMath
            math={`C_{${produceType}} = ${normalizedPriority.toFixed(4)} \\cdot \\frac{${normalized_distance.toFixed(4)}^{${beta}} \\cdot \\left(1 + \\left( \\frac{${buyerCurrent}}{${buyerLimit}} \\right)^{${delta}} \\right)}{${normalizedFarmerSupply.toFixed(4)}^{${alpha}}}`}
          />
          <div className="text-2xl">
            <BlockMath math={`C_{${produceType}} = ${cost.toFixed(4)}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplaySolution;
