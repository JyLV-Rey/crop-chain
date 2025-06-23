import { useNavigate } from "react-router-dom";
import TextField from "../../../../features/TextField";
import ProductNumberField from "../../../../features/ProduceNumberField";
import { useGlobalData } from "../../../../default-data/DefaultGlobalData";
import { useState } from "react";
import LocationSelector from "../components/LocationSelector";

function EditFarmer() {
  const navigate = useNavigate();

  const { farmers, global, setFarmers } = useGlobalData();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [farmerLocation, setFarmerLocation] = useState(global.main_location);

  const [produce, setProduce] = useState(() => {
    const produce = global.produce.map(() => ({
      supply: Math.floor((Math.random() * 200 - 100) + 100)
    }));

    return produce;
  });


  function isFormValid() {
  if (!firstName.trim() || !lastName.trim() || !farmName.trim()) return false;

  for (let item of produce) {
    if (item.supply === '' || item.supply === null || isNaN(item.supply)) {
      return false;
    }
  }
  return true;
  }
  function updateProduce(e, key) {
    const value = e.target.value;
    setProduce(prevProduce => {
      const newProduce = [...prevProduce];
      newProduce[key] = { ...newProduce[key], supply: value };
      return newProduce;
    });
  }
  function updateLocation(location) {
    const [lat, lang] = location;
    setFarmerLocation({
      latitude: lat,
      longitude: lang
    });
  }


  function createFarmer() {
    const newFarmer = {
      first_name: firstName,
      last_name: lastName,
      farm_name: farmName,
      location: farmerLocation,
      produce: produce
    };

    const updatedFarmers = [...farmers, newFarmer];
    setFarmers(updatedFarmers);
    navigate(`/Assignment/Initialization`);
  }

  function cancelButton() {
    navigate(`/Assignment/Initialization`);
  }

  return(
    <>
      <h1 className="mt-5 text-4xl font-extrabold text-neutral-500 text-center">
          Create New Farmer
      </h1>
      <div className="flex flex-row justify-center p-5 border-2 border-neutral-300 w-fit self-center mt-5 rounded-2xl shadow-2xl/10">
        <div className='flex flex-col w-auto m-5 p-2 border-2 border-neutral-300 rounded-2xl shadow-xl/3'>
          <h2 className='text-3xl text-neutral-500 font-extrabold mb-2'>Personal Information</h2>
          <TextField data={firstName} header="First Name" setFunction={setFirstName} isRequired={true}></TextField>
          <TextField data={lastName} header="Last Name" setFunction={setLastName} isRequired={true}></TextField>
          <TextField data={farmName} header="Farm Name" setFunction={setFarmName} isRequired={true}></TextField>
        </div>
        <div className='flex flex-col w-auto m-5 p-2 border-2 border-neutral-300 rounded-2xl shadow-xl/3'>
          <h2 className='text-3xl text-neutral-500 font-extrabold mb-2 text-center'>Produce</h2>
          {produce.map((produce, index) => (
            <ProductNumberField key={index} index={index} data={produce.supply} header={global.produce[index].type} setFunction={updateProduce} isRequired={true}></ProductNumberField>
          ))}
        </div>
        <div className='flex flex-col p-2 shadow-xl/5 rounded-lg hover:shadow-2xl hover:scale-105 bg-neutral-100 ease-(--my-beizer) duration-200'>
          <LocationSelector oldLocation={global.main_location} currentLocation={global.main_location} setLocation={updateLocation}/>
          <p className='font-semibold text-center text-neutral-500 mt-2'>Current Location <br /> {global.main_location.latitude.toFixed(4)}, {global.main_location.longitude.toFixed(4)}</p>
        </div>
     
      </div>
      <div className='flex flex-row justify-center w-auto m-5 p-2 gap-10'>
        <button onClick={cancelButton} className='bg-red-400 p-2 text-3xl font-extrabold rounded-lg text-neutral-100 hover:scale-120 hover:bg-amber-500 hover:border-2 hover:border-amber-800 hover:text-amber-800 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl'>Cancel</button>
        <button onClick={createFarmer} disabled={!isFormValid()} className={`p-2 text-3xl font-extrabold rounded-lg hover:scale-120 text-neutral-100 disabled:bg-neutral-400 disabled:border-2 disabled:border-neutral-500 disabled:text-neutral-100  hover:bg-emerald-200 hover:border-2 bg-emerald-400 hover:border-emerald-400 hover:text-emerald-400 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl`}>Save</button>
      </div>
    </>
  );
}

export default EditFarmer;