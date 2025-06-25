import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function FarmerRadarChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const radarLabels = [
      "Supply Match %",
      "Distance Efficiency",
      "Priority Alignment",
      "Cost Effectiveness",
      "Oversupply Avoidance",
    ];

    // Mock data (0–100 scale, higher = better)
    const farmerData = [
      {
        label: "Farmer A",
        color: "rgba(255, 99, 132, 0.5)",
        scores: [85, 72, 60, 80, 75],
      },
      {
        label: "Farmer B",
        color: "rgba(54, 162, 235, 0.5)",
        scores: [90, 85, 75, 65, 70],
      },
      {
        label: "Farmer C",
        color: "rgba(255, 206, 86, 0.5)",
        scores: [70, 60, 80, 90, 85],
      },
    ];

    const chart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: radarLabels,
        datasets: farmerData.map((farmer) => ({
          label: farmer.label,
          data: farmer.scores,
          backgroundColor: farmer.color,
          borderColor: farmer.color.replace("0.5", "1"),
          borderWidth: 2,
          pointRadius: 4,
          fill: true,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow custom height
        elements: {
          line: {
            tension: 0.2,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Farmer Matching Performance Overview",
            font: { size: 18 },
          },
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.dataset.label}: ${context.formattedValue}%`,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto", height: "400px" }}>
      <canvas ref={canvasRef} width={700} height={400}></canvas>
    </div>
  );
}

export default FarmerRadarChart;