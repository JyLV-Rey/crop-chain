import { Wheat, Info, Users, Settings } from "lucide-react";

function ProjectDescription() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <Wheat className="w-8 h-8 text-yellow-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Project Description</h2>
      </div>
      <div className="space-y-6 text-lg text-gray-700">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-3">What is CropChain?</h3>
            <p>
              A prototype platform that uses optimization algorithms to match farmers with buyers based on supply,
              demand, and logistics constraints.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-3">Who is it for?</h3>
            <p>
              Small-scale farmers, local markets, grocery stores, logistics coordinators, and agricultural
              departments.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-3xl text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-purple-600 mb-3">How does it work?</h3>
            <p>
              By analyzing crop data, buyer requirements, and geographic constraints to create optimal
              farmer-buyer pairings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDescription;
