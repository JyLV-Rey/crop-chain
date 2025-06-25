import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import costMatrix from "./CostMatrix";

export default function MatrixTest() {
  const { farmers, buyers, global, regionIndex } = useGlobalData();

  console.log(costMatrix(farmers, buyers, global));
  return null;
}