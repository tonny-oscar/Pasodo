import { useState, useEffect } from 'react'
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore'
import { ref, set, onValue } from 'firebase/database'
import { db, rtdb } from '../firebase'

export const useFirestore = (userId) => {
  const [avocados, setAvocados] = useState([])
  const [costs, setCosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    // Firestore listeners
    const avocadosRef = doc(db, 'farms', userId, 'data', 'avocados')
    const costsRef = doc(db, 'farms', userId, 'data', 'costs')

    const unsubscribeAvocados = onSnapshot(avocadosRef, (doc) => {
      if (doc.exists()) {
        setAvocados(doc.data().trees || [])
      } else {
        // Initialize with default data
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
        setAvocados(initial)
        setDoc(avocadosRef, { trees: initial })
      }
    })

    const unsubscribeCosts = onSnapshot(costsRef, (doc) => {
      if (doc.exists()) {
        setCosts(doc.data().expenses || [])
      } else {
        setCosts([])
        setDoc(costsRef, { expenses: [] })
      }
      setLoading(false)
    })

    return () => {
      unsubscribeAvocados()
      unsubscribeCosts()
    }
  }, [userId])

  const saveAvocados = async (newAvocados) => {
    if (!userId) {
      console.log('saveAvocados: No userId provided')
      return
    }
    
    console.log('saveAvocados: Starting save for user:', userId, 'trees:', newAvocados.length)
    
    try {
      setAvocados(newAvocados)
      
      // Save to Firestore
      await setDoc(doc(db, 'farms', userId, 'data', 'avocados'), { trees: newAvocados })
      console.log('saveAvocados: Firestore save successful')
      
      // Also save to Realtime Database
      await set(ref(rtdb, `farms/${userId}/avocados`), newAvocados)
      console.log('saveAvocados: Realtime Database save successful')
    } catch (error) {
      console.error('saveAvocados: Error saving to Firebase:', error)
      throw error
    }
  }

  const saveCosts = async (newCosts) => {
    if (!userId) {
      console.log('saveCosts: No userId provided')
      return
    }
    
    console.log('saveCosts: Starting save for user:', userId, 'costs:', newCosts.length)
    
    try {
      setCosts(newCosts)
      
      // Save to Firestore
      await setDoc(doc(db, 'farms', userId, 'data', 'costs'), { expenses: newCosts })
      console.log('saveCosts: Firestore save successful')
      
      // Also save to Realtime Database
      await set(ref(rtdb, `farms/${userId}/costs`), newCosts)
      console.log('saveCosts: Realtime Database save successful')
    } catch (error) {
      console.error('saveCosts: Error saving to Firebase:', error)
      throw error
    }
  }

  return { avocados, costs, loading, saveAvocados, saveCosts }
}