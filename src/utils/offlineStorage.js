// Offline storage for poor internet connectivity
class OfflineStorage {
  constructor() {
    this.dbName = 'AvocadoFarmDB'
    this.version = 1
    this.db = null
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result
        
        if (!db.objectStoreNames.contains('avocados')) {
          db.createObjectStore('avocados', { keyPath: 'id' })
        }
        
        if (!db.objectStoreNames.contains('costs')) {
          db.createObjectStore('costs', { keyPath: 'id' })
        }
      }
    })
  }

  async saveAvocados(avocados) {
    if (!this.db) await this.init()
    
    const transaction = this.db.transaction(['avocados'], 'readwrite')
    const store = transaction.objectStore('avocados')
    
    await store.clear()
    
    for (const avocado of avocados) {
      await store.add(avocado)
    }
  }

  async getAvocados() {
    if (!this.db) await this.init()
    
    const transaction = this.db.transaction(['avocados'], 'readonly')
    const store = transaction.objectStore('avocados')
    
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async exportData() {
    const avocados = await this.getAvocados()
    
    return {
      avocados,
      exportDate: new Date().toISOString()
    }
  }
}

export default new OfflineStorage()