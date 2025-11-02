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
    if (!bulkPlantingDate) {
      alert('Please select a planting date.')
      return
    }
    
    if (availableTrees.length === 0) {
      alert('No trees available to plant in this plot.')
      return
    }

    try {
      console.log('Bulk planting', availableTrees.length, 'trees in', selectedPlot)
      
      // Create a single updated array with all changes
      const updatedAvocados = avocados.map(tree => {
        if (availableTrees.find(availableTree => availableTree.id === tree.id)) {
          return {
            ...tree,
            plantingDate: bulkPlantingDate,
            healthStatus: bulkHealthStatus,
            ...(plantPrice && { plantPrice }),
            ...(supplier && { supplier }),
            ...(variety && { variety })
          }
        }
        return tree
      })
      
      // Single Firebase update
      console.log('Calling updateAvocado for bulk update with', updatedAvocados.length, 'trees')
      updateAvocado('bulk_update', 'bulk', updatedAvocados)

      // Reset form
      setBulkPlantingDate('')
      setPlantPrice('')
      setSupplier('')
      setVariety('')
      
      alert(`Successfully planted ${availableTrees.length} trees in ${selectedPlot}!`)
      console.log('Bulk planting completed successfully')
    } catch (error) {
      console.error('Error in bulk planting:', error)
      alert('Error planting trees. Please try again.')
    }
  }

  const handleIndividualPlanting = async (treeId) => {
    try {
      const plantingDate = bulkPlantingDate || new Date().toISOString().split('T')[0]
      console.log('Individual planting tree:', treeId, 'with date:', plantingDate)
      
      // Create updated tree object
      const updatedAvocados = avocados.map(tree => {
        if (tree.id === treeId) {
          return {
            ...tree,
            plantingDate,
            healthStatus: bulkHealthStatus,
            ...(plantPrice && { plantPrice }),
            ...(supplier && { supplier }),
            ...(variety && { variety })
          }
        }
        return tree
      })
      
      console.log('Calling updateAvocado for individual tree:', treeId)
      updateAvocado('bulk_update', 'bulk', updatedAvocados)
      
      console.log('Tree planted successfully:', treeId)
      alert(`Successfully planted tree ${treeId}!`)
    } catch (error) {
      console.error('Error planting tree:', error)
      alert('Error planting tree. Please try again.')
    }
  }

  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Plant Management Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #16a34a; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .summary { background-color: #fed7aa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>Avocado Farm AV1 - Plant Management Report</h1>
          <div class="summary">
            <h3>Planting Summary</h3>
            <p><strong>Available Trees in ${selectedPlot}:</strong> ${availableTrees.length}</p>
            <p><strong>Total Planted Trees:</strong> ${avocados.filter(av => av.plantingDate).length}</p>
            <p><strong>Total Trees:</strong> ${avocados.length}</p>
            <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tree ID</th>
                <th>Plot</th>
                <th>Status</th>
                <th>Planting Date</th>
                <th>Variety</th>
                <th>Supplier</th>
                <th>Price (KSh)</th>
              </tr>
            </thead>
            <tbody>
              ${availableTrees.map(tree => `
                <tr>
                  <td>${tree.id}</td>
                  <td>${tree.plot}</td>
                  <td>Available for Planting</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Add New Plants
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Plant new avocado trees and manage your farm expansion
            </p>
          </div>
          <button
            onClick={downloadPDF}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Bulk Planting Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '24px'
        }}>
          Bulk Planting
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Select Plot
            </label>
            <select
              value={selectedPlot}
              onChange={(e) => setSelectedPlot(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="P1">Plot 1 (P1)</option>
              <option value="P2">Plot 2 (P2)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Planting Date
            </label>
            <input
              type="date"
              value={bulkPlantingDate}
              onChange={(e) => setBulkPlantingDate(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Health Status
            </label>
            <select
              value={bulkHealthStatus}
              onChange={(e) => setBulkHealthStatus(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="healthy">Healthy</option>
              <option value="moderate">Moderate</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Plant Price (KSh)
            </label>
            <input
              type="number"
              value={plantPrice}
              onChange={(e) => setPlantPrice(e.target.value)}
              placeholder="0.00"
              step="0.01"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Supplier
            </label>
            <input
              type="text"
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Supplier name"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Variety
            </label>
            <select
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white'
              }}
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

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f0fdf4',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div>
            <p style={{ color: '#166534', fontWeight: '500', margin: 0 }}>
              Available Trees in {selectedPlot}: {availableTrees.length}
            </p>
            <p style={{ color: '#16a34a', fontSize: '14px', margin: '4px 0 0 0' }}>
              Total Cost: KSh {(availableTrees.length * (parseFloat(plantPrice) || 0)).toLocaleString()}
            </p>
          </div>
          <button
            onClick={handleBulkPlanting}
            disabled={!bulkPlantingDate || availableTrees.length === 0}
            style={{
              backgroundColor: availableTrees.length === 0 || !bulkPlantingDate ? '#9ca3af' : '#16a34a',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: availableTrees.length === 0 || !bulkPlantingDate ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              if (availableTrees.length > 0 && bulkPlantingDate) {
                e.target.style.backgroundColor = '#15803d'
              }
            }}
            onMouseOut={(e) => {
              if (availableTrees.length > 0 && bulkPlantingDate) {
                e.target.style.backgroundColor = '#16a34a'
              }
            }}
          >
            Plant All ({availableTrees.length})
          </button>
        </div>
      </div>

      {/* Individual Tree Selection */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px 24px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            Individual Tree Planting - {selectedPlot}
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0 0' }}>
            Select specific trees to plant individually
          </p>
        </div>
        
        <div style={{ padding: '24px' }}>
          {availableTrees.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#6b7280'
            }}>
              <p style={{ fontSize: '20px', marginBottom: '8px' }}>All trees in {selectedPlot} have been planted!</p>
              <p style={{ fontSize: '16px', color: '#9ca3af' }}>Switch to another plot to continue planting</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '16px'
            }}>
              {availableTrees.map((tree) => (
                <div
                  key={tree.id}
                  onClick={() => {
                    handleIndividualPlanting(tree.id)
                  }}
                  style={{
                    backgroundColor: '#f9fafb',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#16a34a'
                    e.currentTarget.style.backgroundColor = '#f0fdf4'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db'
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                    {tree.id}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    AV{tree.number}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '12px',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '4px 8px',
                      borderRadius: '12px'
                    }}>
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