const Plot2 = ({ avocados, updateAvocado, updateReplanting }) => {
  const plot2Trees = avocados.filter(av => av.plot === 'P2')

  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Plot 2 (P2) - Avocado Trees Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #16a34a; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .summary { background-color: #dcfce7; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>Avocado Farm AV1 - Plot 2 (P2) Report</h1>
          <div class="summary">
            <h3>Plot Summary</h3>
            <p><strong>Tree Range:</strong> AV/P2/043 - AV/P2/102</p>
            <p><strong>Total Trees:</strong> 60 avocado trees</p>
            <p><strong>Planted Trees:</strong> ${plot2Trees.filter(t => t.plantingDate).length} trees</p>
            <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tree ID</th>
                <th>Number</th>
                <th>Planting Date</th>
                <th>Health Status</th>
                <th>R1 Date</th>
                <th>R2 Date</th>
                <th>R3 Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${plot2Trees.map(tree => `
                <tr>
                  <td>${tree.id}</td>
                  <td>AV${tree.number}</td>
                  <td>${tree.plantingDate || '-'}</td>
                  <td>${tree.healthStatus || 'healthy'}</td>
                  <td>${tree.replanting.R1 || '-'}</td>
                  <td>${tree.replanting.R2 || '-'}</td>
                  <td>${tree.replanting.R3 || '-'}</td>
                  <td>${tree.notes || '-'}</td>
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
              Plot 2 (P2) - Avocado Trees
            </h2>
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
          backgroundColor: '#dcfce7',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #86efac'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <p style={{ color: '#15803d', fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>Tree Range</p>
              <p style={{ color: '#1f2937', fontWeight: '500', margin: 0 }}>AV/P2/043 - AV/P2/102</p>
            </div>
            <div>
              <p style={{ color: '#15803d', fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>Total Trees</p>
              <p style={{ color: '#1f2937', fontWeight: '500', margin: 0 }}>60 avocado trees</p>
            </div>
            <div>
              <p style={{ color: '#15803d', fontWeight: '600', fontSize: '14px', margin: '0 0 4px 0' }}>Planted</p>
              <p style={{ color: '#1f2937', fontWeight: '500', margin: 0 }}>{plot2Trees.filter(t => t.plantingDate).length} trees</p>
            </div>
          </div>
        </div>
      </div>

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
            Plot 2 Tree Management
          </h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Tree ID</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Number</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Planting Date</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Health Status</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>R1 Date</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>R2 Date</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>R3 Date</th>
                <th style={{
                  padding: '12px 24px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Notes</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white' }}>
              {plot2Trees.map((avocado) => (
                <tr key={avocado.id} style={{
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>
                        {avocado.id}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#dcfce7',
                      color: '#15803d',
                      borderRadius: '20px'
                    }}>
                      AV{avocado.number}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <input
                      type="date"
                      value={avocado.plantingDate}
                      onChange={(e) => updateAvocado(avocado.id, 'plantingDate', e.target.value)}
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {avocado.plantingDate ? (
                      <select
                        value={avocado.healthStatus || ''}
                        onChange={(e) => updateAvocado(avocado.id, 'healthStatus', e.target.value)}
                        style={{
                          fontSize: '14px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          padding: '8px 12px',
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
                    ) : (
                      <span style={{ color: '#9ca3af', fontSize: '14px' }}>Not Planted</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <input
                      type="date"
                      value={avocado.replanting.R1}
                      onChange={(e) => updateReplanting(avocado.id, 'R1', e.target.value)}
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <input
                      type="date"
                      value={avocado.replanting.R2}
                      onChange={(e) => updateReplanting(avocado.id, 'R2', e.target.value)}
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <input
                      type="date"
                      value={avocado.replanting.R3}
                      onChange={(e) => updateReplanting(avocado.id, 'R3', e.target.value)}
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <input
                      type="text"
                      value={avocado.notes || ''}
                      onChange={(e) => updateAvocado(avocado.id, 'notes', e.target.value)}
                      placeholder="Add notes..."
                      style={{
                        fontSize: '14px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        width: '100%',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#16a34a'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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