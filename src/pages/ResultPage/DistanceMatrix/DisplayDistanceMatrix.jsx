import { useEffect, useState } from "react";
import DisplayRoute from "./DisplayRoute";

function DisplayDistanceMatrix( {distanceMatrix, buyers, farmers} ) {
  const [displayIndex , setDisplayIndex] = useState({});

  useEffect(() => {
    console.log(displayIndex);
  }, [displayIndex]);
  return(
    <>
      <div className="flex flex-col w-fit gap-2 justify-between border-2 border-neutral-700 bg-neutral-300 p-5 rounded-xl">
        <div className={`flex flex-row w-full justify-between`}>
          <div className="rounded-md border-2 border-neutral-800 bg-neutral-200 text-neutral-800 font-extrabold w-50  text-bold p-2 text-center">
            <p>
              Distance
            </p>
          </div>
          {
            farmers.map((farmer, index) => (
              <div key={index} className="rounded-md border-2 border-neutral-800 bg-neutral-200 text-neutral-800 font-extrabold w-35 p-2 text-center">
                <p>
                  {farmer.farm_name}
                </p>
              </div>
            ))
          }
        </div>
        {
          distanceMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className={`flex flex-row justify-between gap-2 items-center`}>
              <div className="rounded-md border-2 border-neutral-800 bg-neutral-200 text-neutral-800 font-extrabold w-50 text-bold p-2 text-center">
                <p>
                  {buyers[rowIndex].store_name}
                </p>
              </div>
              {
                row.map((distance, index) => (
                  <button key={index} onClick={() => {setDisplayIndex({buyer_index: rowIndex, farmer_index: index})}} className="border-2 hover:scale-105 duration-200 ease-(--my-beizer) hover:bg-amber-100 hover:text-amber-700 hover:border-amber-700 text-emerald-800 font-bold cursor-pointer bg-emerald-200 rounded-md w-35 text-bold p-2 text-center">
                    <p>
                      {distance.distance.toFixed(2)}
                    </p>
                  </button>
                ))
              }
            </div>
          ))
        }
        {
          displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined &&
            <div className="flex flex-col gap-2 text-neutral-800 font-medium p-2 border-2 bg-neutral-100 rounded-md border-neutral-600">
              <p>
                <span className="font-bold">Buyer:</span> {buyers[displayIndex.buyer_index].store_name} <br />
                <span className="font-bold">Location:</span> {buyers[displayIndex.buyer_index].location.latitude.toFixed(4)}, {buyers[displayIndex.buyer_index].location.longitude.toFixed(4)} <br /> 
                <span className="font-bold">Address:</span> {distanceMatrix[displayIndex.buyer_index][displayIndex.farmer_index].farmer_location_name}  <br /> <br />
                
                <span className="font-bold">Farmer:</span> {farmers[displayIndex.farmer_index].farm_name} <br />
                <span className="font-bold">Location:</span> {farmers[displayIndex.farmer_index].location.latitude.toFixed(4)}, {farmers[displayIndex.farmer_index].location.longitude.toFixed(4)} <br />
                <span className="font-bold">Address:</span> {distanceMatrix[displayIndex.buyer_index][displayIndex.farmer_index].buyer_location_name} <br /> <br />
                
                <span className="font-bold">Distance:</span> {distanceMatrix[displayIndex.buyer_index][displayIndex.farmer_index].distance.toFixed(2)}
              </p>
              <div>
                <p>Route</p>
                <DisplayRoute route={distanceMatrix[displayIndex.buyer_index][displayIndex.farmer_index]} farmer={farmers[displayIndex.farmer_index]} buyer={buyers[displayIndex.buyer_index]}></DisplayRoute>
              </div>
            </div>
        }
      </div>
    </>
  )
  
}

export default DisplayDistanceMatrix