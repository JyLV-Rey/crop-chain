import { Link } from "react-router-dom";

/**
 * HerooSection Component
 */
function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br to-yellow-200 from-green-300 flex flex-col items-center justify-center px-6 pt-20">
      <div className="max-w-6xl flex flex-col mx-auto justify-center text-center">
        {/* CropChain Logo */}
        <div className="bg-white rounded-full p-4 w-fit self-center mb-8">
          <img src="/logos/CropChain.png" className="w-32 h-32 mx-auto" alt="CropChain Logo" />
        </div>
        
        {/* Main Title */}
        <h1 className="text-7xl font-bold text-emerald-800 mb-4">CropChain</h1>
        {/* Tagline */}
        <p className="text-2xl text-emerald-600 font-medium mb-8">Grow. Connect. Deliver.</p>
        {/* Description */}
        <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
          A prototype platform that bridges the gap between small-scale farmers and local markets through optimized
          crop-to-market matching.
        </p>

        {/* Call-to-action Buttons */}
        <div className="flex gap-6 justify-center flex-wrap">
          <Link
            to="/Assignment/Initialization"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started →
          </Link>
          <Link
            to="/Overview"
            className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
