import { Target } from "lucide-react";

function ProjectObjectives() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <Target className="w-8 h-8 text-red-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Project Objectives</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Prototype Development</h3>
              <p className="text-gray-600">Create a functional web-based platform for crop-to-market matching</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Matching Implementation</h3>
              <p className="text-gray-600">
                Develop and implement optimization algorithms for farmer-buyer pairing
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 mr-4 mt-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div> 
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Market Support Demonstration</h3>
              <p className="text-gray-600">Show how technology can support agricultural market efficiency</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div> 
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Algorithm Evaluation</h3>
              <p className="text-gray-600">
                Test and evaluate different assignment algorithms for optimal results
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectObjectives;
