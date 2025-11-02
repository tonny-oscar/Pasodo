const Dashboard = ({ avocados, costs }) => {
  const plot1Trees = avocados.filter(av => av.plot === 'P1')
  const plot2Trees = avocados.filter(av => av.plot === 'P2')
  const totalCost = costs.reduce((sum, cost) => sum + (parseFloat(cost.cost) || 0), 0)
  const plantedTrees = avocados.filter(av => av.plantingDate).length
  const replantedTrees = avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3).length
  const totalPlantCost = avocados.reduce((sum, av) => sum + (parseFloat(av.plantPrice) || 0), 0)

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Farm Overview Dashboard</h2>
        <p className="text-gray-600">Complete overview of your avocado farm operations</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Trees</p>
              <p className="text-3xl font-bold">102</p>
            </div>
            <span className="text-4xl opacity-80">🌳</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Planted Trees</p>
              <p className="text-3xl font-bold">{plantedTrees}</p>
            </div>
            <span className="text-4xl opacity-80">🌱</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Replanted Trees</p>
              <p className="text-3xl font-bold">{replantedTrees}</p>
            </div>
            <span className="text-4xl opacity-80">🔄</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Investment</p>
              <p className="text-2xl font-bold">KSh {(totalCost + totalPlantCost).toLocaleString()}</p>
            </div>
            <span className="text-4xl opacity-80">💰</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-blue-500">🌱</span>
            Plot 1 (P1) Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Trees:</span>
              <span className="font-semibold text-lg">42 trees</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Range:</span>
              <span className="font-semibold">AV/P1/001 - AV/P1/042</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Planted:</span>
              <span className="font-semibold text-green-600">{plot1Trees.filter(t => t.plantingDate).length} trees</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Completion:</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{width: `${(plot1Trees.filter(t => t.plantingDate).length / 42) * 100}%`}}
                  ></div>
                </div>
                <span className="font-semibold text-blue-600">
                  {((plot1Trees.filter(t => t.plantingDate).length / 42) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">🌿</span>
            Plot 2 (P2) Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Trees:</span>
              <span className="font-semibold text-lg">60 trees</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Range:</span>
              <span className="font-semibold">AV/P2/043 - AV/P2/102</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Planted:</span>
              <span className="font-semibold text-green-600">{plot2Trees.filter(t => t.plantingDate).length} trees</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Completion:</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{width: `${(plot2Trees.filter(t => t.plantingDate).length / 60) * 100}%`}}
                  ></div>
                </div>
                <span className="font-semibold text-green-600">
                  {((plot2Trees.filter(t => t.plantingDate).length / 60) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-yellow-500">💰</span>
            Financial Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Plant Costs:</span>
              <span className="font-semibold">KSh {totalPlantCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Operational Costs:</span>
              <span className="font-semibold">KSh {totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t-2 border-gray-200 pt-3">
              <span className="text-gray-800 font-medium">Total Investment:</span>
              <span className="font-bold text-xl text-green-600">KSh {(totalCost + totalPlantCost).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-purple-500">📋</span>
            Recent Activities
          </h3>
          <div className="space-y-3">
            {costs.slice(-5).reverse().map(cost => (
              <div key={cost.id} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">📋</span>
                  <div>
                    <p className="font-medium text-gray-900">{cost.activityName || 'Unnamed Activity'}</p>
                    <p className="text-sm text-gray-500">{cost.date} • {cost.attendant}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">KSh {parseFloat(cost.cost || 0).toLocaleString()}</span>
              </div>
            ))}
            {costs.length === 0 && (
              <div className="text-center py-8">
                <span className="text-4xl mb-2 block opacity-50">📋</span>
                <p className="text-gray-500">No activities recorded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard