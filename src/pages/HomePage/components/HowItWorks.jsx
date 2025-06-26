import { Leaf, RefreshCcw, Truck, ArrowRight } from "lucide-react";

/**
 * HowItWorksStep Component
 * @param {object} props 
 * @param {React.ElementType} props.Icon 
 * @param {string} props.iconBgColor
 * @param {string} props.iconTextColor 
 * @param {string} props.title -
 * @param {string} props.description -
 */
const HowItWorksStep = ({ Icon, iconBgColor, iconTextColor, title, description }) => (
  <div className={`rounded-2xl p-6 shadow-md text-center w-full max-w-sm flex-shrink-0 ${iconBgColor}`}>
    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${iconBgColor.replace('-50', '-100')}`}>
      <Icon size={36} className={iconTextColor} />
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-lg">
      {description}
    </p>
  </div>
);

/**
 * HowItWorks Component
 */
function HowItWorks() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">

          {/* Step 1: Farmers Post Crops */}
          <HowItWorksStep
            Icon={Leaf}
            iconBgColor="bg-emerald-50"
            iconTextColor="text-emerald-600"
            title="Farmers Post Crops"
            description="Farmers input their available crops, quantities, and location information into the system."
          />

          {/* Arrow Separator */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-10 h-10 text-gray-400" />
          </div>

          {/* Step 2: System Matches to Best Buyer */}
          <HowItWorksStep
            Icon={RefreshCcw}
            iconBgColor="bg-blue-50"
            iconTextColor="text-blue-600"
            title="System Matches to Best Buyer"
            description="The algorithm analyzes supply, demand, and logistics to create optimal farmer-buyer pairings."
          />

          {/* Arrow Separator */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-10 h-10 text-gray-400" />
          </div>

          {/* Step 3: Crops are Delivered Effectively */}
          <HowItWorksStep
            Icon={Truck}
            iconBgColor="bg-purple-50"
            iconTextColor="text-purple-600"
            title="Crops are Delivered Effectively"
            description="Coordinated logistics ensure efficient delivery from farm to market with minimal waste."
          />

        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
