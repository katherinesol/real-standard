import { Link } from 'react-router-dom'

const C = {
  paper: '#fafaf8', ink: '#0a0a0a', muted: '#6b6b66', accent: '#1a5c1a',
  display: '"Bebas Neue","Oswald","Arial Narrow",sans-serif',
  body: '"DM Sans",system-ui,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace',
}

function Footer() {
  return (
    <footer style={{
      borderTop: `2px solid ${C.ink}`,
      background: C.paper,
      padding: '28px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32
    }}>

      {/* wordmark */}
      <div style={{
        fontFamily: C.display,
        fontSize: 22,
        letterSpacing: '0.01em',
        lineHeight: 1,
        color: C.ink
      }}>
        REAL STANDARD
      </div>

      {/* nav links */}
      <div style={{
        display: 'flex',
        gap: 24,
        fontFamily: C.mono,
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase'
      }}>
        <Link to="/" style={{ color: C.muted, textDecoration: 'none' }}>Scan</Link>
        <Link to="/manual" style={{ color: C.muted, textDecoration: 'none' }}>Manual Check</Link>
        <Link to="/about" style={{ color: C.muted, textDecoration: 'none' }}>The Standard</Link>
      </div>

      {/* data source */}
      <div style={{
        fontFamily: C.mono,
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: C.muted
      }}>
        Data · Open Food Facts
      </div>

    </footer>
  )
}

export default Footer