const Landing = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <div className="mb-8">
          <div className="text-8xl mb-4">🥑</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Avocado Farm AV1
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-2xl">
            Professional Farm Management System for Modern Agriculture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
            <div className="text-4xl mb-4">🌳</div>
            <h3 className="text-xl font-semibold mb-2">102 Trees</h3>
            <p className="text-green-100">Complete management of all avocado trees across two plots</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Cost Tracking</h3>
            <p className="text-green-100">Monitor expenses and investments in KSh currency</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-green-100">Detailed reports and farm performance insights</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="bg-white text-green-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Enter Farm Dashboard
          </button>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={() => setActiveTab('plot1')}
              className="bg-blue-600 bg-opacity-80 text-white px-6 py-3 rounded-full hover:bg-opacity-100 transition-all duration-300"
            >
              🌱 Plot 1 (42 Trees)
            </button>
            <button
              onClick={() => setActiveTab('plot2')}
              className="bg-green-600 bg-opacity-80 text-white px-6 py-3 rounded-full hover:bg-opacity-100 transition-all duration-300"
            >
              🌿 Plot 2 (60 Trees)
            </button>
            <button
              onClick={() => setActiveTab('plants')}
              className="bg-yellow-600 bg-opacity-80 text-white px-6 py-3 rounded-full hover:bg-opacity-100 transition-all duration-300"
            >
              🌳 Add Plants
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 text-green-200 text-sm">
          Professional Farm Management • AV1 Project • Kenya
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🌱</div>
        <div className="absolute top-20 right-20 text-4xl">🥑</div>
        <div className="absolute bottom-20 left-20 text-5xl">🌿</div>
        <div className="absolute bottom-10 right-10 text-3xl">🌳</div>
        <div className="absolute top-1/2 left-1/4 text-7xl">🍃</div>
        <div className="absolute top-1/3 right-1/3 text-4xl">🌾</div>
      </div>
    </div>
  )
}

export default Landing