import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ScatterController,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  ScatterController,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Mock data: distance and cost per Farmer → Buyer
const mockData = {
  F1: [
    { buyer: 'B1', distance: 2, cost: 40 },
    { buyer: 'B2', distance: 4, cost: 70 },
    { buyer: 'B3', distance: 6, cost: 110 },
    { buyer: 'B4', distance: 8, cost: 160 }
  ],
  F2: [
    { buyer: 'B1', distance: 3, cost: 50 },
    { buyer: 'B2', distance: 5, cost: 90 },
    { buyer: 'B3', distance: 7, cost: 130 },
    { buyer: 'B4', distance: 9, cost: 170 }
  ],
  F3: [
    { buyer: 'B1', distance: 1, cost: 30 },
    { buyer: 'B2', distance: 4, cost: 65 },
    { buyer: 'B3', distance: 6, cost: 105 },
    { buyer: 'B4', distance: 7, cost: 150 }
  ],
  F4: [
    { buyer: 'B1', distance: 5, cost: 95 },
    { buyer: 'B2', distance: 6, cost: 115 },
    { buyer: 'B3', distance: 8, cost: 140 },
    { buyer: 'B4', distance: 10, cost: 180 }
  ]
};

const DistanceCostScatter = () => {
  const [selectedFarmer, setSelectedFarmer] = useState('F1');

  const chartData = {
    datasets: [
      {
        label: `Farmer ${selectedFarmer} → Buyers`,
        data: mockData[selectedFarmer].map((entry) => ({
          x: entry.distance,
          y: entry.cost,
          buyer: entry.buyer
        })),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Effect of Distance on Assignment Cost (β parameter view)`,
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `To ${ctx.raw.buyer} → Distance: ${ctx.parsed.x} km, Cost: ₱${ctx.parsed.y}`
        }
      },
      legend: { display: false }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Distance (km)'
        },
        beginAtZero: true,
        suggestedMax: 12
      },
      y: {
        title: {
          display: true,
          text: 'Cost Affected by Distance and β (₱)'
        },
        beginAtZero: true,
        suggestedMax: 200
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-neutral-800 mb-4">
        Distance vs Cost per Buyer (Influenced by β)
      </h2>
      <p className="text-left text-gray-700 mb-4">
        This scatter plot visualizes how the assignment cost for each buyer increases with distance from the selected farmer. The β parameter influences how strongly distance affects the cost. Select a farmer to see their cost-to-distance relationship for all buyers.
      </p>
      <label className="block font-medium mb-2 text-gray-700">Select Farmer:</label>
      <select
        value={selectedFarmer}
        onChange={(e) => setSelectedFarmer(e.target.value)}
        className="border border-gray-400 rounded px-3 py-2 mb-6 w-full"
      >
        <option value="F1">Farmer 1</option>
        <option value="F2">Farmer 2</option>
        <option value="F3">Farmer 3</option>
        <option value="F4">Farmer 4</option>
      </select>

      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default DistanceCostScatter;
