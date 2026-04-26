import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const C = {
  paper: '#fafaf8', ink: '#0a0a0a', accent: '#1a5c1a',
  fail: '#8a1a1a', muted: '#6b6b66', hair: '#d8d6cd',
  display: '"Bebas Neue","Oswald","Arial Narrow",sans-serif',
  body: '"DM Sans",system-ui,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace',
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Invalid credentials')
        return
      }

      onLogin(data)
      navigate('/')

    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '80vh', background: C.paper,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px', fontFamily: C.body, color: C.ink
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        <div style={{
          fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
          textTransform: 'uppercase', color: C.muted, marginBottom: 10
        }}>
          Welcome back
        </div>

        <div style={{
          fontFamily: C.display, fontSize: 72, lineHeight: 0.9, marginBottom: 16
        }}>
          SIGN IN.
        </div>

        <div style={{
          fontFamily: C.body, fontSize: 14, color: C.muted,
          lineHeight: 1.5, marginBottom: 32
        }}>
          Your pantry and scan history live here — we never ask for your real name.
        </div>

        {error && (
          <div style={{
            border: `2px solid ${C.fail}`, padding: '12px 14px',
            marginBottom: 20, fontFamily: C.body, fontSize: 13,
            color: C.fail
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: C.mono, fontSize: 10, letterSpacing: '.16em',
              textTransform: 'uppercase', marginBottom: 6, color: C.ink
            }}>Username</div>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="your username"
              required
              style={{
                width: '100%', border: `2px solid ${C.ink}`,
                padding: '12px 14px', fontFamily: C.body, fontSize: 14,
                background: C.paper, outline: 'none', color: C.ink,
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.ink}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: C.mono, fontSize: 10, letterSpacing: '.16em',
              textTransform: 'uppercase', marginBottom: 6, color: C.ink
            }}>Password</div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              style={{
                width: '100%', border: `2px solid ${C.ink}`,
                padding: '12px 14px', fontFamily: C.body, fontSize: 14,
                background: C.paper, outline: 'none', color: C.ink,
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.ink}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', background: C.ink, color: '#fff',
              border: 'none', fontFamily: C.display, fontSize: 24,
              letterSpacing: '.06em', padding: '14px 0',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'SIGNING IN...' : 'ENTER →'}
          </button>

        </form>

        <div style={{
          fontFamily: C.body, fontSize: 13, color: C.muted,
          textAlign: 'center', marginTop: 24
        }}>
          No account?{' '}
          <Link to="/signup" style={{
            color: C.ink, fontWeight: 700, textDecoration: 'none'
          }}>
            Create one →
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login