import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function PriorityUtilizationChart({ farmers, buyers, bestAssignment, global }) {
  if (!bestAssignment?.bestAssignment || !global?.produce) return null;

  const produceList = global.produce;
  const numProduceTypes = produceList.length;

  const deliveryByProduce = Array(numProduceTypes).fill(0);
  let totalDelivered = 0;
  let weightedDelivered = 0;

  const priorities = produceList.map(p => p.priority);
  const maxPriority = Math.max(...priorities);
  const minPriority = Math.min(...priorities);
  const priorityRange = maxPriority - minPriority || 1; // Avoid division by zero

  // Normalized priority emphasis: higher value = higher emphasis
  const priorityEmphasis = priorities.map(p => 1 - (p - minPriority) / priorityRange);

  // Compute delivery and weighted delivery
  bestAssignment.bestAssignment.forEach(([farmerIndex, buyerIndex]) => {
    const farmer = farmers[farmerIndex];

    farmer.produce.forEach((item, pIndex) => {
      const supply = parseFloat(item.supply) || 0;
      deliveryByProduce[pIndex] += supply;
      totalDelivered += supply;

      const weight = priorityEmphasis[pIndex];
      weightedDelivered += supply * weight;
    });
  });

  const priorityScore =
    totalDelivered > 0 ? (weightedDelivered / totalDelivered) * 100 : 0;

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Delivered (kg)"
        },
        position: "left"
      },
      y1: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Priority Emphasis"
        },
        position: "right",
        grid: {
          drawOnChartArea: false
        },
        min: 0,
        max: 1
      }
    }
  };

  const chartData = {
    labels: produceList.map((p) => p.type),
    datasets: [
      {
        label: "Delivered (kg)",
        data: deliveryByProduce,
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "rgba(99, 102, 241, 1)",
        yAxisID: "y"
      },
      {
        label: "Priority Emphasis",
        data: priorityEmphasis,
        backgroundColor: "rgba(16, 185, 129, 0.4)",
        borderColor: "rgba(16, 185, 129, 1)",
        yAxisID: "y1"
      }
    ]
  };

  return (
    <div className="bg-neutral-100 rounded-lg p-6 mt-6 w-full">
      <h2 className="text-2xl font-bold text-blue-500 text-center mb-2">
        Priority Utilization Score
      </h2>
      <p className="text-center text-blue-600 text-3xl font-extrabold mb-2">
        {priorityScore.toFixed(2)}%
      </p>
      <p className="text-center text-neutral-600 text-sm mb-4">
        This score reflects how much of the delivered produce leaned toward
        high-priority types. The amount delivered (purple) is compared to its priority emphasis (green).
      </p>

      <Bar data={chartData} options={chartOptions} />

      <p className="mt-4 text-center text-neutral-500 text-sm">
        Each produce bar shows delivery volume (purple) and its assigned priority
        emphasis (green), where 1 = most important.
      </p>
      <p className="mt-2 text-center text-neutral-500 text-xs">
        The priority utilization score is calculated by comparing how much produce was delivered
        (in kilograms) and how important that produce is. Each type of produce is given a priority level, 
        which is normalized so that the most important types get a higher weight. The score increases
        when more important produce gets delivered.
      </p>
    </div>
  );
}

export default PriorityUtilizationChart;
