import { useGlobalData } from "../../../default-data/DefaultGlobalData";


function ListFarmers() {
  const { farmers, global } = useGlobalData();
  
  return (
    <>
      <h1 className="text-5xl font-extrabold text-neutral-600 text-center">
        List of Farmers
      </h1>
      <div className="flex flex-row flex-wrap justify-around gap-4 w-auto m-2">
        {farmers.map((farmer, index) => (
          <div
            key={index}
            className="flex flex-col w-auto p-4 border-neutral-200 border-2 rounded-2xl text-neutral-700 shadow-xl/5 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200"
          >
            <h1 className="text-3xl font-extrabold">
              {farmer.last_name}, {farmer.first_name}
            </h1>
            <h2 className="font-bold text-xl">{farmer.farm_name}</h2>
            <p className="font-light text-lg">
              {farmer.location.latitude}, {farmer.location.longitude}
            </p>

            <div className="mt-2">
              {farmer.produce.map((produce, pIndex) => (
                <div key={pIndex} className="text-sm text-neutral-600 border border-neutral-300 rounded-md p-1 mb-1 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">
                  <span className='font-bold'>{global.produce[pIndex].type}</span>: {produce.supply} kg
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListFarmers;
