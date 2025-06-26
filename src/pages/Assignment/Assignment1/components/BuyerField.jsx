

function ListBuyers( {buyer, global} ) {

  return (
    <>
      <div className="flex flex-row flex-wrap justify-around gap-4 w-auto m-2">
          <div className="flex flex-col w-auto p-4 border-neutral-300 border-2 rounded-2xl text-neutral-700 shadow-xl/5 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200 bg-neutral-100">
            <h1 className="text-lg font-extrabold">
              {buyer.last_name}, {buyer.first_name}
            </h1>
            <h2 className="font-bold text-sm">{buyer.store_name}</h2>
            <p className="font-light text-sm">
              {buyer.location.latitude.toFixed(4)}, {buyer.location.longitude.toFixed(4)}
            </p>

            <div className="mt-2">
              {buyer.produce.map((produce, pIndex) => (
                <div key={pIndex} className="flex flex-col w-auto text-xs text-neutral-600 border border-neutral-300 rounded-md p-1 mb-1 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">

                  <div className="flex flex-row items-center justify-around">
                    <p className='text-sm text-center font-extrabold'>{global.produce[pIndex].type} Supply</p>
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
      </div>
    </>
  );
}

export default ListBuyers;
