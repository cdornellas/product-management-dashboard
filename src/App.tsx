import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Products from './pages/products'
import Navbar from './components/navbar'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 pt-20">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;