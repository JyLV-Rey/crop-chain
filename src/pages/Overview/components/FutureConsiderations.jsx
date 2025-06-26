import { Rocket, MapPin, BarChart, Landmark } from "lucide-react";

function FutureConsiderations() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Rocket className="w-8 h-8 text-violet-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Future Considerations</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-600">Enhanced Integration</h3>
              <ul className="space-y-2 text-gray-700 mt-2 list-disc list-inside">
                <li>Real-time GPS tracking and routing</li>
                <li>Integration with mapping services</li>
                <li>Weather data incorporation</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
              <BarChart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-600">Scaling Opportunities</h3>
              <ul className="space-y-2 text-gray-700 mt-2 list-disc list-inside">
                <li>Live database connections</li>
                <li>Multi-region deployment</li>
                <li>Mobile app development</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
              <Landmark className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600">Government Integration</h3>
              <ul className="space-y-2 text-gray-700 mt-2 list-disc list-inside">
                <li>Policy framework alignment</li>
                <li>Subsidy program integration</li>
                <li>Agricultural data sharing</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureConsiderations;
