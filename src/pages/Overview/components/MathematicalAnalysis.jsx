import { Calculator } from "lucide-react";

function MathematicalAnalysis() {
  return (
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
            C<sub>ijf</sub> = d<sup>β</sup><sub>ij</sub> × (1 + δ × (b<sub>jf</sub> / b<sub>f</sub>))
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
  );
}

export default MathematicalAnalysis;
