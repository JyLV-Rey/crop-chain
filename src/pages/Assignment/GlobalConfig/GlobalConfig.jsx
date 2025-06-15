import { useState } from "react";
import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import LocationSelector from '../Assignment1/components/LocationSelector'

function GlobalConfig() {
  const { global, setGlobal, farmer } = useGlobalData();
  
  const [penaltyDistance, setPenaltyDistance] = useState(global.penalty_distance);
  const [penaltyBuyerOversupply, setPenaltyBuyerOversupply] = useState(global.penalty_oversupply_buyer);
  const [penaltyFarmerUndersupply, setPenaltyFarmerUndersupply] = useState(global.penalty_undersupply_farmer);
  const [mainLocation, setMainLocation] = useState(global.main_location)

  return(
    <>
      <div className='flex flex-row m-5 gap-10'>
        <div className='flex flex-col w-auto shadow-xl/30 shadow-black'>
          <h1 className='text-3xl font-extrabold text-neutral-700'>Edit Global Parameters</h1>
        </div>
        <div className="flex flex-col w-auto shadow-xl/30 shadow-black">
          <h1 className='text-3xl font-extrabold text-neutral-700'>Set Default Map View Location</h1>

            <LocationSelector oldLocation={global.main_location} currentLocation={mainLocation} setLocation={setMainLocation}/>
        </div>
      </div>
    </>
  );
}

export default GlobalConfig;