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

  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Cost Management Report</title>
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
          <h1>Avocado Farm AV1 - Cost Management Report</h1>
          <div class="summary">
            <h3>Cost Summary</h3>
            <p><strong>Total Costs:</strong> KSh ${totalCost.toLocaleString()}</p>
            <p><strong>This Month:</strong> KSh ${thisMonthTotal.toLocaleString()}</p>
            <p><strong>Total Entries:</strong> ${costs.length}</p>
            <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Activity Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Attendant</th>
                <th>Cost (KSh)</th>
                <th>Payment Method</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${costs.map(cost => `
                <tr>
                  <td>${cost.activityName || '-'}</td>
                  <td>${cost.category || '-'}</td>
                  <td>${cost.date || '-'}</td>
                  <td>${cost.attendant || '-'}</td>
                  <td>KSh ${parseFloat(cost.cost || 0).toLocaleString()}</td>
                  <td>${cost.paymentMethod || '-'}</td>
                  <td>${cost.notes || '-'}</td>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px'
            }}>
              Cost Management
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Track and manage all farm expenses
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
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
            <button
              onClick={addCost}
              style={{
                backgroundColor: '#16a34a',
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
              onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
            >
              Add New Cost Entry
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Total Costs</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a', margin: '8px 0 0 0' }}>KSh {totalCost.toLocaleString()}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>This Month</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', margin: '8px 0 0 0' }}>KSh {thisMonthTotal.toLocaleString()}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Total Entries</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#7c3aed', margin: '8px 0 0 0' }}>{costs.length}</p>
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
          Farm Expense Records
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
                }}>Activity Name</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Category</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Date</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Attendant</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Cost (KSh)</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Payment</th>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>Notes</th>
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
              {costs.map((cost, index) => (
                <tr key={cost.id} style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="text"
                      value={cost.activityName || ''}
                      onChange={(e) => updateCost(cost.id, 'activityName', e.target.value)}
                      placeholder="Enter activity name"
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={cost.category || ''}
                      onChange={(e) => updateCost(cost.id, 'category', e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: 'white',
                        width: '100%'
                      }}
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="date"
                      value={cost.date || ''}
                      onChange={(e) => updateCost(cost.id, 'date', e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="text"
                      value={cost.attendant || ''}
                      onChange={(e) => updateCost(cost.id, 'attendant', e.target.value)}
                      placeholder="Attendant name"
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6b7280',
                        fontSize: '14px'
                      }}>KSh</span>
                      <input
                        type="number"
                        value={cost.cost || ''}
                        onChange={(e) => updateCost(cost.id, 'cost', e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        style={{
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '8px 12px 8px 48px',
                          fontSize: '14px',
                          outline: 'none',
                          width: '100%'
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <select
                      value={cost.paymentMethod || ''}
                      onChange={(e) => updateCost(cost.id, 'paymentMethod', e.target.value)}
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: 'white',
                        width: '100%'
                      }}
                    >
                      <option value="">Select method</option>
                      <option value="cash">Cash</option>
                      <option value="mpesa">M-Pesa</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="card">Card</option>
                      <option value="check">Check</option>
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="text"
                      value={cost.notes || ''}
                      onChange={(e) => updateCost(cost.id, 'notes', e.target.value)}
                      placeholder="Additional notes"
                      style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => deleteCost(cost.id)}
                      style={{
                        color: '#dc2626',
                        backgroundColor: 'transparent',
                        border: '1px solid #dc2626',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#dc2626'
                        e.target.style.color = 'white'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = '#dc2626'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {costs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '64px 24px',
            color: '#6b7280'
          }}>
            <p style={{ fontSize: '20px', marginBottom: '8px' }}>No cost entries yet</p>
            <p style={{ fontSize: '16px', color: '#9ca3af' }}>Click "Add New Cost Entry" to get started</p>
          </div>
        )}

        {costs.length > 0 && (
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '16px 24px',
            borderTop: '1px solid #e5e7eb',
            marginTop: '24px',
            borderRadius: '0 0 12px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#6b7280', fontWeight: '500' }}>Total Farm Investment:</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>KSh {totalCost.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CostManagement