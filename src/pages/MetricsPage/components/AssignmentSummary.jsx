function AssignmentSummary({ bestAssignment, farmers, buyers, finalCostMatrix }) {
  if (!bestAssignment || !bestAssignment.bestAssignment) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg border border-neutral-200">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
          Assignment Summary
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-neutral-500 font-medium">Calculating assignment metrics...</p>
          </div>
        </div>
      </div>
    )
  }

  // Calculate additional metrics
  const totalAssignments = bestAssignment.bestAssignment?.length || 0
  const totalFarmers = farmers.length
  const totalBuyers = buyers.length
  const assignmentRate = totalFarmers > 0 ? ((totalAssignments / totalFarmers) * 100).toFixed(1) : "0"

  // Calculate average cost per assignment
  const avgCostPerAssignment = totalAssignments > 0 ? (bestAssignment.minCost / totalAssignments).toFixed(2) : "0"

  // Calculate cost efficiency (lower is better)
  const maxPossibleCost = finalCostMatrix.length > 0 ? Math.max(...finalCostMatrix.flat()) * totalAssignments : 0
  const costEfficiency =
    maxPossibleCost > 0 ? (((maxPossibleCost - bestAssignment.minCost) / maxPossibleCost) * 100).toFixed(1) : "0"

  return (
    <div className="bg-neutral-600 p-8 rounded-lg shadow-lg border border-neutral-200">
      <h2 className="text-2xl font-bold text-neutral-50 mb-6 flex items-center">
        Assignment Summary
      </h2>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-2">{bestAssignment.minCost?.toFixed(2) || "N/A"}</div>
          <div className="text-sm font-medium text-blue-700">Total Assignment Cost</div>
          <div className="text-xs text-blue-600 mt-1">Minimized by algorithm</div>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-2">{totalAssignments}</div>
          <div className="text-sm font-medium text-green-700">Successful Assignments</div>
          <div className="text-xs text-green-600 mt-1">{assignmentRate}% of farmers</div>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-2">{bestAssignment.iteration || 0}</div>
          <div className="text-sm font-medium text-purple-700">Algorithm Iterations</div>
          <div className="text-xs text-purple-600 mt-1">Convergence steps</div>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
          <div className="text-3xl font-bold text-orange-600 mb-2">{avgCostPerAssignment}</div>
          <div className="text-sm font-medium text-orange-700">Avg Cost per Assignment</div>
          <div className="text-xs text-orange-600 mt-1">Cost efficiency metric</div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Market Coverage</span>
            <span className="text-lg font-bold text-neutral-800">{assignmentRate}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${assignmentRate}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Cost Efficiency</span>
            <span className="text-lg font-bold text-neutral-800">{costEfficiency}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${costEfficiency}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-700">Network Size</span>
            <span className="text-lg font-bold text-neutral-800">
              {totalFarmers}×{totalBuyers}
            </span>
          </div>
          <div className="text-xs text-neutral-600">
            {totalFarmers} farmers, {totalBuyers} buyers
          </div>
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-neutral-700">Algorithm Performance</div>
            <div className="text-xs text-neutral-600 mt-1">
              Optimized {totalAssignments} assignments with {costEfficiency}% efficiency
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentSummary
