const C = {
  paper: '#fafaf8', ink: '#0a0a0a', accent: '#1a5c1a',
  fail: '#8a1a1a', muted: '#6b6b66', hair: '#d8d6cd', hatch: '#ebe9df',
  display: '"Bebas Neue","Oswald","Arial Narrow",sans-serif',
  body: '"DM Sans",system-ui,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace',
}

const notRealList = [
  'Refined seed oils (canola, soybean, sunflower)',
  'Refined sugars (cane sugar, HFCS, dextrose, agave)',
  'Enriched or bleached flours',
  'Natural flavors — a clean label illusion',
  'Synthetic preservatives (BHA, BHT, sodium benzoate)',
  'Industrial thickeners (xanthan, carrageenan, guar gum)',
  'Emulsifiers (soy lecithin, mono and diglycerides)',
  'Protein isolates (soy isolate, whey isolate, pea isolate)',
  'Isolated acids (citric acid, ascorbic acid)',
]

const tiers = [
  {
    num: 'I', label: '100% REAL FOOD.',
    sub: 'Every ingredient passes the standard.',
    body: 'Every ingredient is a whole food or traditional processing agent. Zero not-real ingredients. Zero caution items.',
    bg: C.accent, fg: '#fff', glBg: '#fff', glFg: C.accent
  },
  {
    num: 'II', label: 'GOOD CHOICE.',
    sub: 'No not-real — caution items present.',
    body: 'No not-real ingredients but contains one or more caution items — ingredients that are functional but indicate some processing.',
    bg: C.paper, fg: C.ink, glBg: C.ink, glFg: C.paper
  },
  {
    num: 'III', label: 'PROCESSED.',
    sub: 'One not-real ingredient. Automatic fail.',
    body: 'Contains at least one not-real ingredient. A single entry from the not-real list fails the entire product — no exceptions.',
    bg: C.ink, fg: '#fff', glBg: '#fff', glFg: C.ink
  },
]

function About() {
  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: C.body }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 48px 96px' }}>

        {/* masthead */}
        <div style={{
          fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
          textTransform: 'uppercase', color: C.muted, marginBottom: 12
        }}>
          Toronto Clean-Label Initiative · Version 3.0
        </div>
        <div style={{
          fontFamily: C.display, fontSize: 'clamp(56px, 10vw, 120px)',
          lineHeight: 0.88, marginBottom: 32,
          borderBottom: `2px solid ${C.ink}`, paddingBottom: 32
        }}>
          THE REAL FOOD STANDARD.
        </div>

        {/* mission */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
            textTransform: 'uppercase', color: C.muted, marginBottom: 12
          }}>
            01 / The Mission
          </div>
          <div style={{
            fontFamily: C.display, fontSize: 48, lineHeight: 0.9, marginBottom: 16
          }}>
            THE MISSION.
          </div>
          <div style={{
            fontFamily: C.body, fontSize: 15, lineHeight: 1.6,
            color: C.ink, maxWidth: 640
          }}>
            Real Standard exists to cut through the noise of health marketing.
            Natural, organic, and non-GMO labels mean nothing if the ingredient
            list is full of refined oils, isolated starches, and synthetic flavors.
            We score every ingredient — not the front label. Privacy and access are our focus.
          </div>
        </div>

        {/* how scoring works */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
            textTransform: 'uppercase', color: C.muted, marginBottom: 12
          }}>
            02 / How Scoring Works
          </div>
          <div style={{
            fontFamily: C.display, fontSize: 48, lineHeight: 0.9, marginBottom: 28
          }}>
            THREE TIERS. ONE HARD RULE.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {tiers.map(tier => (
              <div key={tier.num} style={{
                border: `2px solid ${C.ink}`,
                background: tier.bg, color: tier.fg,
                display: 'flex', flexDirection: 'column'
              }}>
                <div style={{
                  padding: '20px 22px 18px',
                  borderBottom: `2px solid ${tier.fg === '#fff' ? 'rgba(255,255,255,0.3)' : C.ink}`,
                  display: 'grid', gridTemplateColumns: 'auto 1fr',
                  gap: 16, alignItems: 'end'
                }}>
                  <div style={{
                    fontFamily: C.display, fontSize: 80, lineHeight: 0.78
                  }}>{tier.num}</div>
                  <div>
                    <div style={{
                      fontFamily: C.mono, fontSize: 9, letterSpacing: '.2em',
                      textTransform: 'uppercase', opacity: 0.7, marginBottom: 4
                    }}>· VERDICT ·</div>
                    <div style={{
                      fontFamily: C.display, fontSize: 26, lineHeight: 0.9
                    }}>{tier.label}</div>
                  </div>
                </div>
                <div style={{ padding: '16px 22px 20px', flex: 1 }}>
                  <div style={{
                    fontFamily: C.mono, fontSize: 9, letterSpacing: '.14em',
                    textTransform: 'uppercase', opacity: 0.7, marginBottom: 10
                  }}>{tier.sub}</div>
                  <div style={{
                    fontFamily: C.body, fontSize: 13, lineHeight: 1.5, opacity: 0.9
                  }}>{tier.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* hard rules */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
            textTransform: 'uppercase', color: C.muted, marginBottom: 12
          }}>
            03 / The Hard Rules
          </div>
          <div style={{
            fontFamily: C.display, fontSize: 48, lineHeight: 0.9, marginBottom: 8
          }}>
            WHAT WE REJECT.
          </div>
          <div style={{
            fontFamily: C.mono, fontSize: 10, letterSpacing: '.14em',
            textTransform: 'uppercase', color: C.muted, marginBottom: 20
          }}>
            Any one of these = automatic fail
          </div>

          <div style={{ border: `2px solid ${C.ink}` }}>
            {notRealList.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 18px',
                borderBottom: idx < notRealList.length - 1 ? `1px solid ${C.hair}` : 'none'
              }}>
                <span style={{
                  display: 'inline-grid', gridTemplateColumns: 'auto 1fr', gap: 6,
                  alignItems: 'center', border: `1.5px solid ${C.ink}`,
                  padding: '2px 8px 2px 2px', fontFamily: C.mono, fontSize: 9,
                  letterSpacing: '.12em', textTransform: 'uppercase',
                  fontWeight: 500, background: C.ink, color: '#fff',
                  whiteSpace: 'nowrap', flexShrink: 0
                }}>
                  <span style={{
                    width: 16, height: 16, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontFamily: C.display, fontSize: 11,
                    lineHeight: 1, background: '#fff', color: C.ink,
                    border: `1.5px solid '#fff'`, margin: '-1.5px'
                  }}>III</span>
                  NO
                </span>
                <span style={{ fontFamily: C.body, fontSize: 14, color: C.ink }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* data source */}
        <div>
          <div style={{
            fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
            textTransform: 'uppercase', color: C.muted, marginBottom: 12
          }}>
            04 / Data Source
          </div>
          <div style={{
            fontFamily: C.display, fontSize: 48, lineHeight: 0.9, marginBottom: 16
          }}>
            DATA SOURCE.
          </div>
          <div style={{
            fontFamily: C.body, fontSize: 15, lineHeight: 1.6,
            color: C.ink, maxWidth: 640
          }}>
            Product data comes from Open Food Facts, a free and open database of food
            products worldwide. Ingredient scoring is applied by Real Standard using
            the Real Food Standard v3.0. The standard is fully documented and public —
            no black box, no corporate influence, no exceptions.
          </div>
        </div>

      </div>
    </div>
  )
}

export default About