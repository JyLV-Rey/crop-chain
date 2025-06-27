import DisplayRoute from "../components/DisplayRoute";
import ProduceStatistics from "./ProduceStatistics";
import AggregateProduceStatistics from "./AggregateProduceStatistics";

function AssignmentPanel({ farmers, buyers, distanceMatrix, global, bestAssignment, costMatrix }) {
  return (
    <div className="flex flex-col flex-wrap justify-around gap-4 mt-10">
      {bestAssignment.bestAssignment?.map((assignment, index) => {
        const [farmerIndex, buyerIndex] = assignment;
        const farmer = farmers[farmerIndex];
        const buyer = buyers[buyerIndex];
        const route = distanceMatrix[farmerIndex][buyerIndex];

        return (
          <div
            key={index}
            className="flex flex-col w-full text-sm justify-between p-5 rounded-lg shadow-xl/8 bg-neutral-100 text-neutral-800 font-medium"
          >
            <p className="text-3xl font-extrabold text-center">Assignment {index + 1}</p>
            <p className="font-bold text-center">
              {farmer.farm_name}
              <span className="font-medium"> delivers to </span>
              {buyer.store_name}
            </p>

            <div className="flex flex-row w-full justify-between gap-2">
              {/* Produce Statistics */}
              <div className="flex flex-col justify-between w-1/4 h-auto shadow-xl/10 p-2 rounded-xl">
                <p className="font-bold text-xl">Produce Statistics</p>
                <ProduceStatistics
                  produceList={global.produce}
                  farmer={farmer}
                  buyer={buyer}
                />
              </div>

              {/* Routes & Location */}
              <div className="flex flex-col flex-grow shadow-xl/10 p-2 rounded-xl">
                <p className="font-bold text-xl">Routes and Location</p>
                <DisplayRoute
                  buyer={buyer}
                  farmer={farmer}
                  route={route}
                />

                <div className="flex flex-col p-2 gap-1 text-xs">
                  <p className="text-xl">
                    <span className="font-bold">Distance:</span> {route.distance} km
                  </p>
                  <p className="text-xl mb-2">
                    <span className="font-bold">Estimated Travel Duration:</span>{" "}
                    {(route.time / 60).toFixed(2)} min
                  </p>

                  <p className="font-bold text-xl">Origin (Farmer):</p>
                  <p><span className="font-bold">Farmer Name:</span> {farmer.farm_name}</p>
                  <p><span className="font-bold">Location:</span> {farmer.location.latitude.toFixed(4)}, {farmer.location.longitude.toFixed(4)}</p>
                  <p><span className="font-bold">Address:</span> {route.farmer_location_name}</p>

                  <p className="font-bold text-xl">Destination (Buyer):</p>
                  <p><span className="font-bold">Buyer Name:</span> {buyer.store_name}</p>
                  <p><span className="font-bold">Location:</span> {buyer.location.latitude.toFixed(4)}, {buyer.location.longitude.toFixed(4)}</p>
                  <p><span className="font-bold">Address:</span> {route.buyer_location_name}</p>
                </div>
              </div>

              {/* Directions + Aggregated Stats */}
              <div className="flex flex-col justify-between gap-1 text-xs w-1/4 shadow-xl/10 p-2 rounded-xl">
                <p className="font-bold text-xl">Directions</p>
                <div className="flex flex-col gap-1 self-start items-start h-full">
                  {route.maneuvers?.map((maneuver, idx) => (
                    <p key={idx}>
                      {idx + 1}. {maneuver.instruction} {maneuver.verbal_post_transition_instruction}
                    </p>
                  ))}
                </div>
                <AggregateProduceStatistics
                  produceList={global.produce}
                  farmer={farmer}
                  buyer={buyer}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AssignmentPanel;
