import DisplayRoute from "../components/DisplayRoute";
import ProduceStatistics from "./ProduceStatistics";
import AggregateProduceStatistics from "./AggregateProduceStatistics";

function AssignmentPanel( {farmers, buyers, distanceMatrix, global, bestAssignment, costMatrix } ) {

  return(
    <>
      <div className="flex flex-col flex-wrap justify-around gap-4 mt-10">
        { bestAssignment.bestAssignment != undefined && bestAssignment.bestAssignment.map((assignment, index) => (
          <div key={index} className="flex flex-col w-full text-sm justify-between p-5 rounded-lg shadow-xl/8 bg-neutral-100 text-neutral-800 font-medium ">
            <p className="text-3xl font-extrabold text-center">Assignment {index + 1}</p>
            <p className="font-bold text-center">{farmers[assignment[0]].farm_name} <span className="font-medium"> delivers to </span>{buyers[assignment[1]].store_name}</p>

            <div className="flex flex-row w-full justify-between gap-2">

              <div className="flex flex-col justify-between w-1/4 h-auto shadow-xl/10 p-2 rounded-xl">
                <p className="font-bold text-xl">Produce Statistics</p>
                <ProduceStatistics produceList={global.produce} farmer={farmers[assignment[0]]} buyer={buyers[assignment[1]]} />
              </div>

              <div className="flex flex-col flex-grow shadow-xl/10 p-2 rounded-xl">
                  <p className="font-bold text-xl">Routes and Location</p>
                  <DisplayRoute buyer={buyers[assignment[1]]} farmer={farmers[assignment[0]]} route={distanceMatrix[assignment[0]][assignment[1]]}/>

                  <div className='flex flex-col p-2 gap-1 text-xs'>

                    <p className="text-xl"><span className='font-bold'>Distance:</span> {distanceMatrix[assignment[0]][assignment[1]].distance}km</p>
                    <p className="text-xl mb-2"><span className='font-bold'>Estimate Travel Duration:</span> {(distanceMatrix[assignment[0]][assignment[1]].time/60).toFixed(2)}min</p>

                    <p className="font-bold text-xl">Destination:</p>
                    <p><span className='font-bold'>Buyer Name:</span> {farmers[assignment[0]].farm_name}</p>
                    <p><span className='font-bold'>Location:</span> {farmers[assignment[0]].location.latitude.toFixed(4)}, {farmers[assignment[0]].location.longitude.toFixed(4)}</p>
                    <p><span className='font-bold'>Address:</span> {distanceMatrix[assignment[0]][assignment[1]].farmer_location_name}</p>

                    <p className="font-bold text-xl">Origin:</p>
                    <p><span className='font-bold'>Buyer Name:</span> {buyers[assignment[1]].store_name}</p>
                    <p><span className='font-bold'>Location:</span> {buyers[assignment[1]].location.latitude.toFixed(4)}, {buyers[assignment[1]].location.longitude.toFixed(4)}</p>
                    <p><span className='font-bold'>Address:</span> {distanceMatrix[assignment[0]][assignment[1]].buyer_location_name}</p>
                  </div>
              </div>

              <div className='flex flex-col justify-between gap-1 text-xs w-1/4 shadow-xl/10 p-2 rounded-xl'>
                  <p className="font-bold text-xl">Directions</p>
                  <div className="flex flex-col gap-1 self-start items-start h-full">
                    {
                      distanceMatrix[assignment[0]][assignment[1]].maneuvers != undefined && distanceMatrix[assignment[0]][assignment[1]].maneuvers.map((maneuver, index) => (
                        <div key={index} >
                          <p>{index + 1}. {maneuver.instruction} {maneuver.verbal_post_transition_instruction}</p>
                        </div>
                      ))
                    }
                  </div>
                  <AggregateProduceStatistics produceList={global.produce} farmer={farmers[assignment[0]]} buyer={buyers[assignment[1]]} />
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