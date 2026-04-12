import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-black tracking-tight">
            REAL<span className="text-green-600">FOOD</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600 transition">Search</Link>
            <Link to="/manual" className="hover:text-green-600 transition">Manual Check</Link>
            <Link to="/about" className="hover:text-green-600 transition">About</Link>
          </div>
          
          <p className="text-xs text-gray-400">
            Data from Open Food Facts
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer