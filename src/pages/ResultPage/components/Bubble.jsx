import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const crops = ["Cauliflower", "Mango", "Corn", "Banana", "Rice"];

function CropBubbleChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [selectedCrop, setSelectedCrop] = useState("Mango");

  // Fake index mapping
  const cropIndex = {
    Cauliflower: 0,
    Mango: 1,
    Corn: 2,
    Banana: 3,
    Rice: 4,
  };

  useEffect(() => {
    const cropIdx = cropIndex[selectedCrop];

    const farmers = [
      "Maria", "Carlos", "Elena", "Ricardo", "Luz"
    ];

    const buyers = ["Alfredo", "Bianca", "Carlo", "Diana", "Elias"];

    const farmerProduce = [
      [150, 230, 180, 275, 210],
      [195, 165, 300, 215, 130],
      [220, 140, 190, 260, 155],
      [175, 290, 200, 185, 250],
      [120, 260, 240, 160, 300]
    ];

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

    const distances = [
      [4.873, 8.378, 3.221, 1.965, 4.346],
      [8.338, 2.996, 7.931, 10.933, 8.18],
      [1.338, 6.816, 4.196, 5.537, 2.164],
      [4.527, 7.744, 1.198, 3.32, 6.208],
      [2.004, 7.483, 4.862, 6.204, 2.831]
    ];

    const α = 1;
    const δ = 1;

    const bubbleData = [];

    for (let i = 0; i < 5; i++) { // farmers
      for (let j = 0; j < 5; j++) { // buyers
        const d = distances[i][j];
        const sif = farmerProduce[i][cropIdx];
        const bjf = buyerStock[j][cropIdx];
        const bmax = buyerMax[j][cropIdx];
        const cij = (d * (1 + δ * (bjf / bmax))) / Math.pow(sif, α);

        bubbleData.push({
          x: d.toFixed(2),
          y: cij.toFixed(2),
          r: Math.max(5, Math.min(20, sif / 20)),
          farmer: farmers[i],
          buyer: buyers[j],
          cost: cij.toFixed(2),
          distance: d.toFixed(2),
        });
      }
    }

    const dataset = {
      label: `Crop: ${selectedCrop}`,
      data: bubbleData,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
    };

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "bubble",
      data: { datasets: [dataset] },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Cost vs Distance for ${selectedCrop}`,
            font: { size: 18 },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const d = ctx.raw;
                return `Farmer: ${d.farmer}, Buyer: ${d.buyer}\nDistance: ${d.distance} km, Cost: ${d.cost}, Supply: ${Math.round(d.r * 20)}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: { display: true, text: "Distance (km)" },
            beginAtZero: true,
          },
          y: {
            title: { display: true, text: "Calculated Cost" },
            beginAtZero: true,
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [selectedCrop]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.6rem" }}>📈 Cost vs Distance per Crop</h2>
      <select
        value={selectedCrop}
        onChange={(e) => setSelectedCrop(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      >
        {crops.map((crop) => (
          <option key={crop} value={crop}>{crop}</option>
        ))}
      </select>
      <canvas ref={canvasRef} height="400" />
      <p style={{ marginTop: "1rem", maxWidth: "800px" }}>
        This bubble chart shows all possible <strong>farmer–buyer matches</strong> for the selected crop.
        Each bubble represents a match, where:
        <ul>
          <li><strong>X-axis:</strong> Distance (in km)</li>
          <li><strong>Y-axis:</strong> Total calculated cost</li>
          <li><strong>Bubble size:</strong> Farmer's supply amount</li>
        </ul>
        This helps evaluate which pairings offer the most efficient delivery with minimal cost.
      </p>
    </div>
  );
}

export default CropBubbleChart;
