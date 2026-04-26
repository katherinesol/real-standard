import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const C = {
  paper: '#fafaf8', ink: '#0a0a0a', accent: '#1a5c1a',
  caution: '#a88416', fail: '#8a1a1a', muted: '#6b6b66',
  hair: '#d8d6cd', hatch: '#ebe9df',
  display: '"Bebas Neue","Oswald","Arial Narrow",sans-serif',
  body: '"DM Sans",system-ui,sans-serif',
  mono: '"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace',
}

const tierConfig = {
  real:      { num: 'I',   bg: C.accent, fg: '#fff', glBg: '#fff', glFg: C.accent, word: '100% REAL' },
  good:      { num: 'II',  bg: C.paper,  fg: C.ink,  glBg: C.ink,  glFg: C.paper,  word: 'GOOD' },
  processed: { num: 'III', bg: C.ink,    fg: '#fff', glBg: '#fff', glFg: C.ink,    word: 'PROCESSED' },
}

const PER_PAGE = 10

function TierMark({ badge }) {
  const t = tierConfig[badge] || tierConfig.processed
  return (
    <span style={{
      display: 'inline-grid', gridTemplateColumns: 'auto 1fr', gap: 6,
      alignItems: 'center', border: `1.5px solid ${C.ink}`,
      padding: '3px 8px 3px 3px', fontFamily: C.mono, fontSize: 10,
      letterSpacing: '.12em', textTransform: 'uppercase',
      fontWeight: 500, background: t.bg, color: t.fg, whiteSpace: 'nowrap',
      flexShrink: 0
    }}>
      <span style={{
        width: 18, height: 18, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: C.display, fontSize: 12,
        lineHeight: 1, background: t.glBg, color: t.glFg,
        border: `1.5px solid ${t.glBg}`, margin: '-1.5px'
      }}>{t.num}</span>
      {t.word}
    </span>
  )
}

function PantryPage({ user }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  // pagination state
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  function loadPage(targetPage) {
    setLoading(true)
    fetch(`/saved-products?page=${targetPage}&per_page=${PER_PAGE}`, { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        // backend returns { products, page, per_page, total, pages, has_next, has_prev }
        setProducts(data.products || [])
        setPage(data.page || 1)
        setTotalPages(data.pages || 1)
        setTotal(data.total || 0)
        setHasNext(data.has_next || false)
        setHasPrev(data.has_prev || false)
        setLoading(false)
      })
      .catch(() => { setError('Failed to load pantry.'); setLoading(false) })
  }

  useEffect(() => {
    loadPage(1)
  }, [])

  function handleEditStart(product) {
    setEditingId(product.id)
    setEditNotes(product.notes || '')
    setDeletingId(null)
  }

  function handleEditCancel() {
    setEditingId(null)
    setEditNotes('')
  }

  async function handleEditSave(id) {
    try {
      const response = await fetch(`/saved-products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ notes: editNotes })
      })
      const data = await response.json()
      if (!response.ok) { alert(data.error || 'Failed to update notes.'); return }
      setProducts(prev => prev.map(p => p.id === id ? { ...p, notes: data.notes } : p))
      setEditingId(null)
    } catch { alert('Something went wrong.') }
  }

  function handleDeleteStart(id) { setDeletingId(id); setEditingId(null) }
  function handleDeleteCancel() { setDeletingId(null) }

  async function handleDeleteConfirm(id) {
    try {
      const response = await fetch(`/saved-products/${id}`, {
        method: 'DELETE', credentials: 'include'
      })
      if (!response.ok) { alert('Failed to delete product.'); return }
      // if deleting the last item on current page, step back a page
      const remaining = products.length - 1
      if (remaining === 0 && page > 1) {
        loadPage(page - 1)
      } else {
        loadPage(page)
      }
      setDeletingId(null)
    } catch { alert('Something went wrong.') }
  }

  function handlePrevPage() {
    if (hasPrev) loadPage(page - 1)
  }

  function handleNextPage() {
    if (hasNext) loadPage(page + 1)
  }

  if (loading) return (
    <div style={{ padding: '64px 96px', textAlign: 'center' }}>
      <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.muted }}>
        Loading pantry...
      </div>
    </div>
  )

  if (error) return (
    <div style={{ padding: '64px 96px', textAlign: 'center' }}>
      <div style={{ fontFamily: C.display, fontSize: 32, color: C.fail }}>{error}</div>
    </div>
  )

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: C.body, minHeight: '100vh' }}>
      <div style={{ padding: '48px 96px 96px' }}>

        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          borderBottom: `2px solid ${C.ink}`, paddingBottom: 20, marginBottom: 0
        }}>
          <div>
            <div style={{
              fontFamily: C.mono, fontSize: 10, letterSpacing: '.18em',
              textTransform: 'uppercase', color: C.muted, marginBottom: 8
            }}>
              Your verified product library
            </div>
            <div style={{ fontFamily: C.display, fontSize: 72, lineHeight: 0.9 }}>
              MY PANTRY.
            </div>
          </div>
          {total > 0 && (
            <div style={{
              fontFamily: C.display, fontSize: 96, lineHeight: 1,
              color: C.hair
            }}>
              {String(total).padStart(2, '0')}
            </div>
          )}
        </div>

        {/* empty state */}
        {total === 0 && (
          <div style={{ textAlign: 'center', padding: '96px 0' }}>
            <div style={{
              fontFamily: C.display, fontSize: 72, color: C.hair, marginBottom: 16
            }}>
              PANTRY IS EMPTY.
            </div>
            <div style={{
              fontFamily: C.body, fontSize: 14, color: C.muted, marginBottom: 32
            }}>
              Start scanning products and save the ones that pass.
            </div>
            <Link to="/" style={{
              fontFamily: C.display, fontSize: 20, letterSpacing: '.06em',
              background: C.ink, color: '#fff', padding: '14px 32px',
              textDecoration: 'none', display: 'inline-block'
            }}>
              START SCANNING →
            </Link>
          </div>
        )}

        {/* product list */}
        {products.length > 0 && (
          <div>
            {products.map(product => {
              const isEditing = editingId === product.id
              const isDeleting = deletingId === product.id

              return (
                <div key={product.id} style={{ borderBottom: `1px solid ${C.hair}` }}>

                  {/* main row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0'
                  }}>

                    <TierMark badge={product.rfo_badge} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link to={`/product/${product.barcode}`} style={{
                        fontFamily: C.display, fontSize: 20, lineHeight: 1,
                        color: C.ink, textDecoration: 'none', display: 'block',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {product.product_name.toUpperCase()}
                      </Link>
                      <div style={{
                        fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                        textTransform: 'uppercase', color: C.muted, marginTop: 4
                      }}>
                        {product.brand || 'Unknown Brand'} · {product.date_saved?.slice(0, 10)}
                      </div>
                      {product.notes && !isEditing && (
                        <div style={{
                          fontFamily: C.body, fontSize: 12, color: C.muted,
                          marginTop: 4, fontStyle: 'italic',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>
                          {product.notes}
                        </div>
                      )}
                    </div>

                    <div style={{
                      fontFamily: C.mono, fontSize: 11, letterSpacing: '.1em',
                      color: product.rfo_badge === 'real' ? C.accent
                        : product.rfo_badge === 'good' ? C.caution
                        : C.fail,
                      flexShrink: 0
                    }}>
                      {product.rfo_score}%
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => isEditing ? handleEditCancel() : handleEditStart(product)}
                        style={{
                          fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                          textTransform: 'uppercase', border: `1.5px solid ${C.ink}`,
                          background: isEditing ? C.ink : C.paper,
                          color: isEditing ? '#fff' : C.ink,
                          padding: '6px 12px', cursor: 'pointer'
                        }}
                      >
                        {isEditing ? 'CANCEL' : 'NOTES'}
                      </button>
                      <button
                        onClick={() => isDeleting ? handleDeleteCancel() : handleDeleteStart(product.id)}
                        style={{
                          fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                          textTransform: 'uppercase', border: `1.5px solid ${C.fail}`,
                          background: isDeleting ? C.fail : C.paper,
                          color: isDeleting ? '#fff' : C.fail,
                          padding: '6px 12px', cursor: 'pointer'
                        }}
                      >
                        {isDeleting ? 'CANCEL' : 'REMOVE'}
                      </button>
                    </div>
                  </div>

                  {/* inline edit notes */}
                  {isEditing && (
                    <div style={{ paddingBottom: 16, paddingLeft: 8 }}>
                      <textarea
                        value={editNotes}
                        onChange={e => setEditNotes(e.target.value)}
                        placeholder="Add a note about this product..."
                        rows={3}
                        style={{
                          width: '100%', border: `2px solid ${C.ink}`,
                          padding: '10px 12px', fontFamily: C.body, fontSize: 13,
                          background: C.paper, resize: 'none', outline: 'none',
                          boxSizing: 'border-box', color: C.ink
                        }}
                      />
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <button
                          onClick={() => handleEditSave(product.id)}
                          style={{
                            fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                            textTransform: 'uppercase', background: C.ink, color: '#fff',
                            border: 'none', padding: '8px 18px', cursor: 'pointer'
                          }}
                        >
                          SAVE
                        </button>
                        <button
                          onClick={handleEditCancel}
                          style={{
                            fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                            textTransform: 'uppercase', background: C.paper, color: C.ink,
                            border: `1.5px solid ${C.ink}`, padding: '8px 18px', cursor: 'pointer'
                          }}
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  )}

                  {/* inline delete confirmation */}
                  {isDeleting && (
                    <div style={{
                      paddingBottom: 16, paddingLeft: 8,
                      display: 'flex', alignItems: 'center', gap: 16
                    }}>
                      <div style={{
                        fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                        textTransform: 'uppercase', color: C.fail
                      }}>
                        Remove this product?
                      </div>
                      <button
                        onClick={() => handleDeleteConfirm(product.id)}
                        style={{
                          fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                          textTransform: 'uppercase', background: C.fail, color: '#fff',
                          border: 'none', padding: '8px 18px', cursor: 'pointer'
                        }}
                      >
                        YES, REMOVE
                      </button>
                      <button
                        onClick={handleDeleteCancel}
                        style={{
                          fontFamily: C.mono, fontSize: 10, letterSpacing: '.12em',
                          textTransform: 'uppercase', background: C.paper, color: C.ink,
                          border: `1.5px solid ${C.ink}`, padding: '8px 18px', cursor: 'pointer'
                        }}
                      >
                        CANCEL
                      </button>
                    </div>
                  )}

                </div>
              )
            })}

            {/* pagination controls */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 32, paddingTop: 24, borderTop: `2px solid ${C.ink}`
              }}>
                <button
                  onClick={handlePrevPage}
                  disabled={!hasPrev}
                  style={{
                    fontFamily: C.mono, fontSize: 10, letterSpacing: '.14em',
                    textTransform: 'uppercase', border: `1.5px solid ${C.ink}`,
                    background: hasPrev ? C.paper : C.hatch,
                    color: hasPrev ? C.ink : C.muted,
                    padding: '10px 20px', cursor: hasPrev ? 'pointer' : 'not-allowed',
                    fontWeight: 600
                  }}
                >
                  ← PREV
                </button>

                <div style={{
                  fontFamily: C.mono, fontSize: 11, letterSpacing: '.14em',
                  textTransform: 'uppercase', color: C.muted
                }}>
                  Page {page} of {totalPages} · {total} total
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={!hasNext}
                  style={{
                    fontFamily: C.mono, fontSize: 10, letterSpacing: '.14em',
                    textTransform: 'uppercase', border: `1.5px solid ${C.ink}`,
                    background: hasNext ? C.paper : C.hatch,
                    color: hasNext ? C.ink : C.muted,
                    padding: '10px 20px', cursor: hasNext ? 'pointer' : 'not-allowed',
                    fontWeight: 600
                  }}
                >
                  NEXT →
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default PantryPage