import { Calculator } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";

function MathematicalAnalysis() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
    <div className="flex items-center mb-6">
        <Calculator className="w-8 h-8 text-indigo-600 mr-4" />
        <h2 className="text-3xl font-bold text-gray-800">Mathematical Analysis of Cost Calculation</h2>
    </div>

    {/* Input Structure */}
    <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Input Structure per produce</h3>
        <p className="text-gray-600 mb-4">Assume the following variables:</p>
        <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
        <li>
            <strong>F</strong> — number of produce types
        </li>
        <li>
            <strong>N</strong> — number of farmers
        </li>
        <li>
            <strong>M</strong> — number of buyers
        </li>
        </ul>
        <p className="text-gray-600 mb-4">
        We can declare mutually exclusive function-scoped inputs i, j to access the data of each farmer and buyer, respectively. Where 0
        ≤ i,j &lt; n
        </p>

        <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-bold text-gray-700 mb-3">We can then define the following matrices/arrays:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
        <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
            <InlineMath math="farmer\_supply[i][f]" /> — supply in kg per produce <InlineMath math="f" /> per farmer <InlineMath math="i" />
        </li>
        <li>
            <InlineMath math="buyer\_stock[j][f]" /> — current stock in kg per produce <InlineMath math="f" /> per buyer <InlineMath math="j" />
        </li>
        <li>
            <InlineMath math="distance[i][j]" /> — distance from farmer <InlineMath math="i" /> to buyer <InlineMath math="j" /> (independent of produce)
        </li>
        <li>
            <InlineMath math="buyer\_stock\_max[j][f]" /> — maximum stock per produce <InlineMath math="f" /> for buyer <InlineMath math="j" /> (for overstock calculation)
        </li>
        <li>
            <InlineMath math="P_f[f]" /> — priority level of the produce <InlineMath math="f" />
        </li>
        <li>
            <InlineMath math="F_{\text{total}}" /> — total number of produce types
        </li>
        </ul>

        </ul>
        </div>

        <p className="text-gray-600 mt-4">
        The website integrates a function to call a built-in{" "}
        <strong>Multi-Level Dijkstra</strong> to calculate the actual distance from the farmers to each buyers using <a href="https://github.com/valhalla/valhalla" target="_blank" className="text-blue-700"><strong>Valhalla Open Routing System</strong></a>.
        </p>
    </div>


    {/* Cost Formula */}
    <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Cost Formula per produce Type</h3>
        <p className="text-gray-600 mb-4">
        For each produce type F, compute the cost of assigning farmer i to buyer j:
        </p>

        <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <div className="text-center text-xl font-mono text-black">
                <BlockMath math={`C_{ijf} = \\frac{d_{ij}^{\\beta} \\cdot \\left(1 +  \\frac{b_{jf}}{b_f^{\\text{max}}}^{\\delta} \\right)}{1 + s_{if}^\\alpha}`} />
            </div>
        </div>

        <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
        <h4 className="font-bold  mb-3">Where:</h4>
        <ul className="list-disc pl-4 space-y-1">
            <li><InlineMath math="d_{ij}" /> — distance between farmer <InlineMath math="i" /> and buyer <InlineMath math="j" /></li>
            <li><InlineMath math="\beta" /> — exponent controlling effect of distance on cost</li>
            <li><InlineMath math="s_{if}" /> — supply of produce <InlineMath math="f" /> from farmer <InlineMath math="i" /></li>
            <li><InlineMath math="b_{jf}" /> — current stock of produce <InlineMath math="f" /> at buyer <InlineMath math="j" /></li>
            <li><InlineMath math="b_f^{\text{max}}" /> — max target stock for produce <InlineMath math="f" /> (used for normalization)</li>
            <li><InlineMath math="\alpha" /> — exponent controlling effect of farmer supply on cost</li>
            <li><InlineMath math="\delta" /> — penalty multiplier for buyer oversupply</li>
        </ul>
        </div>
    </div>

    {/* Combined Costs */}
        <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Combine Costs Across Produce</h3>

        <p className="text-gray-600 mb-4">
            For each farmer–buyer pair, compute the total cost across all produce types:
        </p>

        <div className="bg-green-50 p-6 rounded-lg mb-4">
            <div className="text-center text-xl font-mono text-black">
            <BlockMath math={"C_{ij}^{\\text{total}} = \\sum_{f=0}^{F-1} \\frac{1}{P_f} \\cdot C_{ijf}"} />
            </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-700 mb-3">Where:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>F</strong> — total number of produce types</li>
            <li>
                <strong><InlineMath math="C_{ijf}" /></strong> — cost for farmer <InlineMath math="i" /> to buyer <InlineMath math="j" /> for produce <InlineMath math="f" />
            </li>
            <li>
                <strong><InlineMath math="P_f" /></strong> — priority level of produce <InlineMath math="f" /> (higher means more important). The reciprocal is used to reduce cost for high-priority produce.
            </li>
            </ul>
        </div>

        <p className="text-gray-600 mt-4">
            Each produce’s cost is scaled by its inverse priority to emphasize important produce. That is, the lower the <InlineMath math="P_f" />, the higher the priority and the lower the resulting cost.
        </p>

        <p className="text-gray-600 mt-2">
            This yields a single unified cost matrix assuming one truck or delivery per farmer–buyer pair. The final matrix <InlineMath math="G[i][j]" /> represents the total cost of assigning farmer <InlineMath math="i" /> to buyer <InlineMath math="j" />.
        </p>
        </div>


    {/* Parameter Importance */}
    <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Importance of the Tuning Parameters</h3>

        <p className="text-gray-600 mb-4">
        The following parameters control the behavior of the optimization algorithm, they simply adjust the sensitivity to change for the different input variables. This allows for customizability depending on the dynamic prioritization based on certain conditions rendered by the user:
        </p>

        <div className="flex flex-row flex-wrap gap-6">
        <div className="bg-orange-50 p-6 rounded-lg w-1/3">
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

        <div className="bg-purple-50 p-6 rounded-lg w-1/2">
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
        <div className="flex-grow w-full bg-purple-50 p-6 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">
                Effect of <InlineMath math="\beta" /> (Distance Penalty)
            </h4>
            <p className="text-blue-700 mb-3">
                The exponent <InlineMath math="\beta" /> controls how much distance affects the cost:
            </p>
            <div className="text-center text-lg font-mono mb-3">
                <InlineMath math="d_{ij}^{\beta}" />
            </div>
            <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                <li>
                <InlineMath math="\beta = 0" />: Distance does not affect cost; all farmer–buyer routes are equal.
                </li>
                <li>
                <InlineMath math="0 < \beta < 1" />: Mild penalty for farther distances.
                </li>
                <li>
                <InlineMath math="\beta = 1" />: Cost scales linearly with distance.
                </li>
                <li>
                <InlineMath math="\beta > 1" />: Sharp penalty for longer distances, emphasizing locality.
                </li>
            </ul>
            <p className="text-blue-700 text-sm mt-3">
                This parameter allows tuning the importance of proximity in the delivery network.
            </p>
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
        <div className="text-center text-xl font-mono text-black">5! = 5x4x3x2x1 = 120</div>
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
