const Plot2 = ({ avocados, updateAvocado, updateReplanting }) => {
  const plot2Trees = avocados.filter(av => av.plot === 'P2')

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-green-500">🌿</span>
          Plot 2 (P2) - Avocado Trees
        </h2>
        <div className="mt-2 bg-green-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-green-800 font-medium">Tree Range</p>
              <p className="text-green-600">AV/P2/043 - AV/P2/102</p>
            </div>
            <div>
              <p className="text-green-800 font-medium">Total Trees</p>
              <p className="text-green-600">60 avocado trees</p>
            </div>
            <div>
              <p className="text-green-800 font-medium">Planted</p>
              <p className="text-green-600">{plot2Trees.filter(t => t.plantingDate).length} trees</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-green-50 border-b">
          <h3 className="text-lg font-semibold text-green-900">Plot 2 Tree Management</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tree ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planting Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R1 Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R2 Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R3 Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plot2Trees.map((avocado) => (
                <tr key={avocado.id} className="hover:bg-green-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">🌿</span>
                      <span className="text-sm font-medium text-gray-900">{avocado.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                      AV{avocado.number}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={avocado.plantingDate}
                      onChange={(e) => updateAvocado(avocado.id, 'plantingDate', e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={avocado.healthStatus || 'healthy'}
                      onChange={(e) => updateAvocado(avocado.id, 'healthStatus', e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500"
                    >
                      <option value="healthy">🟢 Healthy</option>
                      <option value="moderate">🟡 Moderate</option>
                      <option value="poor">🔴 Poor</option>
                      <option value="dead">⚫ Dead</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={avocado.replanting.R1}
                      onChange={(e) => updateReplanting(avocado.id, 'R1', e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={avocado.replanting.R2}
                      onChange={(e) => updateReplanting(avocado.id, 'R2', e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="date"
                      value={avocado.replanting.R3}
                      onChange={(e) => updateReplanting(avocado.id, 'R3', e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={avocado.notes || ''}
                      onChange={(e) => updateAvocado(avocado.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      className="text-sm border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Plot2