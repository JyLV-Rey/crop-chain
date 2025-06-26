import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Helper: generate a color from green to red based on normalized value
function getColor(value) {
  const r = Math.floor(255 * value);
  const g = Math.floor(255 * (1 - value));
  return `rgba(${r}, ${g}, 0, 0.8)`;
}

function HeatmapChart({ farmers, buyers, finalCostMatrix }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!finalCostMatrix || finalCostMatrix.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    const flat = finalCostMatrix.flat();
    const maxCost = Math.max(...flat);
    const minCost = Math.min(...flat);

    const datasets = buyers.map((buyer, j) => ({
      label: buyer,
      data: finalCostMatrix.map((row) => row[j]),
      backgroundColor: finalCostMatrix.map((row) => {
        const value = (row[j] - minCost) / (maxCost - minCost);
        return getColor(value);
      }),
      borderWidth: 1,
    }));

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: farmers,
        datasets,
      },
      options: {
        responsive: true,
        indexAxis: "y",
        scales: {
          x: {
            title: {
              display: true,
              text: "Total Cost (lower = better)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Farmers",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Heatmap: Farmer–Buyer Total Cost Matrix",
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `Buyer ${ctx.dataset.label}: Cost = ${ctx.raw.toFixed(2)}`,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [farmers, buyers, finalCostMatrix]);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default HeatmapChart;
