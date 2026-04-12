import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-[#fafaf8]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-display text-3xl leading-none tracking-wide">
              REAL<span className="text-green-600">FOOD</span>
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 hidden sm:block">
              Only
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-widest transition hover:text-green-600 ${isActive ? 'text-green-600' : 'text-gray-900'}`
              }
            >
              Search
            </NavLink>
            <NavLink
              to="/manual"
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-widest transition hover:text-green-600 ${isActive ? 'text-green-600' : 'text-gray-900'}`
              }
            >
              Manual Check
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-widest transition hover:text-green-600 ${isActive ? 'text-green-600' : 'text-gray-900'}`
              }
            >
              The Standard
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar