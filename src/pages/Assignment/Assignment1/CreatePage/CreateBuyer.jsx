import { useNavigate } from "react-router-dom";
import TextField from "../../../../features/TextField";
import ProductNumberField from "../../../../features/ProduceNumberField";
import { useGlobalData } from "../../../../default-data/DefaultGlobalData";
import { useState } from "react";
import LocationSelector from "../components/LocationSelector";

function CreateBuyer() {
  const navigate = useNavigate();

  const { buyers, global, setBuyers } = useGlobalData();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [buyerLocation, setBuyerLocation] = useState(global.main_location);

  const [produce, setProduce] = useState(() => {
    const produce = global.produce.map(() => ({
      supply_current: Math.floor((Math.random() * 400 - 100) + 100),
      supply_limit: Math.floor((Math.random() * 600 - 400) + 400)

    }));

    return produce;
  });

  function isFormValid() {
  if (!firstName.trim() || !lastName.trim() || !storeName.trim()) return false;

  for (let item of produce) {
    if (item.supply_limit === '' || item.supply_limit === null || isNaN(item.supply_limit)) {
      return false;
    }
    if (item.supply_current === '' || item.supply_current === null || isNaN(item.supply_current)) {
      return false;
    }
  }
  return true;
  }

  function updateLocation(location) {
    const [lat, lang] = location;
    setBuyerLocation({
      latitude: lat,
      longitude: lang
    });
  }

  function updateProduce(e, key, updateKey) {
    const value = e.target.value;
    if(updateKey == 'supply_limit') {
      setProduce(prevProduce => {
        const newProduce = [...prevProduce];
        newProduce[key] = { ...newProduce[key], supply_limit: value };
        return newProduce;
    })}
    else {
      setProduce(prevProduce => {
        const newProduce = [...prevProduce];
        newProduce[key] = { ...newProduce[key], supply_current: value };
        return newProduce;})
    }
  }

  function createBuyer() {
    const updatedBuyer = {
      first_name: firstName,
      last_name: lastName,
      store_name: storeName,
      location: buyerLocation,
      produce: produce
    };

    const newBuyers = [...buyers, updatedBuyer];


    setBuyers(newBuyers);

    navigate(`/Assignment/Initialization`);
  }


  function cancelButton() {
    navigate(`/Assignment/Initialization`);
  }

  return(
    <>
      <h1 className="mt-5 text-4xl font-extrabold text-neutral-500 text-center">
          Create New Buyer
      </h1>
      <div className="flex flex-row justify-center p-5 border-2 border-neutral-300 w-fit self-center mt-5 rounded-2xl shadow-2xl/10">
        <div className='flex flex-col w-auto m-5 p-5 border-2 h-fit border-neutral-300 rounded-2xl shadow-xl/3'>
          <h2 className='text-3xl text-neutral-500 font-extrabold mb-2'>Personal Information</h2>
          <TextField data={firstName} header="First Name" setFunction={setFirstName} isRequired={true}></TextField>
          <TextField data={lastName} header="Last Name" setFunction={setLastName} isRequired={true}></TextField>
          <TextField data={storeName} header="Store Name" setFunction={setStoreName} isRequired={true}></TextField>
            <div className='flex flex-col w-auto m-1 p-2 border-2 border-neutral-200 rounded-2xl shadow-xl/3 gap-3'>
            <h2 className='text-3xl text-neutral-500 font-extrabold mb-2 text-center'>Produce</h2>
            {produce.map((produce, index) => (
              <div key={index} className='flex flex-col gap-2 border-2 bg-neutral-100 border-neutral-200 p-2 rounded-2xl hover:scale-105 hover:shadow-xl ease-(--my-beizer) duration-200'>
              <h3 className='text-2xl text-center text-neutral-500 font-bold'>{global.produce[index].type}</h3>
                <div className="flex flex-row gap-5 ">
                  <div>
                    <p className='font-semibold text-center text-neutral-500'>Current Supply</p>
                    <ProductNumberField index={index} data={produce.supply_current} header={global.produce[index].supply_current} setFunction={updateProduce} field='supply_current' isRequired={true}></ProductNumberField>
                  </div>
                  <div>
                    <p className='font-semibold text-center text-neutral-500'>Supply Limit</p>
                    <ProductNumberField index={index} data={produce.supply_limit} header={global.produce[index].supply_limit} setFunction={updateProduce} field='supply_limit' isRequired={true}></ProductNumberField>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-neutral-100 flex flex-col h-250 w-fit p-2 shadow-xl/5 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">
          <LocationSelector oldLocation={global.main_location} currentLocation={global.main_location} setLocation={updateLocation} className="flex flex-col h-300 w-200"/>
          
        </div>
      </div>
      <div className='flex flex-row justify-center w-auto m-5 p-2 gap-10'>
        <button onClick={cancelButton} className='bg-red-400 p-2 text-3xl font-extrabold rounded-lg text-neutral-100 hover:scale-120 hover:bg-amber-500 hover:border-2 hover:border-amber-800 hover:text-amber-800 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl'>Cancel</button>
        <button onClick={createBuyer} disabled={!isFormValid()} className={`p-2 text-3xl font-extrabold rounded-lg hover:scale-120 text-neutral-100 disabled:bg-neutral-400 disabled:border-2 disabled:border-neutral-500 disabled:text-neutral-100  hover:bg-emerald-200 hover:border-2 bg-emerald-400 hover:border-emerald-400 hover:text-emerald-400 ease-(--my-beizer) duration-200 shadow-xl hover:shadow-2xl`}>Save</button>
      </div>
    </>
  );
}

export default CreateBuyer;
