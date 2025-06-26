import { BookOpen, Plus, Edit, Zap, BarChart, Lightbulb } from 'lucide-react';

function HowToUseWebsite() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
      <div className="flex items-center mb-6">
        <BookOpen className="w-8 h-8 text-gray-700 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">How to Use the Website</h2>
      </div>
      <div className="space-y-6">
        <p className="text-lg text-gray-700 mb-8">
          Follow these simple steps to get started with CropChain and optimize your farmer-buyer assignments:
        </p>

        <div className="grid gap-6">
          <div className="flex items-start bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
            <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1 text-lg font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Add Global Parameters</h3>
              <p className="text-green-700 text-lg">
                To get started, you'll need to input your global parameters. This is crucial for setting up the
                foundational data needed for the calculations. Configure penalty weights, distance factors, and
                crop priorities that will influence the matching algorithm.
              </p>
            </div>
          </div>

          <div className="flex items-start bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1 text-lg font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">Edit Farmer and Buyer Information</h3>
              <p className="text-blue-700 text-lg">
                Next, make sure to provide or modify the details of farmers and buyers. This allows you to
                customize the data for your specific use case. Update crop supplies, buyer demands, locations, and
                contact information to reflect your real-world scenario.
              </p>
            </div>
          </div>

          <div className="flex items-start bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
            <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1 text-lg font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Click the "Calculate" Button</h3>
              <p className="text-purple-700 text-lg">
                Once all your information is in place, click the Calculate button to run the necessary
                calculations based on the inputs you provided. The system will process the optimization algorithm
                to find the best farmer-buyer pairings.
              </p>
            </div>
          </div>

          <div className="flex items-start bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
            <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1 text-lg font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-orange-800 mb-3">Check the Results</h3>
              <p className="text-orange-700 text-lg">
                After the calculations are complete, review the results. This will provide you with the output
                needed to make informed decisions. Analyze the optimal assignments, cost savings, and efficiency
                metrics to understand the recommended farmer-buyer pairings.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
            Quick Tips for Best Results
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2 mt-1">•</span>
              <span>Ensure all farmer and buyer data is accurate and up-to-date before running calculations</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>Adjust global parameters based on your specific market conditions and priorities</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2 mt-1">•</span>
              <span>Review the mathematical analysis section to understand how the algorithm works</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 mr-2 mt-1">•</span>
              <span>Use the View Data page to visualize farmer and buyer locations on the map</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HowToUseWebsite;
