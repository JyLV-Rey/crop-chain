import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import { BlockMath, InlineMath } from "react-katex";

function DisplaySolution({ farmerIndex, buyerIndex, solutionIndex = 0, distanceMatrix }) {
  const { farmers, buyers, global } = useGlobalData();
  const distance = distanceMatrix[buyerIndex][farmerIndex].distance;

  const alpha = global.penalty_undersupply_farmer;
  const beta = global.penalty_distance;
  const delta = global.penalty_oversupply_buyer;

  if (solutionIndex === -1) {
    // Total cost computation across all produce
    let costParts = [];
    let solutionParts = [];
    let totalCost = 0;

    global.produce.forEach((produce, index) => {
      const supplyFarmer = farmers[farmerIndex].produce[index].supply;
      const buyerCurrent = buyers[buyerIndex].produce[index].supply_current;
      const buyerLimit = buyers[buyerIndex].produce[index].supply_limit;

      const cost =
        Math.pow(distance, beta) *
        (1 + Math.pow(buyerCurrent / buyerLimit, delta)) /
        Math.pow(supplyFarmer + 1, alpha);

      costParts.push(`C_{${produce.type}}`);
      solutionParts.push(`${cost.toFixed(4)}`);
      totalCost += cost;
    });

    const fullEquation = `${costParts.join(" + ")}`;
    const fullSolution = `${solutionParts.join(" + ")}`;

    return (
      <div className="flex flex-col text-sm text-neutral-700">
        <p className="font-extrabold text-xl">Total Computation (All Produce Types)</p>
        <p><span className="font-bold">Farmer:</span> {farmers[farmerIndex].farm_name}</p>
        <p><span className="font-bold">Buyer:</span> {buyers[buyerIndex].store_name}</p>
        <br />
        <div>
          <BlockMath math={`C_{total} = ${fullEquation}`} />
          <BlockMath math={`C_{total} = ${fullSolution}`} />
          <div className="mt-2 text-xl font-bold"> 
            <BlockMath math={`C_{total} = ${totalCost.toFixed(4)}`} mathStyle={{ display: "block" }} />
            <BlockMath math={`C_{total} \\texttt{(scaled)} = ${(totalCost * 100).toFixed(4)}`} mathStyle={{ display: "block" }} />
          </div>
        </div>

      </div>
    );
  }

  // Single produce computation WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW
  const produceType = global.produce[solutionIndex].type;
  const supplyFarmer = farmers[farmerIndex].produce[solutionIndex].supply;
  const buyerCurrent = buyers[buyerIndex].produce[solutionIndex].supply_current;
  const buyerLimit = buyers[buyerIndex].produce[solutionIndex].supply_limit;

  const cost =
    Math.pow(distance, beta) *
    (1 + Math.pow(buyerCurrent / buyerLimit, delta)) /
    Math.pow(supplyFarmer + 1, alpha);

  return (
    <div className="flex flex-col text-sm text-neutral-700">
      <p className="font-extrabold text-xl">Given for {produceType}</p>
      <p><span className="font-bold">Farmer:</span> {farmers[farmerIndex].farm_name}</p>
      <p><span className="font-bold">Buyer:</span> {buyers[buyerIndex].store_name}</p>
      <br />

      <div className="flex flex-row gap-10">
        <div className="flex flex-col mt-2">
          <InlineMath math={`d_{bp} = ${distance.toFixed(2)}`} />
          <InlineMath math={`s_{bp} = ${supplyFarmer}`} />
          <InlineMath math={`b_{bp} = ${buyerCurrent}`} />
          <InlineMath math={`b^{max}_f = ${buyerLimit}`} />
        </div>

        <div className="flex flex-col mt-2">
          <BlockMath
            math={`C_{${produceType}} = \\frac{${distance.toFixed(2)}^{${beta}} \\cdot \\left(1 + \\left( \\frac{${buyerCurrent}}{${buyerLimit}} \\right)^{${delta}} \\right)}{\\left(${supplyFarmer} + 1\\right)^{${alpha}}}`}
          />
        </div>
      </div>
      <div className="text-2xl">
        <BlockMath math={`C_{${produceType}} = ${cost.toFixed(4)}`} />
      </div>
    </div>
  );
}

export default DisplaySolution;
