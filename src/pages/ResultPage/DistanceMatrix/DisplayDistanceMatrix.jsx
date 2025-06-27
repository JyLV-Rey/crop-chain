import { useEffect, useState } from "react";
import DisplayRoute from "../components/DisplayRoute";

function DisplayDistanceMatrix({ distanceMatrix, buyers, farmers }) {
  const [displayIndex, setDisplayIndex] = useState({});

  useEffect(() => {
    console.log(displayIndex);
  }, [displayIndex]);

  return (
    <>
      <div className="flex flex-row w-fit gap-2 justify-between p-5 rounded-lg shadow-2xl">
        <div className="flex flex-col text-xs h-full gap-2">
          <div className="flex flex-row w-full justify-between">
            <div className="rounded-md shadow-lg bg-amber-100 text-amber-800 font-extrabold w-40 p-2 text-center">
              <p>Distance (km)</p>
            </div>
            {farmers.map((farmer, index) => (
              <div
                key={index}
                className="rounded-md shadow-lg bg-purple-200 text-purple-800 font-extrabold w-25 p-2 text-center"
              >
                <p>{farmer.farm_name}</p>
              </div>
            ))}
          </div>

          {buyers.map((buyer, buyerIndex) => (
            <div key={buyerIndex} className="flex flex-row justify-between gap-2 items-center">
              <div className="rounded-md shadow-lg bg-emerald-100 text-emerald-800 font-extrabold w-40 p-2 text-center">
                <p>{buyer.store_name}</p>
              </div>
              {farmers.map((farmer, farmerIndex) => (
                <button
                  key={farmerIndex}
                  onClick={() => {
                    const isSame =
                      displayIndex.buyer_index === buyerIndex &&
                      displayIndex.farmer_index === farmerIndex;
                    setDisplayIndex(isSame ? {} : { buyer_index: buyerIndex, farmer_index: farmerIndex });
                  }}
                  className="hover:scale-120 duration-200 ease-(--my-beizer) hover:bg-amber-100 hover:text-amber-700 shadow-lg font-bold cursor-pointer rounded-md w-25 p-2 text-center"
                >
                  <p>{distanceMatrix[farmerIndex][buyerIndex].distance.toFixed(2)}</p>
                </button>
              ))}
            </div>
          ))}

          {displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined && (
            <div className="flex flex-col mt-2 gap-2 text-neutral-800 font-medium p-2 bg-neutral-100 rounded-md shadow-xl">
              <p>
                <span className="font-bold">Farmer:</span>{" "}
                {farmers[displayIndex.farmer_index].farm_name} <br />
                <span className="font-bold">Location:</span>{" "}
                {farmers[displayIndex.farmer_index].location.latitude.toFixed(4)},
                {farmers[displayIndex.farmer_index].location.longitude.toFixed(4)} <br />
                <span className="font-bold">Address:</span>{" "}
                {distanceMatrix[displayIndex.farmer_index][displayIndex.buyer_index].farmer_location_name} <br />
                <br />
                <span className="font-bold">Buyer:</span> {buyers[displayIndex.buyer_index].store_name} <br />
                <span className="font-bold">Location:</span>{" "}
                {buyers[displayIndex.buyer_index].location.latitude.toFixed(4)},
                {buyers[displayIndex.buyer_index].location.longitude.toFixed(4)} <br />
                <span className="font-bold">Address:</span>{" "}
                {distanceMatrix[displayIndex.farmer_index][displayIndex.buyer_index].buyer_location_name} <br />
                <br />
                <span className="font-bold">Distance:</span>{" "}
                {distanceMatrix[displayIndex.farmer_index][displayIndex.buyer_index].distance.toFixed(2)} km <br />
                <span className="font-bold">Time:</span>{" "}
                {(distanceMatrix[displayIndex.farmer_index][displayIndex.buyer_index].time / 60).toFixed(2)} min
              </p>
            </div>
          )}
        </div>

        {displayIndex.buyer_index !== undefined && displayIndex.farmer_index !== undefined && (
          <div className="flex flex-col w-150 gap-2 text-neutral-800 font-medium p-2 bg-neutral-100 rounded-md shadow-xl">
            <p className="font-extrabold">Route</p>
            <DisplayRoute
              route={distanceMatrix[displayIndex.farmer_index][displayIndex.buyer_index]}
              farmer={farmers[displayIndex.farmer_index]}
              buyer={buyers[displayIndex.buyer_index]}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DisplayDistanceMatrix;
