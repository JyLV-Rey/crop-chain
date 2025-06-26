import { Users, BarChart, MapPin, CheckCircle } from "lucide-react";

/**
 * FeatureCard Component
 * @param {object} props
 * @param {React.ElementType} props.Icon 
 * @param {string} props.iconBgColor 
 * @param {string} props.iconTextColor 
 * @param {string} props.title
 * @param {string} props.description
 */
const FeatureCard = ({ Icon, iconBgColor, iconTextColor, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${iconBgColor}`}>
      <Icon size={28} className={iconTextColor} />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

/**
 * CoreFeatures Component
 * Uses the FeatureCard component for each individual feature.
 */
function CoreFeatures() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <FeatureCard
            Icon={Users}
            iconBgColor="bg-emerald-100"
            iconTextColor="text-emerald-700"
            title="Farmer-to-Buyer Matching"
            description="Connect farmers directly with buyers based on crop type and location."
          />
          <FeatureCard
            Icon={BarChart}
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-700"
            title="Fair & Optimized Pairings"
            description="Algorithm-driven matching ensures fair distribution and optimal outcomes."
          />
          <FeatureCard
            Icon={MapPin}
            iconBgColor="bg-purple-100"
            iconTextColor="text-purple-700"
            title="Transparency in Logistics"
            description="Clear visibility into delivery routes and logistics coordination."
          />
          <FeatureCard
            Icon={CheckCircle}
            iconBgColor="bg-orange-100"
            iconTextColor="text-orange-600"
            title="Assignment Results"
            description="Detailed reports on crop posting and successful buyer assignments."
          />
        </div>
      </div>
    </div>
  );
}

export default CoreFeatures;
