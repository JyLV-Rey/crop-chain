import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import { BlockMath, InlineMath } from "react-katex";

function DisplaySolution({ farmerIndex, buyerIndex, solutionIndex = 0, distanceMatrix }) {
  const { farmers, buyers, global } = useGlobalData();

  const alpha = global.penalty_undersupply_farmer;
  const beta = global.penalty_distance;
  const delta = global.penalty_oversupply_buyer;

  const distance = distanceMatrix[buyerIndex][farmerIndex].distance;
  const rowDistances = distanceMatrix[buyerIndex].map(cell => cell.distance);
  const normalized_distance = distance / Math.max(...rowDistances);

  if (solutionIndex === -1) {
    let costParts = [];
    let solutionParts = [];
    let totalCost = 0;

    global.produce.forEach((produce, index) => {
      const supplyFarmer = farmers[farmerIndex].produce[index].supply;
      const buyerCurrent = buyers[buyerIndex].produce[index].supply_current;
      const buyerLimit = buyers[buyerIndex].produce[index].supply_limit;

      const farmerSupplyMax = Math.max(1e-6, ...farmers[farmerIndex].produce.map(p => p.supply));
      const normalizedFarmerSupply = supplyFarmer / farmerSupplyMax;

      const priority = produce.priority || 1;
      const normalizedPriority = 1 / (priority + 1e-6);

      const buyerCost = 1 + Math.pow(buyerCurrent / buyerLimit, delta);
      const farmerCost = 1 + Math.pow(normalizedFarmerSupply, alpha);

      const cost =
        normalizedPriority *
        (Math.pow(normalized_distance, beta) * buyerCost) /
        farmerCost;

      costParts.push(`C_{${produce.type}}`);
      solutionParts.push(`${cost.toFixed(4)}`);
      totalCost += cost;
    });

    return (
      <div className="flex flex-col text-sm text-neutral-700">
        <p className="font-extrabold text-xl">Total Computation (All Produce Types)</p>
        <p><span className="font-bold">Farmer:</span> {farmers[farmerIndex].farm_name}</p>
        <p><span className="font-bold">Buyer:</span> {buyers[buyerIndex].store_name}</p>
        <br />
        <div>
          <BlockMath math={`C_{total} = ${costParts.join(" + ")}`} />
          <BlockMath math={`C_{total} = ${solutionParts.join(" + ")}`} />
          <div className="mt-2 text-xl font-bold">
            <BlockMath math={`C_{total} = ${totalCost.toFixed(4)}`} />
            <BlockMath math={`C_{total} \\texttt{(scaled)} = ${(totalCost * 100).toFixed(4)}`} />
          </div>
        </div>
      </div>
    );
  }

  // --- SINGLE PRODUCE CALCULATION ---
  const produceType = global.produce[solutionIndex].type;
  const supplyFarmer = farmers[farmerIndex].produce[solutionIndex].supply;
  const buyerCurrent = buyers[buyerIndex].produce[solutionIndex].supply_current;
  const buyerLimit = buyers[buyerIndex].produce[solutionIndex].supply_limit;

  const farmerSupplyMax = Math.max(1e-6, ...farmers[farmerIndex].produce.map(p => p.supply));
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
      <p><span className="font-bold">Farmer:</span> {farmers[farmerIndex].farm_name}</p>
      <p><span className="font-bold">Buyer:</span> {buyers[buyerIndex].store_name}</p>
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
