function About() {

  const notRealList = [
    'Refined seed oils (canola, soybean, sunflower)',
    'Refined sugars (cane sugar, HFCS, dextrose, agave)',
    'Enriched or bleached flours',
    'Natural flavors (a regulatory loophole)',
    'Synthetic preservatives (BHA, BHT, sodium benzoate)',
    'Industrial thickeners (xanthan gum, carrageenan, guar gum)',
    'Emulsifiers (soy lecithin, mono and diglycerides)',
    'Protein isolates (soy isolate, whey isolate, pea isolate)',
    'Isolated acids (citric acid, ascorbic acid)',
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
        Toronto Clean-Label Initiative · Version 3.0
      </p>

      <h1 className="font-display text-6xl mb-10">THE REAL FOOD STANDARD</h1>

      <div className="space-y-10">

        <section>
          <h2 className="font-display text-3xl mb-3">The Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Real Food Only exists to cut through the noise of health marketing.
            Natural, organic, and non-GMO labels mean nothing if the ingredient
            list is full of refined oils, isolated starches, and synthetic flavors.
            We score every ingredient — not the front label.
          </p>
        </section>

        <section>
          <h2 className="font-display text-3xl mb-4">How Scoring Works</h2>
          <div className="space-y-4">

            <div className="border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🥇</span>
                <div>
                  <p className="font-bold text-sm">100% Real Food</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Every ingredient is a whole food or traditional processing agent.
                    Zero not-real ingredients. Zero caution items.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👍</span>
                <div>
                  <p className="font-bold text-sm">Good Choice</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    No not-real ingredients but contains one or more caution items —
                    ingredients that are functional but indicate some processing.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚫</span>
                <div>
                  <p className="font-bold text-sm">Processed</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Contains at least one not-real ingredient. A single entry from the
                    not-real list fails the entire product — no exceptions.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl mb-4">The Hard Rules</h2>
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">
            Any one of these = automatic fail
          </p>
          <ul className="space-y-2">
            {notRealList.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-sm text-gray-700 border-b border-gray-100 pb-2"
              >
                <span className="text-red-500 font-black text-xs mt-0.5 shrink-0">NO</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-3xl mb-3">Data Source</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Product data comes from Open Food Facts, a free and open database
            of food products worldwide. Ingredient scoring is applied by Real
            Food Only using the Real Food Standard v3.0.
          </p>
        </section>

      </div>
    </div>
  )
}

export default About