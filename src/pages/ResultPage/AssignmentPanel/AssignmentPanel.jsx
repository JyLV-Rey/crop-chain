function AssignmentPanel( {farmers, buyers, distanceMatrix, global, bestAssignment, costMatrix } ) {

  function higherColor(newSupply, maxSupply) {
    if (newSupply >= maxSupply) return "bg-red-100 text-red-800"
    else if (newSupply === maxSupply) return "bg-amber-100 text-amber-800"
    else return "bg-emerald-100 text-emerald-800"
  }

  return(
    <>
      <div className="flex flex-col flex-wrap justify-around gap-4 mt-10">
        { bestAssignment.bestAssignment != undefined && bestAssignment.bestAssignment.map((assignment, index) => (
          <div key={index} className="flex flex-col w-full text-sm justify-between p-5 rounded-lg shadow-xl/8 bg-neutral-100 text-neutral-800 font-medium ">
            <p className="text-xl font-extrabold text-center">Assignment {index + 1}</p>
            <p className="font-bold text-center">{farmers[assignment[1]].farm_name} <span className="font-medium"> delivers to </span>{buyers[assignment[0]].store_name}</p>            
            
            <div className="flex flex-row gap-2">

              <div className='flex flex-col p-2 gap-1 text-xs'>
                <p className='font-bold text-xl'>Information</p>
                <p><span className='font-bold'>Farmer:</span> {farmers[assignment[1]].first_name} {farmers[assignment[1]].last_name}</p>
                <p><span className='font-bold'>Location:</span> {farmers[assignment[1]].location.latitude.toFixed(4)}, {farmers[assignment[1]].location.longitude.toFixed(4)}</p>
                <p><span className='font-bold'>Address:</span> {distanceMatrix[assignment[0]][assignment[1]].farmer_location_name}</p>

                <br /><br /> <br />

                <p><span className='font-bold'>Buyer:</span> {buyers[assignment[0]].first_name} {buyers[assignment[0]].last_name}</p>
                <p><span className='font-bold'>Location:</span> {buyers[assignment[0]].location.latitude.toFixed(4)}, {buyers[assignment[0]].location.longitude.toFixed(4)}</p>
                <p><span className='font-bold'>Address:</span> {distanceMatrix[assignment[0]][assignment[1]].buyer_location_name}</p>

                <div className="flex flex-col shadow-xl rounded-lg p-2">
                  <p className='font-bold text-xl'>Produce Statistics</p>
                  <div className='flex flex-col gap-3 text-xs'>
                    {
                      global.produce.map((produce, pIndex) => (
                        <div key={pIndex} className="flex flex-col justify-between shadow-xl/6 rounded-lg p-2">
                          <p className='font-extrabold text-lg'>{produce.type}</p>
                          <p><span className='font-bold'>Priority:</span> {produce.priority}</p>
                          <p><span className='font-bold'>Farmer Supply:</span> {farmers[assignment[1]].produce[pIndex].supply} kg</p>
                          <p><span className='font-bold'>Buyer Current Supply:</span> {buyers[assignment[0]].produce[pIndex].supply_current} kg</p>
                          <p><span className='font-bold'>Buyer Maximum Supply:</span> {buyers[assignment[0]].produce[pIndex].supply_limit} kg</p>
                          <p className={`${higherColor(buyers[assignment[0]].produce[pIndex].supply_limit + farmers[assignment[1]].produce[pIndex].supply, buyers[assignment[0]].produce[pIndex].supply_limit)} p-1 rounded-lg font-bold w-fit`}><span className='font-bold '>Buyer New Supply:</span> {buyers[assignment[0]].produce[pIndex].supply_limit + farmers[assignment[1]].produce[pIndex].supply} kg</p>
                        </div>
                      ))
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))
        }
      </div>
    </>
  );
}

export default AssignmentPanel;