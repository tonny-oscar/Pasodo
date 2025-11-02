import { useState } from 'react'

const AddPlants = ({ avocados, updateAvocado }) => {
  const [selectedPlot, setSelectedPlot] = useState('P1')
  const [bulkPlantingDate, setBulkPlantingDate] = useState('')
  const [bulkHealthStatus, setBulkHealthStatus] = useState('healthy')
  const [plantPrice, setPlantPrice] = useState('')
  const [supplier, setSupplier] = useState('')
  const [variety, setVariety] = useState('')

  const availableTrees = avocados.filter(av => 
    av.plot === selectedPlot && !av.plantingDate
  )

  const handleBulkPlanting = () => {
    if (!bulkPlantingDate || availableTrees.length === 0) return

    availableTrees.forEach(tree => {
      updateAvocado(tree.id, 'plantingDate', bulkPlantingDate)
      updateAvocado(tree.id, 'healthStatus', bulkHealthStatus)
      updateAvocado(tree.id, 'plantPrice', plantPrice)
      updateAvocado(tree.id, 'supplier', supplier)
      updateAvocado(tree.id, 'variety', variety)
    })

    // Reset form
    setBulkPlantingDate('')
    setPlantPrice('')
    setSupplier('')
    setVariety('')
  }

  const handleIndividualPlanting = (treeId) => {
    updateAvocado(treeId, 'plantingDate', bulkPlantingDate || new Date().toISOString().split('T')[0])
    updateAvocado(treeId, 'healthStatus', bulkHealthStatus)
    updateAvocado(treeId, 'plantPrice', plantPrice)
    updateAvocado(treeId, 'supplier', supplier)
    updateAvocado(treeId, 'variety', variety)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
          <span className="text-green-600">🌳</span>
          Add New Plants
        </h2>
        <p className="text-gray-600">Plant new avocado trees and manage your farm expansion</p>
      </div>

      {/* Bulk Planting Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-green-600">🚀</span>
          Bulk Planting
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Plot</label>
            <select
              value={selectedPlot}
              onChange={(e) => setSelectedPlot(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="P1">🌱 Plot 1 (P1)</option>
              <option value="P2">🌿 Plot 2 (P2)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Planting Date</label>
            <input
              type="date"
              value={bulkPlantingDate}
              onChange={(e) => setBulkPlantingDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Health Status</label>
            <select
              value={bulkHealthStatus}
              onChange={(e) => setBulkHealthStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="healthy">🟢 Healthy</option>
              <option value="moderate">🟡 Moderate</option>
              <option value="poor">🔴 Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plant Price (KSh)</label>
            <input
              type="number"
              value={plantPrice}
              onChange={(e) => setPlantPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Supplier name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
            <select
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select variety</option>
              <option value="Hass">Hass</option>
              <option value="Fuerte">Fuerte</option>
              <option value="Pinkerton">Pinkerton</option>
              <option value="Reed">Reed</option>
              <option value="Bacon">Bacon</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg mb-4">
          <div>
            <p className="text-green-800 font-medium">Available Trees in {selectedPlot}: {availableTrees.length}</p>
            <p className="text-green-600 text-sm">Total Cost: KSh {(availableTrees.length * (parseFloat(plantPrice) || 0)).toLocaleString()}</p>
          </div>
          <button
            onClick={handleBulkPlanting}
            disabled={!bulkPlantingDate || availableTrees.length === 0}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-semibold"
          >
            <span>🌱</span>
            Plant All ({availableTrees.length})
          </button>
        </div>
      </div>

      {/* Individual Tree Selection */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-green-100 border-b">
          <h3 className="text-xl font-semibold text-green-900 flex items-center gap-2">
            <span>🎯</span>
            Individual Tree Planting - {selectedPlot}
          </h3>
          <p className="text-green-700 text-sm mt-1">Select specific trees to plant individually</p>
        </div>
        
        <div className="p-6">
          {availableTrees.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🌳</span>
              <p className="text-gray-500 text-lg">All trees in {selectedPlot} have been planted!</p>
              <p className="text-gray-400">Switch to another plot to continue planting</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {availableTrees.map((tree) => (
                <div
                  key={tree.id}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 hover:bg-green-50 transition-all duration-200 cursor-pointer group"
                  onClick={() => handleIndividualPlanting(tree.id)}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🌱</div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{tree.id}</div>
                  <div className="text-xs text-gray-500">AV{tree.number}</div>
                  <div className="mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Click to Plant
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddPlants