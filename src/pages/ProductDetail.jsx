import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { calculateRealFoodScore } from '../utils/realFoodScore'
import RealFoodScore from '../components/RealFoodScore'
import Loading from '../components/Loading'

// Fields requested from the API for the detail view
const API_FIELDS = 'code,product_name,brands,image_url,ingredients_text,labels,quantity,categories,countries'

function ProductDetail() {
  const { barcode } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setError(null)

      const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}?fields=${API_FIELDS}`

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Could not reach Open Food Facts.')
        }

        const data = await response.json()

        if (data.status === 0 || !data.product) {
          throw new Error('Product not found. It may not be in the Open Food Facts database.')
        }

        setProduct(data.product)
      } catch (err) {
        setError(err.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [barcode])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500 font-medium mb-4">{error}</p>
        <Link to="/" className="text-sm underline text-gray-500 hover:text-black transition">
          Back to search
        </Link>
      </div>
    )
  }

  if (!product) return null

  const scoreData = calculateRealFoodScore(product.ingredients_text || '')

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition mb-8"
      >
        ← Back to search
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left column — product image and basic info */}
        <div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square mb-6 flex items-center justify-center">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-gray-400 text-sm">No image available</p>
            )}
          </div>

          <h1 className="text-2xl font-black mb-1">
            {product.product_name || 'Unknown Product'}
          </h1>

          {product.brands && (
            <p className="text-gray-500 mb-1">{product.brands}</p>
          )}

          {product.quantity && (
            <p className="text-sm text-gray-400 mb-4">{product.quantity}</p>
          )}

          {/* Barcode */}
          <p className="text-xs text-gray-300 font-mono">#{barcode}</p>

          {/* Raw ingredients text */}
          {product.ingredients_text && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Ingredients (raw label)
              </p>
              <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 rounded-lg p-4">
                {product.ingredients_text}
              </p>
            </div>
          )}
        </div>

        {/* Right column — score breakdown */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Real Food Score
          </p>
          <RealFoodScore scoreData={scoreData} product={product} />
        </div>

      </div>
    </div>
  )
}

export default ProductDetail