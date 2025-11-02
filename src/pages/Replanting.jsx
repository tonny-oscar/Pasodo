const Replanting = ({ avocados, updateReplanting, updateAvocado }) => {
  const plantedTrees = avocados.filter(av => av.plantingDate)
  const treesNeedingReplanting = avocados.filter(av => 
    av.plantingDate && (av.healthStatus === 'poor' || av.healthStatus === 'dead')
  )
  const unplantedTrees = avocados.filter(av => !av.plantingDate)

  const handleBulkReplanting = (replantType, date) => {
    treesNeedingReplanting.forEach(tree => {
      updateReplanting(tree.id, replantType, date)
      updateAvocado(tree.id, 'healthStatus', 'healthy')
    })
  }

  const handlePlantTree = (treeId, date) => {
    updateAvocado(treeId, 'plantingDate', date)
    updateAvocado(treeId, 'healthStatus', 'healthy')
  }

  const handleBulkPlanting = (date) => {
    unplantedTrees.forEach(tree => {
      handlePlantTree(tree.id, date)
    })
  }

  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Replanting Management Report</title>
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
          <h1>Avocado Farm AV1 - Replanting Management Report</h1>
          <div class="summary">
            <h3>Replanting Summary</h3>
            <p><strong>Trees Needing Replanting:</strong> ${treesNeedingReplanting.length}</p>
            <p><strong>R1 Replanted:</strong> ${avocados.filter(av => av.replanting.R1).length} trees</p>
            <p><strong>Total Replanted:</strong> ${avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3).length} trees</p>
            <p><strong>Unplanted Trees:</strong> ${unplantedTrees.length} trees</p>
            <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tree ID</th>
                <th>Plot</th>
                <th>Health Status</th>
                <th>Original Planting</th>
                <th>R1 Date</th>
                <th>R2 Date</th>
                <th>R3 Date</th>
              </tr>
            </thead>
            <tbody>
              ${avocados.map(tree => `
                <tr>
                  <td>${tree.id}</td>
                  <td>${tree.plot}</td>
                  <td>${tree.plantingDate ? (tree.healthStatus || 'healthy') : 'Not Planted'}</td>
                  <td>${tree.plantingDate || '-'}</td>
                  <td>${tree.replanting.R1 || '-'}</td>
                  <td>${tree.replanting.R2 || '-'}</td>
                  <td>${tree.replanting.R3 || '-'}</td>
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
              Tree Replanting Management
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Manage replanting cycles R1, R2, and R3 for your avocado trees
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Trees Needing Replanting</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#ea580c', margin: '8px 0 0 0' }}>{treesNeedingReplanting.length}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>R1 Replanted</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', margin: '8px 0 0 0' }}>{avocados.filter(av => av.replanting.R1).length}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Total Replanted</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a', margin: '8px 0 0 0' }}>{avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3).length}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Unplanted Trees</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b', margin: '8px 0 0 0' }}>{unplantedTrees.length}</p>
          </div>
        </div>
      </div>

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
          Quick Actions
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              R1 Replanting
            </h4>
            <input
              type="date"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '12px',
                outline: 'none'
              }}
              onChange={(e) => e.target.value && handleBulkReplanting('R1', e.target.value)}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>First replanting cycle for poor/dead trees</p>
          </div>

          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              R2 Replanting
            </h4>
            <input
              type="date"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '12px',
                outline: 'none'
              }}
              onChange={(e) => e.target.value && handleBulkReplanting('R2', e.target.value)}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Second replanting cycle</p>
          </div>

          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              R3 Replanting
            </h4>
            <input
              type="date"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '12px',
                outline: 'none'
              }}
              onChange={(e) => e.target.value && handleBulkReplanting('R3', e.target.value)}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Third replanting cycle</p>
          </div>

          <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <h4 style={{
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              Plant New Trees
            </h4>
            <input
              type="date"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '12px',
                outline: 'none'
              }}
              onChange={(e) => e.target.value && handleBulkPlanting(e.target.value)}
            />
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Plant all unplanted trees ({unplantedTrees.length} trees)</p>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '24px'
        }}>
          Individual Tree Management
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Tree ID</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Plot</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Status</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Original Planting</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>R1 Date</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>R2 Date</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>R3 Date</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {avocados.map((tree, index) => (
                <tr key={tree.id} style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <td style={{
                    padding: '12px 16px',
                    fontWeight: '500',
                    color: '#1f2937'
                  }}>{tree.id}</td>
                  <td style={{
                    padding: '12px 16px',
                    color: '#6b7280'
                  }}>{tree.plot}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {!tree.plantingDate ? (
                      <span style={{
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>Not Planted</span>
                    ) : (
                      <span style={{
                        backgroundColor: tree.healthStatus === 'healthy' ? '#d1fae5' : 
                                       tree.healthStatus === 'poor' ? '#fed7aa' : '#fecaca',
                        color: tree.healthStatus === 'healthy' ? '#065f46' : 
                               tree.healthStatus === 'poor' ? '#9a3412' : '#991b1b',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        textTransform: 'capitalize'
                      }}>{tree.healthStatus || 'healthy'}</span>
                    )}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    color: '#6b7280'
                  }}>
                    {!tree.plantingDate ? (
                      <input
                        type="date"
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          outline: 'none'
                        }}
                        onChange={(e) => e.target.value && handlePlantTree(tree.id, e.target.value)}
                      />
                    ) : (
                      tree.plantingDate
                    )}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    color: '#6b7280'
                  }}>
                    {tree.replanting.R1 ? (
                      tree.replanting.R1
                    ) : tree.plantingDate && (tree.healthStatus === 'poor' || tree.healthStatus === 'dead') ? (
                      <input
                        type="date"
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          outline: 'none'
                        }}
                        onChange={(e) => {
                          if (e.target.value) {
                            updateReplanting(tree.id, 'R1', e.target.value)
                            updateAvocado(tree.id, 'healthStatus', 'healthy')
                          }
                        }}
                      />
                    ) : '-'}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    color: '#6b7280'
                  }}>
                    {tree.replanting.R2 ? (
                      tree.replanting.R2
                    ) : tree.replanting.R1 && (tree.healthStatus === 'poor' || tree.healthStatus === 'dead') ? (
                      <input
                        type="date"
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          outline: 'none'
                        }}
                        onChange={(e) => {
                          if (e.target.value) {
                            updateReplanting(tree.id, 'R2', e.target.value)
                            updateAvocado(tree.id, 'healthStatus', 'healthy')
                          }
                        }}
                      />
                    ) : '-'}
                  </td>
                  <td style={{
                    padding: '12px 16px',
                    color: '#6b7280'
                  }}>
                    {tree.replanting.R3 ? (
                      tree.replanting.R3
                    ) : tree.replanting.R2 && (tree.healthStatus === 'poor' || tree.healthStatus === 'dead') ? (
                      <input
                        type="date"
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          outline: 'none'
                        }}
                        onChange={(e) => {
                          if (e.target.value) {
                            updateReplanting(tree.id, 'R3', e.target.value)
                            updateAvocado(tree.id, 'healthStatus', 'healthy')
                          }
                        }}
                      />
                    ) : '-'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {tree.plantingDate && (
                      <select
                        value={tree.healthStatus || 'healthy'}
                        onChange={(e) => updateAvocado(tree.id, 'healthStatus', e.target.value)}
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="healthy">Healthy</option>
                        <option value="poor">Poor</option>
                        <option value="dead">Dead</option>
                      </select>
                    )}
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

export default Replanting