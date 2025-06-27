import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement);

function ParamChart({ buyers, farmers, currentAssignment, bestAssignment, matrix }) {
  // Build label→value maps
  const labelDistanceMap = (assignment) =>
    assignment.bestAssignment.reduce((acc, [f_index, b_index]) => {
      const label = `${farmers[f_index].farm_name} → ${buyers[b_index].store_name}`;
      acc[label] = matrix[f_index][b_index].distance;
      return acc;
    }, {});

  const currentMap = labelDistanceMap(currentAssignment);
  const bestMap = labelDistanceMap(bestAssignment);

  // Unique combined label set
  const labels = Array.from(new Set([...Object.keys(currentMap), ...Object.keys(bestMap)]));

  const current_data = labels.map(label => currentMap[label] ?? 0);
  const best_data = labels.map(label => bestMap[label] ?? 0);

  const maxValue = Math.max(...current_data.concat(best_data));
  const dynamicMax = Math.ceil(maxValue + 50);

  const data = {
    labels,
    datasets: [
      {
        label: "Best Assignment by Distance",
        data: best_data,
        backgroundColor: "rgba(209, 255, 236, 0.87)",
        borderColor: "rgba(1, 255, 149, 0.87)",
        borderWidth: 1,
      },
      {
        label: "Current Assignment",
        data: current_data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: dynamicMax,
        title: { display: true, text: "Distance (km)" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}


export default ParamChart;
