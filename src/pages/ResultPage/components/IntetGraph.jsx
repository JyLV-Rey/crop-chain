import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const deliveriesPerFruit = {
  Mango: [10, 15, 12, 20, 10],
  Corn: [4, 9, 8, 12, 6]
};

const costBreakdownPerFruit = {
  Mango: [3.4, 4.2, 2.1, 5.5, 2.7],
  Corn: [1.8, 2.5, 2.0, 3.8, 1.9]
};

const assignedFarmers = {
  Mango: ['Carlos', 'Carlos', 'Elena', 'Ricardo', 'Luz'],
  Corn: ['Elena', 'Carlos', 'Carlos', 'Ricardo', 'Luz']
};

const possibleDeliveries = {
  Mango: [
    [10, 5, 0, 8, 7],  // Maria
    [0, 15, 10, 0, 0], // Carlos
    [5, 0, 12, 0, 6],  // Elena
    [0, 4, 0, 20, 0],  // Ricardo
    [3, 0, 6, 0, 10]   // Luz
  ],
  Corn: [
    [7, 4, 2, 5, 3],
    [0, 9, 8, 0, 0],
    [4, 0, 5, 0, 2],
    [0, 3, 0, 12, 0],
    [2, 0, 4, 0, 6]
  ]
};

const farmers = ['Maria', 'Carlos', 'Elena', 'Ricardo', 'Luz'];
const buyers = ['Alfredo', 'Bianca', 'Carlo', 'Diana', 'Elias'];

const FruitChart = ({
  fruitName,
  deliveries,
  costs,
  farmersAssigned,
  showPossible
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext('2d');

    if (showPossible) {
      // Stacked Bar Chart of possible deliveries
      const possible = possibleDeliveries[fruitName];
      const datasets = farmers.map((farmer, i) => ({
        label: farmer,
        data: possible[i],
        backgroundColor: `hsl(${i * 60}, 70%, 60%)`
      }));

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: buyers,
          datasets
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Possible Supply Options per Buyer for ${fruitName}`
            },
            tooltip: { mode: 'index', intersect: false },
            legend: { position: 'top' }
          },
          scales: {
            x: { stacked: true, title: { display: true, text: 'Buyers' } },
            y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Quantity (Potential)' } }
          }
        }
      });
    } else {
      // Bar Chart of final cost efficiency
      const costPerUnit = deliveries.map((qty, i) => {
        const cost = costs[i];
        return qty > 0 ? (cost / qty).toFixed(3) : 0;
      });

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: buyers,
          datasets: [
            {
              label: 'Heuristic Cost per Unit Delivered',
              data: costPerUnit,
              backgroundColor: 'rgba(153, 102, 255, 0.7)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Final Assignment: Cost Efficiency per Buyer for ${fruitName}`
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const farmer = farmersAssigned[context.dataIndex];
                  const quantity = deliveries[context.dataIndex];
                  const cost = costs[context.dataIndex];
                  const ratio = context.parsed.y;
                  return `${farmer} → ${quantity} units, Cost: ${cost}, Ratio: ${ratio}`;
                }
              }
            },
            legend: { display: false }
          },
          scales: {
            x: { title: { display: true, text: 'Buyers' } },
            y: { beginAtZero: true, title: { display: true, text: 'Cost / Unit Delivered' } }
          }
        }
      });
    }
  }, [fruitName, deliveries, costs, farmersAssigned, showPossible]);

  return <canvas ref={chartRef}></canvas>;
};

const IntetGraph = () => {
  const fruits = Object.keys(deliveriesPerFruit);
  const [selectedFruit, setSelectedFruit] = useState(fruits[0]);
  const [showPossible, setShowPossible] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fruit Metrics Dashboard</h1>

      <div className="flex items-center gap-4 mb-6">
        <label htmlFor="fruit" className="font-semibold">Select Fruit:</label>
        <select
          id="fruit"
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
          className="p-2 border rounded"
        >
          {fruits.map((fruit) => (
            <option key={fruit} value={fruit}>{fruit}</option>
          ))}
        </select>

        <label className="font-semibold ml-4">
          <input
            type="checkbox"
            checked={showPossible}
            onChange={(e) => setShowPossible(e.target.checked)}
            className="mr-2"
          />
          Show Possible Matches
        </label>
      </div>

      <FruitChart
        fruitName={selectedFruit}
        deliveries={deliveriesPerFruit[selectedFruit]}
        costs={costBreakdownPerFruit[selectedFruit]}
        farmersAssigned={assignedFarmers[selectedFruit]}
        showPossible={showPossible}
      />
    </div>
  );
};

export default IntetGraph;