import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import { BlockMath } from "react-katex";

function DisplaySolution({farmerIndex, buyerIndex, solutionIndex = 0, distanceMatrix}) {
  const {farmers, buyers, global} = useGlobalData();

  if (solutionIndex === -1) return(<></>);

  return(
    <>
      <div className="flex flex-col text-xs text-neutral-700">
        <p className="font-extrabold text-lg">Given for {global.produce[solutionIndex].type}</p>
        <p><span className="font-bold">Farmer:</span> {farmers[farmerIndex].farm_name}</p>
        <p><span className="font-bold">Buyer:</span> {buyers[buyerIndex].store_name}</p>
        <p></p>
        <p></p>
      </div>
    </>
  );
}
export default DisplaySolution