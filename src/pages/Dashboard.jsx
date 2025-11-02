const Dashboard = ({ avocados, costs }) => {
  const plot1Trees = avocados.filter(av => av.plot === 'P1')
  const plot2Trees = avocados.filter(av => av.plot === 'P2')
  const totalCost = costs.reduce((sum, cost) => sum + (parseFloat(cost.cost) || 0), 0)
  const plantedTrees = avocados.filter(av => av.plantingDate).length
  const replantedTrees = avocados.filter(av => av.replanting.R1 || av.replanting.R2 || av.replanting.R3).length
  const totalPlantCost = avocados.reduce((sum, av) => sum + (parseFloat(av.plantPrice) || 0), 0)
  const healthyTrees = avocados.filter(av => av.healthStatus === 'healthy').length
  const unhealthyTrees = avocados.filter(av => av.healthStatus === 'poor' || av.healthStatus === 'dead').length

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '8px'
        }}>
          Farm Overview Dashboard
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Complete overview of your avocado farm operations and performance
        </p>
      </div>
      
      {/* Key Metrics Grid */}
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
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Total Trees</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#16a34a', margin: '8px 0 0 0' }}>102</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Planted Trees</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6', margin: '8px 0 0 0' }}>{plantedTrees}</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Healthy Trees</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#059669', margin: '8px 0 0 0' }}>{healthyTrees}</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', margin: 0 }}>Total Investment</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#7c3aed', margin: '8px 0 0 0' }}>
              KSh {(totalCost + totalPlantCost).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Plot Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 20px 0' }}>
            Plot 1 (P1) Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Total Trees</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>42</p>
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Planted</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
                {plot1Trees.filter(t => t.plantingDate).length}
              </p>
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Range</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>AV/P1/001 - AV/P1/042</p>
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Progress</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '60px',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(plot1Trees.filter(t => t.plantingDate).length / 42) * 100}%`,
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    borderRadius: '4px'
                  }}></div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
                  {Math.round((plot1Trees.filter(t => t.plantingDate).length / 42) * 100)}%
                </span>
              </div>
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
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 20px 0' }}>
            Plot 2 (P2) Summary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Total Trees</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>60</p>
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Planted</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', margin: 0 }}>
                {plot2Trees.filter(t => t.plantingDate).length}
              </p>
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Range</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', margin: 0 }}>AV/P2/043 - AV/P2/102</p>
            </div>
            <div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Progress</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '60px',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(plot2Trees.filter(t => t.plantingDate).length / 60) * 100}%`,
                    height: '100%',
                    backgroundColor: '#16a34a',
                    borderRadius: '4px'
                  }}></div>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#16a34a' }}>
                  {Math.round((plot2Trees.filter(t => t.plantingDate).length / 60) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {/* Financial Overview */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px'
          }}>
            Financial Overview
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>Plant Costs</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>KSh {totalPlantCost.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>Operational Costs</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>KSh {totalCost.toLocaleString()}</span>
            </div>
            <div style={{
              borderTop: '2px solid #e5e7eb',
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#1f2937', fontWeight: '600' }}>Total Investment</span>
              <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#16a34a' }}>
                KSh {(totalCost + totalPlantCost).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px'
          }}>
            Recent Activities
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {costs.slice(-4).reverse().map(cost => (
              <div key={cost.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #f3f4f6'
              }}>
                <div>
                  <p style={{ fontWeight: '600', color: '#1f2937', margin: 0, fontSize: '14px' }}>
                    {cost.activityName || 'Unnamed Activity'}
                  </p>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '12px' }}>
                    {cost.date} • {cost.attendant}
                  </p>
                </div>
                <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>
                  KSh {parseFloat(cost.cost || 0).toLocaleString()}
                </span>
              </div>
            ))}
            {costs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>
                <p style={{ margin: 0 }}>No activities recorded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard