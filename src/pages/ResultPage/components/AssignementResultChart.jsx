import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

const AssignmentResultChart = () => {
  // Example cost matrix (Farmers × Buyers)
  const farmers = ['F1', 'F2', 'F3'];
  const buyers = ['B1', 'B2', 'B3'];

  const costMatrix = [
    [80, 60, 90], // F1
    [40, 70, 50], // F2
    [90, 65, 55]  // F3
  ];

  // ✅ Simple greedy algorithm (for demonstration)
  const assignedBuyers = [];
  const usedBuyers = new Set();
  let totalCost = 0;

  for (let i = 0; i < costMatrix.length; i++) {
    const row = costMatrix[i];
    let minCost = Infinity;
    let assignedIndex = -1;

    for (let j = 0; j < row.length; j++) {
      if (!usedBuyers.has(j) && row[j] < minCost) {
        minCost = row[j];
        assignedIndex = j;
      }
    }

    assignedBuyers.push({
      farmer: farmers[i],
      buyer: buyers[assignedIndex],
      cost: minCost
    });

    usedBuyers.add(assignedIndex);
    totalCost += minCost;
  }

  // Chart.js data
  const data = {
    labels: assignedBuyers.map((a) => `${a.farmer} → ${a.buyer}`),
    datasets: [
      {
        label: 'Assignment Cost (₱)',
        data: assignedBuyers.map((a) => a.cost),
        backgroundColor: 'rgba(54, 162, 235, 0.8)'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Assignment Result (Total Cost: ₱${totalCost})`,
        font: { size: 18 },
        color: 'black'
      },
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `Cost: ₱${ctx.parsed.y} for ${assignedBuyers[ctx.dataIndex].farmer} → ${assignedBuyers[ctx.dataIndex].buyer}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Assignments',
          color: 'black'
        },
        ticks: { color: 'black' }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (₱)',
          color: 'black'
        },
        ticks: { color: 'black' }
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-neutral-800 mb-2">Farmer-to-Buyer Assignment</h2>
      <p className="text-left text-gray-700 mb-4">
        This bar chart visualizes the assignment of each farmer to a buyer based on the lowest cost using a simple greedy algorithm. Each bar represents the cost of assigning a specific farmer to a buyer, and the total cost is shown in the chart title. This helps illustrate how the algorithm pairs farmers and buyers to minimize overall assignment costs.
      </p>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AssignmentResultChart;
