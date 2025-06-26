import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

function GroupedBarChart({ farmers, buyers, finalCostMatrix, bestAssignment }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (!finalCostMatrix || finalCostMatrix.length === 0 || !farmers || !buyers) return

    const ctx = chartRef.current?.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Prepare data for grouped bar chart
    const datasets = []
    const farmerNames = farmers.map((farmer) => farmer.farm_name || "Unknown Farm")

    // Get assignment mapping for highlighting
    const assignmentMap = new Map()
    if (bestAssignment && bestAssignment.bestAssignment) {
      bestAssignment.bestAssignment.forEach(([farmerIdx, buyerIdx]) => {
        assignmentMap.set(farmerIdx, buyerIdx)
      })
    }

    // Create a dataset for each buyer
    buyers.forEach((buyer, buyerIndex) => {
      const data = finalCostMatrix.map((row) => row[buyerIndex])

      datasets.push({
        label: buyer.store_name || `Buyer ${buyerIndex}`,
        data: data,
        backgroundColor: farmers.map((_, farmerIndex) => {
          // Highlight assigned pairs
          const isAssigned = assignmentMap.get(farmerIndex) === buyerIndex
          if (isAssigned) {
            return `rgba(34, 197, 94, 0.8)` // Green for assigned
          }
          return `rgba(59, 130, 246, 0.6)` // Blue for unassigned
        }),
        borderColor: farmers.map((_, farmerIndex) => {
          const isAssigned = assignmentMap.get(farmerIndex) === buyerIndex
          if (isAssigned) {
            return `rgba(34, 197, 94, 1)`
          }
          return `rgba(59, 130, 246, 1)`
        }),
        borderWidth: farmers.map((_, farmerIndex) => {
          const isAssigned = assignmentMap.get(farmerIndex) === buyerIndex
          return isAssigned ? 3 : 1
        }),
      })
    })

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: farmerNames,
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Per-Farmer Assignment Cost Comparison",
            font: {
              size: 16,
              weight: "bold",
            },
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              generateLabels: (chart) => {
                const original = Chart.defaults.plugins.legend.labels.generateLabels(chart)
                // Add custom legend items for assignment indication
                original.push({
                  text: "Assigned Pair",
                  fillStyle: "rgba(34, 197, 94, 0.8)",
                  strokeStyle: "rgba(34, 197, 94, 1)",
                  lineWidth: 3,
                })
                return original
              },
            },
          },
          tooltip: {
            callbacks: {
              title: (context) => {
                const farmerIndex = context[0].dataIndex
                return farmers[farmerIndex]?.farm_name || `Farmer ${farmerIndex}`
              },
              label: (context) => {
                const cost = context.parsed.y.toFixed(2)
                const buyerName = context.dataset.label
                const farmerIndex = context.dataIndex
                const buyerIndex = buyers.findIndex((b) => (b.store_name || `Buyer ${buyers.indexOf(b)}`) === buyerName)
                const isAssigned = assignmentMap.get(farmerIndex) === buyerIndex

                return [`${buyerName}: ${cost}`, isAssigned ? "ASSIGNED" : ""].filter(Boolean)
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Farmers",
              font: {
                weight: "bold",
              },
            },
            ticks: {
              maxRotation: 45,
              minRotation: 0,
            },
          },
          y: {
            title: {
              display: true,
              text: "Assignment Cost",
              font: {
                weight: "bold",
              },
            },
            beginAtZero: true,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [finalCostMatrix, farmers, buyers, bestAssignment])

  if (!finalCostMatrix || finalCostMatrix.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300">
        <p className="text-neutral-500 font-medium">Loading cost comparison chart...</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg h-[500px] flex flex-col">
      <div className="flex-1">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-4 text-sm text-neutral-600">
        <p>
          <strong>Purpose:</strong> Shows assignment cost for each farmer to all buyers
        </p>
        <p>
          <strong>Green bars:</strong> Optimal assignments chosen by the algorithm
        </p>
        <p>
          <strong>Blue bars:</strong> Alternative (non-optimal) assignments
        </p>
      </div>
    </div>
  )
}

export default GroupedBarChart