import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";
import { BetweenVerticalStart } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement);

function ParamChart({ buyers, farmers, currentAssignment, bestAssignment, matrix }) {

  const farmer_names = farmers.map((farmer, index) => `${farmer.farm_name} to ${buyers[index].store_name}`);


  const current_data = currentAssignment.bestAssignment.map(([f_index, b_index]) => matrix[f_index][b_index].distance);
  const best_data = bestAssignment.bestAssignment.map(([f_index, b_index]) => matrix[f_index][b_index].distance);

  const data = {
    labels: farmer_names,
    datasets: [
      {
        label: "Best Assignment by Distance",
        data: best_data,
        backgroundColor: "rgba(209, 255, 236, 0.87)",
        borderColor: "rgba(1, 255, 149, 0.87)",
        pointRadius: 4,
        borderWidth: 1,
      },
      {
        label: "Current Assignment",
        data: current_data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointRadius: 4,
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
        max: 100,
        title: { display: true, text: "Fulfillment (%)" },
      },
    },
  };


  return (
    <Bar data={data} options={options} />
  );
}

export default ParamChart;
