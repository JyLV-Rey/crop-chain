import FarmerRadarChart from './components/RadarChart';
import HeatmapChart from './components/Heatmap';
import CropBubbleChart from './components/Bubble';

function ResultsPage() {
  return (
    <div style={{ padding: '2rem', color: 'black' }}>
      {/* Radar Chart Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>📊 Match Quality Radar Visualization</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FarmerRadarChart />
        </div>
        <p style={{ marginTop: '1rem', fontSize: '1rem', maxWidth: '800px' }}>
          This radar chart visually compares farmer-buyer matchings across five key criteria:
          <strong> Supply Match %, Distance Efficiency, Oversupply Avoidance, Cost Effectiveness,</strong> and
          <strong> Priority Alignment</strong>.
          Each axis represents one metric, and the closer a shape gets to the outer edge, the better the match performs in that area.
          This allows stakeholders to quickly assess which pairings offer the most balanced and optimal outcomes, helping guide decisions based on multiple dimensions—not just cost.
        </p>
      </section>

      {/* Heatmap Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🌡️ Total Cost Heatmap by Farmer–Buyer Pair</h2>
        <HeatmapChart />
        <p style={{ marginTop: '1rem', fontSize: '1rem', maxWidth: '800px' }}>
          This simulated heatmap shows the <strong>calculated total cost</strong> of assigning each farmer to each buyer,
          based on distance, supply levels, and stock availability.
          Each colored cell represents a unique farmer–buyer pairing, with color intensity indicating the total cost:
          <strong> Greener tones mean lower cost and higher efficiency</strong>, while
          <strong> redder tones indicate more expensive or suboptimal matches</strong>.
          This visualization helps quickly identify the most cost-effective assignments, supporting data-driven pairing decisions.
        </p>
      </section>

      {/* Bubble Chart Section */}
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>📈 Cost vs Distance per Crop (Interactive Bubble Chart)</h2>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <CropBubbleChart />
        </div>
        <p style={{ marginTop: '1rem', fontSize: '1rem', maxWidth: '800px' }}>
          This interactive bubble chart displays all possible <strong>farmer–buyer combinations</strong> for the selected crop.
          Use the dropdown to filter by fruit type.  
          <ul style={{ marginLeft: '1rem' }}>
            <li><strong>X-axis:</strong> Distance in kilometers between farmer and buyer</li>
            <li><strong>Y-axis:</strong> Total computed cost based on supply and stock conditions</li>
            <li><strong>Bubble Size:</strong> Farmer’s available supply for the selected crop</li>
          </ul>
          This helps visualize trade-offs between logistics cost and crop supply availability per crop category.
        </p>
      </section>
    </div>
  );
}

export default ResultsPage;
