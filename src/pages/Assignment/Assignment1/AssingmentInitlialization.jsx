import NavBar from "../../../features/NavBar";
import { Link, useNavigate } from "react-router-dom";
import FarmerField from "./components/FarmerField";
import BuyerField from "./components/BuyerField";
import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import { useEffect, useState } from "react";

function AssignmentInitialization() {
  const { farmers, buyers, global } = useGlobalData();
  const [statusMsg, setStatusMsg] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    disableAssignment();
  }, [buyers, farmers]);

  function disableAssignment() {
    if (buyers.length === 0 || farmers.length === 0) {
      setStatusMsg('Cannot start assignment without farmers and buyers');
      setAssignmentStatus(true);
      return;
    }

    if (buyers.length !== farmers.length) {
      setStatusMsg('Cannot start assignment with different number of farmers and buyers');
      setAssignmentStatus(true);
      return;
    }

    setStatusMsg('');
    setAssignmentStatus(false);
  }


  return(
    <>
      <NavBar/>
      <div className="flex flex-col justify-center items-center border-2 border-neutral-300 bg-neutral-100 shadow-xl/5 m-5 rounded-2xl p-2 mt-20">
        <h1 className="text-xl font-extrabold text-neutral-600 text-center">Edit The Data</h1>
        <p className="text-smfont-extrabold text-neutral-400 text-center">Select a field to edit their data and supply</p>
        <Link to="EditGlobal">
          <button className="hover:text-emerald-500 hover:font-extrabold hover:border-2 hover:border-emerald-400 hover:bg-emerald-200 p-2 rounded-xl hover:scale-105 text-emerald-50 text-smborder-emerald-50 bg-emerald-500 duration-200 ease-(--my-beizer) m-5">Edit Regional Parameters</button>
        </Link>

        <div className="flex flex-col border-2 border-neutral-300 m-2 rounded-2xl p-2">
          <h1 className="text-xl font-extrabold text-neutral-600 text-center">Farmer Data</h1>
          <div className="flex flex-row justify-around ">
            {
              farmers.map((farmer, index) => (
                <Link to={`EditFarmer?id=${index}`} key={index}>
                  <FarmerField key={index} farmer={farmer} global={global}></FarmerField>
                </Link>
              ))
            }
              <Link to='/Assignment/Initialization/CreateFarmer' className="hover:text-blue-500 hover:font-extrabold hover:border-2 hover:border-blue-400 hover:bg-blue-200 p-2 rounded-xl hover:scale-105 text-blue-50 text-smborder-blue-50 bg-blue-500 duration-200 ease-(--my-beizer) h-fit self-center pt-10 pb-10 m-5">Add Farmer</Link>
          </div>
        </div>

        <div className='flex flex-col border-2 border-neutral-300 m-2 rounded-2xl p-2'>
          <h1 className="text-xl font-extrabold text-neutral-600 text-center">Buyer Data</h1>
          <div className="flex flex-row justify-around">
            {
              buyers.map((buyer, index) => (
                <Link to={`EditBuyer?id=${index}`} key={index}>
                  <BuyerField key={index} buyer={buyer} global={global}></BuyerField>
                </Link>
              ))
            }
              <Link to='/Assignment/Initialization/CreateBuyer' className="hover:text-blue-500 hover:font-extrabold hover:border-2 hover:border-blue-400 hover:bg-blue-200 p-2 rounded-xl hover:scale-105 text-blue-50 text-smborder-blue-50 bg-blue-500 duration-200 ease-(--my-beizer) h-fit self-center pt-10 pb-10 m-5">Add Buyer</Link>
          </div>
        </div>
          <div className="flex flex-col justify-center m-5">
            <button disabled={assignmentStatus} onClick={() => navigate('/Assignment/Metric/Result')} className="disabled:pointer-none disabled:bg-neutral-500 disabled:hover:border-red-800 disabled:hover:bg-red-400  disabled:hover:text-red-50   hover:text-emerald-500 hover:font-extrabold hover:border-2 hover:border-emerald-400 hover:bg-emerald-200 p-2 rounded-xl hover:scale-105 text-emerald-50 text-smborder-emerald-50 bg-emerald-500 duration-200 ease-(--my-beizer)">Create Assignment</button>
            <span className="text-red-500 text-sm">{statusMsg ? statusMsg : ''}</span>
          </div>
      </div>
    </>
  );
}


export default AssignmentInitialization;