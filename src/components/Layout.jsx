import { useState } from 'react'

const Layout = ({ children, activeTab, setActiveTab, showNavigation = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'plot1', label: 'Plot 1', icon: '🌱' },
    { id: 'plot2', label: 'Plot 2', icon: '🌿' },
    { id: 'plants', label: 'Add Plants', icon: '🌳' },
    { id: 'replanting', label: 'Replanting', icon: '🔄' },
    { id: 'costs', label: 'Costs', icon: '💰' },
    { id: 'reports', label: 'Reports', icon: '📈' }
  ]

  if (!showNavigation) {
    return children
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 to-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <span className="text-2xl">🥑</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Avocado Farm AV1</h1>
                <p className="text-green-100 text-sm hidden sm:block">Professional Farm Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('landing')}
                className="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200 text-sm font-medium"
              >
                🏠 Home
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden bg-white bg-opacity-20 p-2 rounded-lg"
              >
                <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-700 bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="py-2 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full text-left py-3 px-4 rounded-lg font-medium text-sm flex items-center gap-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout