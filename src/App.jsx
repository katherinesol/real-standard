import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import ManualCheck from './pages/ManualCheck'
import About from './pages/About'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PantryPage from './pages/PantryPage'
import Loading from './components/Loading'

function App() {
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)

  // check if user is already logged in on every page load
  useEffect(() => {
    fetch('/check_session', { credentials: 'include' })
      .then(r => {
        if (r.ok) return r.json()
        return null
      })
      .then(data => {
        if (data) setUser(data)
      })
      .finally(() => setCheckingSession(false))
  }, [])

  function handleLogin(userData) {
    setUser(userData)
  }

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
      credentials: 'include'
    }).then(() => setUser(null))
  }

  // show loading spinner while checking session on mount
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8]">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:barcode" element={<ProductDetail user={user} />} />
          <Route path="/manual" element={<ManualCheck />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup onLogin={handleLogin} />}
          />
          <Route
            path="/pantry"
            element={user ? <PantryPage user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App