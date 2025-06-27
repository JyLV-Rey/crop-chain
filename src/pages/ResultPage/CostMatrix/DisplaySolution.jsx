import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import { BlockMath, InlineMath } from "react-katex";

function DisplaySolution({ farmerIndex, buyerIndex, solutionIndex = 0, distanceMatrix, totalCost }) {
  const { farmers, buyers, global } = useGlobalData();

  const alpha = global.penalty_undersupply_farmer;
  const beta = global.penalty_distance;
  const delta = global.penalty_oversupply_buyer;

  const distance = distanceMatrix[buyerIndex][farmerIndex].distance;

  const farmer = farmers[farmerIndex];
  const buyer = buyers[buyerIndex];

  if (solutionIndex === -1) {
    let symbolicSum = "";
    let numericSum = "";
    let sum = 0;

    const valueBlocks = global.produce.map((produce, produceIndex) => {
      const type = produce.type;
      const priority = produce.priority || 1;
      const weight = 1 / priority;

      const farmerSupply = farmer.produce[produceIndex].supply;
      const buyerCurrent = buyer.produce[produceIndex].supply_current;
      const buyerLimit = buyer.produce[produceIndex].supply_limit;

      const buyerCost = 1 + Math.pow(buyerCurrent / buyerLimit, delta);
      const farmerCost = 1 + Math.pow(farmerSupply, alpha);

      const cost = weight * (Math.pow(distance, beta) * buyerCost) / farmerCost;

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

        {valueBlocks}

        <hr className="my-4" />
        <BlockMath math={`${symbolicSum}`} />
        <BlockMath math={`= ${numericSum}`} />
        <BlockMath math={`C_{total} = ${sum.toFixed(4)}`} />
        <BlockMath math={`C_{total} \\texttt{(scaled)} = ${(sum * 100).toFixed(4)}`} />
      </div>
    );
  }

  // Single produce mode (unchanged)
  const produceType = global.produce[solutionIndex].type;
  const priority = global.produce[solutionIndex].priority || 1;
  const weight = 1 / priority;

  const farmerSupply = farmer.produce[solutionIndex].supply;
  const buyerCurrent = buyer.produce[solutionIndex].supply_current;
  const buyerLimit = buyer.produce[solutionIndex].supply_limit;

  const buyerCost = 1 + Math.pow(buyerCurrent / buyerLimit, delta);
  const farmerCost = 1 + Math.pow(farmerSupply, alpha);

  const cost = weight * (Math.pow(distance, beta) * buyerCost) / farmerCost;

  return (
    <div className="flex flex-col text-sm text-neutral-700">
      <p className="font-extrabold text-xl">Cost for {produceType}</p>
      <p><span className="font-bold">Farmer:</span> {farmer.farm_name}</p>
      <p><span className="font-bold">Buyer:</span> {buyer.store_name}</p>
      <br />

      <div className="flex flex-row gap-10">
        <div className="flex flex-col mt-2 gap-2">
          <InlineMath math={`d = ${distance.toFixed(2)}`} />
          <InlineMath math={`s = ${farmerSupply}`} />
          <InlineMath math={`b = ${buyerCurrent}`} />
          <InlineMath math={`b^{max} = ${buyerLimit}`} />
          <InlineMath math={`P = ${priority}`} />
          <InlineMath math={`\\frac{1}{P} = ${weight.toFixed(4)}`} />
        </div>

        <div className="flex flex-col mt-2">
          <BlockMath
            math={`C_{${produceType}} =\\frac{1}{${priority}} \\frac{ ${distance}^{${beta}}  \\left(1 + \\left(\\frac{${buyerCurrent}}{${buyerLimit}}\\right)^{${delta}}\\right)}{\\left(${farmerSupply}\\right)^{${alpha}}}`}
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
