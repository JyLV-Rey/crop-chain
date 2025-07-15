import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BuyerSaturationStats({ buyers, farmers, bestAssignment, global, bestUndersupplyAssignment }) {
  // Compute how fulfilled each buyer is
const computeSaturation = (assignment) => {
  const buyerTotals = buyers.map(() => global.produce.map(() => 0));

  assignment.forEach(([f, b]) => {
    const farmer = farmers[f];
    farmer.produce.forEach((produce, i) => {
      buyerTotals[b][i] += produce.supply;
    });
  });

  return buyers.map((buyer, bIndex) => {
    const totalNeeded = buyer.produce.reduce((sum, p) => sum + p.supply_limit, 0);
    const totalFulfilled = buyer.produce.reduce((sum, p, i) => {
      return sum + Math.min(buyerTotals[bIndex][i], p.supply_limit);
    }, 0);

    return Math.min((totalFulfilled / totalNeeded) * 100, 100);
  });
};



  const currentSaturation = computeSaturation(bestAssignment.bestAssignment);
  const bestSaturation = computeSaturation(bestUndersupplyAssignment.bestAssignment);

  const totalCurrent = currentSaturation.reduce((a, b) => a + b, 0);
  const totalBest = bestSaturation.reduce((a, b) => a + b, 0);

  const averageCurrent = (totalCurrent / buyers.length).toFixed(2);
  const averageBest = (totalBest / buyers.length).toFixed(2);
  const improvement = (averageBest - averageCurrent).toFixed(2);
  const diffTotal = (totalBest - totalCurrent).toFixed(2);

  const data = {
    labels: buyers.map((b) => b.store_name),
    datasets: [
      {
        label: "Current Assignment (You)",
        data: currentSaturation,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Optimal Assignment (Min Undersupply)",
        data: bestSaturation,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "Buyer Need Fulfillment (%)" },
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row mt-6 gap-4 w-full">
      <div className="text-lg bg-neutral-100 p-4 rounded-lg w-full md:w-1/2">
        <p className="font-bold text-2xl mb-2">Buyer Saturation Metrics</p>

        <p>
          <span className="font-bold">Current Average Buyer Fulfillment:</span> {averageCurrent}%
        </p>
        <p className="text-sm mb-2">
          This is the average percentage of how much each buyer's needs are currently met,
          based on the actual assignment.
        </p>

        <p>
          <span className="font-bold">Best Average Buyer Fulfillment:</span> {averageBest}%
        </p>
        <p className="text-sm mb-2">
          The theoretical average fulfillment if the algorithm perfectly minimized undersupply across all buyers.
        </p>

        <p>
          <span className="font-bold">Average % Improvement:</span> {improvement}%
        </p>
        <p className="text-sm mb-2">
          This shows how much better the best case is on average compared to the current assignment in percentage points.
        </p>

        <p>
          <span className="font-bold">Total Buyer Fulfillment:</span> {totalCurrent.toFixed(2)}% →{" "}
          {totalBest.toFixed(2)}%
        </p>
        <p className="text-sm mb-2">
          A total summation of all buyer fulfillments from the current to best-case scenario,
          for an overall distribution picture.
        </p>

        <p>
          <span className="font-bold">Total % Improvement:</span> {diffTotal}%
        </p>
        <p className="text-sm">
          The cumulative improvement possible across all buyers if the assignment prioritized minimizing undersupply.
        </p>
      </div>

      <div className="w-full md:w-1/2">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default BuyerSaturationStats;
