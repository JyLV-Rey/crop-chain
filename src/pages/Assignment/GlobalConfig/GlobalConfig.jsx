import { useEffect, useState } from "react";
import { useGlobalData } from "../../../default-data/DefaultGlobalData";
import LocationSelector from '../Assignment1/components/LocationSelector'
import TextField from "../../../features/TextField";
import NumberField from "../../../features/NumberField";
import { useNavigate } from "react-router-dom";

function GlobalConfig() {
  const { global, setGlobal, farmers, setFarmers, buyers, setBuyers } = useGlobalData();

  const [regionName, setRegionName] = useState(global.region || "");
  const [penaltyDistance, setPenaltyDistance] = useState(global.penalty_distance);
  const [penaltyBuyerOversupply, setPenaltyBuyerOversupply] = useState(global.penalty_oversupply_buyer);
  const [penaltyFarmerUndersupply, setPenaltyFarmerUndersupply] = useState(global.penalty_undersupply_farmer);
  const [mainLocation, setMainLocation] = useState(global.main_location);
  const [newProduce, setNewProduce] = useState(global.produce);

  const zoom = global.main_location.zoom;

  const [farmerProduce, setFarmerProduce] = useState(farmers[0]?.produce || []);
  const [buyerProduce, setBuyerProduce] = useState(buyers[0]?.produce || []);

  const [canSave, setCanSave] = useState(false);

  console.log(global)
  const navigate = useNavigate();

  useEffect(() => {
    // Check penalties
    const penaltiesValid =
      !isNaN(parseFloat(penaltyDistance)) &&
      !isNaN(parseFloat(penaltyBuyerOversupply)) &&
      !isNaN(parseFloat(penaltyFarmerUndersupply)) &&
      parseFloat(penaltyDistance) >= 0 &&
      parseFloat(penaltyBuyerOversupply) >= 0 &&
      parseFloat(penaltyFarmerUndersupply) >= 0;

    // Check main location
    const locationValid = !!mainLocation;

    // Check all produce items
    const produceValid = newProduce.every(
      (p) =>
        typeof p.type === "string" &&
        p.type.trim() !== "" &&
        !isNaN(parseFloat(p.priority)) &&
        parseFloat(p.priority) >= 1
    );

    // Update state based on all conditions
    const regionValid = typeof regionName === "string" && regionName.trim() !== "";
    setCanSave(!(penaltiesValid && locationValid && produceValid && regionValid));
  }, [penaltyDistance, penaltyBuyerOversupply, penaltyFarmerUndersupply, mainLocation, newProduce, regionName]);

  // just an rng generator
  function getRand(min = 0, max = 500) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function updateProducePriority(index, priority) {
    const updatedProduce = [...newProduce];
    updatedProduce[index].priority = Number(priority);
    setNewProduce(updatedProduce);
  }

  function updateProduceType(index, type) {
    const updatedProduce = [...newProduce];
    updatedProduce[index].type = type;
    setNewProduce(updatedProduce);
  }

  function updateLocation(location) {
    const [lat, lng] = location;
    setMainLocation(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
  }

  function deleteProduce(currentIndex) {
    if (!window.confirm('Are you sure you want to delete this produce?')) return;

    const tempProduce = newProduce.filter((_, index) => index !== Number(currentIndex));
    setNewProduce(tempProduce);

    const tempFarmerProduce = farmerProduce.filter((_, index) => index !== Number(currentIndex));
    setFarmerProduce(tempFarmerProduce);

    const tempBuyerProduce = buyerProduce.filter((_, index) => index !== Number(currentIndex));
    setBuyerProduce(tempBuyerProduce);
  }

  function addProduce() {
    const tempProduce = [...newProduce];
    tempProduce.push({ type: 'New Produce', priority: 1 });
    setNewProduce(tempProduce);

    const tempFarmerProduce = [...farmerProduce];
    tempFarmerProduce.push({ type: 'New Produce', supply: getRand(50, 300) });
    setFarmerProduce(tempFarmerProduce);

    const tempBuyerProduce = [...buyerProduce];
    tempBuyerProduce.push({ supply_current: getRand(100, 400), supply_limit: getRand(400, 600) });
    setBuyerProduce(tempBuyerProduce);
  }

  // note to self dont map too much i swear to god
  function handleSave() {
    if (!window.confirm('Are you sure you want to save these changes?')) return;

  const tempGlobal = {
    ...global,
    penalty_distance: parseFloat(penaltyDistance),
    penalty_oversupply_buyer: parseFloat(penaltyBuyerOversupply),
    penalty_undersupply_farmer: parseFloat(penaltyFarmerUndersupply),
    main_location: {
      zoom,
      latitude: mainLocation.latitude,
      longitude: mainLocation.longitude
    },
    produce: newProduce,
    region: regionName,
  };

    setGlobal(tempGlobal);

    // thjso took me forever omg
    const tempFarmers = farmers.map((farmer) => {
      const updatedProduce = [...farmer.produce];
      while (updatedProduce.length < newProduce.length) {
        updatedProduce.push({ supply: getRand(50, 300) });
      }
      return {
        ...farmer,
        produce: updatedProduce.map((fp, index) => ({
          ...fp,
          type: newProduce[index]?.type || fp.type,
        })),
      };
    });


    const tempBuyers = buyers.map((buyer) => {
      const updatedProduce = [...buyer.produce];
      while (updatedProduce.length < newProduce.length) {
        updatedProduce.push({
          supply_current: getRand(100, 400),
          supply_limit: getRand(400, 600),
        });
      }
      return {
        ...buyer,
        produce: updatedProduce.map((bp, index) => ({
          ...bp,
          type: newProduce[index]?.type || bp.type,
        })),
      };
    });

    setFarmers(tempFarmers);
    setBuyers(tempBuyers);

    navigate(-1);
  }

  return(
    <>
      <div className='flex flex-col justify-center items-center mt-5 ml-10 mr-10 w-auto'>
          <h1 className='text-3xl font-extrabold text-neutral-700'>Edit Global Parameters</h1>
          <h2 className='text-lg font-medium text-neutral-700'>These are the parameters that will help further customize the assignment. This ensures that it can be flexible enough to tweak the algorithm to prioritize the factors being edited below</h2>
      </div>

      <div className='flex flex-row flex-wrap gap-10 justify-around w-full p-10'>

        {/* Penalties */}
        <div className='flex flex-col w-1/6 flex-grow p-5 border-2 border-neutral-300 rounded-2xl'>
          <div>
            <h2 className='text-3xl font-extrabold text-neutral-700'>Set Region Name</h2>
            <TextField data={regionName} header="Region Name" setFunction={setRegionName} isRequired={true}/>
            <p className="text-sm text-neutral-600 mb-10">
              Name of the region you're working with. This helps label the configuration and context of the current dataset.
            </p>
          </div>
          <h2 className='text-3xl font-extrabold text-neutral-700'>Penalty Parameters</h2>
          <h2 className='text-sm font-medium text-neutral-700'>
            These penalties control how strongly the algorithm avoids certain undesirable outcomes. Higher values increase the cost associated with those conditions. All penalties will be normalized during the implementation.
          </h2>

          <div className="flex flex-col gap-5 mt-5">
            <div>
              <TextField data={penaltyDistance} header="Penalty: Distance" setFunction={setPenaltyDistance} isRequired={true}/>
              <p className="text-sm text-neutral-600">
                This penalty increases the cost for assigning buyers to distant farmers. Higher values make the algorithm prefer geographically closer pairings.
              </p>
            </div>
            <div>
              <TextField data={penaltyBuyerOversupply} header="Penalty: Buyer Oversupply" setFunction={setPenaltyBuyerOversupply} isRequired={true} />
              <p className="text-sm text-neutral-600">
                This penalty increases the cost of oversupplying buyers. Higher values make the algorithm prioritize more balanced distributions to buyers.
              </p>
            </div>
            <div>
              <TextField data={penaltyFarmerUndersupply} header="Penalty: Farmer Undersupply" setFunction={setPenaltyFarmerUndersupply} isRequired={true} />
              <p className="text-sm text-neutral-600">
                This penalty increases the cost of leaving farmers undersupplied. Higher values make the algorithm prefer assignments that fulfill farmers' quotas more completely.
              </p>
            </div>
          </div>
        </div>


        <div className="flex flex-col w-1/2 flex-grow p-5 border-2 border-neutral-300 rounded-2xl">
          <h1 className='text-3xl font-extrabold text-neutral-700'>Produce Priority</h1>
          <h2 className='text-sm font-medium text-neutral-700'>These are the parameters that determines the names of the produce and how much they will be prioritized over the other during the assignment process, the lower the number, the more it will be prioritized. The values will be then normalized during the implementation accodingly with respect to the range of values.</h2>
          <div className="flex flex-row flex-wrap gap-2 justify-between">
            {
              newProduce.map((produce, index) => (
                <div key={index} className="flex-grow flex flex-col gap-1 m-3 border-2 border-neutral-300 rounded-md p-3 mb-1 hover:shadow-xl ease-(--my-beizer) duration-200">
                  <h2 className="font-extrabold text-2xl text-neutral-700 text-center">{produce.type}</h2>

                    <TextField data={produce.type} header={`Name of Produce`} setFunction={(type) => updateProduceType(index, type)}  isRequired={true} />
                    <NumberField data={produce.priority} header={`${produce.type} Priority`} setFunction={(priority) => updateProducePriority(index, priority)}  isRequired={true} min={0} />

                  <button onClick={() => deleteProduce(index)} className='w-fit self-center bg-red-400 p-2 text-lg font-bold rounded-lg text-neutral-100 hover:scale-120 hover:bg-amber-500 hover:border-2 hover:border-amber-800 hover:text-amber-800 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl'>Delete Produce</button>
                </div>
              ))
            }
          </div>
          <button onClick={addProduce} className=' mt-5 w-fit self-center bg-emerald-400 p-2 text-lg font-bold rounded-lg text-neutral-100 hover:scale-120 hover:bg-emerald-500 hover:border-2 hover:border-emerald-800 hover:text-emerald-800 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl'>Add Produce</button>
        </div>

        {/* Main Location */}
        <div className="flex flex-col w-auto p-5 border-2 justify-center items-center border-neutral-300 rounded-2xl">
          <h1 className='text-3xl font-extrabold text-neutral-700'>Set Default Map View Location</h1>
          <h2 className='text-sm font-medium text-neutral-700 text-center'>The location will serve as the default location that can be seen only on the view data page. <br /> This will also serve as the default location of the markers when creating and initializing a buyer or a farmer</h2>

          <LocationSelector
            oldLocation={global.main_location}
            currentLocation={global.main_location} // FIXED
            setLocation={updateLocation}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-around gap-4 w-auto mb-5">
        <button onClick={() => navigate(-1)} className='bg-red-400 p-2 text-3xl font-extrabold rounded-lg text-neutral-100 hover:scale-120 hover:bg-amber-500 hover:border-2 hover:border-amber-800 hover:text-amber-800 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl'>Cancel</button>
        <button onClick={handleSave} disabled={canSave} className={`p-2 text-3xl font-extrabold rounded-lg hover:scale-120 text-neutral-100 disabled:bg-neutral-400 disabled:border-2 disabled:border-neutral-500 disabled:text-neutral-100  hover:bg-emerald-200 hover:border-2 bg-emerald-400 hover:border-emerald-400 hover:text-emerald-400 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl`}>Save Data</button>
      </div>
    </>
  );
}

export default GlobalConfig;