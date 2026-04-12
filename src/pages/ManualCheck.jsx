import { useState } from 'react'
import { calculateRealFoodScore } from '../utils/realFoodScore'
import RealFoodScore from '../components/RealFoodScore'

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

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      <h1 className="text-3xl font-black mb-2">Manual Check</h1>
      <p className="text-gray-500 mb-8">
        Paste the ingredient list from any product label to score it instantly.
        Copy directly from the back of the package.
      </p>

      {/* Input area */}
      {!submitted && (
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Paste Ingredients
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. Whole wheat flour, water, sea salt, yeast, olive oil..."
            rows={8}
            className="w-full border-2 border-black rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition resize-none"
          />
          <button
            onClick={handleCheck}
            disabled={!text.trim()}
            className="mt-4 w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-green-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Ingredients
          </button>
        </div>
      )}

      {/* Score results */}
      {submitted && scoreData && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Your Results</h2>
            <button
              onClick={handleReset}
              className="text-sm text-gray-400 underline hover:text-black transition"
            >
              Check another
            </button>
          </div>

          <RealFoodScore scoreData={scoreData} product={null} />
        </div>
      )}

    </div>
  )
}

export default ManualCheck