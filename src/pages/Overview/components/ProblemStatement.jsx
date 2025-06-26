import { AlertTriangle } from "lucide-react";

function ProblemStatement() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">The Problem We're Addressing</h2>
      </div>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          The agricultural sector faces significant challenges in connecting small-scale farmers with local
          markets, resulting in substantial post-harvest losses and economic inefficiencies.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
            <h3 className="font-bold text-red-800 mb-2">Post-Harvest Losses</h3>
            <p className="text-red-700">
              Oversupply situations lead to crops rotting in fields due to lack of market access.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
            <h3 className="font-bold text-orange-800 mb-2">Market Access Issues</h3>
            <p className="text-orange-700">Small farmers struggle to find reliable buyers for their produce.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 mb-2">Poor Logistics</h3>
            <p className="text-yellow-700">
              In efficient transportation and distribution networks increase costs.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-bold text-blue-800 mb-2">Unfair Pricing</h3>
            <p className="text-blue-700">
              Lack of transparency leads to unfair pricing for both farmers and buyers.
            </p>
          </div>
        </div>
        <p className="bg-gray-100 p-4 rounded-lg italic">
          <strong>Real-world examples:</strong> The Benguet vegetable crisis and Nueva Ecija rice oversupply
          demonstrate the urgent need for better market coordination systems.
        </p>
      </div>
    </div>
  );
}

export default ProblemStatement;
