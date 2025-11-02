const CostManagement = ({ costs, addCost, updateCost, deleteCost }) => {
  const totalCost = costs.reduce((sum, cost) => sum + (parseFloat(cost.cost) || 0), 0)
  const thisMonthCosts = costs.filter(cost => {
    if (!cost.date) return false
    const costDate = new Date(cost.date)
    const now = new Date()
    return costDate.getMonth() === now.getMonth() && costDate.getFullYear() === now.getFullYear()
  })
  const thisMonthTotal = thisMonthCosts.reduce((sum, cost) => sum + (parseFloat(cost.cost) || 0), 0)

  const categories = ['Seeds & Plants', 'Fertilizers', 'Pesticides', 'Labor', 'Equipment', 'Irrigation', 'Maintenance', 'Other']

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="text-yellow-600">💰</span>
              Cost Management
            </h2>
            <p className="text-gray-600 mt-1">Track and manage all farm expenses</p>
          </div>
          <button
            onClick={addCost}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center gap-2 shadow-lg font-semibold"
          >
            <span className="text-lg">➕</span>
            Add New Cost Entry
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Costs</p>
                <p className="text-3xl font-bold">KSh {totalCost.toLocaleString()}</p>
              </div>
              <span className="text-4xl opacity-80">💵</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold">KSh {thisMonthTotal.toLocaleString()}</p>
              </div>
              <span className="text-4xl opacity-80">📅</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Entries</p>
                <p className="text-3xl font-bold">{costs.length}</p>
              </div>
              <span className="text-4xl opacity-80">📊</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-yellow-600">📋</span>
            Farm Expense Records
          </h3>
          <p className="text-gray-600 text-sm mt-1">Manage all your farm-related expenses</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Attendant</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cost (KSh)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {costs.map((cost) => (
                <tr key={cost.id} className="hover:bg-yellow-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={cost.activityName}
                      onChange={(e) => updateCost(cost.id, 'activityName', e.target.value)}
                      placeholder="Enter activity name"
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={cost.category || ''}
                      onChange={(e) => updateCost(cost.id, 'category', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="date"
                      value={cost.date}
                      onChange={(e) => updateCost(cost.id, 'date', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={cost.attendant}
                      onChange={(e) => updateCost(cost.id, 'attendant', e.target.value)}
                      placeholder="Attendant name"
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500 text-sm">KSh</span>
                      <input
                        type="number"
                        value={cost.cost}
                        onChange={(e) => updateCost(cost.id, 'cost', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="text-sm border border-gray-300 rounded-lg pl-12 pr-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={cost.paymentMethod || ''}
                      onChange={(e) => updateCost(cost.id, 'paymentMethod', e.target.value)}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select method</option>
                      <option value="cash">💵 Cash</option>
                      <option value="mpesa">📱 M-Pesa</option>
                      <option value="bank">🏦 Bank Transfer</option>
                      <option value="card">💳 Card</option>
                      <option value="check">📝 Check</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={cost.notes || ''}
                      onChange={(e) => updateCost(cost.id, 'notes', e.target.value)}
                      placeholder="Additional notes"
                      className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteCost(cost.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {costs.length === 0 && (
          <div className="text-center py-16">
            <span className="text-8xl mb-6 block opacity-50">📊</span>
            <p className="text-gray-500 text-xl mb-2">No cost entries yet</p>
            <p className="text-gray-400">Click "Add New Cost Entry" to get started</p>
          </div>
        )}

        {costs.length > 0 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Farm Investment:</span>
              <span className="text-2xl font-bold text-green-600">KSh {totalCost.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CostManagement