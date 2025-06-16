import NavBar from "../../features/NavBar"
import { Link } from "react-router-dom"
import { Users, BarChart, MapPin, CheckCircle, CircleUserRound, Leaf, RefreshCcw, Truck, ArrowRight, Handshake, Store, Warehouse, Landmark } from "lucide-react";

function HomePage() {
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <img src="/logos/CropChain.png" className="w-32 h-auto mx-auto mb-8" alt="CropChain Logo" />
          <h1 className="text-7xl font-bold text-green-800 mb-4">CropChain</h1>
          <p className="text-2xl text-green-600 font-medium mb-8">Grow. Connect. Deliver.</p>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            A prototype platform that bridges the gap between small-scale farmers and local markets through optimized
            crop-to-market matching.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/Assignment/Initialization"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started →
            </Link>
            <Link
              to="/Overview"
              className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Problem Highlight */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-red-800 mb-4">The Problem We're Solving</h2>
            <p className="text-xl text-red-700 leading-relaxed">
              Small farmers struggle to find buyers, and buyers face unpredictable supply. CropChain solves this
              mismatch with smart matching and logistics awareness.
            </p>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users size={28} className="text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Farmer-to-Buyer Matching</h3>
              <p className="text-gray-600">Connect farmers directly with buyers based on crop type and location.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BarChart size={28} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fair & Optimized Pairings</h3>
              <p className="text-gray-600">Algorithm-driven matching ensures fair distribution and optimal outcomes.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <MapPin size={28} className="text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transparency in Logistics</h3>
              <p className="text-gray-600">Clear visibility into delivery routes and logistics coordination.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <CheckCircle size={28} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Assignment Results</h3>
              <p className="text-gray-600">Detailed reports on crop posting and successful buyer assignments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">

            {/* Step 1 */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-md text-center w-full max-w-sm flex-shrink-0">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf size={36} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Farmers Post Crops</h3>
              <p className="text-gray-600 text-lg">
                Farmers input their available crops, quantities, and location information into the system.
              </p>
            </div>

            {/* next*/}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-10 h-10 text-gray-400" />
            </div>

            {/* Step 2 */}
            <div className="bg-blue-50 rounded-2xl p-6 shadow-md text-center w-full max-w-sm flex-shrink-0">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCcw size={36} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">System Matches to Best Buyer</h3>
              <p className="text-gray-600 text-lg">
                The algorithm analyzes supply, demand, and logistics to create optimal farmer-buyer pairings.
              </p>
            </div>

            {/* next*/}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-10 h-10 text-gray-400" />
            </div>

            {/* Step 3 */}
            <div className="bg-purple-50 rounded-2xl p-6 shadow-md text-center w-full max-w-sm flex-shrink-0">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={36} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Crops are Delivered Effectively</h3>
              <p className="text-gray-600 text-lg">
                Coordinated logistics ensure efficient delivery from farm to market with minimal waste.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Agricultural Markets?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join the revolution in connecting farmers with buyers through smart technology.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              to="/Assignment/Initialization"
              className="bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Now →
            </Link>
            <Link
              to="/Overview"
              className="bg-transparent hover:bg-green-700 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
