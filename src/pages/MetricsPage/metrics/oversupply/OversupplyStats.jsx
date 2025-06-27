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

function BuyerSaturationStats({ buyers, farmers, bestAssignment, bestUndersupplyAssignment }) {
  // Compute how fulfilled each buyer is
  const computeSaturation = (assignment) => {
    const buyerTotals = buyers.map(() => 0);
    assignment.bestAssignment.forEach(([f, b]) => {
      const farmer = farmers[f];
      farmer.produce.forEach((produce) => {
        buyerTotals[b] += produce.supply;
      });
    });

    return buyers.map((buyer, i) => {
      const totalNeeded = buyer.produce.reduce((acc, p) => acc + p.supply_limit, 0);
      const fulfilled = buyerTotals[i];
      return Math.min((fulfilled / totalNeeded) * 100, 100); // Cap at 100%
    });
  };

  // Map each buyer to the assigned farmer name
  const getFarmerNamesFromAssignments = (assignment) => {
    const names = buyers.map(() => "Unassigned");
    assignment.bestAssignment.forEach(([farmerIndex, buyerIndex]) => {
      names[buyerIndex] = farmers[farmerIndex].farm_name;
    });
    return names;
  };

  const currentSaturation = computeSaturation(bestAssignment);
  const bestSaturation = computeSaturation(bestUndersupplyAssignment);

  const currentFarmerNames = getFarmerNamesFromAssignments(bestAssignment);
  const bestFarmerNames = getFarmerNamesFromAssignments(bestUndersupplyAssignment);

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
        label: "Optimal Assignment (Min. Undersupply)",
        data: bestSaturation,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        datalabels: {
          display: true,
          formatter: (_, context) => bestFarmerNames[context.dataIndex],
        },
      },
      {
        label: "Current Assignment (You)",
        data: currentSaturation,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        datalabels: {
          display: true,
          formatter: (_, context) => currentFarmerNames[context.dataIndex],
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      datalabels: {
        anchor: "end",
        align: "top",
        font: {
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const buyerIndex = context.dataIndex;
            const datasetLabel = context.dataset.label;
            const farmerName = datasetLabel.includes("Optimal")
              ? bestFarmerNames[buyerIndex]
              : currentFarmerNames[buyerIndex];
            return `${datasetLabel}: ${context.parsed.y.toFixed(2)}% (Farmer: ${farmerName})`;
          },
        },
      },
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
    <div className="flex flex-row mt-6 gap-4 w-full">
      <div className="text-lg bg-neutral-100 p-4 rounded-lg w-1/2">
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

      <div className="w-1/2">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default BuyerSaturationStats;
