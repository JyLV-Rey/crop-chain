import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PriorityConfidenceChart({ global, farmers, bestAssignment }) {
  const produceList = global.produce;

  const deliveryByProduce = new Array(produceList.length).fill(0);
  const supplyByProduce = new Array(produceList.length).fill(0);

  bestAssignment.bestAssignment.forEach(([farmerIndex]) => {
    const farmer = farmers[farmerIndex];
    farmer.produce.forEach((prod, index) => {
      const supply = parseFloat(prod.supply || 0);
      deliveryByProduce[index] += supply;
    });
  });

  farmers.forEach((farmer) => {
    farmer.produce.forEach((prod, index) => {
      supplyByProduce[index] += parseFloat(prod.supply || 0);
    });
  });

  // Normalize raw priority: higher number = more important
  const rawPriorities = produceList.map(p => p.priority);
  const maxPriority = Math.max(...rawPriorities);
  const minPriority = Math.min(...rawPriorities);
  const normalizedPriority = rawPriorities.map(p =>
    (p - minPriority) / (maxPriority - minPriority || 1)
  );

  // Normalize delivery
  const maxDelivery = Math.max(...deliveryByProduce) || 1;
  const normalizedDelivery = deliveryByProduce.map(d => d / maxDelivery);

  // Confidence = similarity between normalized delivery and normalized priority
  const confidenceScores = normalizedDelivery.map((d, i) =>
    1 - Math.abs(d - normalizedPriority[i])
  );

  const avgConfidence =
    confidenceScores.reduce((sum, val) => sum + val, 0) / confidenceScores.length;

  const chartData = {
    labels: produceList.map(p => p.type),
    datasets: [
      {
        label: 'Delivered (kg)',
        data: deliveryByProduce,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        yAxisID: 'y',
      },
      {
        label: 'Priority (normalized)',
        data: normalizedPriority,
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        yAxisID: 'y1',
      },
      {
        label: 'Confidence Score',
        data: confidenceScores.map(c => c * 100),
        backgroundColor: 'rgba(234, 179, 8, 0.6)',
        yAxisID: 'y2',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Priority vs Delivery vs Confidence',
      },
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Delivered (kg)' },
      },
      y1: {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Priority (normalized)' },
        min: 0,
        max: 1,
      },
      y2: {
        type: 'linear',
        position: 'right',
        offset: true,
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Confidence (%)' },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-neutral-100 rounded-lg p-6 mt-6 w-full">
      <p className="text-center text-amber-600 text-2xl font-extrabold mb-2">
        Confidence Score by Produce
      </p>
      <p className="text-center text-amber-600 text-3xl font-extrabold">
        {`${(avgConfidence * 100).toFixed(2)}%`}
      </p>
      <p className="text-center text-neutral-600 text-sm mb-4">
        This chart compares delivery performance with the normalized importance of each produce.
        Higher confidence means delivery closely aligns with priority.
      </p>

      <Bar data={chartData} options={options} />

      <p className="mt-4 text-center text-neutral-500 text-sm">
        Blue = delivery (kg), Green = normalized priority (0–1), Yellow = confidence score (%)
      </p>
      <p className="mt-2 text-center text-neutral-500 text-xs">
        Confidence = <code>1 - |normalized delivery - normalized priority|</code><br />
        Higher priority values mean more important. Delivery is expected to align with priority.
      </p>
    </div>
  );
}

export default PriorityConfidenceChart;
