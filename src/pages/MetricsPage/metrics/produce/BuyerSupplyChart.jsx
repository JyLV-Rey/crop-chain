import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement);

function BuyerSupplyChart({ buyers, farmers, buyerIndex, produceIndex, selectedFarmerIndex }) {

console.log({
  farmers,
  buyers,
  buyerIndex,
  produceIndex,
  selectedFarmerIndex
});
 
  const farmer_names = farmers.map((farmer) => farmer.farm_name);

  const bar_data = farmers.map((farmer) => farmer.produce[produceIndex].supply + buyers[buyerIndex].produce[produceIndex].supply_current);

  const data = {
    labels: farmer_names,
    datasets: [
      {
        label: "Buyer Supply",
        data: bar_data,
        backgroundColor: farmers.map((_, i) => i === selectedFarmerIndex ? "rgba(209, 255, 236, 0.87)" : "rgba(255, 99, 132, 0.2)"),
        borderColor: farmers.map((_, i) => i === selectedFarmerIndex ? "rgba(1, 255, 149, 0.87)" : "rgba(255, 99, 132, 1)"),
        pointRadius: 4,
        borderWidth: 1,
      },
      // line data
      {
        label: "Buyer Supply Limit",
        data: Array(farmers.length).fill(buyers[buyerIndex].produce[produceIndex].supply_limit),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        type: "line",
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
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Produce Amount" },
      },
    },
  };


  return (
    <Bar data={data} options={options} />
  );
}

export default BuyerSupplyChart;
