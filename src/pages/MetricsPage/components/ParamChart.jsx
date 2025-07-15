import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement);

function ParamChart({ buyers, farmers, currentAssignment, bestAssignment, matrix }) {
  const extractDistances = (assignment) => {
    return assignment.bestAssignment.map(([f_index, b_index]) => {
      return matrix[f_index][b_index].distance;
    });
  };

  const current_data = extractDistances(currentAssignment);
  const best_data = extractDistances(bestAssignment);

  console.log({current_data, best_data});
  const maxValue = Math.max(...current_data.concat(best_data));
  const dynamicMax = Math.ceil(maxValue + 50);

  const data = {
    labels: current_data.map((_, index) => `Pair ${index + 1}`),
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
