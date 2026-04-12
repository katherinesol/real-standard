import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import WarningBanner from '../components/WarningBanner'

const API_FIELDS = 'code,product_name,brands,image_url,ingredients_text,labels'

function Home() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')

  async function handleSearch(query) {
    setLoading(true)
    setError(null)
    setHasSearched(true)
    setLastQuery(query)

    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=true&page_size=24&fields=${API_FIELDS}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to reach Open Food Facts. Please try again.')
      }

      const data = await response.json()

      const filtered = (data.products || []).filter(
        p => p.product_name && p.product_name.trim() !== ''
      )

      setResults(filtered)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* Hero — only shown before first search */}
      {!hasSearched && (
        <div className="py-16 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Toronto Clean-Label Initiative
              </p>
              <h1 className="font-display text-8xl md:text-9xl leading-none text-black mb-6">
                IS YOUR<br />
                FOOD<br />
                <span className="text-green-600">REAL?</span>
              </h1>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                Search any product. Every ingredient is checked against
                the Real Food Standard — no greenwashing, no exceptions.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <WarningBanner />
            </div>

          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="py-8 border-b border-gray-200">
        <SearchBar onSearch={handleSearch} loading={loading} />
      </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-16">
          <p className="font-bold text-red-600 mb-3">{error}</p>
          <button
            onClick={() => handleSearch(lastQuery)}
            className="text-xs text-gray-400 underline hover:text-black transition uppercase tracking-widest"
          >
            Try again
          </button>
        </div>
      )}

      {/* No results */}
      {hasSearched && !loading && !error && results.length === 0 && (
        <div className="text-center py-16">
          <p className="font-display text-5xl text-gray-200 mb-4">NO RESULTS</p>
          <p className="text-sm text-gray-500 mb-1">
            Nothing found for <span className="font-bold">"{lastQuery}"</span>
          </p>
          <p className="text-xs text-gray-400">
            Try a different name or enter a barcode directly.
          </p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && !loading && (
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              {results.length} products — <span className="text-black font-bold">"{lastQuery}"</span>
            </p>
            <button
              onClick={() => {
                setResults([])
                setHasSearched(false)
                setLastQuery('')
              }}
              className="text-xs text-gray-400 uppercase tracking-widest hover:text-black transition underline"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {results.map(product => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Home