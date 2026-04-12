import { getScoreDisplay, getScoreColor, getBonusBadges } from '../utils/realFoodScore'

function RealFoodScore({ scoreData, product }) {
  const display = getScoreDisplay(scoreData)
  const color = getScoreColor(scoreData)

  const bonusBadges = scoreData.notRealIngredients.length === 0
    ? getBonusBadges(
        product?.labels || '',
        product?.product_name || '',
        product?.brands || ''
      )
    : []

  const pureRealCount = scoreData.realCount - scoreData.cautionIngredients.length

  if (scoreData.error) {
    return (
      <div className="border border-gray-200 p-6 text-center">
        <p className="text-gray-400 text-sm">No ingredient data available for this product.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div className={`border-2 p-6 ${display.bg} ${display.borderColor}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{display.emoji}</span>
          <div>
            <p className={`text-xl font-black ${display.color}`}>{display.label}</p>
            <p className="text-sm text-gray-500">{display.displayText}</p>
          </div>
        </div>

        <div className="w-full bg-white h-2 mt-4 overflow-hidden">
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${scoreData.score}%`, backgroundColor: color }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1 text-right">
          {scoreData.realCount} of {scoreData.totalCount} ingredients are real
        </p>
      </div>

      {bonusBadges.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Quality Certifications
          </p>
          <div className="flex flex-wrap gap-2">
            {bonusBadges.map(badge => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {badge.icon} {badge.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {pureRealCount > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            REAL ({pureRealCount})
          </p>
          <div className="flex flex-wrap gap-2">
            {scoreData.realIngredients
              .filter(i => !scoreData.cautionIngredients.includes(i))
              .map((ingredient, idx) => (
                <span
                  key={idx}
                  className="bg-green-50 text-green-700 text-xs px-2.5 py-1 border border-green-100"
                >
                  {ingredient}
                </span>
              ))}
          </div>
        </div>
      )}

      {scoreData.cautionIngredients.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            CAUTION ({scoreData.cautionIngredients.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {scoreData.cautionIngredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-yellow-50 text-yellow-700 text-xs px-2.5 py-1 border border-yellow-100"
              >
                {ingredient}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Caution items are allowed but prevent the 100% Real Food badge.
          </p>
        </div>
      )}

      {scoreData.notRealIngredients.length > 0 && (
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            NOT REAL ({scoreData.notRealIngredients.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {scoreData.notRealIngredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-red-50 text-red-700 text-xs px-2.5 py-1 border border-red-100"
              >
                {ingredient}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Any not-real ingredient automatically fails the product.
          </p>
        </div>
      )}

    </div>
  )
}

export default RealFoodScore