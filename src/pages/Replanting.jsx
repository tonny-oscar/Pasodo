const Replanting = ({ avocados, updateReplanting, updateAvocado }) => {
  const plantedTrees = avocados.filter(av => av.plantingDate)
  const treesNeedingReplanting = avocados.filter(av => 
    av.plantingDate && (av.healthStatus === 'poor' || av.healthStatus === 'dead')
  )

  const handleBulkReplanting = (replantType, date) => {
    treesNeedingReplanting.forEach(tree => {
      updateReplanting(tree.id, replantType, date)
      updateAvocado(tree.id, 'healthStatus', 'healthy')
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
          <span className="text-orange-600">🔄</span>
          Tree Replanting Management
        </h2>
        <p className="text-gray-600">Manage replanting cycles R1, R2, and R3 for your avocado trees</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Trees Needing Replanting</p>
              <p className="text-3xl font-bold">{treesNeedingReplanting.length}</p>
            </div>
            <span className="text-4xl opacity-80">🚨</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">R1 Replanted</p>
              <p className="text-3xl font-bold">{avocados.filter(av => av.replanting.R1).length}</p>
            </div>
            <span className="text-4xl opacity-80">🔄</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Replanted</p>
              <p className="text-3xl font-bold">{avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3).length}</p>
            </div>
            <span className="text-4xl opacity-80">✅</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-orange-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-orange-600">⚡</span>
          Quick Replanting Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-blue-500">🔄</span>
              R1 Replanting
            </h4>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => e.target.value && handleBulkReplanting('R1', e.target.value)}
            />
            <p className="text-sm text-gray-600">First replanting cycle for poor/dead trees</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-yellow-500">🔄</span>
              R2 Replanting
            </h4>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => e.target.value && handleBulkReplanting('R2', e.target.value)}
            />
            <p className="text-sm text-gray-600">Second replanting cycle</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-green-500">🔄</span>
              R3 Replanting
            </h4>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-green-500"
              onChange={(e) => e.target.value && handleBulkReplanting('R3', e.target.value)}
            />
            <p className="text-sm text-gray-600">Final replanting cycle</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-red-50 border-b">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-orange-600">📋</span>
            Individual Tree Replanting
          </h3>
          <p className="text-gray-600 text-sm mt-1">Manage replanting dates for each tree individually</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tree ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Plot</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Health Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Original Planting</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">R1 Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">R2 Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">R3 Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plantedTrees.map((tree) => (
                <tr key={tree.id} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`mr-2 text-lg ${tree.plot === 'P1' ? 'text-blue-600' : 'text-green-600'}`}>
                        {tree.plot === 'P1' ? '🌱' : '🌿'}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{tree.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      tree.plot === 'P1' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {tree.plot}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={tree.healthStatus || 'healthy'}
                      onChange={(e) => updateAvocado(tree.id, 'healthStatus', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="healthy">🟢 Healthy</option>
                      <option value="moderate">🟡 Moderate</option>
                      <option value="poor">🔴 Poor</option>
                      <option value="dead">⚫ Dead</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {tree.plantingDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={tree.replanting.R1}
                      onChange={(e) => updateReplanting(tree.id, 'R1', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={tree.replanting.R2}
                      onChange={(e) => updateReplanting(tree.id, 'R2', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={tree.replanting.R3}
                      onChange={(e) => updateReplanting(tree.id, 'R3', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {plantedTrees.length === 0 && (
          <div className="text-center py-16">
            <span className="text-8xl mb-6 block opacity-50">🌱</span>
            <p className="text-gray-500 text-xl mb-2">No trees planted yet</p>
            <p className="text-gray-400">Plant some trees first to manage replanting</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Replanting