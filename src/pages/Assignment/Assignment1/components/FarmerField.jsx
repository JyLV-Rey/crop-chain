function FarmerField( {farmer, global }) {
  
  return (
    <>
      <div className="flex flex-row flex-wrap justify-around gap-4 w-auto m-2">
          <div className="flex flex-col w-auto p-4 border-neutral-300 border-2 rounded-2xl text-neutral-700 shadow-xl/5 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">
            <h1 className="text-xl font-extrabold">
              {farmer.last_name}, {farmer.first_name}
            </h1>
            <h2 className="font-bold text-sm">{farmer.farm_name}</h2>
            <p className="font-light text-sm">
              {farmer.location.latitude.toFixed(4)}, {farmer.location.longitude.toFixed(4)}
            </p>

            <div className="mt-2">
              {farmer.produce.map((produce, pIndex) => (
                <div key={pIndex} className="text-xs text-neutral-600 border border-neutral-300 rounded-md p-1 mb-1 hover:shadow-2xl hover:scale-105 ease-(--my-beizer) duration-200">
                  <span className='font-bold'>{global.produce[pIndex].type}</span>: {produce.supply} kg
                </div>
              ))}
            </div>
          </div>
      </div>
    </>
  );
}

export default FarmerField;
