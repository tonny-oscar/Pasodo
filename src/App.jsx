import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AuthModal from './components/AuthModal'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Plot1 from './pages/Plot1'
import Plot2 from './pages/Plot2'
import PlotMapView from './pages/PlotMapView'
import AddPlants from './pages/AddPlants'
import Replanting from './pages/Replanting'
import CostManagement from './pages/CostManagement'
import Reports from './pages/Reports'
import { useAuth } from './hooks/useAuth'
import { useFirestore } from './hooks/useFirestore'

const AppContent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const { user, loading: authLoading, logout } = useAuth()
  const { avocados, costs, loading: dataLoading, saveAvocados, saveCosts } = useFirestore(user?.uid)
  const navigate = useNavigate()

  // Fallback to localStorage if not authenticated
  const [localAvocados, setLocalAvocados] = useState(() => {
    const saved = localStorage.getItem('avocados')
    if (saved) return JSON.parse(saved)
    
    const initial = []
    for (let i = 1; i <= 42; i++) {
      initial.push({
        id: `AV/P1/${i.toString().padStart(3, '0')}`,
        number: i,
        plot: 'P1',
        plantingDate: '',
        healthStatus: null,
        notes: '',
        plantPrice: '',
        supplier: '',
        variety: '',
        replanting: { R1: '', R2: '', R3: '' }
      })
    }
    for (let i = 43; i <= 102; i++) {
      initial.push({
        id: `AV/P2/${i.toString().padStart(3, '0')}`,
        number: i,
        plot: 'P2',
        plantingDate: '',
        healthStatus: null,
        notes: '',
        plantPrice: '',
        supplier: '',
        variety: '',
        replanting: { R1: '', R2: '', R3: '' }
      })
    }
    return initial
  })

  const [localCosts, setLocalCosts] = useState(() => {
    const saved = localStorage.getItem('costs')
    return saved ? JSON.parse(saved) : []
  })

  const currentAvocados = user ? avocados : localAvocados
  const currentCosts = user ? costs : localCosts

  const saveCurrentAvocados = (newAvocados) => {
    console.log('saveCurrentAvocados called:', { user: user?.email, authenticated: !!user })
    
    if (user) {
      console.log('Saving to Firebase for user:', user.email)
      saveAvocados(newAvocados)
    } else {
      console.log('Saving to localStorage (not authenticated)')
      setLocalAvocados(newAvocados)
      localStorage.setItem('avocados', JSON.stringify(newAvocados))
    }
  }

  const saveCurrentCosts = (newCosts) => {
    if (user) {
      saveCosts(newCosts)
    } else {
      setLocalCosts(newCosts)
      localStorage.setItem('costs', JSON.stringify(newCosts))
    }
  }

  const updateAvocado = (id, field, value) => {
    console.log('updateAvocado called:', { id, field, user: user?.email })
    
    let updated
    if (id === 'bulk_update' && field === 'bulk') {
      // Handle bulk update - value is the entire updated array
      updated = value
    } else {
      // Handle individual update
      updated = currentAvocados.map(av => 
        av.id === id ? { ...av, [field]: value } : av
      )
    }
    
    console.log('Saving to Firebase:', { user: user?.email, treeCount: updated.length })
    saveCurrentAvocados(updated)
  }

  const updateReplanting = (id, replantType, date) => {
    const updated = currentAvocados.map(av => 
      av.id === id ? { ...av, replanting: { ...av.replanting, [replantType]: date } } : av
    )
    saveCurrentAvocados(updated)
  }

  const addCost = () => {
    const newCost = {
      id: Date.now(),
      activityName: '',
      category: '',
      date: '',
      attendant: '',
      cost: '',
      paymentMethod: '',
      notes: ''
    }
    saveCurrentCosts([...currentCosts, newCost])
  }

  const updateCost = (id, field, value) => {
    const updated = currentCosts.map(cost => 
      cost.id === id ? { ...cost, [field]: value } : cost
    )
    saveCurrentCosts(updated)
  }

  const deleteCost = (id) => {
    saveCurrentCosts(currentCosts.filter(cost => cost.id !== id))
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    navigate('/dashboard')
  }

  const handleShowAuth = (mode = 'login') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #14532d 0%, #16a34a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>Loading Farm...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/dashboard" replace /> : <Homepage onShowAuth={handleShowAuth} />
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <Dashboard avocados={currentAvocados} costs={currentCosts} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/plot1" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <Plot1 avocados={currentAvocados} updateAvocado={updateAvocado} updateReplanting={updateReplanting} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/plot2" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <Plot2 avocados={currentAvocados} updateAvocado={updateAvocado} updateReplanting={updateReplanting} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/plants" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <AddPlants avocados={currentAvocados} updateAvocado={updateAvocado} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/plot-map" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <PlotMapView avocados={currentAvocados} updateAvocado={updateAvocado} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/replanting" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <Replanting avocados={currentAvocados} updateReplanting={updateReplanting} updateAvocado={updateAvocado} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/costs" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <CostManagement costs={currentCosts} addCost={addCost} updateCost={updateCost} deleteCost={deleteCost} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute user={user}>
              <Layout user={user} onLogout={handleLogout} onShowAuth={handleShowAuth}>
                <Reports avocados={currentAvocados} costs={currentCosts} />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App