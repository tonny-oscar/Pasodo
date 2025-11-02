import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Layout = ({ children, user, onLogout, onShowAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'plot1', label: 'Plot 1', path: '/plot1' },
    { id: 'plot2', label: 'Plot 2', path: '/plot2' },
    { id: 'plants', label: 'Add Plants', path: '/plants' },
    { id: 'replanting', label: 'Replanting', path: '/replanting' },
    { id: 'costs', label: 'Costs', path: '/costs' },
    { id: 'reports', label: 'Reports', path: '/reports' }
  ]

  const currentPath = location.pathname

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #166534 0%, #16a34a 100%)',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '4px',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src="/images/pexels-matreding-11911814.jpg" 
                  alt="Avocado Farm Logo" 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <div>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                </h1>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: 0
                }}>
                  Professional Farm Management
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              >
                Home
              </button>

              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right', display: window.innerWidth < 640 ? 'none' : 'block' }}>
                    <p style={{ fontSize: '14px', margin: 0, fontWeight: '600' }}>
                      {user.displayName || user.email}
                    </p>
                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                      Cloud Sync Active
                    </p>
                  </div>
                  <button
                    onClick={onLogout}
                    style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onShowAuth}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  Login
                </button>
              )}
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: window.innerWidth < 768 ? 'block' : 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '18px' }}>{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Desktop Navigation */}
          <div style={{
            display: window.innerWidth < 768 ? 'none' : 'flex',
            gap: '4px'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                style={{
                  padding: '16px 20px',
                  borderBottom: currentPath === tab.path ? '3px solid #16a34a' : '3px solid transparent',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  backgroundColor: currentPath === tab.path ? '#f0fdf4' : 'transparent',
                  color: currentPath === tab.path ? '#16a34a' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  if (currentPath !== tab.path) {
                    e.target.style.backgroundColor = '#f9fafb'
                    e.target.style.color = '#374151'
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPath !== tab.path) {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#6b7280'
                  }
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div style={{
            display: isMobileMenuOpen && window.innerWidth < 768 ? 'block' : 'none',
            padding: '8px 0'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  navigate(tab.path)
                  setIsMobileMenuOpen(false)
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  backgroundColor: currentPath === tab.path ? '#f0fdf4' : 'transparent',
                  color: currentPath === tab.path ? '#16a34a' : '#6b7280',
                  border: currentPath === tab.path ? '1px solid #16a34a' : '1px solid transparent',
                  cursor: 'pointer',
                  margin: '2px 0'
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        backgroundColor: '#f9fafb',
        minHeight: 'calc(100vh - 140px)'
      }}>
        {children}
      </main>
    </div>
  )
}

export default Layout