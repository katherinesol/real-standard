import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { calculateRealFoodScore } from '../utils/realFoodScore'
import Loading from '../components/Loading'

const API_FIELDS = 'code,product_name,brands,image_url,ingredients_text,labels'

const C = {
  paper: '#fafaf8', ink: '#0a0a0a', accent: '#1a5c1a',
  caution: '#a88416', fail: '#8a1a1a', muted: '#6b6b66',
  hair: '#d8d6cd', hatch: '#ebe9df',
  display: '"Bebas Neue","Oswald","Arial Narrow",sans-serif',
  body: '"DM Sans",system-ui,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace',
}

function TierMark({ tier }) {
  const num = tier === 'real' ? 'I' : tier === 'caut' ? 'II' : 'III'
  const word = tier === 'real' ? '100% REAL' : tier === 'caut' ? 'GOOD' : 'PROCESSED'
  const bg = tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink
  const fg = tier === 'caut' ? C.ink : '#fff'
  const glBg = tier === 'real' ? '#fff' : tier === 'caut' ? C.ink : '#fff'
  const glFg = tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink

  return (
    <span style={{
      display: 'inline-grid', gridTemplateColumns: 'auto 1fr', gap: 6,
      alignItems: 'center', border: `1.5px solid ${C.ink}`,
      padding: '3px 8px 3px 3px', fontFamily: C.mono, fontSize: 11,
      letterSpacing: '.12em', textTransform: 'uppercase',
      fontWeight: 500, background: bg, color: fg, whiteSpace: 'nowrap'
    }}>
      <span style={{
        width: 22, height: 22, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: C.display, fontSize: 14,
        lineHeight: 1, background: glBg, color: glFg,
        border: `1.5px solid ${glBg}`, margin: '-1.5px'
      }}>{num}</span>
      {word}
    </span>
  )
}

function ProductCard({ product }) {
  const scoreData = calculateRealFoodScore(product.ingredients_text || '')
  const tier = scoreData.notRealIngredients.length > 0
    ? 'fail' : scoreData.cautionIngredients.length > 0 ? 'caut' : 'real'
  const num = tier === 'real' ? 'I' : tier === 'caut' ? 'II' : 'III'
  const numBg = tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink
  const numFg = tier === 'caut' ? C.ink : '#fff'
  const total = scoreData.totalCount
  const real = scoreData.realIngredients.length - scoreData.cautionIngredients.length
  const caut = scoreData.cautionIngredients.length
  const fail = scoreData.notRealIngredients.length
  const summary = total === 0
    ? 'No ingredient data'
    : tier === 'real' ? `${real} of ${total} real`
    : tier === 'caut' ? `${real} real · ${caut} caution`
    : `${fail} not real`

  return (
    <Link to={`/product/${product.code}`} style={{ textDecoration: 'none', color: C.ink }}>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        borderBottom: `1px solid ${C.hair}`, padding: '14px 0', cursor: 'pointer'
      }}>
        <div style={{
          aspectRatio: '1 / 1', border: `1.5px solid ${C.ink}`,
          background: product.image_url
            ? C.paper
            : `repeating-linear-gradient(135deg, ${C.hatch} 0 2px, transparent 2px 6px)`,
          position: 'relative', display: 'flex', alignItems: 'center',
          justifyContent: 'center', overflow: 'hidden'
        }}>
          {product.image_url ? (
            <img src={product.image_url} alt={product.product_name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ fontFamily: C.display, fontSize: 28, color: C.muted }}>
              {(product.brands || product.product_name || 'NA').slice(0, 2).toUpperCase()}
            </div>
          )}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            fontFamily: C.display, fontSize: 24, lineHeight: 0.85,
            padding: '4px 8px 2px', background: numBg, color: numFg,
            borderLeft: `1.5px solid ${C.ink}`, borderBottom: `1.5px solid ${C.ink}`
          }}>{num}</div>
        </div>
        <div>
          <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 2 }}>
            {product.brands || '—'}
          </div>
          <div style={{ fontFamily: C.body, fontSize: 12.5, fontWeight: 600, lineHeight: 1.25, color: C.ink }}>
            {product.product_name}
          </div>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontFamily: C.body, fontSize: 10.5, color: C.muted, lineHeight: 1.35, marginBottom: 6 }}>
            {summary}
          </div>
          {total > 0 && (
            <div style={{ display: 'flex', height: 3, border: `1px solid ${C.ink}` }}>
              {real > 0 && <div style={{ flex: real, background: C.accent }} />}
              {caut > 0 && <div style={{ flex: caut, background: C.paper, borderLeft: real ? `1px solid ${C.ink}` : 'none', borderRight: fail ? `1px solid ${C.ink}` : 'none' }} />}
              {fail > 0 && <div style={{ flex: fail, background: C.ink }} />}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function FilterChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: `1.5px solid ${C.ink}`, padding: '5px 12px',
      fontFamily: C.mono, fontSize: 10, letterSpacing: '.1em',
      textTransform: 'uppercase', background: active ? C.ink : C.paper,
      color: active ? C.paper : C.ink, fontWeight: 600,
      cursor: 'pointer', whiteSpace: 'nowrap'
    }}>
      {label}
    </button>
  )
}

async function runSearch(q, setLoading, setError, setResults, setScored, setHasSearched, setLastQuery, setActiveFilter) {
  if (!q.trim()) return
  setLoading(true)
  setError(null)
  setHasSearched(true)
  setLastQuery(q.trim())
  setActiveFilter('all')

  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q.trim())}&search_simple=1&action=process&json=true&page_size=24&fields=${API_FIELDS}`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to reach Open Food Facts.')
    const data = await response.json()
    const filtered = (data.products || []).filter(p => p.product_name && p.product_name.trim() !== '')
    const withScores = filtered.map(p => {
      const scoreData = calculateRealFoodScore(p.ingredients_text || '')
      const tier = scoreData.notRealIngredients.length > 0
        ? 'fail' : scoreData.cautionIngredients.length > 0 ? 'caut' : 'real'
      return { ...p, scoreData, tier }
    })
    setResults(filtered)
    setScored(withScores)
  } catch (err) {
    setError(err.message || 'Something went wrong.')
    setResults([])
    setScored([])
  } finally {
    setLoading(false)
  }
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [scored, setScored] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // run search automatically if there is a query in the URL on mount
  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery, setLoading, setError, setResults, setScored, setHasSearched, setLastQuery, setActiveFilter)
    }
  }, [])

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setSearchParams({ q: query.trim() })
    runSearch(query.trim(), setLoading, setError, setResults, setScored, setHasSearched, setLastQuery, setActiveFilter)
  }

  const realCount = scored.filter(p => p.tier === 'real').length
  const cautCount = scored.filter(p => p.tier === 'caut').length
  const failCount = scored.filter(p => p.tier === 'fail').length

  const displayed = activeFilter === 'all' ? scored
    : activeFilter === 'real' ? scored.filter(p => p.tier === 'real')
    : activeFilter === 'caut' ? scored.filter(p => p.tier === 'caut')
    : scored.filter(p => p.tier === 'fail')

  return (
    <div style={{ background: C.paper, minHeight: '100vh', color: C.ink, fontFamily: C.body }}>

      {!hasSearched && (
        <div style={{ padding: '72px 96px 48px', borderBottom: `2px solid ${C.ink}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted, marginBottom: 18 }}>
                Issue 001 · Apr 2026 · Independent · Free · Private
              </div>
              <div style={{ fontFamily: C.display, fontSize: 'clamp(80px, 12vw, 180px)', lineHeight: 0.82, letterSpacing: '.005em', color: C.ink }}>
                IS YOUR<br />FOOD <span style={{ color: C.accent }}>REAL</span>?
              </div>
              <div style={{ fontFamily: C.body, fontSize: 17, lineHeight: 1.45, maxWidth: 520, marginTop: 24, color: C.ink }}>
                One fixed ingredient standard. Scan a barcode, photograph a label, or paste a
                list — we classify every ingredient as Real, Caution, or Not Real. A single
                not-real ingredient fails the whole product.
              </div>
              <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { tier: 'real', text: 'Every ingredient passes the standard' },
                  { tier: 'caut', text: 'No not-real — caution items present' },
                  { tier: 'fail', text: 'One not-real ingredient. Automatic fail.' },
                ].map(({ tier, text }) => (
                  <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <TierMark tier={tier} />
                    <span style={{ fontFamily: C.body, fontSize: 13, color: C.muted }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: 8 }}>
              <div style={{ border: `2px solid ${C.ink}`, padding: 28, background: C.paper, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start' }}>
                <div style={{ fontFamily: C.display, fontSize: 72, lineHeight: 0.8, marginTop: -4 }}>!</div>
                <div>
                  <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 10, color: C.ink }}>
                    A Warning Before You Scan
                  </div>
                  <div style={{ fontFamily: C.body, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
                    The Real Food Standard is strict. We reject every product containing
                    chemical preservatives, refined sugar, or industrial seed oils — even
                    in trace amounts. Most of what you eat will fail. That's the point.
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderLeft: `2px solid ${C.ink}`, borderRight: `2px solid ${C.ink}`, borderBottom: `2px solid ${C.ink}` }}>
                {[
                  { label: 'Ingredients tracked', value: '100+' },
                  { label: 'Hard fails', value: '9 categories' },
                  { label: 'Version', value: 'v3.0' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '16px 20px', borderRight: i < 2 ? `1px solid ${C.ink}` : 'none' }}>
                    <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontFamily: C.display, fontSize: 28, lineHeight: 1 }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        padding: hasSearched ? '14px 48px' : '28px 96px 28px',
        borderBottom: `2px solid ${C.ink}`, background: C.paper,
        position: hasSearched ? 'sticky' : 'static', top: 0, zIndex: 10
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 14,
            border: `2px solid ${C.ink}`, borderRadius: 999,
            padding: '14px 20px', background: '#fff'
          }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="square">
              <circle cx="11" cy="11" r="7"/><path d="M17 17l4 4"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search product or paste barcode"
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontFamily: C.body, fontSize: 15, background: 'transparent', color: C.ink
              }}
            />
          </div>
        </form>
      </div>

      {loading && <div style={{ padding: '64px 96px' }}><Loading /></div>}

      {error && !loading && (
        <div style={{ padding: '64px 96px', textAlign: 'center' }}>
          <p style={{ fontFamily: C.display, fontSize: 32, color: C.fail }}>{error}</p>
        </div>
      )}

      {hasSearched && !loading && !error && results.length === 0 && (
        <div style={{ padding: '64px 96px', textAlign: 'center' }}>
          <div style={{ fontFamily: C.display, fontSize: 72, color: C.hair }}>NO RESULTS.</div>
          <p style={{ fontFamily: C.body, fontSize: 14, color: C.muted, marginTop: 12 }}>
            Nothing found for "{lastQuery}" — try a different name or enter a barcode.
          </p>
        </div>
      )}

      {scored.length > 0 && !loading && (
        <div style={{ padding: '0 96px 96px' }}>
          <div style={{ padding: '24px 0 16px', borderBottom: `1px solid ${C.hair}` }}>
            <div style={{ fontFamily: C.display, fontSize: 52, lineHeight: 0.9, marginBottom: 8 }}>
              "{lastQuery.toUpperCase()}"<span style={{ color: C.accent }}>.</span>
            </div>
            <div style={{ fontFamily: C.body, fontSize: 13, color: C.muted, marginBottom: 16 }}>
              {scored.length} products match ·{' '}
              <span style={{ color: C.accent, fontWeight: 600 }}>{realCount} pass</span>
              {' · '}{cautCount} caution
              {' · '}<span style={{ color: C.fail, fontWeight: 600 }}>{failCount} processed</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <FilterChip label={`ALL ${scored.length}`} active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
              <FilterChip label={`I · ${realCount}`} active={activeFilter === 'real'} onClick={() => setActiveFilter('real')} />
              <FilterChip label={`II · ${cautCount}`} active={activeFilter === 'caut'} onClick={() => setActiveFilter('caut')} />
              <FilterChip label={`III · ${failCount}`} active={activeFilter === 'fail'} onClick={() => setActiveFilter('fail')} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0 16px', borderTop: `2px solid ${C.ink}` }}>
            {displayed.map(product => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Home