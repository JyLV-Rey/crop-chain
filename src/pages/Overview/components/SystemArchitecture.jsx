import { Inbox, Settings, Building2, ArrowUpRight } from "lucide-react";

function SystemArchitecture() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <Building2 className="w-8 h-8 text-indigo-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">System Architecture & Logic Overview</h2>
      </div>
      <div className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Inbox className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-3">Input</h3>
            <p className="text-blue-700">Crop type, quantity, location, buyer requirements, and supply limits</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-3">Processing</h3>
            <p className="text-green-700">
              Matching algorithm using cost heuristics and optimization constraints
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpRight className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-800 mb-3">Output</h3>
            <p className="text-purple-700">Optimal farmer-buyer pairings with routing suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemArchitecture;
