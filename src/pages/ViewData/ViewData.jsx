import NavBar from "../../features/NavBar";
import { useGlobalData } from "../../default-data/DefaultGlobalData";
import DisplayLocation from "./components/DisplayLocation";
import ListFarmers from "./components/ListFarmers";
import ListBuyers from "./components/ListBuyers";


function ViewData() {
  const { farmers, buyers } = useGlobalData();

  // resetes
  function resetData() {
    localStorage.clear();
    window.location.reload();
  }

  return(
    <>
      <NavBar></NavBar>
      <div className="w-auto p-2 shadow-lg m-10 h-auto rounded-md mt-20">
        <DisplayLocation farmers={farmers} buyers={buyers} />
      </div>
      <h1 className="text-5xl font-extrabold text-neutral-600 text-center">
        List of Farmers
      </h1>
      <ListFarmers/>
      <h1 className="text-5xl font-extrabold text-neutral-600 text-center mt-5">
        List of Buyers
      </h1>
      <ListBuyers/>
      <button onClick={resetData} className='bg-red-400 p-2 text-3xl font-extrabold text-neutral-100  hover:bg-amber-500 hover:border-2 hover:border-amber-800 hover:text-amber-800 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl'>Reset Data</button>
    </>
  );
}

export default ViewData