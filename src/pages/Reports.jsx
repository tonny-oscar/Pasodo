const Reports = ({ avocados, costs }) => {
  const plot1Trees = avocados.filter(av => av.plot === 'P1')
  const plot2Trees = avocados.filter(av => av.plot === 'P2')
  
  const healthStats = {
    healthy: avocados.filter(av => av.healthStatus === 'healthy').length,
    moderate: avocados.filter(av => av.healthStatus === 'moderate').length,
    poor: avocados.filter(av => av.healthStatus === 'poor').length,
    dead: avocados.filter(av => av.healthStatus === 'dead').length
  }

  const costsByCategory = costs.reduce((acc, cost) => {
    const category = cost.category || 'Other'
    acc[category] = (acc[category] || 0) + (parseFloat(cost.cost) || 0)
    return acc
  }, {})

  const monthlyData = costs.reduce((acc, cost) => {
    if (!cost.date) return acc
    const month = new Date(cost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    acc[month] = (acc[month] || 0) + (parseFloat(cost.cost) || 0)
    return acc
  }, {})

  const totalCosts = costs.reduce((sum, cost) => sum + (parseFloat(cost.cost) || 0), 0)
  const plantedTrees = avocados.filter(av => av.plantingDate)
  const replantedTrees = avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3)

  const downloadComprehensiveReport = () => {
    const printContent = `
      <html>
        <head>
          <title>Comprehensive Farm Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            h1 { color: #16a34a; text-align: center; }
            h2 { color: #166534; border-bottom: 2px solid #16a34a; padding-bottom: 5px; }
            .summary { background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
            .stat-card { background-color: #f8fafc; padding: 15px; border-radius: 8px; text-align: center; }
            .stat-number { font-size: 24px; font-weight: bold; color: #16a34a; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .health-healthy { background-color: #dcfce7; color: #166534; }
            .health-poor { background-color: #fed7aa; color: #9a3412; }
            .health-dead { background-color: #fecaca; color: #991b1b; }
          </style>
        </head>
        <body>
          <h1>Avocado Farm AV1 - Comprehensive Report</h1>
          
          <div class="summary">
            <h3>Executive Summary</h3>
            <p><strong>Report Generated:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Farm Status:</strong> ${((plantedTrees.length / 102) * 100).toFixed(1)}% Complete</p>
            <p><strong>Total Investment:</strong> KSh ${totalCosts.toLocaleString()}</p>
            <p><strong>Active Trees:</strong> ${plantedTrees.length} of 102 total positions</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">${plantedTrees.length}</div>
              <div>Trees Planted</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${replantedTrees.length}</div>
              <div>Trees Replanted</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${healthStats.healthy}</div>
              <div>Healthy Trees</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">KSh ${totalCosts.toLocaleString()}</div>
              <div>Total Investment</div>
            </div>
          </div>

          <h2>Plot Analysis</h2>
          <table>
            <thead>
              <tr>
                <th>Plot</th>
                <th>Total Positions</th>
                <th>Trees Planted</th>
                <th>Healthy Trees</th>
                <th>Health Rate</th>
                <th>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Plot 1 (P1)</td>
                <td>42</td>
                <td>${plot1Trees.filter(t => t.plantingDate).length}</td>
                <td>${plot1Trees.filter(t => t.healthStatus === 'healthy').length}</td>
                <td>${((plot1Trees.filter(t => t.healthStatus === 'healthy').length / plot1Trees.filter(t => t.plantingDate).length) * 100 || 0).toFixed(1)}%</td>
                <td>${((plot1Trees.filter(t => t.plantingDate).length / 42) * 100).toFixed(1)}%</td>
              </tr>
              <tr>
                <td>Plot 2 (P2)</td>
                <td>60</td>
                <td>${plot2Trees.filter(t => t.plantingDate).length}</td>
                <td>${plot2Trees.filter(t => t.healthStatus === 'healthy').length}</td>
                <td>${((plot2Trees.filter(t => t.healthStatus === 'healthy').length / plot2Trees.filter(t => t.plantingDate).length) * 100 || 0).toFixed(1)}%</td>
                <td>${((plot2Trees.filter(t => t.plantingDate).length / 60) * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>

          <h2>Cost Analysis</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount (KSh)</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(costsByCategory).map(([category, amount]) => `
                <tr>
                  <td>${category}</td>
                  <td>KSh ${amount.toLocaleString()}</td>
                  <td>${((amount / totalCosts) * 100).toFixed(1)}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <h2>Tree Health Status</h2>
          <table>
            <thead>
              <tr>
                <th>Health Status</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr class="health-healthy">
                <td>Healthy</td>
                <td>${healthStats.healthy}</td>
                <td>${((healthStats.healthy / plantedTrees.length) * 100 || 0).toFixed(1)}%</td>
              </tr>
              <tr>
                <td>Moderate</td>
                <td>${healthStats.moderate}</td>
                <td>${((healthStats.moderate / plantedTrees.length) * 100 || 0).toFixed(1)}%</td>
              </tr>
              <tr class="health-poor">
                <td>Poor</td>
                <td>${healthStats.poor}</td>
                <td>${((healthStats.poor / plantedTrees.length) * 100 || 0).toFixed(1)}%</td>
              </tr>
              <tr class="health-dead">
                <td>Dead</td>
                <td>${healthStats.dead}</td>
                <td>${((healthStats.dead / plantedTrees.length) * 100 || 0).toFixed(1)}%</td>
              </tr>
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
              Farm Reports & Analytics
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              Comprehensive analysis of your avocado farm performance
            </p>
          </div>
          <button
            onClick={downloadComprehensiveReport}
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
            Download Full Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
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
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px' }}>
            {plantedTrees.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Trees Planted</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '8px' }}>
            {replantedTrees.length}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Trees Replanted</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
            KSh {totalCosts.toLocaleString()}
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Investment</div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#7c3aed', marginBottom: '8px' }}>
            {((plantedTrees.length / 102) * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Farm Completion</div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Tree Health Overview */}
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
            marginBottom: '20px'
          }}>
            Tree Health Overview
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#16a34a', borderRadius: '50%' }}></span>
                Healthy Trees
              </span>
              <span style={{ fontWeight: '600' }}>{healthStats.healthy}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></span>
                Moderate Health
              </span>
              <span style={{ fontWeight: '600' }}>{healthStats.moderate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
                Poor Health
              </span>
              <span style={{ fontWeight: '600' }}>{healthStats.poor}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#6b7280', borderRadius: '50%' }}></span>
                Dead Trees
              </span>
              <span style={{ fontWeight: '600' }}>{healthStats.dead}</span>
            </div>
          </div>
        </div>

        {/* Plot Comparison */}
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
            marginBottom: '20px'
          }}>
            Plot Comparison
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              borderLeft: '4px solid #3b82f6',
              paddingLeft: '16px'
            }}>
              <h4 style={{ fontWeight: '600', color: '#1e40af', margin: 0 }}>Plot 1 (P1)</h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                Trees: 42 | Planted: {plot1Trees.filter(t => t.plantingDate).length}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                Health Rate: {((plot1Trees.filter(t => t.healthStatus === 'healthy').length / plot1Trees.filter(t => t.plantingDate).length) * 100 || 0).toFixed(1)}%
              </p>
            </div>
            <div style={{
              borderLeft: '4px solid #16a34a',
              paddingLeft: '16px'
            }}>
              <h4 style={{ fontWeight: '600', color: '#15803d', margin: 0 }}>Plot 2 (P2)</h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                Trees: 60 | Planted: {plot2Trees.filter(t => t.plantingDate).length}
              </p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                Health Rate: {((plot2Trees.filter(t => t.healthStatus === 'healthy').length / plot2Trees.filter(t => t.plantingDate).length) * 100 || 0).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Cost Breakdown */}
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
            marginBottom: '20px'
          }}>
            Cost Breakdown by Category
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(costsByCategory).map(([category, amount]) => (
              <div key={category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151' }}>{category}</span>
                <span style={{ fontWeight: '600' }}>KSh {amount.toLocaleString()}</span>
              </div>
            ))}
            {Object.keys(costsByCategory).length === 0 && (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '16px 0' }}>No cost data available</p>
            )}
          </div>
        </div>

        {/* Monthly Expenses */}
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
            marginBottom: '20px'
          }}>
            Monthly Expenses (Last 6 Months)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(monthlyData)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .slice(-6)
              .map(([month, amount]) => (
                <div key={month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#374151' }}>{month}</span>
                  <span style={{ fontWeight: '600' }}>KSh {amount.toLocaleString()}</span>
                </div>
              ))}
            {Object.keys(monthlyData).length === 0 && (
              <p style={{ color: '#6b7280', textAlign: 'center', padding: '16px 0' }}>No monthly data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports