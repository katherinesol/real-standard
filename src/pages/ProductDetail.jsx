import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { calculateRealFoodScore } from '../utils/realFoodScore'
import Loading from '../components/Loading'

const API_FIELDS = 'code,product_name,brands,image_url,ingredients_text,labels,quantity,categories,countries'
const ALT_FIELDS = 'code,product_name,brands,image_url,ingredients_text,labels'

const C = {
  paper: '#fafaf8', ink: '#0a0a0a', accent: '#1a5c1a',
  caution: '#a88416', fail: '#8a1a1a', muted: '#6b6b66',
  hair: '#d8d6cd', hatch: '#ebe9df',
  display: '"Bebas Neue","Oswald","Arial Narrow",sans-serif',
  body: '"DM Sans",system-ui,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace',
}

function IngredientTag({ name, tier }) {
  const num = tier === 'real' ? 'I' : tier === 'caut' ? 'II' : 'III'
  const bg = tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink
  const fg = tier === 'caut' ? C.ink : '#fff'
  const glBg = tier === 'real' ? '#fff' : tier === 'caut' ? C.ink : '#fff'
  const glFg = tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink

  return (
    <span style={{
      display: 'inline-grid', gridTemplateColumns: 'auto 1fr', gap: 6,
      alignItems: 'center', border: `1.5px solid ${C.ink}`,
      padding: '3px 8px 3px 3px', fontFamily: C.mono, fontSize: 10,
      letterSpacing: '.08em', textTransform: 'uppercase',
      fontWeight: 500, background: bg, color: fg, whiteSpace: 'nowrap'
    }}>
      <span style={{
        width: 16, height: 16, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: C.display, fontSize: 11,
        lineHeight: 1, background: glBg, color: glFg,
        border: `1.5px solid ${glBg}`, margin: '-1.5px', flexShrink: 0
      }}>{num}</span>
      {name}
    </span>
  )
}

function VerdictCard({ scoreData }) {
  const tier = scoreData.notRealIngredients.length > 0
    ? 'fail' : scoreData.cautionIngredients.length > 0 ? 'caut' : 'real'
  const num = tier === 'real' ? 'I' : tier === 'caut' ? 'II' : 'III'
  const label = tier === 'real' ? '100% REAL FOOD.' : tier === 'caut' ? 'GOOD CHOICE.' : 'PROCESSED.'
  const sub = tier === 'real'
    ? 'EVERY INGREDIENT PASSES THE STANDARD'
    : tier === 'caut' ? 'NO NOT-REAL · CAUTION ITEMS PRESENT'
    : 'ONE NOT-REAL INGREDIENT. AUTOMATIC FAIL.'
  const bg = tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink
  const fg = tier === 'caut' ? C.ink : '#fff'
  const total = scoreData.totalCount
  const realCount = scoreData.realIngredients.length - scoreData.cautionIngredients.length
  const cautCount = scoreData.cautionIngredients.length
  const failCount = scoreData.notRealIngredients.length

  return (
    <div style={{ border: `3px solid ${C.ink}`, background: bg, color: fg, padding: '24px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.22em', opacity: 0.8, textTransform: 'uppercase' }}>· VERDICT ·</div>
        <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', opacity: 0.7, textTransform: 'uppercase' }}>TIER {num}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'end', marginBottom: 16 }}>
        <div style={{ fontFamily: C.display, fontSize: 104, lineHeight: 0.78, flexShrink: 0 }}>{num}</div>
        <div style={{ paddingBottom: 4 }}>
          <div style={{ fontFamily: C.display, fontSize: 40, lineHeight: 0.9 }}>{label}</div>
          <div style={{ fontFamily: C.mono, fontSize: 9.5, fontWeight: 600, marginTop: 6, letterSpacing: '.14em', opacity: 0.85, textTransform: 'uppercase' }}>{sub}</div>
        </div>
      </div>
      {total > 0 && (
        <div style={{ borderTop: `1.5px solid ${tier === 'caut' ? C.ink : 'rgba(255,255,255,0.4)'}`, paddingTop: 14 }}>
          <div style={{ display: 'flex', height: 4, border: `1px solid ${tier === 'caut' ? C.ink : 'rgba(255,255,255,0.4)'}` }}>
            {realCount > 0 && <div style={{ flex: realCount, background: tier === 'real' ? '#fff' : tier === 'caut' ? C.accent : 'rgba(255,255,255,0.4)' }} />}
            {cautCount > 0 && <div style={{ flex: cautCount, background: tier === 'caut' ? C.paper : 'rgba(255,255,255,0.2)', borderLeft: `1px solid ${tier === 'caut' ? C.ink : 'rgba(255,255,255,0.4)'}` }} />}
            {failCount > 0 && <div style={{ flex: failCount, background: tier === 'caut' ? C.ink : '#fff', borderLeft: `1px solid ${tier === 'caut' ? C.ink : 'rgba(255,255,255,0.4)'}` }} />}
          </div>
          <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: '.14em', opacity: 0.7, marginTop: 6, textTransform: 'uppercase', textAlign: 'right' }}>
            {scoreData.realIngredients.length} of {total} ingredients are real
          </div>
        </div>
      )}
    </div>
  )
}

function IngredientSection({ title, ingredients, tier, note }) {
  if (!ingredients || ingredients.length === 0) return null
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.hair}` }}>
        <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>{title}</div>
        <div style={{ fontFamily: C.display, fontSize: 22, lineHeight: 1, color: C.ink }}>{ingredients.length}</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {ingredients.map((ingredient, idx) => (
          <IngredientTag key={idx} name={ingredient} tier={tier} />
        ))}
      </div>
      {note && <div style={{ fontFamily: C.body, fontSize: 12, color: C.muted, marginTop: 10, lineHeight: 1.5 }}>{note}</div>}
    </div>
  )
}

function AlternativeCard({ product }) {
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

  return (
    <Link to={`/product/${product.code}`} style={{ textDecoration: 'none', color: C.ink }}>
      <div style={{ border: `1.5px solid ${C.ink}`, background: C.paper, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
        <div style={{
          aspectRatio: '1 / 1',
          background: product.image_url ? C.paper : `repeating-linear-gradient(135deg, ${C.hatch} 0 2px, transparent 2px 6px)`,
          position: 'relative', display: 'flex', alignItems: 'center',
          justifyContent: 'center', overflow: 'hidden', borderBottom: `1.5px solid ${C.ink}`
        }}>
          {product.image_url ? (
            <img src={product.image_url} alt={product.product_name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ fontFamily: C.display, fontSize: 24, color: C.muted }}>
              {(product.brands || product.product_name || 'NA').slice(0, 2).toUpperCase()}
            </div>
          )}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            fontFamily: C.display, fontSize: 20, lineHeight: 0.85,
            padding: '4px 8px 2px', background: numBg, color: numFg,
            borderLeft: `1.5px solid ${C.ink}`, borderBottom: `1.5px solid ${C.ink}`
          }}>{num}</div>
        </div>
        <div style={{ padding: '10px 12px 12px' }}>
          <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted, marginBottom: 3 }}>
            {product.brands || '—'}
          </div>
          <div style={{ fontFamily: C.body, fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: C.ink, marginBottom: 8 }}>
            {product.product_name}
          </div>
          {total > 0 && (
            <div style={{ display: 'flex', height: 3, border: `1px solid ${C.ink}` }}>
              {real > 0 && <div style={{ flex: real, background: C.accent }} />}
              {caut > 0 && <div style={{ flex: caut, background: C.paper, borderLeft: `1px solid ${C.ink}` }} />}
              {fail > 0 && <div style={{ flex: fail, background: C.ink, borderLeft: `1px solid ${C.ink}` }} />}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function ProductDetail({ user }) {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [alternatives, setAlternatives] = useState([])
  const [loadingAlts, setLoadingAlts] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)
      const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=${API_FIELDS}`
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Could not reach Open Food Facts.')
        const data = await response.json()
        if (data.status === 0 || !data.product) throw new Error('Product not found.')
        setProduct(data.product)
      } catch (err) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [barcode])

  useEffect(() => {
    if (!product) return
    const scoreData = calculateRealFoodScore(product.ingredients_text || '')
    if (scoreData.notRealIngredients.length === 0) return
    const category = product.categories_tags?.[product.categories_tags.length - 1]
    if (!category) return

    async function fetchAlternatives() {
      setLoadingAlts(true)
      try {
        const url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&json=true&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(category)}&page_size=20&fields=${ALT_FIELDS}`
        const response = await fetch(url)
        const data = await response.json()
        const candidates = (data.products || [])
          .filter(p => p.code !== barcode && p.product_name && p.ingredients_text)
        const passing = candidates
          .map(p => ({ ...p, scoreData: calculateRealFoodScore(p.ingredients_text || '') }))
          .filter(p => p.scoreData.notRealIngredients.length === 0)
          .sort((a, b) => b.scoreData.score - a.scoreData.score)
          .slice(0, 4)
        setAlternatives(passing)
      } catch {
        // silently fail
      } finally {
        setLoadingAlts(false)
      }
    }
    fetchAlternatives()
  }, [product])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    setSaveError(null)
    const scoreData = calculateRealFoodScore(product.ingredients_text || '')
    try {
      const response = await fetch('/saved-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          barcode: barcode,
          product_name: product.product_name || 'Unknown Product',
          brand: product.brands || '',
          rfo_badge: scoreData.notRealIngredients.length > 0
            ? 'processed' : scoreData.cautionIngredients.length > 0 ? 'good' : 'real',
          rfo_score: scoreData.score
        })
      })
      if (!response.ok) {
        const data = await response.json()
        setSaveError(data.error || 'Failed to save.')
        return
      }
      setSaved(true)
    } catch { setSaveError('Something went wrong.') }
    finally { setSaving(false) }
  }

  if (loading) return <div style={{ padding: '64px 96px' }}><Loading /></div>

  if (error) return (
    <div style={{ padding: '64px 96px', textAlign: 'center' }}>
      <p style={{ fontFamily: C.display, fontSize: 32, color: C.fail }}>{error}</p>
      <button onClick={() => navigate(-1)} style={{ fontFamily: C.mono, fontSize: 11, color: C.muted, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
        ← Back to search
      </button>
    </div>
  )

  if (!product) return null

  const scoreData = calculateRealFoodScore(product.ingredients_text || '')
  const tier = scoreData.notRealIngredients.length > 0
    ? 'fail' : scoreData.cautionIngredients.length > 0 ? 'caut' : 'real'
  const pureReal = scoreData.realIngredients.filter(i => !scoreData.cautionIngredients.includes(i))
  const isProcessed = scoreData.notRealIngredients.length > 0

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: C.body }}>
      <div style={{ padding: '32px 96px 96px' }}>

        <button
          onClick={() => navigate(-1)}
          style={{
            fontFamily: C.mono, fontSize: 10, letterSpacing: '.16em',
            textTransform: 'uppercase', color: C.muted, background: 'none',
            border: 'none', cursor: 'pointer', padding: 0,
            marginBottom: 32, display: 'inline-block'
          }}
        >
          ← Back to search
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* left column */}
          <div>
            <div style={{
              aspectRatio: '1 / 1', border: `2px solid ${C.ink}`,
              background: product.image_url ? C.paper : `repeating-linear-gradient(135deg, ${C.hatch} 0 2px, transparent 2px 6px)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', marginBottom: 24, position: 'relative'
            }}>
              {product.image_url ? (
                <img src={product.image_url} alt={product.product_name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ fontFamily: C.display, fontSize: 48, color: C.muted }}>
                  {(product.brands || product.product_name || 'NA').slice(0, 2).toUpperCase()}
                </div>
              )}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                fontFamily: C.display, fontSize: 32, lineHeight: 0.85, padding: '6px 10px 4px',
                background: tier === 'real' ? C.accent : tier === 'caut' ? C.paper : C.ink,
                color: tier === 'caut' ? C.ink : '#fff',
                borderLeft: `2px solid ${C.ink}`, borderBottom: `2px solid ${C.ink}`
              }}>
                {tier === 'real' ? 'I' : tier === 'caut' ? 'II' : 'III'}
              </div>
            </div>

            <div style={{ fontFamily: C.display, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 0.9, marginBottom: 8 }}>
              {(product.product_name || 'Unknown Product').toUpperCase()}
            </div>
            {product.brands && <div style={{ fontFamily: C.body, fontSize: 15, color: C.muted, marginBottom: 4 }}>{product.brands}</div>}
            {product.quantity && <div style={{ fontFamily: C.mono, fontSize: 11, color: C.muted, marginBottom: 4 }}>{product.quantity}</div>}
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.hair, marginBottom: 24, letterSpacing: '.08em' }}>#{barcode}</div>

            {user && (
              <div style={{ marginBottom: 28 }}>
                {saved ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: `2px solid ${C.accent}`, padding: '14px 18px', background: '#edf7ed' }}>
                    <span style={{ color: C.accent, fontWeight: 700 }}>✓</span>
                    <span style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent }}>Saved to pantry</span>
                    <Link to="/pantry" style={{ marginLeft: 'auto', fontFamily: C.mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: C.accent, textDecoration: 'none' }}>View pantry →</Link>
                  </div>
                ) : (
                  <button onClick={handleSave} disabled={saving} style={{
                    width: '100%', background: C.ink, color: '#fff', border: 'none',
                    fontFamily: C.display, fontSize: 22, letterSpacing: '.06em',
                    padding: '14px 0', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1
                  }}>
                    {saving ? 'SAVING...' : 'SAVE TO PANTRY →'}
                  </button>
                )}
                {saveError && <div style={{ fontFamily: C.body, fontSize: 12, color: C.fail, marginTop: 8 }}>{saveError}</div>}
              </div>
            )}

            {!user && (
              <div style={{ border: `2px solid ${C.ink}`, padding: '18px 20px', marginBottom: 28 }}>
                <div style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6 }}>Save this product?</div>
                <div style={{ fontFamily: C.body, fontSize: 13, color: C.muted, marginBottom: 14 }}>Sign in to save products to your personal pantry.</div>
                <Link to="/login" style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', background: C.ink, color: '#fff', padding: '10px 18px', textDecoration: 'none', display: 'inline-block' }}>Sign In →</Link>
              </div>
            )}
          </div>

          {/* right column */}
          <div>
            <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Real Food Score</div>
            <div style={{ marginBottom: 36 }}>
              <VerdictCard scoreData={scoreData} />
            </div>

            {scoreData.error ? (
              <div style={{ border: `1.5px solid ${C.hair}`, padding: 20, fontFamily: C.body, fontSize: 13, color: C.muted }}>
                No ingredient data available for this product.
              </div>
            ) : (
              <div>
                <IngredientSection title="Real" ingredients={pureReal} tier="real" />
                <IngredientSection title="Caution" ingredients={scoreData.cautionIngredients} tier="caut" note="Caution items are allowed but prevent a 100% Real Food verdict." />
                <IngredientSection title="Not Real" ingredients={scoreData.notRealIngredients} tier="fail" note="Any not-real ingredient automatically fails the product." />

                {scoreData.unknownIngredients && scoreData.unknownIngredients.length > 0 && (
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${C.hair}` }}>
                      <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>Unclassified</div>
                      <div style={{ fontFamily: C.display, fontSize: 22, lineHeight: 1, color: C.ink }}>{scoreData.unknownIngredients.length}</div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                      {scoreData.unknownIngredients.map((ingredient, idx) => (
                        <span key={idx} style={{
                          display: 'inline-grid', gridTemplateColumns: 'auto 1fr', gap: 6,
                          alignItems: 'center', border: `1.5px solid ${C.hair}`,
                          padding: '3px 8px 3px 3px', fontFamily: C.mono, fontSize: 10,
                          letterSpacing: '.08em', textTransform: 'uppercase',
                          fontWeight: 500, background: C.hatch, color: C.muted, whiteSpace: 'nowrap'
                        }}>
                          <span style={{
                            width: 16, height: 16, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontFamily: C.display, fontSize: 11,
                            lineHeight: 1, background: C.muted, color: C.paper,
                            border: `1.5px solid ${C.muted}`, margin: '-1.5px', flexShrink: 0
                          }}>?</span>
                          {ingredient}
                        </span>
                      ))}
                    </div>
                    <div style={{ border: `1.5px solid ${C.hair}`, padding: '12px 14px', background: C.hatch, fontFamily: C.body, fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                      These ingredients are not yet in our database and have not been classified. They do not affect the verdict.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* pass the standard */}
        {isProcessed && (
          <div style={{ marginTop: 64, borderTop: `2px solid ${C.ink}`, paddingTop: 40 }}>
            <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>
              Better options in this category
            </div>
            <div style={{ fontFamily: C.display, fontSize: 52, lineHeight: 0.9, marginBottom: 8 }}>
              PASS THE STANDARD.
            </div>
            <div style={{ fontFamily: C.body, fontSize: 14, color: C.muted, marginBottom: 28, maxWidth: 480 }}>
              These products are in the same category and pass the Real Food Standard.
            </div>

            {loadingAlts && (
              <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>
                Finding alternatives...
              </div>
            )}

            {!loadingAlts && alternatives.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {alternatives.map(alt => (
                  <AlternativeCard key={alt.code} product={alt} />
                ))}
              </div>
            )}

            {!loadingAlts && alternatives.length === 0 && (
              <div style={{ border: `1.5px solid ${C.hair}`, padding: '20px 24px', background: C.hatch, fontFamily: C.body, fontSize: 13, color: C.muted }}>
                No verified alternatives found in this category yet.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductDetail