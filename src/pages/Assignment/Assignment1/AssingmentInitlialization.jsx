import NavBar from "../../../features/NavBar";
import { Link } from "react-router-dom";
import FarmerField from "./components/FarmerField";
import BuyerField from "./components/BuyerField";
import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import getDistanceMatrix from '../../../features/Distance';
import { useEffect } from "react";

function AssignmentInitialization() {
  const { farmers, buyers, global, distance } = useGlobalData();

  console.log(distance);

  return(
    <>
      <NavBar/>
      <div className="flex flex-col justify-center items-center border-2 border-neutral-300 bg-neutral-100 shadow-xl/5 m-5 rounded-2xl p-2 mt-20">
        <h1 className="text-4xl font-extrabold text-neutral-500 text-center">Edit The Data</h1>
        <p className="text-xl font-extrabold text-neutral-400 text-center">Select a field to edit their data and supply</p>
        <Link to="EditGlobal">
          <button className="hover:text-emerald-500 hover:font-extrabold hover:border-2 hover:border-emerald-400 hover:bg-emerald-200 p-2 rounded-xl hover:scale-105 text-emerald-50 text-xl border-emerald-50 bg-emerald-500 duration-200 ease-(--my-beizer) m-5">Edit Global Data</button>
        </Link>

        <div className="flex flex-col border-2 border-neutral-300 m-2 rounded-2xl p-2">
          <h1 className="text-4xl font-extrabold text-neutral-500 text-center">Farmer Data</h1>
          <div className="flex flex-row justify-around ">
            {
              farmers.map((farmer, index) => (
                <Link to={`EditFarmer?id=${index}`}>
                  <FarmerField key={index} farmer={farmer} global={global}></FarmerField>
                </Link>
              ))
            }
          </div>
        </div>

        <div className='flex flex-col border-2 border-neutral-300 m-2 rounded-2xl p-2'>
          <h1 className="text-4xl font-extrabold text-neutral-500 text-center">Buyer Data</h1>
          <div className="flex flex-row justify-around">
            {
              buyers.map((buyer, index) => (
                <Link to={`EditBuyer?id=${index}`}>
                  <BuyerField key={index} buyer={buyer} global={global}></BuyerField>
                </Link>
              ))
            }
          </div>
        </div>

      </div>
    </>
  );
}


export default AssignmentInitialization;