import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    
    if (/^\d+$/.test(query.trim())) {
      navigate(`/product/${query.trim()}`)
    } else {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by product name or enter barcode..."
          className="w-full px-6 py-4 text-lg border-2 border-black rounded-full focus:outline-none focus:border-green-600 transition"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar