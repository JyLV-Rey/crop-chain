import NavBar from "../../features/NavBar"
import { AlertTriangle, Wheat, Target, Building2, Users, BarChart3, Rocket, Calculator } from "lucide-react";


{/* Paki-check na lang ito, need ko na magpahinga. If may changes let me know, will change after exams.
     same same ung description sa formulas from our project proposal*/}

function Overview() {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <img src="/logos/CropChain.png" className="w-24 h-auto mx-auto mb-6" alt="CropChain Logo" />
            <h1 className="text-5xl font-bold text-gray-800 mb-4">CropChain Overview</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive look at our agricultural supply chain optimization platform
            </p>
          </div>

          {/* Introduction: The Problem */}
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
                    Inefficient transportation and distribution networks increase costs.
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

          {/* Project Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Wheat className="w-8 h-8 text-yellow-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Project Description</h2>
            </div>
            <div className="space-y-6 text-lg text-gray-700">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❓</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-3">What is CropChain?</h3>
                  <p>
                    A prototype platform that uses optimization algorithms to match farmers with buyers based on supply,
                    demand, and logistics constraints.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-600 mb-3">Who is it for?</h3>
                  <p>
                    Small-scale farmers, local markets, grocery stores, logistics coordinators, and agricultural
                    departments.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚙️</span>
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

          {/* Objectives */}
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

          {/* System Architecture */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-indigo-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">System Architecture & Logic Overview</h2>
            </div>
            <div className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📥</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Input</h3>
                  <p className="text-blue-700">Crop type, quantity, location, buyer requirements, and supply limits</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-3">Processing</h3>
                  <p className="text-green-700">
                    Matching algorithm using cost heuristics and optimization constraints
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-3">Output</h3>
                  <p className="text-purple-700">Optimal farmer-buyer pairings with routing suggestions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Intended Users */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Intended Users</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-800 mb-3">👨‍🌾 Farmers (Crop Suppliers)</h3>
                <p className="text-green-700">
                  Small to medium-scale farmers looking to sell their produce directly to markets with fair pricing and
                  reliable buyers.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">🏪 Buyers (Markets/Groceries)</h3>
                <p className="text-blue-700">
                  Local markets, grocery stores, and food retailers seeking consistent, quality produce supply from
                  local farmers.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-800 mb-3">🚛 Logistics Team</h3>
                <p className="text-purple-700">
                  Transportation coordinators and logistics providers responsible for efficient crop delivery and route
                  optimization.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-800 mb-3">🏛️ Admin (Department of Agriculture)</h3>
                <p className="text-orange-700">
                  Government agencies and agricultural departments monitoring market efficiency and supporting farmer
                  welfare programs.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use the Website */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-4">📖</span>
              <h2 className="text-3xl font-bold text-gray-800">How to Use the Website</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 mb-8">
                Follow these simple steps to get started with CropChain and optimize your farmer-buyer assignments:
              </p>

              <div className="grid gap-6">
                {/* Step 1 */}
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

                {/* Step 2 */}
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

                {/* Step 3 */}
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

                {/* Step 4 */}
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

              {/* Quick Tips */}
              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💡</span>
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

          
          {/* Mathematical Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 text-indigo-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Mathematical Analysis of Cost Calculation</h2>
            </div>

            {/* Input Structure */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Input Structure per Fruit</h3>
              <p className="text-gray-600 mb-4">Assume the following variables:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>F</strong> — number of fruit types
                </li>
                <li>
                  <strong>N</strong> — number of farmers
                </li>
                <li>
                  <strong>M</strong> — number of buyers
                </li>
              </ul>
              <p className="text-gray-600 mb-4">
                There are only <strong>5</strong> farmers and buyers, indicated by n=5. We can declare mutually
                exclusive function-scoped inputs i, j to access the data of each farmer and buyer, respectively. Where 0
                ≤ i,j &lt; n
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-700 mb-3">We can then define the following matrices/arrays:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    <code className="bg-gray-200 px-2 py-1 rounded">farmer_supply[i][f]</code> - supply in kg per fruit
                    f per farmer i
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-1 rounded">buyer_stock[j][f]</code> - current stock in kg per
                    fruit f per buyer j
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-1 rounded">distance[i][j]</code> - distance from farmer i to
                    buyer j (independent of fruit)
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-1 rounded">B_max[f]</code> - maximum stock per fruit f for the
                    buyer (for overstock)
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-1 rounded">W_f[f]</code> - priority level of the fruit f
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-1 rounded">F_total</code> - total types of fruit
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 mt-4">
                Depending on the complexity, the website aims to integrate a function to call a built-in{" "}
                <strong>Multi-Level Dijkstra</strong> to calculate the actual distance from the farmers to each market.
              </p>
            </div>

            {/* Cost Formula */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Cost Formula per Fruit Type</h3>
              <p className="text-gray-600 mb-4">
                For each fruit type F, compute the cost of assigning farmer i to buyer j:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <div className="text-center text-xl font-mono text-black">
                  C<sub>ijf</sub> = d<sub>ij</sub> × (1 + δ × (b<sub>jf</sub> / b<sub>f</sub>
                  <sup>max</sup>)) / s<sub>if</sub>
                  <sup>α</sup>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-700 mb-3">Where:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    <strong>
                      d<sub>ij</sub>
                    </strong>{" "}
                    — distance between farmer i and buyer j
                  </li>
                  <li>
                    <strong>
                      s<sub>if</sub>
                    </strong>{" "}
                    — supply of fruit f from farmer i
                  </li>
                  <li>
                    <strong>
                      b<sub>jf</sub>
                    </strong>{" "}
                    — current stock of fruit f at buyer j
                  </li>
                  <li>
                    <strong>
                      b<sub>f</sub>
                      <sup>max</sup>
                    </strong>{" "}
                    — max target stock for fruit f (used for normalization)
                  </li>
                  <li>
                    <strong>α</strong> — exponent controlling effect of supply on cost
                  </li>
                  <li>
                    <strong>δ</strong> — penalty multiplier for buyer oversupply
                  </li>
                </ul>
              </div>
            </div>

            {/* Combined Costs */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Combine Costs Across Fruits</h3>
              <p className="text-gray-600 mb-4">
                For each farmer–buyer pair, compute the total cost across all fruits:
              </p>

              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <div className="text-center text-xl font-mono text-black">
                  C<sub>ij</sub>
                  <sup>total</sup> = Σ<sub>f=0</sub>
                  <sup>F-1</sup> (W<sub>f</sub> / F) × C<sub>ijf</sub>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-700 mb-3">Where:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>
                    <strong>F</strong> - total number of fruit types
                  </li>
                  <li>
                    <strong>
                      C<sub>ijf</sub>
                    </strong>{" "}
                    — cost for farmer i to buyer j for fruit f
                  </li>
                  <li>
                    <strong>
                      W<sub>f</sub>
                    </strong>{" "}
                    - priority level of the fruit, higher number means higher priority, set to 1 if all fruits should be
                    treated equally. Should NOT equal 0.
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 mt-4">
                We divide the current priority W<sub>f</sub> by F to normalize the values. This is so Σ<sub>f=0</sub>
                <sup>F-1</sup> W<sub>f</sub> = 1.
              </p>
              <p className="text-gray-600 mt-2">
                This yields a single unified cost matrix if the model assumes one truck or one delivery per farmer–buyer
                pair. We can finalize the matrix into a two-dimensional matrix G, where G[i][j] will be the cost of
                assigning farmer i to buyer j.
              </p>
            </div>

            {/* Parameter Importance */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Importance of the α and δ Parameters</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-3">Effect of α (Farmer Oversupply Prioritization)</h4>
                  <p className="text-orange-700 mb-3">
                    The exponent α controls how strongly the farmer's supply s<sub>if</sub> influences the cost:
                  </p>
                  <div className="text-center text-lg font-mono mb-3">
                    1 / s<sub>if</sub>
                    <sup>α</sup>
                  </div>
                  <ul className="list-disc list-inside text-orange-700 text-sm space-y-1">
                    <li>If α = 0: supply has no effect on cost (neutral)</li>
                    <li>If 0 &lt; α &lt; 1: supply has a gentle inverse effect on cost</li>
                    <li>If α = 1: cost is inversely proportional to supply</li>
                    <li>If α &gt; 1: high supply strongly reduces cost</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-3">Effect of δ (Buyer Oversupply Penalty)</h4>
                  <p className="text-purple-700 mb-3">
                    The multiplier δ controls how much the buyer's current stock affects the cost:
                  </p>
                  <div className="text-center text-lg font-mono mb-3">
                    1 + δ × (b<sub>jf</sub> / b<sub>f</sub>
                    <sup>max</sup>)
                  </div>
                  <ul className="list-disc list-inside text-purple-700 text-sm space-y-1">
                    <li>If δ = 0: buyer stock has no effect; all buyers are treated equally</li>
                    <li>
                      If δ &gt; 0: buyers with more stock incur higher cost, which discourages further supply to them
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Assignment Calculation */}
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Mathematical Analysis of Assignment Calculation</h3>
              <p className="text-gray-600 mb-4">
                After computing for the final matrix G, we can now proceed with the assignment problem. We consider the
                following:
              </p>

              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>
                    G<sub>i,j</sub>
                  </strong>{" "}
                  — The cost of assigning farmer i to buyer j
                </li>
                <li>
                  <strong>
                    X<sub>i,j</sub>
                  </strong>{" "}
                  — Binary decision variable: 1 if farmer i is assigned to buyer j, 0 otherwise
                </li>
              </ul>

              <div className="bg-red-50 p-6 rounded-lg mb-4">
                <p className="text-gray-600 mb-2">We need to minimize:</p>
                <div className="text-center text-xl font-mono mb-4 text-black">
                  min<sub>X</sub> Σ<sub>i=1</sub>
                  <sup>n-1</sup> Σ<sub>j=1</sub>
                  <sup>n-1</sup> X<sub>i,j</sub> × G<sub>i,j</sub>
                </div>
                <p className="text-gray-600 mb-2">Subject to:</p>
                <div className="space-y-2 text-lg font-mono text-black">
                  <div>
                    Σ<sub>j=1</sub>
                    <sup>n-1</sup> X<sub>i,j</sub> = 1 ∀ i = 1, ..., n (each row assigned exactly once)
                  </div>
                  <div>
                    Σ<sub>i=1</sub>
                    <sup>n-1</sup> X<sub>i,j</sub> = 1 ∀ j = 1, ..., n (each column assigned exactly once)
                  </div>
                  <div>
                    X<sub>i,j</sub> ∈ {"{0, 1}"} for all i, j
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                The function created will aim to minimize the sum, and will be the final match of the farmer to the
                buyer. Since the number of combinations (bijection mappings) of farmers to buyers is fixed (n = 5), the
                total combination will be:
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg mb-4">
                <div className="text-center text-xl font-mono text-black">5! = 5×4×3×2×1 = 120</div>
              </div>

              <p className="text-gray-600 mb-4">
                The function will implement a <strong>Branch & Bound</strong> approach, where the combination and the
                current loop will be pruned if the current tentative costs exceeds the already known minimal cost.
              </p>

              <p className="text-gray-600 mb-4">
                Since the function finds all permutations of assignments given an n·n matrix, we can assume that the
                time complexity of it is <strong>O(n!)</strong>. However, pruning and skipping over some iterations will
                significantly improve the runtime when further scaled.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-800 font-semibold">
                  From the given cost calculation, it may seem that the function itself is a{" "}
                  <strong>Heuristic Function</strong>, it is <strong>not</strong>. It is a{" "}
                  <strong>Branch & Bound</strong> function motivated/inspired by heuristics, not necessarily a heuristic
                  function itself. The cost calculation is a <strong>Heuristic-Like function</strong>, only inspired by
                  heuristics, but the actual implementation of the Assignment problem is <strong>not</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Sample Output Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-8 h-8 text-sky-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Sample Output Preview</h2>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="text-center text-gray-500">
              </div>
            </div>
          </div>

          {/* Future Considerations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Rocket className="w-8 h-8 text-violet-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Future Considerations</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-xl">🗺️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-600">Enhanced Integration</h3>
                    <ul className="space-y-2 text-gray-700 mt-2">
                      <li>• Real-time GPS tracking and routing</li>
                      <li>• Integration with mapping services</li>
                      <li>• Weather data incorporation</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-xl">📈</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-600">Scaling Opportunities</h3>
                    <ul className="space-y-2 text-gray-700 mt-2">
                      <li>• Live database connections</li>
                      <li>• Multi-region deployment</li>
                      <li>• Mobile app development</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-600">Government Integration</h3>
                    <ul className="space-y-2 text-gray-700 mt-2">
                      <li>• Policy framework alignment</li>
                      <li>• Subsidy program integration</li>
                      <li>• Agricultural data sharing</li>
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
        </div>
      </div>
    </>
  )
}



export default Overview
