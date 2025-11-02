import { useState } from 'react'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Plot1 from './pages/Plot1'
import Plot2 from './pages/Plot2'
import AddPlants from './pages/AddPlants'
import Replanting from './pages/Replanting'
import CostManagement from './pages/CostManagement'
import Reports from './pages/Reports'

function App() {
  const [activeTab, setActiveTab] = useState('landing')
  
  const [avocados, setAvocados] = useState(() => {
    const saved = localStorage.getItem('avocados')
    if (saved) return JSON.parse(saved)
    
    const initial = []
    // Plot 1: AV1-AV42
    for (let i = 1; i <= 42; i++) {
      initial.push({
        id: `AV/P1/${i.toString().padStart(3, '0')}`,
        number: i,
        plot: 'P1',
        plantingDate: '',
        healthStatus: 'healthy',
        notes: '',
        plantPrice: '',
        supplier: '',
        variety: '',
        replanting: { R1: '', R2: '', R3: '' }
      })
    }
    // Plot 2: AV43-AV102
    for (let i = 43; i <= 102; i++) {
      initial.push({
        id: `AV/P2/${i.toString().padStart(3, '0')}`,
        number: i,
        plot: 'P2',
        plantingDate: '',
        healthStatus: 'healthy',
        notes: '',
        plantPrice: '',
        supplier: '',
        variety: '',
        replanting: { R1: '', R2: '', R3: '' }
      })
    }
    return initial
  })

  const [costs, setCosts] = useState(() => {
    const saved = localStorage.getItem('costs')
    return saved ? JSON.parse(saved) : []
  })

  const saveAvocados = (newAvocados) => {
    setAvocados(newAvocados)
    localStorage.setItem('avocados', JSON.stringify(newAvocados))
  }

  const saveCosts = (newCosts) => {
    setCosts(newCosts)
    localStorage.setItem('costs', JSON.stringify(newCosts))
  }

  const updateAvocado = (id, field, value) => {
    const updated = avocados.map(av => 
      av.id === id ? { ...av, [field]: value } : av
    )
    saveAvocados(updated)
  }

  const updateReplanting = (id, replantType, date) => {
    const updated = avocados.map(av => 
      av.id === id ? { ...av, replanting: { ...av.replanting, [replantType]: date } } : av
    )
    saveAvocados(updated)
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
    saveCosts([...costs, newCost])
  }

  const updateCost = (id, field, value) => {
    const updated = costs.map(cost => 
      cost.id === id ? { ...cost, [field]: value } : cost
    )
    saveCosts(updated)
  }

  const deleteCost = (id) => {
    saveCosts(costs.filter(cost => cost.id !== id))
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <Landing setActiveTab={setActiveTab} />
      case 'dashboard':
        return <Dashboard avocados={avocados} costs={costs} />
      case 'plot1':
        return <Plot1 avocados={avocados} updateAvocado={updateAvocado} updateReplanting={updateReplanting} />
      case 'plot2':
        return <Plot2 avocados={avocados} updateAvocado={updateAvocado} updateReplanting={updateReplanting} />
      case 'plants':
        return <AddPlants avocados={avocados} updateAvocado={updateAvocado} />
      case 'replanting':
        return <Replanting avocados={avocados} updateReplanting={updateReplanting} updateAvocado={updateAvocado} />
      case 'costs':
        return <CostManagement costs={costs} addCost={addCost} updateCost={updateCost} deleteCost={deleteCost} />
      case 'reports':
        return <Reports avocados={avocados} costs={costs} />
      default:
        return <Landing setActiveTab={setActiveTab} />
    }
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      showNavigation={activeTab !== 'landing'}
    >
      {renderActiveTab()}
    </Layout>
  )
}

export default App