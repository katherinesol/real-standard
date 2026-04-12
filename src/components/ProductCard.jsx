import { Link } from 'react-router-dom'
import { calculateRealFoodScore, getScoreDisplay } from '../utils/realFoodScore'

function ProductCard({ product }) {
  const ingredients = product.ingredients_text || ''
  const scoreData = calculateRealFoodScore(ingredients)

  // getScoreDisplay now takes the full scoreData object, not just the number
  const display = getScoreDisplay(scoreData)

  return (
    <Link
      to={`/product/${product.code}`}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-contain group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">
          {product.product_name || 'Unknown Product'}
        </h3>

        <p className="text-xs text-gray-500 mb-3">
          {product.brands || 'Unknown Brand'}
        </p>

        {/* Badge row: emoji + tier label */}
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${display.bg} ${display.color} mb-2`}>
          <span>{display.emoji}</span>
          <span>{display.label}</span>
        </div>

        {/* Plain-English count summary e.g. "9 ingredients are real, 1 is processed" */}
        {ingredients && (
          <p className="text-xs text-gray-500 leading-snug">
            {display.displayText}
          </p>
        )}

        {/* Show "No ingredient data" if the API returned nothing */}
        {!ingredients && (
          <p className="text-xs text-gray-400 italic">No ingredient data</p>
        )}
      </div>
    </Link>
  )
}

export default ProductCard