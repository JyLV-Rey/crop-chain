import NavBar from "../../features/NavBar";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import DisplayLocation from "./components/DisplayLocation";
import ListFarmers from "./components/ListFarmers";
import ListBuyers from "./components/ListBuyers";


function ViewData() {
  const { farmers, buyers } = useGlobalData();
  return(
    <>
      <NavBar></NavBar>
      <div className="w-auto p-10 shadow-lg mb-10 h-auto rounded-2xl">
        <DisplayLocation farmers={farmers} buyers={buyers} />
      </div>
      <ListFarmers></ListFarmers>
      <ListBuyers></ListBuyers>
    </>
  );
}

export default ViewData