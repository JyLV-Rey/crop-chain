import { useEffect, useState } from "react"
import NavBar from "../../features/NavBar"
import getDistanceMatrix from "../../features/Distance"
import { useGlobalData } from "../../default-data/DefaultGlobalData"
import costMatrix from "../../algorithms/CostMatrixComputation"
import assignProblemSolver from "../../algorithms/assignmentProblem"
import data from "../ResultPage/mock-output.json"
import AssignmentSummary from "./components/AssignmentSummary"

function StatsPage() {
  const { farmers, buyers, global } = useGlobalData()

  const [distanceMatrix, setDistanceMatrix] = useState(data.distanceMatrix)
  const [finalCostMatrix, setFinalCostMatrix] = useState(data.finalCostMatrix)
  const [bestAssignment, setBestAssignment] = useState(data.bestAssignment)

  useEffect(() => {
    async function fetchMatrixes() {
      setIsLoading(true)
      try 
      {
        const matrix = await getDistanceMatrix(buyers, farmers)
        setDistanceMatrix(matrix)
      } 
      catch (error) 
      {
        console.error("Error fetching distance matrix:", error)
      } 
      finally 
      {
        setIsLoading(false)
      }
    }

    if (buyers.length > 0 && farmers.length > 0) 
    {
      fetchMatrixes()
    } 
    else 
    {
      setIsLoading(false)
    }
  }, [buyers, farmers])

  useEffect(() => {
    if (distanceMatrix.length > 0) {
      const matrix = costMatrix(farmers, buyers, distanceMatrix, global)
      setFinalCostMatrix(matrix)
    }
  }, [buyers, distanceMatrix, farmers, global])

  useEffect(() => {
    if (finalCostMatrix.length > 0) 
    {
      const assignment = assignProblemSolver(finalCostMatrix)
      setBestAssignment(assignment)
    }
  }, [finalCostMatrix])

  if (bestAssignment.length !== 0) {
    console.log("Distance Matrix", distanceMatrix)
    console.log("Final Cost Matrix", finalCostMatrix)
    console.log("Best Assignment", bestAssignment)
  }

  return (
    <>
      <NavBar />
      <div className="w-full mt-20 p-5">
        <div className="flex flex-col gap-8 text-neutral-700">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-neutral-800 mb-2">Running Statistics & Analysis</h1>
            <p className="text-lg text-neutral-600">
              Real time insights into assignment optimization and parameter sensitivity
            </p>
          </div>

          {/* Assignment Summary */}
          <AssignmentSummary
            bestAssignment={bestAssignment}
            farmers={farmers}
            buyers={buyers}
            finalCostMatrix={finalCostMatrix}
          />
        </div>
      </div>
    </>
  )
}

export default StatsPage
