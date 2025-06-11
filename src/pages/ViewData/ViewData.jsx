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
      <div className="w-auto p-2 shadow-lg m-10 h-auto rounded-md">
        <DisplayLocation farmers={farmers} buyers={buyers} />
      </div>
      <ListFarmers/>
      <ListBuyers/>
    </>
  );
}

export default ViewData