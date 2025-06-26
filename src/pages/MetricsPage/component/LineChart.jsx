import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import costMatrix from "../../../algorithms/CostMatrixComputation"
import assignProblemSolver from "../../../algorithms/assignmentProblem"

function LineChart({ farmers, buyers, distanceMatrix, global }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [parameterType, setParameterType] = useState("penalty_distance")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!farmers || !buyers || !distanceMatrix || farmers.length === 0 || buyers.length === 0) return

    generateLineChart()
  }, [farmers, buyers, distanceMatrix, global, parameterType])

  const generateLineChart = async () => {
    setIsLoading(true)
    const ctx = chartRef.current?.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Generate data points by varying the selected parameter
    const dataPoints = []
    const parameterValues = []

    // Define parameter ranges
    const ranges = {
      penalty_distance: { min: 0.5, max: 3.0, step: 0.25 },
      penalty_oversupply_buyer: { min: 0.5, max: 3.0, step: 0.25 },
      penalty_undersupply_farmer: { min: 0.5, max: 3.0, step: 0.25 },
    }

    const range = ranges[parameterType]

    for (let value = range.min; value <= range.max; value += range.step) {
      // Create modified global config
      const modifiedGlobal = {
        ...global,
        [parameterType]: value,
      }

      // Calculate cost matrix with modified parameter
      const matrix = costMatrix(farmers, buyers, distanceMatrix, modifiedGlobal)

      // Solve assignment problem
      const result = assignProblemSolver(matrix)

      parameterValues.push(value)
      dataPoints.push(result.minCost)
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: parameterValues,
        datasets: [
          {
            label: "Total Assignment Cost",
            data: dataPoints,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "rgb(59, 130, 246)",
            pointBorderColor: "white",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Total Assignment Cost vs. ${parameterType.replace(/_/g, " ").toUpperCase()}`,
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Cost: ${context.parsed.y.toFixed(2)}`
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: parameterType.replace(/_/g, " ").toUpperCase(),
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Assignment Cost",
              font: {
                weight: "bold",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    })

    setIsLoading(false)
  }

  if (!farmers || !buyers || farmers.length === 0 || buyers.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300">
        <p className="text-neutral-500 font-medium">Loading parameter sensitivity chart...</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg h-[500px] flex flex-col">
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-700 mb-2">Select Parameter to Analyze:</label>
        <select
          value={parameterType}
          onChange={(e) => setParameterType(e.target.value)}
          className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="penalty_distance">Distance Penalty (α)</option>
          <option value="penalty_oversupply_buyer">Oversupply Penalty (δ)</option>
          <option value="penalty_undersupply_farmer">Undersupply Penalty</option>
        </select>
      </div>

      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-blue-600 font-medium">Calculating sensitivity...</div>
          </div>
        )}
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-4 text-sm text-neutral-600">
        <p>
          <strong>Purpose:</strong> Shows how total assignment cost changes with parameter values
        </p>
        <p>
          <strong>Use:</strong> Helps optimize parameter settings for better assignments
        </p>
      </div>
    </div>
  )
}

export default LineChart