import ProduceStatistics from "./ProduceStatistics";

export default function EachProduce( {farmers, buyers, global, currentAssignment} ) {
  return(
    <>
        { currentAssignment.bestAssignment != undefined && currentAssignment.bestAssignment.map((assignment, index) => (

              <div className="flex flex-col justify-between h-auto shadow-xl/10 p-5 text-xl items-center rounded-xl">
                <p className="text-2xl text-blue-800 text-center bg-blue-200 p-2 w-fit rounded-lg"><span className="font-bold ">{buyers[assignment[1]].store_name}</span> to <span className="font-bold">{farmers[assignment[0]].farm_name}</span></p>
                <ProduceStatistics farmers={farmers} buyers={buyers} produceList={global.produce} farmer={farmers[assignment[0]]} buyer={buyers[assignment[1]]} buyerIndex={assignment[1]} farmerIndex={assignment[0]} />
              </div>
        ))}
    </>
  );
}