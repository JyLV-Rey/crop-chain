import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

const FrancesGraph = () => {
  const farmers = ['Maria', 'Carlos', 'Elena', 'Ricardo', 'Luz'];
  const capacities = [100, 80, 120, 90, 110];
  const usedSupply = [90, 70, 110, 85, 20];

  const utilization = usedSupply.map((used, i) =>
    ((used / capacities[i]) * 100).toFixed(1)
  );

  const data = {
    labels: farmers,
    datasets: [
      {
        label: '% Supply Used',
        data: utilization,
        backgroundColor: utilization.map((val) =>
          val > 90
            ? 'rgba(34,197,94,0.7)'
            : val > 75
            ? 'rgba(251,191,36,0.7)'
            : 'rgba(239,68,68,0.7)'
        ),
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Farmer Supply Distribution (%)',
        font: { size: 18, family: 'sans-serif' },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw}% sold`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Utilization (%)',
          font: { family: 'sans-serif' },
        },
        ticks: {
          font: { family: 'sans-serif' },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Farmers',
          font: { family: 'sans-serif' },
        },
        ticks: {
          font: { family: 'sans-serif' },
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
      }}
    >
      <Bar data={data} options={options} />

      {/* Custom Legend */}
      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          backgroundColor: '#f9fafb',
          padding: '1rem',
          borderRadius: '8px',
          color: '#1f2937',
          fontWeight: 500,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'rgba(34,197,94,0.7)',
              marginRight: 8,
              borderRadius: 4,
            }}
          />
          <span>High Utilization &gt; 90%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'rgba(251,191,36,0.7)',
              marginRight: 8,
              borderRadius: 4,
            }}
          />
          <span>Moderate 75%-90%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'rgba(239,68,68,0.7)',
              marginRight: 8,
              borderRadius: 4,
            }}
          />
          <span>Low ≤ 75%</span>
        </div>
      </div>
    </div>
  );
};

export default FrancesGraph;
