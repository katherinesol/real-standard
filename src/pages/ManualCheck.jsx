import { useState } from 'react'
import { calculateRealFoodScore } from '../utils/realFoodScore'

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
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.22em', opacity: 0.8, textTransform: 'uppercase' }}>· VERDICT ·</div>
        <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', opacity: 0.7, textTransform: 'uppercase' }}>TIER {num}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 18, alignItems: 'end', marginBottom: 16 }}>
        <div style={{ fontFamily: C.display, fontSize: 104, lineHeight: 0.78 }}>{num}</div>
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

function ManualCheck() {
  const [text, setText] = useState('')
  const [scoreData, setScoreData] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  function handleCheck() {
    if (!text.trim()) return
    const result = calculateRealFoodScore(text)
    setScoreData(result)
    setSubmitted(true)
  }

  function handleReset() {
    setText('')
    setScoreData(null)
    setSubmitted(false)
  }

  const pureReal = scoreData
    ? scoreData.realIngredients.filter(i => !scoreData.cautionIngredients.includes(i))
    : []

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: C.body, minHeight: '80vh' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 48px 96px' }}>

        <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>
          No barcode needed
        </div>
        <div style={{ fontFamily: C.display, fontSize: 72, lineHeight: 0.9, marginBottom: 16 }}>
          MANUAL CHECK.
        </div>
        <div style={{ fontFamily: C.body, fontSize: 15, color: C.muted, lineHeight: 1.6, marginBottom: 40, borderBottom: `2px solid ${C.ink}`, paddingBottom: 32 }}>
          Paste the ingredient list from any product label to score it instantly.
          Copy directly from the back of the package — no account needed.
        </div>

        {/* input state */}
        {!submitted && (
          <div>
            <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 8, color: C.ink }}>
              Paste Ingredients
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="e.g. Whole wheat flour, water, sea salt, yeast, olive oil..."
              rows={8}
              style={{
                width: '100%', border: `2px solid ${C.ink}`,
                padding: '14px 16px', fontFamily: C.body, fontSize: 14,
                background: C.paper, outline: 'none', color: C.ink,
                resize: 'none', boxSizing: 'border-box', lineHeight: 1.6
              }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.ink}
            />
            <button
              onClick={handleCheck}
              disabled={!text.trim()}
              style={{
                marginTop: 12, width: '100%', background: text.trim() ? C.ink : C.muted,
                color: '#fff', border: 'none', fontFamily: C.display,
                fontSize: 24, letterSpacing: '.06em', padding: '14px 0',
                cursor: text.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              CHECK INGREDIENTS →
            </button>
          </div>
        )}

        {/* results state */}
        {submitted && scoreData && (
          <div>
            <div style={{ marginBottom: 36 }}>
              <VerdictCard scoreData={scoreData} />
            </div>

            <IngredientSection title="Real" ingredients={pureReal} tier="real" />
            <IngredientSection
              title="Caution"
              ingredients={scoreData.cautionIngredients}
              tier="caut"
              note="Caution items are allowed but prevent a 100% Real Food verdict."
            />
            <IngredientSection
              title="Not Real"
              ingredients={scoreData.notRealIngredients}
              tier="fail"
              note="Any not-real ingredient automatically fails the product."
            />

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

            <button
              onClick={handleReset}
              style={{
                marginTop: 16, fontFamily: C.mono, fontSize: 10,
                letterSpacing: '.14em', textTransform: 'uppercase',
                background: 'none', border: `1.5px solid ${C.ink}`,
                color: C.ink, padding: '10px 20px', cursor: 'pointer'
              }}
            >
              ← CHECK ANOTHER
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ManualCheck