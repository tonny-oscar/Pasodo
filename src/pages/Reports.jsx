const Reports = ({ avocados, costs }) => {
  const plot1Trees = avocados.filter(av => av.plot === 'P1')
  const plot2Trees = avocados.filter(av => av.plot === 'P2')
  
  const healthStats = {
    healthy: avocados.filter(av => av.healthStatus === 'healthy').length,
    moderate: avocados.filter(av => av.healthStatus === 'moderate').length,
    poor: avocados.filter(av => av.healthStatus === 'poor').length,
    dead: avocados.filter(av => av.healthStatus === 'dead').length
  }

  const costsByCategory = costs.reduce((acc, cost) => {
    const category = cost.category || 'Other'
    acc[category] = (acc[category] || 0) + (parseFloat(cost.cost) || 0)
    return acc
  }, {})

  const monthlyData = costs.reduce((acc, cost) => {
    if (!cost.date) return acc
    const month = new Date(cost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    acc[month] = (acc[month] || 0) + (parseFloat(cost.cost) || 0)
    return acc
  }, {})

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="text-purple-500">📈</span>
        Farm Reports & Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🌳</span>
            Tree Health Overview
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Healthy Trees
              </span>
              <span className="font-semibold">{healthStats.healthy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                Moderate Health
              </span>
              <span className="font-semibold">{healthStats.moderate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                Poor Health
              </span>
              <span className="font-semibold">{healthStats.poor}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
                Dead Trees
              </span>
              <span className="font-semibold">{healthStats.dead}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📊</span>
            Plot Comparison
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-blue-800">Plot 1 (P1)</h4>
              <p className="text-sm text-gray-600">Trees: 42 | Planted: {plot1Trees.filter(t => t.plantingDate).length}</p>
              <p className="text-sm text-gray-600">Health Rate: {((plot1Trees.filter(t => t.healthStatus === 'healthy').length / 42) * 100).toFixed(1)}%</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-green-800">Plot 2 (P2)</h4>
              <p className="text-sm text-gray-600">Trees: 60 | Planted: {plot2Trees.filter(t => t.plantingDate).length}</p>
              <p className="text-sm text-gray-600">Health Rate: {((plot2Trees.filter(t => t.healthStatus === 'healthy').length / 60) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>💰</span>
            Cost Breakdown by Category
          </h3>
          <div className="space-y-3">
            {Object.entries(costsByCategory).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-700">{category}</span>
                <span className="font-semibold">${amount.toFixed(2)}</span>
              </div>
            ))}
            {Object.keys(costsByCategory).length === 0 && (
              <p className="text-gray-500 text-center py-4">No cost data available</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📅</span>
            Monthly Expenses
          </h3>
          <div className="space-y-3">
            {Object.entries(monthlyData)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .slice(-6)
              .map(([month, amount]) => (
                <div key={month} className="flex justify-between items-center">
                  <span className="text-gray-700">{month}</span>
                  <span className="font-semibold">${amount.toFixed(2)}</span>
                </div>
              ))}
            {Object.keys(monthlyData).length === 0 && (
              <p className="text-gray-500 text-center py-4">No monthly data available</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>📋</span>
          Farm Summary Report
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{avocados.filter(av => av.plantingDate).length}</div>
            <div className="text-sm text-gray-500">Trees Planted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3).length}</div>
            <div className="text-sm text-gray-500">Trees Replanted</div>
          </div>
          <div className="text-3xl font-bold text-yellow-600 text-center">
            <div>${costs.reduce((sum, cost) => sum + (parseFloat(cost.cost) || 0), 0).toFixed(2)}</div>
            <div className="text-sm text-gray-500">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{((avocados.filter(av => av.plantingDate).length / 102) * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-500">Farm Completion</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports