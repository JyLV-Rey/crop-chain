import { useGlobalData } from "../../../default-data/DefaultGlobalData";

function ListBuyers() {
  const { buyers, global } = useGlobalData();

  return (
    <>
      <h1 className="text-5xl font-extrabold text-neutral-600 text-center">
        List of Buyers
      </h1>
      <div className="flex flex-row flex-wrap justify-around gap-4 w-auto m-2">
        {buyers.map((buyer, index) => (
          <div
            key={index}
            className="flex flex-col w-auto p-4 border-neutral-200 border-2 rounded-2xl text-neutral-700 shadow-xl/5 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200 bg-neutral-100">
              
            <h1 className="text-3xl font-extrabold">
              {buyer.last_name}, {buyer.first_name}
            </h1>
            <h2 className="font-bold text-xl">{buyer.store_name}</h2>
            <p className="font-light text-lg">
              {buyer.location.latitude}, {buyer.location.longitude}
            </p>

            <div className="mt-2">
              {buyer.produce.map((produce, pIndex) => (
                <div key={pIndex} className="flex flex-col w-auto text-sm text-neutral-600 border border-neutral-300 rounded-md p-1 mb-1 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">

                  <div className="flex flex-row items-center justify-around">
                    <p className='text-lg text-center font-extrabold'>{global.produce[pIndex].type} Supply</p>
                  </div>

                  <div className="flex flex-row items-center gap-2 justify-around p-2">
                    <div className="flex flex-col items-center justify-around border-2 border-neutral-200 rounded-md p-2 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">
                      <p className="font-bold">Current</p>
                      <p>{produce.supply_current} kg</p>
                    </div>

                    <div className="flex flex-col items-center justify-around border-2 border-neutral-200 rounded-md p-2 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">
                      <p className="font-bold">Maximum</p>
                      <p>{produce.supply_limit} kg</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListBuyers;
