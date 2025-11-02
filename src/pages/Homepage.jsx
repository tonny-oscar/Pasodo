const Homepage = ({ onShowAuth }) => {
  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/pexels-matthias-oben-2060028-3687927.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}></div>
      
      {/* Navigation */}
      <nav style={{
        position: 'relative',
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              backgroundColor: '#16a34a',
              padding: '8px',
              borderRadius: '50%'
            }}>
              <span style={{ fontSize: '24px' }}></span>
            </div>
            <h2 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              margin: 0
            }}>
            </h2>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onShowAuth('login')}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '8px 24px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#16a34a'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = 'white'
              }}
            >
              Login
            </button>
            <button
              onClick={() => onShowAuth('signup')}
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                border: '2px solid #16a34a',
                padding: '8px 24px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '60px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          color: 'white'
        }}>
          {/* Hero Section */}
          <div style={{ marginBottom: '80px' }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              lineHeight: '1.1'
            }}>
              Professional Farm Management
            </h1>
            <p style={{
              fontSize: '24px',
              color: '#ffffff',
              maxWidth: '800px',
              margin: '0 auto',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}>
              Manage your avocado farm with modern technology. Track 102 trees across two plots with real-time analytics and cost management.
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', color: '#22c55e' }}>🌳</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#ffffff' }}>102 Trees</h3>
              <p style={{ color: '#e5e7eb' }}>Complete tracking of avocado trees across Plot 1 (42 trees) and Plot 2 (60 trees)</p>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', color: '#22c55e' }}>💰</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#ffffff' }}>Cost Management</h3>
              <p style={{ color: '#e5e7eb' }}>Track expenses, investments, and financial performance in KSh currency</p>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '32px',
              borderRadius: '16px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px', color: '#22c55e' }}>📊</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#ffffff' }}>Analytics</h3>
              <p style={{ color: '#e5e7eb' }}>Detailed reports, health monitoring, and farm performance insights</p>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ marginBottom: '60px' }}>
            <p style={{ color: '#ffffff', fontSize: '18px', marginBottom: '32px', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>
              Join thousands of farmers managing their crops digitally
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '32px',
              color: '#ffffff',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#22c55e' }}>✓</span>
                <span>Cloud Sync</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#22c55e' }}>✓</span>
                <span>Mobile Friendly</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#22c55e' }}>✓</span>
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage