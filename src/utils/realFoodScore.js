// Real Food Standard Scoring Engine
// Based on the Toronto Clean-Label Initiative Real Food Standard v3.0
// Scores products by checking every ingredient against three lists:
// REAL (good), NOT REAL (automatic fail), CAUTION (allowed but flagged)


// ============================================
// REAL FOOD DATABASE
// Every ingredient in here counts toward the real food score
// ============================================

const realFoodDatabase = {
  grains: [
    'brown rice', 'black rice', 'red rice', 'wild rice', 'sprouted rice', 'forbidden rice',
    'brown basmati', 'brown basmati rice', 'brown jasmine', 'brown jasmine rice',
    'steel-cut oats', 'oat groats', 'rolled oats', 'oats', 'whole oats',
    'spelt', 'einkorn', 'kamut', 'emmer', 'farro', 'bulgur', 'freekeh', 'cracked wheat',
    'durum wheat berries', 'wheat berries',
    'quinoa', 'millet', 'sorghum', 'teff', 'buckwheat', 'amaranth',
    'whole wheat', 'whole grain', 'whole wheat flour', 'whole grain flour',
    'masa harina', 'nixtamalized corn', 'nixtamal', 'arepa flour',
    'atta flour', 'atta', 'besan flour', 'besan', 'gram flour', 'chickpea flour',
    'almond flour', 'coconut flour', 'cassava flour', 'plantain flour'
  ],

  legumes: [
    'black beans', 'kidney beans', 'pinto beans', 'navy beans', 'cannellini beans',
    'beans', 'lentils', 'green lentils', 'brown lentils', 'red lentils', 'black lentils',
    'dal', 'chana dal', 'urad dal', 'moong dal', 'masoor dal', 'toor dal',
    'split peas', 'chickpeas', 'garbanzo beans', 'edamame', 'soybeans',
    'black-eyed peas', 'fava beans', 'lima beans', 'mung beans'
  ],

  nuts: [
    'almonds', 'walnuts', 'cashews', 'pistachios', 'brazil nuts', 'macadamia nuts',
    'peanuts', 'pecans', 'hazelnuts', 'chestnuts', 'pine nuts', 'tiger nuts'
  ],

  seeds: [
    'pumpkin seeds', 'sunflower seeds', 'chia seeds', 'chia', 'flax seeds', 'flaxseed', 'flax',
    'hemp seeds', 'hemp hearts', 'sesame seeds', 'poppy seeds', 'nigella seeds', 'black seed'
  ],

  fruits: [
    'apple', 'apples', 'banana', 'bananas', 'blueberries', 'strawberries',
    'raspberries', 'blackberries', 'cranberries', 'berries',
    'orange', 'oranges', 'grapes', 'mango', 'mangoes', 'pineapple',
    'kiwi', 'pear', 'pears', 'peach', 'peaches', 'plum', 'plums', 'cherries',
    'dates', 'figs', 'apricots', 'raisins', 'prunes',
    'lemon', 'lemons', 'lime', 'limes', 'grapefruit', 'watermelon', 'cantaloupe', 'honeydew',
    'coconut', 'dried fruit', 'fruit', 'plantain', 'plantains',
    'tamarind', 'passion fruit', 'guava', 'papaya', 'jackfruit', 'lychee', 'dragon fruit',
    'pomegranate', 'persimmon', 'starfruit'
  ],

  vegetables: [
    'spinach', 'kale', 'lettuce', 'arugula', 'collard greens', 'swiss chard',
    'callaloo', 'amaranth leaves', 'mustard greens', 'turnip greens',
    'broccoli', 'cauliflower', 'cabbage', 'brussels sprouts', 'bok choy', 'napa cabbage',
    'carrots', 'carrot', 'celery', 'cucumber', 'cucumbers',
    'bell pepper', 'bell peppers', 'peppers', 'jalapeno', 'chili peppers', 'scotch bonnet',
    'tomato', 'tomatoes', 'tomato paste', 'crushed tomatoes', 'diced tomatoes',
    'zucchini', 'squash', 'butternut squash', 'acorn squash', 'pumpkin',
    'mushrooms', 'mushroom', 'shiitake', 'portobello', 'oyster mushroom', 'enoki',
    'onion', 'onions', 'garlic', 'shallots', 'leeks', 'scallions', 'green onions',
    'potato', 'potatoes', 'sweet potato', 'sweet potatoes', 'yams',
    'yuca', 'cassava', 'taro', 'dasheen', 'eddoes',
    'beets', 'beet', 'radish', 'radishes', 'daikon', 'turnip', 'parsnip', 'rutabaga',
    'asparagus', 'green beans', 'snap peas', 'snow peas', 'peas',
    'corn', 'artichoke', 'eggplant', 'okra', 'bitter melon', 'chayote',
    'lotus root', 'water chestnut', 'bamboo shoots', 'bean sprouts'
  ],

  seaweed: [
    'seaweed', 'nori', 'wakame', 'kombu', 'dulse', 'kelp', 'sea lettuce', 'hijiki', 'arame'
  ],

  proteins: [
    'beef', 'ground beef', 'steak', 'pork', 'pork chop', 'pork loin',
    'lamb', 'goat', 'mutton',
    'chicken', 'chicken breast', 'chicken thigh', 'whole chicken',
    'turkey', 'ground turkey', 'duck', 'venison', 'bison', 'elk', 'rabbit',
    'salmon', 'tuna', 'cod', 'tilapia', 'halibut', 'trout', 'mackerel',
    'sardines', 'anchovies', 'herring', 'snapper', 'mahi mahi', 'sea bass',
    'shrimp', 'crab', 'lobster', 'scallops', 'mussels', 'clams', 'oysters', 'squid', 'octopus',
    'fish', 'seafood',
    'eggs', 'egg', 'egg whites', 'egg yolks', 'whole eggs',
    'organ meats', 'liver', 'heart', 'kidney'
  ],

  dairy: [
    'milk', 'whole milk', 'cream', 'heavy cream', 'half and half',
    'yogurt', 'plain yogurt', 'greek yogurt', 'whole milk yogurt',
    'kefir', 'buttermilk', 'sour cream',
    'cheese', 'cheddar', 'mozzarella', 'parmesan', 'gouda', 'brie', 'feta',
    'cottage cheese', 'ricotta', 'cream cheese',
    'paneer', 'labneh', 'halloumi', 'queso fresco', 'manchego', 'gruyere',
    'butter', 'unsalted butter', 'salted butter'
  ],

  fats: [
    'olive oil', 'extra virgin olive oil',
    'avocado oil', 'coconut oil', 'virgin coconut oil',
    'walnut oil', 'almond oil', 'macadamia oil', 'sesame oil', 'flaxseed oil',
    'avocado', 'avocados', 'olives',
    'cocoa butter', 'cacao butter',
    'ghee', 'clarified butter',
    'tallow', 'beef tallow', 'lard', 'schmaltz', 'duck fat', 'bacon fat',
    'red palm oil', 'unrefined palm oil', 'virgin palm oil', 'cold-pressed palm oil'
  ],

  sweeteners: [
    'honey', 'raw honey',
    'maple syrup', 'pure maple syrup',
    'dates', 'date paste', 'date syrup', 'date sugar', 'date molasses',
    'coconut sugar', 'coconut nectar',
    'stevia', 'stevia leaf', 'stevia extract',
    'monk fruit', 'monk fruit extract',
    'molasses', 'blackstrap molasses',
    'yacon syrup',
    'panela', 'piloncillo', 'jaggery', 'muscovado', 'rapadura',
    'pomegranate molasses'
  ],

  seasonings: [
    'salt', 'sea salt', 'himalayan salt', 'himalayan pink salt', 'kosher salt',
    'pepper', 'black pepper', 'white pepper', 'peppercorns',
    'basil', 'oregano', 'thyme', 'rosemary', 'dill', 'cilantro', 'parsley',
    'mint', 'sage', 'tarragon', 'bay leaf', 'bay leaves', 'curry leaves',
    'cumin', 'paprika', 'smoked paprika', 'turmeric', 'cinnamon', 'ginger',
    'cloves', 'nutmeg', 'cardamom', 'coriander', 'allspice', 'fennel', 'fenugreek',
    'garlic powder', 'onion powder', 'chili powder', 'cayenne', 'red pepper flakes',
    'mustard seed', 'mustard powder',
    'vanilla', 'vanilla bean', 'vanilla extract', 'pure vanilla',
    'lemon juice', 'lime juice', 'lemon zest', 'lime zest', 'orange zest',
    'cocoa', 'cocoa powder', 'cacao', 'cacao powder', 'cacao nibs',
    'sumac', 'achiote', 'annatto seeds', 'achiote seeds', 'ground annatto', 'achiote paste',
    'saffron', 'star anise', 'asafoetida'
  ],

  spice_blends: [
    'curry powder', 'garam masala', 'five-spice powder', 'five spice',
    'pumpkin pie spice', 'apple pie spice', 'italian seasoning',
    'zaatar', 'berbere', 'ras el hanout', 'herbes de provence',
    'everything bagel seasoning', 'tajin', 'chili lime seasoning',
    'baharat', 'dukkah', 'jerk seasoning', 'adobo seasoning',
    'chinese five spice', 'shichimi togarashi', 'furikake'
  ],

  vinegars: [
    'vinegar', 'apple cider vinegar', 'balsamic vinegar',
    'red wine vinegar', 'white wine vinegar', 'rice vinegar', 'sherry vinegar',
    'champagne vinegar', 'malt vinegar', 'coconut vinegar', 'ume plum vinegar'
  ],

  fermented: [
    'sauerkraut', 'kimchi', 'miso', 'tempeh', 'natto',
    'kombucha', 'pickles', 'fermented vegetables',
    'fish sauce', 'nam pla', 'nuoc mam',
    'tamari', 'soy sauce', 'shoyu', 'coconut aminos',
    'gochujang', 'doenjang', 'ssamjang',
    'shrimp paste', 'belacan',
    'tofu', 'silken tofu', 'firm tofu'
  ],

  condiments: [
    'tahini', 'harissa',
    'tamarind', 'tamarind paste', 'tamarind concentrate',
    'mustard', 'dijon mustard', 'whole grain mustard',
    'wasabi', 'horseradish',
    'hot sauce', 'sriracha', 'sambal',
    'pesto', 'chimichurri', 'salsa verde'
  ],

  breads: [
    'sourdough', 'sourdough bread',
    'whole wheat bread', 'whole grain bread',
    'whole wheat naan', 'whole wheat roti', 'chapati', 'paratha',
    'whole wheat pita', 'whole wheat tortilla',
    'sprouted bread', 'ezekiel bread'
  ],

  // Gelatin is NOT here — it moved to CAUTION because it is an isolated protein
  processing_agents: [
    'water', 'filtered water', 'spring water', 'sparkling water', 'seltzer',
    'baking soda', 'sodium bicarbonate',
    'calcium hydroxide', 'slaked lime', 'food grade lime',
    'cream of tartar',
    'agar', 'agar agar',
    'arrowroot', 'arrowroot powder',
    'calcium sulfate', 'nigari',
    'rennet', 'cultures', 'starter culture', 'live cultures',
    'yeast', 'active dry yeast', 'instant yeast', 'nutritional yeast'
  ],

  alcohol: [
    'wine', 'red wine', 'white wine',
    'beer', 'ale', 'lager',
    'cider', 'hard cider',
    'whiskey', 'bourbon', 'scotch',
    'vodka', 'gin', 'rum', 'tequila', 'mezcal',
    'sake', 'mirin'
  ],

  flowers_herbs: [
    'hibiscus', 'sorrel', 'dried hibiscus', 'rose petals', 'lavender',
    'chamomile', 'elderflower', 'jasmine'
  ]
};


// ============================================
// NOT REAL
// If ANY ingredient from this list appears, the product is automatically 🔴 Processed
// No exceptions — even one match fails the whole product
// ============================================

const notRealFood = [
  // Refined grains — stripped of bran and germ, nothing left but starch
  // White rice varieties moved to CAUTION (sold as staple)
  'enriched rice', 'instant rice enriched',
  'enriched flour', 'wheat flour', 'flour', 'all-purpose flour',
  'enriched wheat flour', 'bleached flour', 'semolina', 'durum wheat flour',
  'enriched', 'bleached', 'bromated', 'refined',

  // Industrial seed oils — chemically extracted, high omega-6
  'vegetable oil', 'canola oil', 'soybean oil', 'corn oil',
  'cottonseed oil', 'safflower oil', 'sunflower oil', 'rapeseed oil',
  'hydrogenated', 'partially hydrogenated', 'interesterified', 'fractionated',
  'palm oil', 'palm kernel oil', 'palm shortening', 'shortening',

  // Refined sugars — isolated carbohydrates with no nutritional value
  'sugar', 'cane sugar', 'brown sugar', 'powdered sugar', 'confectioners sugar',
  'high fructose corn syrup', 'corn syrup', 'glucose', 'glucose syrup',
  'dextrose', 'maltose', 'sucrose', 'fructose', 'invert sugar',
  'malt syrup', 'barley malt', 'barley malt syrup', 'rice syrup',
  'agave', 'agave nectar', 'agave syrup',
  'turbinado', 'demerara',

  // Artificial sweeteners — synthetic compounds, no real food value
  'aspartame', 'sucralose', 'saccharin', 'acesulfame', 'acesulfame potassium',
  'neotame', 'advantame', 'erythritol', 'xylitol', 'sorbitol', 'maltitol',
  'mannitol', 'isomalt',

  // Isolated starches — stripped from their whole food source
  'corn starch', 'cornstarch', 'modified corn starch', 'modified food starch',
  'modified starch', 'potato starch', 'tapioca starch', 'rice starch',

  // Industrial additives and flavor enhancers
  'maltodextrin', 'dextrin', 'cyclodextrin',
  'natural flavor', 'natural flavors', 'natural flavoring', 'natural flavourings',
  'natural flavour', 'natural flavours',
  'artificial flavor', 'artificial flavors', 'artificial flavoring',
  'natural and artificial flavors', 'flavoring', 'flavourings',
  'vanillin',
  'msg', 'monosodium glutamate', 'autolyzed yeast', 'autolyzed yeast extract',
  'hydrolyzed protein', 'hydrolyzed soy protein', 'hydrolyzed vegetable protein',
  'hydrolyzed plant protein', 'hvp',
  'yeast extract', 'torula yeast',
  'disodium inosinate', 'disodium guanylate',

  // Synthetic dyes and color additives
  'artificial color', 'artificial colors', 'fd&c', 'red 40', 'red 3', 'yellow 5', 'yellow 6',
  'blue 1', 'blue 2', 'green 3', 'caramel color', 'titanium dioxide',
  'annatto extract', 'annatto color', 'color annatto', 'e160b',
  'color added',

  // Chemical preservatives — synthetic compounds to extend shelf life
  'sodium nitrate', 'sodium nitrite', 'nitrate', 'nitrite',
  'bht', 'bha', 'tbhq', 'propyl gallate',
  'sodium benzoate', 'potassium sorbate', 'calcium propionate', 'sorbic acid',
  'sulfites', 'sodium sulfite', 'sodium bisulfite',
  'sodium metabisulfite', 'potassium metabisulfite',
  'sodium erythorbate',
  'sodium ferrocyanide', 'anti-caking',

  // Industrial thickeners and stabilizers — isolated fibers and gums
  'carrageenan', 'xanthan gum', 'guar gum', 'gellan gum', 'locust bean gum',
  'cellulose', 'cellulose gum', 'methylcellulose', 'cellulose gel',
  'sodium alginate', 'propylene glycol alginate', 'alginate',
  'pectin', 'modified pectin',

  // Emulsifiers — synthetic agents that bind ingredients artificially
  'soy lecithin', 'lecithin', 'sunflower lecithin',
  'mono and diglycerides', 'monoglycerides', 'diglycerides',
  'polysorbate', 'polysorbate 80', 'polysorbate 60', 'polysorbate 20',
  'sodium stearoyl lactylate', 'datem', 'propylene glycol',

  // Isolated acids — synthetic or industrially extracted
  'citric acid', 'phosphoric acid', 'lactic acid', 'malic acid', 'fumaric acid', 'tartaric acid',
  'ascorbic acid', 'sodium citrate', 'sodium phosphate', 'calcium phosphate',
  'calcium chloride', 'sodium acid pyrophosphate',

  // Protein isolates — stripped from their whole food source
  'protein isolate', 'soy protein isolate', 'whey protein isolate', 'pea protein isolate',
  'protein concentrate', 'soy protein concentrate',
  'sodium caseinate', 'calcium caseinate', 'milk protein concentrate',
  'textured vegetable protein', 'tvp',

  // Synthetic enrichment additives — added back after processing strips nutrition
  'niacin', 'niacinamide', 'thiamin', 'thiamine', 'riboflavin', 'folic acid', 'folate',
  'reduced iron', 'ferrous sulfate', 'thiamine mononitrate',
  'zinc oxide', 'added vitamins', 'vitamin blend', 'mineral blend',

  // Dough conditioners — industrial baking chemicals
  'dough conditioner', 'calcium peroxide', 'azodicarbonamide',
  'sodium aluminum phosphate', 'sodium aluminum sulfate',
  'ammonium sulfate',

  // Miscellaneous industrial processing agents
  'smoke flavor', 'liquid smoke', 'smoke flavoring',
  'enzyme modified',
  'inulin', 'soluble corn fiber', 'resistant starch',
  'glycerin', 'glycerol',
  'silicon dioxide', 'calcium silicate'
];


// ============================================
// CAUTION FLAGS
// These ingredients lower the score or prevent 100% Real status
// but do NOT automatically fail the product
// Products with caution items can still be 🟡 Good Choice
// ============================================

const cautionFlags = [
  // Generic spice/seasoning terms — could be hiding unknown additives
  'spices', 'spice', 'seasoning', 'seasonings', 'herbs', 'dried herbs',

  // White rice varieties — allowed as a cultural staple but lower nutritional value
  'white rice', 'basmati rice', 'jasmine rice', 'sushi rice',
  'long grain rice', 'short grain rice', 'parboiled rice', 'converted rice', 'instant rice',

  // Gelatin — isolated protein; functional and allowed but not a whole food
  'gelatin',

  // Juice concentrates — dehydrated, loses some nutritional value
  'lemon juice concentrate', 'lime juice concentrate', 'orange juice concentrate',
  'apple juice concentrate', 'juice concentrate', 'fruit juice concentrate', 'fruit concentrate',

  // Baking powder — often contains corn starch; flag it even if aluminum-free
  'baking powder',

  // Coconut milk and cream — often contains gums; flagged for transparency
  'coconut milk', 'coconut cream',

  // Celery powder — used in "uncured" meats; still produces natural nitrites
  'celery powder', 'celery juice powder',

  // Forced carbonation in beverages — indicates industrial processing
  'carbonation', 'carbonated',

  // Table salt and iodized salt — may contain anti-caking agents
  'table salt', 'iodized salt'
];


// ============================================
// BONUS BADGE MAP
// These keywords trigger quality badges when found in product labels, name, or brand
// Bonus badges are ONLY awarded to 🟢 or 🟡 products — never to 🔴 Processed
// ============================================

const BONUS_BADGE_MAP = [
  {
    keywords: ['organic', 'certified organic', 'usda organic', 'canada organic'],
    icon: '🌿',
    label: 'Organic'
  },
  {
    keywords: ['pasture-raised', 'pasture raised', 'pastured', 'pasture raised'],
    icon: '🐔',
    label: 'Pasture-Raised'
  },
  {
    keywords: ['grass-fed', 'grass fed', 'grassfed', '100% grass-fed', 'grass-finished', 'grass finished'],
    icon: '🌱',
    label: 'Grass-Fed'
  },
  {
    keywords: ['wild-caught', 'wild caught', 'wild-caught fish', 'wild fish'],
    icon: '🐟',
    label: 'Wild-Caught'
  },
  {
    keywords: ['non-gmo', 'non gmo', 'no gmo', 'project verified non-gmo'],
    icon: '🧬',
    label: 'Non-GMO'
  },
  {
    keywords: ['regenerative', 'regenerative organic', 'regenerative certified'],
    icon: '♻️',
    label: 'Regenerative'
  },
  {
    keywords: ['fair trade', 'fair-trade', 'fairtrade', 'fair trade certified'],
    icon: '🤝',
    label: 'Fair Trade'
  },
  {
    keywords: ['local', 'ontario', 'canadian', 'locally grown', 'locally sourced', 'made in ontario'],
    icon: '📍',
    label: 'Local'
  },
  {
    keywords: ['indigenous', 'first nations', 'native', 'indigenous sourced'],
    icon: '🪶',
    label: 'Indigenous Sourced'
  },
  {
    keywords: ['kosher', 'certified kosher'],
    icon: '✡️',
    label: 'Kosher'
  },
  {
    keywords: ['halal', 'certified halal'],
    icon: '☪️',
    label: 'Halal'
  }
];


// ============================================
// MAIN SCORING FUNCTION
// Takes raw ingredient text and returns a full breakdown
// ============================================

export function calculateRealFoodScore(ingredientsText) {
  if (!ingredientsText || ingredientsText.trim() === '') {
    return {
      score: 0,
      realCount: 0,
      totalCount: 0,
      realIngredients: [],
      notRealIngredients: [],
      cautionIngredients: [],
      unknownIngredients: [],
      bonuses: [],
      error: 'No ingredients found'
    };
  }

  const parsed = parseIngredients(ingredientsText);

  const results = {
    realIngredients: [],
    notRealIngredients: [],
    cautionIngredients: [],
    unknownIngredients: [],
    bonuses: []
  };

  parsed.forEach(ingredient => {
    const cleaned = ingredient.toLowerCase().trim();

    // Check if this ingredient matches any NOT REAL items first
    // If it does, it fails the product immediately — no further checks needed
    if (isNotReal(cleaned)) {
      results.notRealIngredients.push(ingredient);
    }
    // Check if it is a known REAL food
    else if (isReal(cleaned)) {
      results.realIngredients.push(ingredient);
    }
    // Check if it is a CAUTION ingredient
    // Caution items count toward the real total but are flagged separately
    else if (isCaution(cleaned)) {
      results.cautionIngredients.push(ingredient);
      results.realIngredients.push(ingredient);
    }
    // Unknown ingredients — strict standard treats these as NOT real
    else {
      results.unknownIngredients.push(ingredient);
      results.notRealIngredients.push(ingredient);
    }
  });

  const totalCount = parsed.length;
  const realCount = results.realIngredients.length;
  const score = totalCount > 0 ? Math.round((realCount / totalCount) * 100) : 0;

  return {
    score,
    realCount,
    totalCount,
    ...results
  };
}


// ============================================
// SCORE DISPLAY
// Returns the badge, label, colors, and plain-English count summary
// The hard rule: ANY not-real ingredient = 🔴 Processed, no matter the percentage
// ============================================

export function getScoreDisplay(scoreData) {
  const notRealCount = scoreData.notRealIngredients ? scoreData.notRealIngredients.length : 0;
  const cautionCount = scoreData.cautionIngredients ? scoreData.cautionIngredients.length : 0;

  // Real ingredients minus caution items (caution counts toward real in the score but shown separately)
  const pureRealCount = scoreData.realCount - cautionCount;

  // Build the count summary text shown on product cards
  const parts = [];
  if (pureRealCount > 0) {
    parts.push(`${pureRealCount} ${pureRealCount === 1 ? 'ingredient is real' : 'ingredients are real'}`);
  }
  if (cautionCount > 0) {
    parts.push(`${cautionCount} ${cautionCount === 1 ? 'is caution' : 'are caution'}`);
  }
  if (notRealCount > 0) {
    parts.push(`${notRealCount} ${notRealCount === 1 ? 'is processed' : 'are processed'}`);
  }

  const displayText = parts.length > 0 ? parts.join(', ') : 'No ingredients found';

  // Hard rule: any NOT REAL ingredient = 🔴 Processed immediately
  if (notRealCount > 0) {
    return {
      label: 'Processed',
      emoji: '🚫',
      color: 'text-red-600',
      bg: 'bg-red-50',
      borderColor: 'border-red-200',
      displayText
    };
  }

  // Caution items present but nothing in the NOT REAL list = 🟡 Good Choice
  if (cautionCount > 0) {
    return {
      label: 'Good Choice',
      emoji: '👍',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      displayText
    };
  }

  // Nothing bad at all = 🟢 100% Real Food
  return {
    label: '100% Real Food',
    emoji: '🥇',
    color: 'text-green-600',
    bg: 'bg-green-50',
    borderColor: 'border-green-200',
    displayText
  };
}


// ============================================
// SCORE COLOR
// Returns a hex color based on the tier — used for progress bars or circular scores
// ============================================

export function getScoreColor(scoreData) {
  const notRealCount = scoreData.notRealIngredients ? scoreData.notRealIngredients.length : 0;
  const cautionCount = scoreData.cautionIngredients ? scoreData.cautionIngredients.length : 0;

  if (notRealCount > 0) return '#dc2626';
  if (cautionCount > 0) return '#d97706';
  return '#16a34a';
}


// ============================================
// BONUS BADGES
// Checks product labels, name, and brand for quality keywords
// Only call this for products that are 🟢 or 🟡 — processed products get no badges
// ============================================

export function getBonusBadges(labelsString = '', productName = '', brandName = '') {
  const searchText = `${labelsString} ${productName} ${brandName}`.toLowerCase();

  return BONUS_BADGE_MAP
    .filter(badge => badge.keywords.some(keyword => searchText.includes(keyword)))
    .map(badge => ({ icon: badge.icon, label: badge.label }));
}


// ============================================
// INTERNAL HELPERS
// These functions are used inside calculateRealFoodScore — not exported
// ============================================

function parseIngredients(text) {
  // Clean up common label phrases that are not actual ingredients
  let cleaned = text
    .replace(/ingredients:/i, '')
    .replace(/contains less than 2% of:/i, ', ')
    .replace(/contains less than 1% of:/i, ', ')
    .replace(/contains 2% or less of:/i, ', ')
    .replace(/contains 1% or less of:/i, ', ')
    .trim();

  // Strip allergen warnings — they repeat ingredients already listed
  cleaned = cleaned.split(/contains:/i)[0];
  cleaned = cleaned.split(/may contain:/i)[0];
  cleaned = cleaned.split(/allergen/i)[0];

  // Flatten sub-ingredients listed inside parentheses or brackets
  // e.g. "chocolate (cocoa, sugar, milk)" becomes "chocolate, cocoa, sugar, milk"
  cleaned = cleaned.replace(/\(([^)]+)\)/g, ', $1');
  cleaned = cleaned.replace(/\[([^\]]+)\]/g, ', $1');

  // Split on commas, semicolons, or periods
  const parts = cleaned.split(/[,;.]/);

  // Clean each piece and remove non-ingredient noise
  return parts
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .filter(p => !p.match(/^\d+%?$/))
    .filter(p => !p.match(/^and$/i))
    .filter(p => !p.match(/^or$/i))
    .map(p => p.replace(/^\*+/, '').trim())
    .map(p => p.replace(/\.$/, '').trim())
    .map(p => p.replace(/^and\s+/i, '').trim())
    .map(p => p.replace(/^or\s+/i, '').trim());
}


function isReal(ingredient) {
  const lower = ingredient.toLowerCase();

  // Palm oil: only real if explicitly unrefined, red, virgin, or cold-pressed
  if (lower.includes('palm oil') || lower.includes('palm kernel')) {
    return lower.includes('red') || lower.includes('unrefined') ||
      lower.includes('virgin') || lower.includes('cold-pressed') ||
      lower.includes('cold pressed');
  }

  // Rice: only real if it has a color/type prefix indicating it is whole grain
  // Plain basmati, jasmine, white, etc. are CAUTION — handled separately
  if (lower.includes('rice')) {
    if (lower.includes('rice vinegar') || lower.includes('rice wine')) return true;
    return lower.includes('brown') || lower.includes('black') ||
      lower.includes('red') || lower.includes('wild') ||
      lower.includes('sprouted') || lower.includes('forbidden');
  }

  // Annatto: real if it is the whole seed or paste, not if it is an extract or color additive
  if (lower.includes('annatto') || lower.includes('achiote')) {
    if (lower.includes('extract') || lower.includes('color')) return false;
    return true;
  }

  // Check against every entry in the real food database
  const allRealFoods = Object.values(realFoodDatabase).flat();
  return allRealFoods.some(real => lower === real || lower.includes(real) || real.includes(lower));
}


function isNotReal(ingredient) {
  const lower = ingredient.toLowerCase();
  // Match if the ingredient contains any known bad item as a substring
  return notRealFood.some(bad => lower.includes(bad));
}


function isCaution(ingredient) {
  const lower = ingredient.toLowerCase();
  // Match if the ingredient equals or contains a caution flag
  return cautionFlags.some(caution => lower === caution || lower.includes(caution));
}