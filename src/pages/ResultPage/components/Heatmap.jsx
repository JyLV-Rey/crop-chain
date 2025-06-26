import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Helper: generate a color from green to red based on value [0, 1]
function getColor(value) {
  const r = Math.floor(255 * value);
  const g = Math.floor(255 * (1 - value));
  return `rgba(${r}, ${g}, 0, 0.8)`;
}

function HeatmapChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // FARMERS
    const farmers = ["Maria", "Carlos", "Elena", "Ricardo", "Luz"];
    const farmerProduce = [
      [150, 230, 180, 275, 210],
      [195, 165, 300, 215, 130],
      [220, 140, 190, 260, 155],
      [175, 290, 200, 185, 250],
      [120, 260, 240, 160, 300]
    ];

    // BUYERS (e.g., Alfredo, Bianca, etc.)
    const buyers = ["Alfredo", "Bianca", "Carlo", "Diana", "Elias"];
    const buyerStock = [
      [412, 289, 590, 401, 128],
      [330, 57, 449, 212, 574],
      [305, 77, 140, 579, 475],
      [300, 209, 487, 73, 142],
      [499, 551, 122, 595, 10]
    ];
    const buyerMax = [
      [570, 520, 595, 535, 560],
      [590, 505, 550, 600, 580],
      [560, 540, 525, 580, 590],
      [600, 510, 545, 530, 570],
      [525, 585, 500, 595, 515]
    ];

    // Distance matrix: farmer i to buyer j
    const distances = [
      [4.873, 8.378, 3.221, 1.965, 4.346],
      [8.338, 2.996, 7.931, 10.933, 8.18],
      [1.338, 6.816, 4.196, 5.537, 2.164],
      [4.527, 7.744, 1.198, 3.32, 6.208],
      [2.004, 7.483, 4.862, 6.204, 2.831]
    ];

    const α = 1;
    const δ = 1;
    const fruitCount = 5;

    // Build cost matrix: [farmer][buyer]
    const costMatrix = farmerProduce.map((produce, i) =>
      buyerStock.map((stock, j) => {
        let total = 0;
        for (let f = 0; f < fruitCount; f++) {
          const d = distances[i][j];
          const bjf = stock[f];
          const bmax = buyerMax[j][f];
          const sif = produce[f];
          const cijf = (d * (1 + δ * (bjf / bmax))) / Math.pow(sif, α);
          total += (1 / fruitCount) * cijf;
        }
        return total;
      })
    );

    // Find max cost for color scaling
    const flat = costMatrix.flat();
    const maxCost = Math.max(...flat);
    const minCost = Math.min(...flat);

    const datasets = buyers.map((buyer, j) => ({
      label: buyer,
      data: costMatrix.map((row) => row[j]),
      backgroundColor: costMatrix.map((row) => {
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
            text: "Heatmap: Farmer-Buyer Total Cost Matrix",
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
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default HeatmapChart;
