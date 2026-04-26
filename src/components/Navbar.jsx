import { Link, NavLink } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  return (
    <nav style={{ borderBottom: '2px solid #0a0a0a', background: '#fafaf8' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '18px 48px' }}>

        {/* wordmark */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: '"Bebas Neue", "Oswald", sans-serif',
            fontSize: 26,
            letterSpacing: '0.01em',
            lineHeight: 1,
            color: '#0a0a0a'
          }}>
            REAL STANDARD
          </div>
        </Link>

        {/* volume marker */}
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#6b6b66',
          borderLeft: '1px solid #0a0a0a',
          paddingLeft: 14
        }}>
          Vol. 01 · Issue 001
        </div>

        <span style={{ flex: 1 }} />

        {/* nav links */}
        <div style={{
          display: 'flex',
          gap: 28,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase'
        }}>
          <NavLink to="/" style={({ isActive }) => ({
            color: isActive ? '#0a0a0a' : '#6b6b66',
            fontWeight: isActive ? 700 : 500,
            textDecoration: 'none'
          })}>
            Scan
          </NavLink>

          {user && (
            <NavLink to="/pantry" style={({ isActive }) => ({
              color: isActive ? '#0a0a0a' : '#6b6b66',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none'
            })}>
              Pantry
            </NavLink>
          )}

          <NavLink to="/manual" style={({ isActive }) => ({
            color: isActive ? '#0a0a0a' : '#6b6b66',
            fontWeight: isActive ? 700 : 500,
            textDecoration: 'none'
          })}>
            Manual Check
          </NavLink>

          <NavLink to="/about" style={({ isActive }) => ({
            color: isActive ? '#0a0a0a' : '#6b6b66',
            fontWeight: isActive ? 700 : 500,
            textDecoration: 'none'
          })}>
            The Standard
          </NavLink>

          {user ? (
            <button
              onClick={onLogout}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#6b6b66',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" style={({ isActive }) => ({
              color: isActive ? '#0a0a0a' : '#6b6b66',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none'
            })}>
              Account
            </NavLink>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar