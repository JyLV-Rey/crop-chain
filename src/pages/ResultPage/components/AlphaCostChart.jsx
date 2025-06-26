// AlphaCostChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AlphaCostChart = () => {
  const data = {
    labels: [0, 0.5, 1, 1.5, 2],
    datasets: [
      {
        label: 'Banana',
        data: [1200, 950, 820, 770, 750],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Mango',
        data: [1500, 1100, 980, 890, 860],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: false
      },
      {
        label: 'Tomato',
        data: [1300, 1050, 900, 840, 810],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Effect of α (Farmer Supply Influence) on Total Cost',
        font: {
          size: 18
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'top'
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'α (Alpha) Value'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Assignment Cost'
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mb-8">
      <h2 className="text-2xl font-bold text-neutral-800 mb-2">
        Alpha Parameter vs Total Assignment Cost
      </h2>
      <p className="text-left text-gray-700 mb-4">
        This line chart illustrates how changing the α (alpha) parameter, which controls the influence of farmer supply in the assignment algorithm, affects the total assignment cost for each crop. Lower costs indicate more optimal assignments as α changes.
      </p>
      <Line data={data} options={options} />
    </div>
  );
};

export default AlphaCostChart;
