import { useState } from 'react'

const PlotMapView = ({ avocados, updateAvocado }) => {
  const [selectedPlot, setSelectedPlot] = useState('P1')
  const [selectedTree, setSelectedTree] = useState(null)
  
  const plotTrees = avocados.filter(av => av.plot === selectedPlot)
  
  const getTreeColor = (tree) => {
    if (!tree.plantingDate) return '#f3f4f6' // Gray for unplanted
    if (!tree.healthStatus) return '#fef3c7' // Yellow for planted but no status
    switch (tree.healthStatus) {
      case 'healthy': return '#d1fae5'
      case 'moderate': return '#fed7aa'
      case 'poor': return '#fecaca'
      case 'dead': return '#991b1b'
      default: return '#f3f4f6'
    }
  }
  
  const getTextColor = (tree) => {
    if (!tree.plantingDate) return '#6b7280'
    if (!tree.healthStatus) return '#92400e'
    switch (tree.healthStatus) {
      case 'healthy': return '#065f46'
      case 'moderate': return '#9a3412'
      case 'poor': return '#991b1b'
      case 'dead': return '#ffffff'
      default: return '#6b7280'
    }
  }

  const TreeCard = ({ tree, row, position }) => (
    <div
      onClick={() => setSelectedTree(tree)}
      style={{
        backgroundColor: getTreeColor(tree),
        color: getTextColor(tree),
        border: selectedTree?.id === tree.id ? '2px solid #3b82f6' : '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: '12px'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.05)'
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)'
        e.target.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {tree.id.split('/')[2]}
      </div>
      <div style={{ fontSize: '10px', opacity: 0.8 }}>
        R{row}AV{position}
      </div>
      <div style={{ fontSize: '10px', marginTop: '4px' }}>
        {!tree.plantingDate ? 'Not Planted' : 
         !tree.healthStatus ? 'No Status' : 
         tree.healthStatus.charAt(0).toUpperCase() + tree.healthStatus.slice(1)}
      </div>
    </div>
  )

  const renderPlotGrid = () => {
    const treesPerRow = selectedPlot === 'P1' ? 7 : 10
    const totalRows = selectedPlot === 'P1' ? 6 : 6
    const grid = []

    for (let row = 1; row <= totalRows; row++) {
      const rowTrees = []
      for (let pos = 1; pos <= treesPerRow; pos++) {
        const treeIndex = (row - 1) * treesPerRow + (pos - 1)
        if (treeIndex < plotTrees.length) {
          const tree = plotTrees[treeIndex]
          rowTrees.push(
            <TreeCard key={tree.id} tree={tree} row={row} position={pos} />
          )
        }
      }
      
      grid.push(
        <div key={row} style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#6b7280',
            marginBottom: '4px',
            textAlign: 'center'
          }}>
            Row {row}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${treesPerRow}, 1fr)`,
            gap: '8px'
          }}>
            {rowTrees}
          </div>
        </div>
      )
    }
    
    return grid
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '8px'
        }}>
          Plot Map View
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Visual layout of trees showing their physical positions in the plot
        </p>
      </div>

      {/* Plot Selector */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={() => setSelectedPlot('P1')}
            style={{
              backgroundColor: selectedPlot === 'P1' ? '#3b82f6' : '#f3f4f6',
              color: selectedPlot === 'P1' ? 'white' : '#6b7280',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Plot 1 (42 trees)
          </button>
          <button
            onClick={() => setSelectedPlot('P2')}
            style={{
              backgroundColor: selectedPlot === 'P2' ? '#16a34a' : '#f3f4f6',
              color: selectedPlot === 'P2' ? 'white' : '#6b7280',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Plot 2 (60 trees)
          </button>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          fontSize: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}></div>
            <span>Not Planted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}></div>
            <span>No Status</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#d1fae5', borderRadius: '4px' }}></div>
            <span>Healthy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#fed7aa', borderRadius: '4px' }}></div>
            <span>Moderate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#fecaca', borderRadius: '4px' }}></div>
            <span>Poor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: '#991b1b', borderRadius: '4px' }}></div>
            <span>Dead</span>
          </div>
        </div>
      </div>

      {/* Plot Grid */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {selectedPlot === 'P1' ? 'Plot 1 Layout (6 rows × 7 trees)' : 'Plot 2 Layout (6 rows × 10 trees)'}
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          {renderPlotGrid()}
        </div>
      </div>

      {/* Selected Tree Details */}
      {selectedTree && (
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: 0
            }}>
              Tree Details: {selectedTree.id}
            </h3>
            <button
              onClick={() => setSelectedTree(null)}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Planting Date
              </label>
              <input
                type="date"
                value={selectedTree.plantingDate || ''}
                onChange={(e) => {
                  updateAvocado(selectedTree.id, 'plantingDate', e.target.value)
                  setSelectedTree({...selectedTree, plantingDate: e.target.value})
                }}
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            
            {selectedTree.plantingDate && (
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                  Health Status
                </label>
                <select
                  value={selectedTree.healthStatus || ''}
                  onChange={(e) => {
                    updateAvocado(selectedTree.id, 'healthStatus', e.target.value)
                    setSelectedTree({...selectedTree, healthStatus: e.target.value})
                  }}
                  style={{
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="moderate">Moderate</option>
                  <option value="poor">Poor</option>
                  <option value="dead">Dead</option>
                </select>
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
                Notes
              </label>
              <input
                type="text"
                value={selectedTree.notes || ''}
                onChange={(e) => {
                  updateAvocado(selectedTree.id, 'notes', e.target.value)
                  setSelectedTree({...selectedTree, notes: e.target.value})
                }}
                placeholder="Add notes..."
                style={{
                  width: '100%',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlotMapView