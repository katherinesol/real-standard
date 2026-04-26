// Real Food Standard Scoring Engine v3.2
// Multilingual ingredient database — English, French, Spanish, Italian, German
// Plus E-number coverage and alternate spellings

// ============================================
// REAL FOOD DATABASE
// ============================================

const realFoodDatabase = {
  grains: [
    'brown rice', 'black rice', 'red rice', 'wild rice', 'sprouted rice', 'forbidden rice',
    'brown basmati', 'brown basmati rice', 'brown jasmine', 'brown jasmine rice',
    'steel-cut oats', 'oat groats', 'rolled oats', 'oats', 'whole oats', 'oat flour', 'oatmeal',
    'spelt', 'einkorn', 'kamut', 'emmer', 'farro', 'bulgur', 'freekeh', 'cracked wheat',
    'durum wheat berries', 'wheat berries', 'whole grain wheat', 'whole grain rye',
    'quinoa', 'millet', 'sorghum', 'teff', 'buckwheat', 'amaranth', 'rye', 'barley', 'whole barley',
    'whole wheat', 'whole grain', 'whole wheat flour', 'whole grain flour',
    'masa harina', 'nixtamalized corn', 'nixtamal', 'arepa flour', 'corn meal', 'cornmeal',
    'whole grain corn', 'whole corn',
    'atta flour', 'atta', 'besan flour', 'besan', 'gram flour', 'chickpea flour',
    'almond flour', 'coconut flour', 'cassava flour', 'plantain flour', 'tapioca flour',
    'avoine', 'flocons d\'avoine', 'farine d\'avoine', 'orge', 'seigle', 'sarrasin',
    'blé complet', 'blé entier', 'farine de blé complète', 'farine complète',
    'épeautre', 'farine d\'épeautre', 'farine d\'amande',
    'farine de coco', 'farine de pois chiche', 'farine de sarrasin',
    'maïs entier', 'farine de maïs complète',
    'avena', 'harina de avena', 'cebada', 'centeno', 'trigo integral', 'trigo entero',
    'harina integral', 'harina de trigo integral', 'arroz integral', 'arroz salvaje',
    'maíz entero', 'harina de almendra', 'harina de coco',
    'farina d\'avena', 'orzo', 'segale', 'grano saraceno',
    'grano integrale', 'farina integrale', 'riso integrale', 'riso selvatico',
    'hafer', 'haferflocken', 'haferkleie', 'gerste', 'roggen', 'buchweizen',
    'vollkorn', 'vollkornmehl', 'vollkornweizen', 'naturreis', 'wildreis'
  ],

  legumes: [
    'black beans', 'kidney beans', 'pinto beans', 'navy beans', 'cannellini beans',
    'beans', 'lentils', 'green lentils', 'brown lentils', 'red lentils', 'black lentils',
    'dal', 'chana dal', 'urad dal', 'moong dal', 'masoor dal', 'toor dal',
    'split peas', 'chickpeas', 'garbanzo beans', 'edamame', 'soybeans',
    'black-eyed peas', 'fava beans', 'lima beans', 'mung beans', 'adzuki beans',
    'haricots', 'haricots noirs', 'haricots rouges', 'haricots blancs',
    'lentilles', 'lentilles vertes', 'lentilles corail', 'pois chiches',
    'pois cassés', 'fèves', 'soja', 'graines de soja', 'fèves de soja',
    'fèves de soja sans ogm', 'fèves de soja sans ogm décortiquées',
    'frijoles', 'judías', 'frijoles negros', 'frijoles rojos', 'lentejas',
    'garbanzos', 'habas', 'soya', 'edamame',
    'fagioli', 'fagioli neri', 'fagioli rossi', 'fagioli bianchi',
    'lenticchie', 'ceci', 'fave', 'piselli secchi', 'soia',
    'bohnen', 'schwarze bohnen', 'kidneybohnen', 'weiße bohnen',
    'linsen', 'kichererbsen', 'sojabohnen'
  ],

  nuts: [
    'almonds', 'walnuts', 'cashews', 'pistachios', 'brazil nuts', 'macadamia nuts',
    'peanuts', 'pecans', 'hazelnuts', 'chestnuts', 'pine nuts', 'tiger nuts',
    'almond butter', 'peanut butter', 'cashew butter', 'sunflower seed butter',
    'amande', 'amandes', 'noix', 'noix de cajou', 'pistaches', 'noix du brésil',
    'noix de macadamia', 'noix de pécan', 'noisettes', 'châtaignes',
    'pignons de pin', 'cacahuètes', 'arachides', 'beurre d\'amande',
    'beurre de cacahuète', 'purée d\'amande',
    'almendras', 'nueces', 'anacardos', 'pistachos', 'avellanas',
    'cacahuetes', 'maní', 'castañas', 'piñones', 'nueces de macadamia',
    'mandorle', 'anacardi', 'pistacchi', 'nocciole',
    'arachidi', 'castagne', 'pinoli', 'noci di macadamia',
    'mandeln', 'walnüsse', 'cashewkerne', 'pistazien', 'haselnüsse',
    'erdnüsse', 'kastanien', 'pinienkerne'
  ],

  seeds: [
    'pumpkin seeds', 'sunflower seeds', 'chia seeds', 'chia', 'flax seeds', 'flaxseed', 'flax',
    'hemp seeds', 'hemp hearts', 'sesame seeds', 'poppy seeds', 'nigella seeds', 'black seed',
    'ground flax', 'ground flaxseed', 'milled flax',
    'graines de courge', 'graines de tournesol', 'graines de chia',
    'graines de lin', 'lin', 'graines de chanvre', 'graines de sésame',
    'graines de pavot', 'graines de nigelle',
    'semillas de calabaza', 'semillas de girasol', 'semillas de chía',
    'semillas de lino', 'linaza', 'semillas de cáñamo', 'semillas de sésamo',
    'ajonjolí', 'semillas de amapola',
    'semi di zucca', 'semi di girasole', 'semi di chia',
    'semi di lino', 'semi di canapa', 'semi di sesamo', 'semi di papavero',
    'kürbiskerne', 'sonnenblumenkerne', 'chiasamen',
    'leinsamen', 'hanfsamen', 'sesamsamen', 'mohnsamen'
  ],

  fruits: [
    'apple', 'apples', 'banana', 'bananas', 'blueberries', 'strawberries',
    'raspberries', 'blackberries', 'cranberries', 'berries', 'mixed berries',
    'orange', 'oranges', 'grapes', 'mango', 'mangoes', 'pineapple',
    'kiwi', 'pear', 'pears', 'peach', 'peaches', 'plum', 'plums', 'cherries',
    'dates', 'figs', 'apricots', 'raisins', 'prunes', 'currants',
    'lemon', 'lemons', 'lime', 'limes', 'grapefruit', 'watermelon', 'cantaloupe', 'honeydew',
    'coconut', 'dried fruit', 'fruit', 'plantain', 'plantains',
    'tamarind', 'passion fruit', 'guava', 'papaya', 'jackfruit', 'lychee', 'dragon fruit',
    'pomegranate', 'persimmon', 'starfruit', 'elderberry', 'gooseberry',
    'apple puree', 'banana puree', 'fruit puree',
    'pomme', 'pommes', 'banane', 'bananes', 'fraise', 'fraises',
    'framboise', 'framboises', 'myrtille', 'myrtilles', 'mûres',
    'raisin', 'raisins', 'mangue', 'ananas',
    'poire', 'poires', 'pêche', 'pêches', 'prune', 'prunes', 'cerises',
    'dattes', 'figues', 'abricots', 'raisins secs', 'pruneaux',
    'citron', 'citrons', 'citron vert', 'pamplemousse', 'pastèque', 'melon',
    'noix de coco', 'fruits secs', 'fruits',
    'grenade', 'kaki', 'fruit de la passion', 'goyave', 'papaye',
    'purée de pomme', 'purée de fruits', 'compote de pommes',
    'manzana', 'manzanas', 'plátano', 'fresa', 'fresas',
    'frambuesa', 'frambuesas', 'arándanos', 'moras', 'cerezas',
    'naranja', 'naranjas', 'uvas', 'piña', 'ananá',
    'pera', 'peras', 'durazno', 'melocotón', 'ciruela', 'ciruelas',
    'dátiles', 'higos', 'albaricoques', 'pasas', 'ciruelas pasas',
    'limón', 'limones', 'pomelo', 'sandía',
    'fruta seca', 'fruta', 'frutas', 'granada', 'guayaba',
    'puré de manzana', 'puré de frutas',
    'mela', 'mele', 'fragola', 'fragole',
    'lampone', 'lamponi', 'mirtilli', 'more', 'ciliegie',
    'arancia', 'arance', 'uva',
    'pesca', 'pesche', 'prugna', 'prugne',
    'datteri', 'fichi', 'albicocche', 'uva passa', 'prugne secche',
    'limone', 'limoni', 'pompelmo', 'anguria',
    'cocco', 'noce di cocco', 'frutta secca', 'frutta', 'melagrana',
    'purea di mele', 'purea di frutta',
    'apfel', 'äpfel', 'erdbeere', 'erdbeeren',
    'himbeere', 'himbeeren', 'heidelbeeren', 'brombeeren', 'kirschen',
    'trauben', 'weintrauben',
    'birne', 'birnen', 'pfirsich', 'pflaume', 'pflaumen',
    'datteln', 'feigen', 'aprikosen', 'rosinen',
    'zitrone', 'zitronen', 'limette', 'wassermelone',
    'kokosnuss', 'trockenfrüchte', 'frucht', 'früchte', 'granatapfel',
    'apfelmus', 'fruchtpüree'
  ],

  vegetables: [
    'spinach', 'kale', 'lettuce', 'arugula', 'collard greens', 'swiss chard',
    'callaloo', 'amaranth leaves', 'mustard greens', 'turnip greens', 'watercress',
    'broccoli', 'cauliflower', 'cabbage', 'brussels sprouts', 'bok choy', 'napa cabbage',
    'carrots', 'carrot', 'celery', 'cucumber', 'cucumbers', 'fennel',
    'bell pepper', 'bell peppers', 'peppers', 'jalapeno', 'chili peppers', 'scotch bonnet',
    'tomato', 'tomatoes', 'tomato paste', 'crushed tomatoes', 'diced tomatoes', 'tomato puree',
    'zucchini', 'squash', 'butternut squash', 'acorn squash', 'pumpkin', 'pumpkin puree',
    'mushrooms', 'mushroom', 'shiitake', 'portobello', 'oyster mushroom', 'enoki', 'cremini',
    'onion', 'onions', 'garlic', 'shallots', 'leeks', 'scallions', 'green onions', 'chives',
    'potato', 'potatoes', 'sweet potato', 'sweet potatoes', 'yams', 'sweet potato puree',
    'yuca', 'cassava', 'taro', 'dasheen', 'eddoes', 'jicama',
    'beets', 'beet', 'beetroot', 'radish', 'radishes', 'daikon', 'turnip', 'parsnip', 'rutabaga',
    'asparagus', 'green beans', 'snap peas', 'snow peas', 'peas', 'green peas',
    'corn', 'sweet corn', 'artichoke', 'eggplant', 'okra', 'bitter melon', 'chayote',
    'lotus root', 'water chestnut', 'bamboo shoots', 'bean sprouts',
    'olives', 'green olives', 'black olives', 'kalamata olives',
    'épinards', 'chou', 'choux', 'laitue', 'roquette', 'cresson',
    'brocoli', 'chou-fleur', 'choux de bruxelles', 'pak choi',
    'carottes', 'carotte', 'céleri', 'concombre', 'fenouil',
    'poivron', 'poivrons', 'piment', 'tomate', 'tomates', 'concentré de tomate',
    'purée de tomate', 'tomates concassées',
    'courgette', 'courge', 'potiron', 'citrouille', 'champignons', 'champignon',
    'oignon', 'oignons', 'ail', 'échalote', 'poireau', 'ciboulette',
    'pomme de terre', 'pommes de terre', 'patate douce', 'manioc',
    'betterave', 'radis', 'navet', 'panais',
    'asperges', 'haricots verts', 'pois', 'petits pois',
    'maïs', 'artichaut', 'aubergine', 'olives noires', 'olives vertes',
    'légumes', 'légume',
    'espinacas', 'col rizada', 'lechuga', 'rúcula', 'berros',
    'brócoli', 'coliflor', 'coles de bruselas', 'col', 'repollo',
    'zanahoria', 'zanahorias', 'apio', 'pepino', 'hinojo',
    'pimiento', 'pimientos', 'chile', 'puré de tomate',
    'tomate triturado', 'pasta de tomate',
    'calabacín', 'calabaza', 'champiñones', 'setas',
    'cebolla', 'cebollas', 'ajo', 'chalota', 'puerro', 'cebollino',
    'patata', 'papas', 'patatas', 'batata', 'boniato',
    'remolacha', 'rábano', 'nabo', 'chirivía',
    'espárragos', 'judías verdes', 'guisantes', 'arvejas',
    'maíz dulce', 'alcachofa', 'berenjena', 'aceitunas',
    'verduras', 'verdura', 'hortalizas',
    'spinaci', 'cavolo', 'lattuga', 'rucola', 'crescione',
    'cavolfiore', 'cavoletti di bruxelles',
    'carote', 'carota', 'sedano', 'cetriolo', 'finocchio',
    'peperone', 'peperoni', 'peperoncino', 'pomodoro', 'pomodori',
    'concentrato di pomodoro', 'passata di pomodoro', 'pomodori pelati',
    'zucchine', 'zucca', 'funghi', 'fungo',
    'cipolla', 'cipolle', 'aglio', 'scalogno', 'porro', 'erba cipollina',
    'patata', 'patate', 'patata dolce',
    'barbabietola', 'rapa', 'ravanello',
    'asparagi', 'fagiolini', 'piselli',
    'mais', 'granoturco', 'carciofo', 'melanzana', 'olive',
    'verdure', 'ortaggi',
    'spinat', 'grünkohl', 'salat', 'kopfsalat', 'brunnenkresse',
    'brokkoli', 'blumenkohl', 'rosenkohl', 'weißkohl',
    'karotten', 'möhren', 'sellerie', 'gurke',
    'paprika', 'tomatenmark', 'tomatenpüree',
    'kürbis', 'pilze', 'champignons',
    'zwiebel', 'zwiebeln', 'knoblauch', 'schalotten', 'lauch', 'schnittlauch',
    'kartoffel', 'kartoffeln', 'süßkartoffel',
    'rote bete', 'rettich', 'radieschen', 'rübe',
    'spargel', 'grüne bohnen', 'erbsen',
    'artischocke', 'aubergine', 'oliven',
    'gemüse'
  ],

  seaweed: [
    'seaweed', 'nori', 'wakame', 'kombu', 'dulse', 'kelp', 'sea lettuce', 'hijiki', 'arame',
    'algues', 'algue', 'algas', 'alghe', 'algen'
  ],

  proteins: [
    'beef', 'ground beef', 'steak', 'pork', 'pork chop', 'pork loin', 'ham',
    'lamb', 'goat', 'mutton',
    'chicken', 'chicken breast', 'chicken thigh', 'whole chicken', 'chicken meat',
    'turkey', 'ground turkey', 'duck', 'venison', 'bison', 'elk', 'rabbit',
    'salmon', 'tuna', 'cod', 'tilapia', 'halibut', 'trout', 'mackerel',
    'sardines', 'anchovies', 'herring', 'snapper', 'mahi mahi', 'sea bass',
    'shrimp', 'crab', 'lobster', 'scallops', 'mussels', 'clams', 'oysters', 'squid', 'octopus',
    'fish', 'seafood', 'meat',
    'eggs', 'egg', 'egg whites', 'egg yolks', 'whole eggs',
    'organ meats', 'liver', 'heart', 'kidney',
    'boeuf', 'bœuf', 'porc', 'agneau', 'mouton', 'chèvre',
    'poulet', 'blanc de poulet', 'cuisse de poulet', 'dinde', 'canard',
    'saumon', 'thon', 'cabillaud', 'morue', 'truite', 'maquereau',
    'anchois', 'hareng', 'crevettes', 'crabe', 'homard',
    'poisson', 'fruits de mer', 'viande',
    'oeufs', 'œufs', 'oeuf', 'œuf', 'blancs d\'oeufs', 'jaunes d\'oeufs',
    'carne de res', 'res', 'cerdo', 'cordero', 'cabra',
    'pollo', 'pechuga de pollo', 'pavo', 'pato',
    'salmón', 'atún', 'bacalao', 'trucha', 'caballa',
    'sardinas', 'anchoas', 'arenque', 'camarones', 'gambas', 'cangrejo',
    'pescado', 'mariscos', 'carne',
    'huevos', 'huevo', 'claras de huevo', 'yemas de huevo',
    'manzo', 'maiale', 'agnello', 'capra', 'prosciutto',
    'petto di pollo', 'tacchino', 'anatra',
    'salmone', 'tonno', 'merluzzo', 'trota', 'sgombro',
    'sardine', 'acciughe', 'aringa', 'gamberi', 'granchio',
    'pesce', 'frutti di mare',
    'uova', 'uovo', 'albumi', 'tuorli',
    'rindfleisch', 'schweinefleisch', 'lammfleisch', 'ziegenfleisch', 'schinken',
    'huhn', 'hähnchen', 'hähnchenbrust', 'pute', 'truthahn', 'ente',
    'lachs', 'thunfisch', 'kabeljau', 'forelle', 'makrele',
    'sardinen', 'sardellen', 'hering', 'garnelen', 'krabben',
    'fisch', 'meeresfrüchte', 'fleisch',
    'eier', 'ei', 'eiweiß', 'eigelb'
  ],

  dairy: [
    'milk', 'whole milk', 'cream', 'heavy cream', 'half and half',
    'yogurt', 'plain yogurt', 'greek yogurt', 'whole milk yogurt', 'natural yogurt',
    'kefir', 'buttermilk', 'sour cream', 'crème fraîche',
    'cheese', 'cheddar', 'mozzarella', 'parmesan', 'gouda', 'brie', 'feta',
    'cottage cheese', 'ricotta', 'cream cheese', 'goat cheese', 'sheep cheese',
    'paneer', 'labneh', 'halloumi', 'queso fresco', 'manchego', 'gruyere',
    'butter', 'unsalted butter', 'salted butter', 'cultured butter',
    'lait', 'lait entier', 'crème', 'crème épaisse',
    'yaourt', 'yaourt nature', 'yaourt grec', 'kéfir', 'babeurre',
    'fromage', 'fromage blanc', 'fromage frais',
    'comté', 'gruyère', 'roquefort',
    'beurre', 'beurre doux', 'beurre demi-sel', 'beurre salé',
    'lait fermenté', 'ferments du yaourt', 'ferments du kéfir',
    'ferments lactiques', 'ferments de yaourt', 'ferments de kéfir',
    'leche', 'leche entera', 'crema', 'nata', 'crema agria',
    'yogur', 'yogur natural', 'yogur griego', 'suero de leche',
    'queso', 'parmesano',
    'mantequilla', 'mantequilla sin sal', 'mantequilla salada',
    'latte', 'latte intero', 'panna', 'panna acida',
    'yogurt', 'yogurt naturale', 'yogurt greco', 'latticello',
    'formaggio', 'parmigiano', 'gorgonzola', 'pecorino',
    'mascarpone',
    'burro', 'burro non salato', 'burro salato',
    'milch', 'vollmilch', 'sahne', 'schlagsahne', 'sauerrahm',
    'joghurt', 'naturjoghurt', 'griechischer joghurt',
    'käse',
    'ungesalzene butter'
  ],

  fats: [
    'olive oil', 'extra virgin olive oil', 'evoo',
    'avocado oil', 'coconut oil', 'virgin coconut oil', 'extra virgin coconut oil',
    'walnut oil', 'almond oil', 'macadamia oil', 'sesame oil', 'flaxseed oil', 'flax oil',
    'avocado', 'avocados',
    'cocoa butter', 'cacao butter',
    'ghee', 'clarified butter',
    'tallow', 'beef tallow', 'lard', 'schmaltz', 'duck fat', 'bacon fat',
    'red palm oil', 'unrefined palm oil', 'virgin palm oil', 'cold-pressed palm oil',
    'huile d\'olive', 'huile d\'olive vierge extra', 'huile d\'olive extra vierge',
    'huile d\'avocat', 'huile de coco', 'huile de noix de coco',
    'huile de noix', 'huile d\'amande', 'huile de sésame', 'huile de lin',
    'avocat', 'avocats', 'beurre de cacao',
    'beurre clarifié', 'saindoux', 'graisse de canard',
    'aceite de oliva', 'aceite de oliva virgen extra',
    'aceite de aguacate', 'aceite de coco', 'aceite de nuez',
    'aceite de almendra', 'aceite de sésamo', 'aceite de lino',
    'aguacate', 'manteca de cacao',
    'manteca clarificada', 'manteca de cerdo',
    'olio d\'oliva', 'olio extravergine d\'oliva', 'olio extra vergine di oliva',
    'olio di avocado', 'olio di cocco', 'olio di noce',
    'olio di mandorle', 'olio di sesamo', 'olio di lino',
    'burro di cacao',
    'strutto', 'grasso d\'anatra',
    'olivenöl', 'natives olivenöl extra', 'extra natives olivenöl',
    'avocadoöl', 'kokosöl', 'kokosnussöl', 'walnussöl',
    'mandelöl', 'sesamöl', 'leinöl',
    'kakaobutter',
    'butterschmalz', 'schweineschmalz', 'entenfett'
  ],

  sweeteners: [
    // english
    'honey', 'raw honey', 'manuka honey',
    'maple syrup', 'pure maple syrup', 'organic maple syrup',
    'date paste', 'date syrup', 'date sugar', 'date molasses',
    'coconut sugar', 'coconut nectar', 'coconut palm sugar',
    'stevia', 'stevia leaf', 'stevia extract',
    'monk fruit', 'monk fruit extract',
    'molasses', 'blackstrap molasses',
    'yacon syrup',
    'panela', 'piloncillo', 'jaggery', 'muscovado', 'rapadura',
    'pomegranate molasses',
    // french — only multi-word so plain "sucre"/"sirop" don't match
    'miel brut', 'miel cru',
    'sirop d\'érable', 'sirop d\'érable pur',
    'sucre de coco', 'sucre de noix de coco',
    'sirop de datte', 'pâte de datte', 'sucre de datte',
    'mélasse de canne',
    // spanish — same logic
    'miel cruda',
    'jarabe de arce', 'sirope de arce',
    'azúcar de coco',
    'sirope de dátil', 'jarabe de dátil',
    // italian
    'miele grezzo',
    'sciroppo d\'acero',
    'zucchero di cocco',
    'sciroppo di datteri',
    'melassa',
    // german
    'roher honig', 'manuka-honig',
    'ahornsirup',
    'kokosblütenzucker',
    'dattelsirup'
  ],

  seasonings: [
    'salt', 'sea salt', 'himalayan salt', 'himalayan pink salt', 'kosher salt', 'pink salt',
    'pepper', 'black pepper', 'white pepper', 'peppercorns',
    'basil', 'oregano', 'thyme', 'rosemary', 'dill', 'cilantro', 'parsley',
    'mint', 'sage', 'tarragon', 'bay leaf', 'bay leaves', 'curry leaves',
    'cumin', 'paprika', 'smoked paprika', 'turmeric', 'cinnamon', 'ginger',
    'cloves', 'nutmeg', 'cardamom', 'coriander', 'allspice', 'fennel', 'fennel seeds', 'fenugreek',
    'garlic powder', 'onion powder', 'chili powder', 'cayenne', 'cayenne pepper', 'red pepper flakes',
    'mustard seed', 'mustard powder', 'whole grain mustard',
    'vanilla', 'vanilla bean', 'vanilla extract', 'pure vanilla', 'vanilla powder', 'ground vanilla',
    'lemon juice', 'lime juice', 'lemon zest', 'lime zest', 'orange zest',
    'cocoa', 'cocoa powder', 'cacao', 'cacao powder', 'cacao nibs', 'unsweetened cocoa',
    'sumac', 'achiote', 'annatto seeds', 'achiote seeds', 'ground annatto', 'achiote paste',
    'saffron', 'star anise', 'asafoetida',
    'sel', 'sel marin', 'sel de mer', 'fleur de sel', 'sel rose', 'sel marin de table',
    'poivre', 'poivre noir', 'poivre blanc',
    'basilic', 'origan', 'thym', 'romarin', 'aneth', 'coriandre', 'persil',
    'menthe', 'sauge', 'estragon', 'feuille de laurier', 'laurier',
    'curcuma', 'cannelle', 'gingembre',
    'clous de girofle', 'noix de muscade', 'cardamome', 'piment de la jamaïque',
    'fenouil', 'fenugrec', 'poudre d\'ail', 'poudre d\'oignon',
    'piment de cayenne',
    'graines de moutarde', 'moutarde en poudre',
    'vanille', 'gousse de vanille', 'extrait de vanille', 'vanille en poudre',
    'jus de citron', 'zeste de citron',
    'cacao en poudre', 'cacao maigre',
    'safran', 'anis étoilé',
    'sal', 'sal marina', 'sal del himalaya', 'sal rosa',
    'pimienta', 'pimienta negra', 'pimienta blanca',
    'albahaca', 'orégano', 'tomillo', 'romero', 'eneldo',  'perejil',
    'menta', 'salvia', 'estragón', 'hoja de laurel',
    'comino', 'pimentón', 'cúrcuma', 'canela', 'jengibre',
    'clavo', 'nuez moscada', 'cardamomo', 'pimienta de jamaica',
    'fenogreco', 'ajo en polvo', 'cebolla en polvo',
    'pimienta de cayena', 'chile en polvo',
    'mostaza', 'semillas de mostaza',
    'vainilla', 'vaina de vainilla', 'extracto de vainilla',
    'jugo de limón', 'cáscara de limón', 'ralladura de limón',
    'cacao en polvo', 'cacao puro',
    'azafrán', 'anís estrellado',
    'sale marino', 'sale rosa dell\'himalaya',
    'pepe', 'pepe nero', 'pepe bianco',
    'basilico', 'origano', 'timo', 'rosmarino',  'coriandolo', 'prezzemolo',
    'dragoncello', 'foglia di alloro', 'alloro',
    'cumino', 'curcuma', 'cannella', 'zenzero',
    'chiodi di garofano', 'noce moscata', 'pimento',
    'fieno greco', 'aglio in polvere', 'cipolla in polvere',
    'peperoncino di cayenna',
    'senape', 'semi di senape',
    'vaniglia', 'baccello di vaniglia', 'estratto di vaniglia',
    'succo di limone', 'scorza di limone',
    'cacao in polvere', 'cacao amaro',
    'zafferano', 'anice stellato',
    'salz', 'meersalz', 'himalayasalz', 'rosa salz',
    'pfeffer', 'schwarzer pfeffer', 'weißer pfeffer',
    'basilikum', 'thymian', 'rosmarin', 'koriander', 'petersilie',
    'minze', 'salbei', 'lorbeerblatt', 'lorbeer',
    'kümmel', 'kurkuma', 'zimt', 'ingwer',
    'gewürznelken', 'muskatnuss', 'kardamom',
    'bockshornklee', 'knoblauchpulver', 'zwiebelpulver',
    'cayennepfeffer',
    'senfkörner',
    'vanilleschote', 'vanilleextrakt', 'echte vanille',
    'zitronensaft', 'zitronenschale',
    'kakaopulver', 'reines kakaopulver',
    'sternanis',
    'gewürze'
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
    'champagne vinegar', 'malt vinegar', 'coconut vinegar', 'ume plum vinegar',
    'vinaigre', 'vinaigre de cidre', 'vinaigre balsamique',
    'vinaigre de vin rouge', 'vinaigre de vin blanc', 'vinaigre de riz',
    'vinagre', 'vinagre de manzana', 'vinagre balsámico', 'vinagre de vino',
    'aceto', 'aceto di mele', 'aceto balsamico', 'aceto di vino',
    'essig', 'apfelessig', 'balsamico-essig', 'weinessig'
  ],

  fermented: [
    'sauerkraut', 'kimchi', 'miso', 'tempeh', 'natto',
    'kombucha', 'pickles', 'fermented vegetables',
    'fish sauce', 'nam pla', 'nuoc mam',
    'tamari', 'soy sauce', 'shoyu', 'coconut aminos',
    'gochujang', 'doenjang', 'ssamjang',
    'shrimp paste', 'belacan',
    'tofu', 'silken tofu', 'firm tofu',
    'choucroute', 'chucrut', 'crauti'
  ],

  condiments: [
    'tahini', 'harissa',
    'tamarind paste', 'tamarind concentrate',
    'mustard', 'dijon mustard',
    'wasabi', 'horseradish',
    'hot sauce', 'sriracha', 'sambal',
    'pesto', 'chimichurri', 'salsa verde',
    'moutarde', 'moutarde de dijon',
    'mostaza dijon', 'senape di digione'
  ],

  breads: [
    'sourdough', 'sourdough bread',
    'whole wheat bread', 'whole grain bread',
    'whole wheat naan', 'whole wheat roti', 'chapati', 'paratha',
    'whole wheat pita', 'whole wheat tortilla',
    'sprouted bread', 'ezekiel bread',
    'pain au levain', 'pain complet', 'pan integral'
  ],

  processing_agents: [
    // water and basics
    'water', 'filtered water', 'spring water', 'sparkling water', 'seltzer',
    'eau', 'agua', 'acqua', 'wasser',
    'base de soja', 'base d\'avoine', 'base d\'amande',
    // baking agents
    'baking soda', 'sodium bicarbonate', 'bicarbonate de soude', 'bicarbonato',
    'calcium hydroxide', 'slaked lime', 'food grade lime',
    'cream of tartar',
    'agar', 'agar agar',
    'arrowroot', 'arrowroot powder',
    'calcium sulfate', 'nigari',
    'rennet', 'cultures', 'starter culture', 'live cultures',
    'yeast', 'active dry yeast', 'instant yeast', 'nutritional yeast',
    'levure', 'levadura', 'lievito', 'hefe',
    // calcium fortification (added by manufacturer but not industrial)
    'calcium', 'calcio', 'kalzium',
    // probiotic strains
    'l. helveticus', 'l. salivarius', 'l. lactis', 'l. rhamnosus', 'l. plantarum',
    'l. acidophilus', 's. thermophilus', 'b. breve', 'l. brevis', 'l. gasseri',
    'l. casei', 'l. reuteri', 'b. longum', 'b. bifidum', 'b. infantis', 'l. fermentum',
    'l. bulgaricus', 'lactobacillus bulgaricus',
    'lactobacillus', 'bifidobacterium', 'streptococcus thermophilus',
    'lactococcus', 'leuconostoc', 'pediococcus', 'probiotic cultures',
    'probiotic', 'probiotics', 'live active cultures', 'active cultures',
    'custom probiotic cultures',
    'fermenti lattici', 'cultivos probióticos',
    'kulturen', 'milchsäurekulturen'
  ],

  alcohol: [
    'wine', 'red wine', 'white wine',
    'beer', 'ale', 'lager',
    'cider', 'hard cider',
    'whiskey', 'bourbon', 'scotch',
    'vodka', 'gin', 'rum', 'tequila', 'mezcal',
    'sake', 'mirin',
    'vin', 'vino', 'wein', 'bière', 'cerveza', 'birra', 'bier'
  ],

  flowers_herbs: [
    'hibiscus', 'sorrel', 'dried hibiscus', 'rose petals', 'lavender',
    'chamomile', 'elderflower', 'jasmine'
  ]
}


// ============================================
// NOT REAL
// ============================================

const notRealFood = [
  // refined grains
  'enriched rice', 'instant rice enriched',
  'enriched flour', 'wheat flour', 'flour', 'all-purpose flour',
  'enriched wheat flour', 'bleached flour', 'semolina', 'durum wheat flour',
  'enriched', 'bleached', 'bromated',
  'farine de blé', 'farine blanche', 'farine raffinée',
  'harina de trigo', 'harina blanca', 'harina refinada',
  'farina di grano', 'farina bianca', 'farina raffinata',
  'weizenmehl', 'weißmehl',

  // industrial seed oils
  'vegetable oil', 'canola oil', 'soybean oil', 'corn oil',
  'cottonseed oil', 'safflower oil', 'sunflower oil', 'rapeseed oil',
  'hydrogenated', 'partially hydrogenated', 'interesterified', 'fractionated',
  'palm oil', 'palm kernel oil', 'palm shortening', 'shortening',
  'huile végétale', 'huile de canola', 'huile de colza', 'huile de soja',
  'huile de tournesol', 'huile de palme', 'huile de maïs', 'huile partiellement hydrogénée',
  'aceite vegetal', 'aceite de canola', 'aceite de soja', 'aceite de soya',
  'aceite de girasol', 'aceite de palma', 'aceite de maíz',
  'olio vegetale', 'olio di colza', 'olio di soia', 'olio di girasole',
  'olio di palma', 'olio di mais',
  'pflanzenöl', 'rapsöl', 'sojaöl', 'sonnenblumenöl', 'palmöl', 'maisöl',

  // refined sugars — match plain "sucre", "azúcar", "zucchero", "zucker"
  // english variants are full strings; multilingual handled below
  'sugar', 'cane sugar', 'brown sugar', 'powdered sugar', 'confectioners sugar',
  'high fructose corn syrup', 'corn syrup', 'glucose', 'glucose syrup',
  'dextrose', 'maltose', 'sucrose', 'fructose', 'invert sugar',
  'malt syrup', 'barley malt', 'barley malt syrup', 'rice syrup',
  'agave', 'agave nectar', 'agave syrup',
  'turbinado', 'demerara',
  'sirop de glucose', 'sirop de maïs', 'sirop de fructose',
  'jarabe de maíz', 'jarabe de glucosa', 'jarabe de fructosa', 'jarabe de agave',
  'sciroppo di glucosio', 'sciroppo di mais', 'sciroppo di fruttosio',
  'glukosesirup', 'maissirup', 'fruktosesirup',

  // artificial sweeteners
  'aspartame', 'sucralose', 'saccharin', 'acesulfame', 'acesulfame potassium', 'acesulfame-k',
  'neotame', 'advantame', 'erythritol', 'xylitol', 'sorbitol', 'maltitol',
  'mannitol', 'isomalt',
  'aspartamo', 'sacarina',
  'aspartam',

  // E-numbers
  'e950', 'e951', 'e952', 'e954', 'e955', 'e957', 'e960', 'e961', 'e962',
  'e420', 'e421', 'e953', 'e965', 'e966', 'e967', 'e968',

  // isolated starches
  'corn starch', 'cornstarch', 'modified corn starch', 'modified food starch',
  'modified starch', 'potato starch', 'tapioca starch', 'rice starch',
  'amidon de maïs', 'amidon modifié', 'fécule de maïs', 'fécule de pomme de terre',
  'almidón de maíz', 'almidón modificado', 'fécula de maíz',
  'amido di mais', 'amido modificato', 'fecola di patate',
  'maisstärke', 'modifizierte stärke', 'kartoffelstärke',

  // industrial additives
  'maltodextrin', 'dextrin', 'cyclodextrin',
  'maltodextrine', 'maltodextrina', 'maltodestrina',
  'natural flavor', 'natural flavors', 'natural flavoring', 'natural flavourings',
  'natural flavour', 'natural flavours',
  'artificial flavor', 'artificial flavors', 'artificial flavoring',
  'natural and artificial flavors', 'flavoring', 'flavourings',
  'vanillin',
  'arôme', 'arômes',
  'aromas', 'aroma', 'saborizantes',
  'aromi', 'aromen',
  'msg', 'monosodium glutamate', 'autolyzed yeast', 'autolyzed yeast extract',
  'glutamate monosodique', 'glutamato monosódico', 'glutammato monosodico',
  'mononatriumglutamat',
  'hydrolyzed protein', 'hydrolyzed soy protein', 'hydrolyzed vegetable protein',
  'hydrolyzed plant protein', 'hvp',
  'protéine hydrolysée', 'proteína hidrolizada', 'proteina idrolizzata',
  'yeast extract', 'torula yeast',
  'extrait de levure', 'extracto de levadura', 'estratto di lievito', 'hefeextrakt',
  'disodium inosinate', 'disodium guanylate',

  // synthetic dyes
  'artificial color', 'artificial colors', 'fd&c', 'red 40', 'red 3', 'yellow 5', 'yellow 6',
  'blue 1', 'blue 2', 'green 3', 'caramel color', 'titanium dioxide',
  'annatto extract', 'annatto color', 'color annatto', 'e160b',
  'color added', 'colour added',
  'colorant', 'colorants',
  'colorante', 'colorantes',
  'colorante alimentare',
  'farbstoff', 'farbstoffe', 'lebensmittelfarbe',
  'e100', 'e101', 'e102', 'e104', 'e110', 'e120', 'e122', 'e123', 'e124',
  'e127', 'e129', 'e131', 'e132', 'e133', 'e140', 'e141', 'e142', 'e150',
  'e150a', 'e150b', 'e150c', 'e150d', 'e151', 'e160', 'e160a', 'e160c',
  'e160d', 'e160e', 'e160f', 'e161', 'e161b', 'e162', 'e163', 'e170',
  'e171', 'e172', 'e173', 'e174', 'e175', 'e180',

  // chemical preservatives
  'sodium nitrate', 'sodium nitrite', 'nitrate', 'nitrite',
  'nitrate de sodium', 'nitrite de sodium', 'nitrato', 'nitrito',
  'bht', 'bha', 'tbhq', 'propyl gallate',
  'sodium benzoate', 'potassium sorbate', 'calcium propionate', 'sorbic acid',
  'benzoate de sodium', 'sorbate de potassium', 'propionate de calcium',
  'benzoato sódico', 'sorbato de potasio', 'propionato de calcio',
  'sulfites', 'sodium sulfite', 'sodium bisulfite', 'sulfite',
  'sodium metabisulfite', 'potassium metabisulfite',
  'sulfitos', 'solfiti',
  'sodium erythorbate',
  'sodium ferrocyanide', 'anti-caking', 'anti-agglomérant',
  'conservateur', 'conservateurs', 'conservante', 'conservantes',
  'konservierungsstoff', 'konservierungsstoffe',
  'e200', 'e201', 'e202', 'e203', 'e210', 'e211', 'e212', 'e213', 'e214',
  'e215', 'e216', 'e217', 'e218', 'e219', 'e220', 'e221', 'e222', 'e223',
  'e224', 'e225', 'e226', 'e227', 'e228', 'e230', 'e231', 'e232', 'e233',
  'e234', 'e235', 'e239', 'e242', 'e249', 'e250', 'e251', 'e252', 'e260',
  'e270', 'e280', 'e281', 'e282', 'e283', 'e284', 'e285', 'e290',
  'e296', 'e297',
  'e310', 'e311', 'e312', 'e319', 'e320', 'e321',

  // industrial thickeners and stabilizers
  'carrageenan', 'xanthan gum', 'guar gum', 'gellan gum', 'locust bean gum',
  'cellulose', 'cellulose gum', 'methylcellulose', 'cellulose gel',
  'sodium alginate', 'propylene glycol alginate', 'alginate',
  'pectin', 'modified pectin', 'pectine', 'pectines',
  'carraghénane', 'gomme xanthane', 'gomme guar', 'gomme arabique',
  'pectina', 'pectinas',
  'carragenina', 'goma xantana', 'goma guar', 'celulosa',
  'gomma di xantano', 'gomma di guar', 'cellulosa',
  'carrageen', 'xanthan', 'guarkernmehl', 'pektin',
  'épaississant', 'épaississants', 'stabilisant', 'stabilisants',
  'estabilizante', 'estabilizantes', 'espesante', 'espesantes',
  'addensante', 'addensanti', 'stabilizzante', 'stabilizzanti',
  'verdickungsmittel', 'stabilisator',
  'e400', 'e401', 'e402', 'e403', 'e404', 'e405', 'e406', 'e407', 'e407a',
  'e410', 'e412', 'e413', 'e414', 'e415', 'e416', 'e417', 'e418', 'e425',
  'e440', 'e441', 'e460', 'e461', 'e463', 'e464', 'e465', 'e466', 'e468',
  'e469',

  // emulsifiers
  'soy lecithin', 'lecithin', 'sunflower lecithin',
  'lécithine', 'lécithine de soja', 'lécithine de tournesol',
  'lecitina', 'lecitina de soja', 'lecitina di soia',
  'sojalecithin',
  'mono and diglycerides', 'monoglycerides', 'diglycerides',
  'mono-et diglycérides', 'mono y diglicéridos', 'mono e digliceridi',
  'mono- und diglyceride',
  'polysorbate', 'polysorbate 80', 'polysorbate 60', 'polysorbate 20',
  'sodium stearoyl lactylate', 'datem', 'propylene glycol',
  'émulsifiant', 'émulsifiants', 'emulsionante', 'emulsionantes',
  'emulsionanti', 'emulgator', 'emulgatoren',
  'e430', 'e431', 'e432', 'e433', 'e434', 'e435', 'e436',
  'e470', 'e470a', 'e470b', 'e471', 'e472', 'e472a', 'e472b', 'e472c',
  'e472d', 'e472e', 'e472f', 'e473', 'e474', 'e475', 'e476', 'e477',
  'e478', 'e479', 'e479b', 'e481', 'e482', 'e483', 'e491', 'e492',
  'e493', 'e494', 'e495',

  // isolated acids
  'citric acid', 'phosphoric acid', 'lactic acid', 'malic acid', 'fumaric acid', 'tartaric acid',
  'ascorbic acid', 'sodium citrate', 'sodium phosphate', 'calcium phosphate',
  'calcium chloride', 'sodium acid pyrophosphate',
  'acide citrique', 'acide phosphorique', 'acide lactique', 'acide malique',
  'acide ascorbique', 'citrate de sodium', 'phosphate de sodium',
  'citrate tricalcique', 'citrates de sodium',
  'ácido cítrico', 'ácido fosfórico', 'ácido láctico', 'ácido ascórbico',
  'citrato de sodio', 'fosfato de sodio',
  'acido citrico', 'acido fosforico', 'acido lattico', 'acido ascorbico',
  'citrato di sodio', 'fosfato di sodio',
  'citronensäure', 'phosphorsäure', 'milchsäure', 'ascorbinsäure',
  'natriumcitrat', 'natriumphosphat',
  'correcteurs d\'acidité', 'correcteur d\'acidité', 'régulateurs d\'acidité',
  'reguladores de acidez', 'corrector de acidez',
  'correttori di acidità', 'regolatore di acidità',
  'säureregulator', 'säureregulatoren',
  'e261', 'e262', 'e263',
  'e325', 'e326', 'e327', 'e330', 'e331', 'e332', 'e333', 'e334', 'e335',
  'e336', 'e337', 'e338', 'e339', 'e340', 'e341', 'e343', 'e350', 'e351',
  'e352', 'e353', 'e354', 'e355', 'e356', 'e357', 'e363', 'e380', 'e385',
  'esters d\'acides gras de l\'acide ascorbique',
  'ésteres de ácidos grasos del ácido ascórbico',

  // protein isolates
  'protein isolate', 'soy protein isolate', 'whey protein isolate', 'pea protein isolate',
  'protein concentrate', 'soy protein concentrate',
  'sodium caseinate', 'calcium caseinate', 'milk protein concentrate',
  'textured vegetable protein', 'tvp',
  'isolat de protéine', 'isolat de protéine de soja', 'isolat de protéine de lactosérum',
  'aislado de proteína', 'aislado de proteína de soja',
  'isolato proteico', 'isolato di proteine di soia',
  'proteinisolat', 'sojaproteinisolat',

  // synthetic enrichment additives
  'niacin', 'niacinamide', 'thiamin', 'thiamine', 'riboflavin', 'folic acid', 'folate',
  'reduced iron', 'ferrous sulfate', 'thiamine mononitrate',
  'zinc oxide', 'added vitamins', 'vitamin blend', 'mineral blend',
  'niacine', 'riboflavine', 'acide folique', 'fer réduit',
  'niacina', 'tiamina', 'riboflavina', 'ácido fólico', 'hierro reducido',
  'acido folico', 'ferro ridotto',
  'folsäure', 'eisen reduziert',
  'extrait riche en tocophérols',
  'extracto rico en tocoferoles',
  'estratto ricco di tocoferoli',
  'tocopherolreicher extrakt',
  'vitamines b2', 'vitamines b12', 'vitamine b12', 'vitamine b2',
  'vitamines ajoutées',
  'vitaminas añadidas', 'mezcla de vitaminas',
  'vitamine aggiunte', 'miscela di vitamine',
  'zugesetzte vitamine', 'vitaminmischung',
  'd2', 'd3', 'b12',

  // dough conditioners
  'dough conditioner', 'calcium peroxide', 'azodicarbonamide',
  'sodium aluminum phosphate', 'sodium aluminum sulfate',
  'ammonium sulfate',

  // misc
  'smoke flavor', 'liquid smoke', 'smoke flavoring',
  'arôme de fumée', 'humo líquido', 'aroma di fumo', 'raucharoma',
  'enzyme modified',
  'inulin', 'soluble corn fiber', 'resistant starch',
  'inuline', 'inulina',
  'glycerin', 'glycerol', 'glycérine', 'glicerina', 'glicerolo',
  'silicon dioxide', 'calcium silicate',
  'dioxyde de silicium', 'dióxido de silicio', 'biossido di silicio', 'siliciumdioxid',
  'concentré de carotte',
  'concentrado de zanahoria',
  'concentrato di carota',
  'karottenkonzentrat',
  'antioxydants', 'antioxidants', 'antioxidantes', 'antiossidanti', 'antioxidationsmittel'
]

// these are exact-match standalone words that should be flagged as not-real
// (they would otherwise be ambiguous as substrings of real foods like "sucre de coco")
const notRealExactWords = [
  'sucre', 'azúcar', 'zucchero', 'zucker',
  'sirop', 'jarabe', 'sciroppo', 'sirup',
  'mélasse', 'melaza',
  'miel',
  'flour', 'farine'
]


// ============================================
// CAUTION FLAGS
// ============================================

const cautionFlags = [
  'spices', 'spice', 'seasoning', 'seasonings', 'herbs', 'dried herbs',
  'épice', 'épices', 'assaisonnement', 'condimento', 'gewürze',
  'white rice', 'basmati rice', 'jasmine rice', 'sushi rice',
  'long grain rice', 'short grain rice', 'parboiled rice', 'converted rice', 'instant rice',
  'riz blanc', 'riz basmati', 'riz jasmin',
  'arroz blanco', 'arroz basmati', 'arroz jazmín',
  'riso bianco', 'riso basmati', 'riso jasmine',
  'weißer reis', 'basmatireis', 'jasminreis',
  'gelatin', 'gélatine', 'gelatina', 'gelatine',
  'lemon juice concentrate', 'lime juice concentrate', 'orange juice concentrate',
  'apple juice concentrate', 'juice concentrate', 'fruit juice concentrate', 'fruit concentrate',
  'concentré de jus', 'concentré de fruits',
  'concentrado de jugo', 'concentrado de zumo',
  'concentrato di succo',
  'fruchtsaftkonzentrat', 'saftkonzentrat',
  'baking powder', 'levure chimique', 'polvo de hornear', 'lievito in polvere', 'backpulver',
  'coconut milk', 'coconut cream',
  'lait de coco', 'crème de coco',
  'leche de coco', 'crema de coco',
  'latte di cocco', 'crema di cocco',
  'kokosmilch', 'kokoscreme',
  'celery powder', 'celery juice powder',
  'carbonation', 'carbonated', 'carbonatation', 'gasificada', 'gasata', 'kohlensäure',
  'table salt', 'iodized salt', 'sel de table', 'sal de mesa', 'sale da tavola', 'speisesalz',
  'lait frais partiellement écrémé', 'lait partiellement écrémé', 'lait écrémé',
  'leche desnatada', 'leche descremada', 'leche semidesnatada',
  'latte parzialmente scremato', 'latte scremato',
  'fettarme milch', 'magermilch',
  'milk powder', 'skim milk powder', 'nonfat dry milk', 'milk solids',
  'lait en poudre', 'poudre de lait',
  'leche en polvo',
  'latte in polvere',
  'milchpulver',
  'sel marin enrichi', 'sal marina enriquecida'
]


// ============================================
// BONUS BADGE MAP
// ============================================

const BONUS_BADGE_MAP = [
  { keywords: ['organic', 'certified organic', 'usda organic', 'canada organic', 'biologique', 'orgánico', 'biologico', 'biologisch'], icon: '🌿', label: 'Organic' },
  { keywords: ['pasture-raised', 'pasture raised', 'pastured'], icon: '🐔', label: 'Pasture-Raised' },
  { keywords: ['grass-fed', 'grass fed', 'grassfed', 'grass-finished', 'grass finished'], icon: '🌱', label: 'Grass-Fed' },
  { keywords: ['wild-caught', 'wild caught', 'wild fish'], icon: '🐟', label: 'Wild-Caught' },
  { keywords: ['non-gmo', 'non gmo', 'no gmo', 'project verified non-gmo', 'sans ogm', 'sin ogm'], icon: '🧬', label: 'Non-GMO' },
  { keywords: ['regenerative', 'regenerative organic', 'regenerative certified'], icon: '♻️', label: 'Regenerative' },
  { keywords: ['fair trade', 'fair-trade', 'fairtrade', 'fair trade certified', 'commerce équitable'], icon: '🤝', label: 'Fair Trade' },
  { keywords: ['local', 'ontario', 'canadian', 'locally grown', 'locally sourced', 'made in ontario'], icon: '📍', label: 'Local' },
  { keywords: ['indigenous', 'first nations', 'native', 'indigenous sourced'], icon: '🪶', label: 'Indigenous Sourced' },
  { keywords: ['kosher', 'certified kosher'], icon: '✡️', label: 'Kosher' },
  { keywords: ['halal', 'certified halal'], icon: '☪️', label: 'Halal' }
]


// ============================================
// MAIN SCORING FUNCTION
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
    }
  }

  const parsed = parseIngredients(ingredientsText)

  const results = {
    realIngredients: [],
    notRealIngredients: [],
    cautionIngredients: [],
    unknownIngredients: [],
    bonuses: []
  }

  parsed.forEach(ingredient => {
    const cleaned = ingredient.toLowerCase().trim()

    // exact-match not-real words first — catches plain "sucre", "azúcar" etc
    // before they match real-food substrings like "sucre de coco"
    if (isNotRealExactWord(cleaned)) {
      results.notRealIngredients.push(ingredient)
      return
    }

    if (isReal(cleaned)) {
      results.realIngredients.push(ingredient)
      return
    }

    if (isNotReal(cleaned)) {
      results.notRealIngredients.push(ingredient)
      return
    }

    if (isCaution(cleaned)) {
      results.cautionIngredients.push(ingredient)
      results.realIngredients.push(ingredient)
      return
    }

    results.unknownIngredients.push(ingredient)
  })

  const totalCount = parsed.length
  const realCount = results.realIngredients.length
  const score = totalCount > 0 ? Math.round((realCount / totalCount) * 100) : 0

  return {
    score,
    realCount,
    totalCount,
    ...results
  }
}


// ============================================
// SCORE DISPLAY
// ============================================

export function getScoreDisplay(scoreData) {
  const notRealCount = scoreData.notRealIngredients ? scoreData.notRealIngredients.length : 0
  const cautionCount = scoreData.cautionIngredients ? scoreData.cautionIngredients.length : 0
  const pureRealCount = scoreData.realCount - cautionCount

  const parts = []
  if (pureRealCount > 0) {
    parts.push(`${pureRealCount} ${pureRealCount === 1 ? 'ingredient is real' : 'ingredients are real'}`)
  }
  if (cautionCount > 0) {
    parts.push(`${cautionCount} ${cautionCount === 1 ? 'is caution' : 'are caution'}`)
  }
  if (notRealCount > 0) {
    parts.push(`${notRealCount} ${notRealCount === 1 ? 'is processed' : 'are processed'}`)
  }

  const displayText = parts.length > 0 ? parts.join(', ') : 'No ingredients found'

  if (notRealCount > 0) {
    return { label: 'Processed', emoji: '🚫', color: 'text-red-600', bg: 'bg-red-50', borderColor: 'border-red-200', displayText }
  }
  if (cautionCount > 0) {
    return { label: 'Good Choice', emoji: '👍', color: 'text-yellow-600', bg: 'bg-yellow-50', borderColor: 'border-yellow-200', displayText }
  }
  return { label: '100% Real Food', emoji: '🥇', color: 'text-green-600', bg: 'bg-green-50', borderColor: 'border-green-200', displayText }
}


// ============================================
// SCORE COLOR
// ============================================

export function getScoreColor(scoreData) {
  const notRealCount = scoreData.notRealIngredients ? scoreData.notRealIngredients.length : 0
  const cautionCount = scoreData.cautionIngredients ? scoreData.cautionIngredients.length : 0
  if (notRealCount > 0) return '#dc2626'
  if (cautionCount > 0) return '#d97706'
  return '#16a34a'
}


// ============================================
// BONUS BADGES
// ============================================

export function getBonusBadges(labelsString = '', productName = '', brandName = '') {
  const searchText = `${labelsString} ${productName} ${brandName}`.toLowerCase()
  return BONUS_BADGE_MAP
    .filter(badge => badge.keywords.some(keyword => searchText.includes(keyword)))
    .map(badge => ({ icon: badge.icon, label: badge.label }))
}


// ============================================
// INTERNAL HELPERS
// ============================================

function parseIngredients(text) {
  let cleaned = text
    .replace(/ingredients:/i, '')
    .replace(/ingrédients:/i, '')
    .replace(/ingredientes:/i, '')
    .replace(/ingredienti:/i, '')
    .replace(/zutaten:/i, '')
    .replace(/contains less than 2% of:/i, ', ')
    .replace(/contains less than 1% of:/i, ', ')
    .replace(/contains 2% or less of:/i, ', ')
    .replace(/contains 1% or less of:/i, ', ')
    .trim()

  cleaned = cleaned.split(/contains:/i)[0]
  cleaned = cleaned.split(/may contain:/i)[0]
  cleaned = cleaned.split(/allergen/i)[0]
  cleaned = cleaned.split(/peut contenir/i)[0]
  cleaned = cleaned.split(/puede contener/i)[0]

  cleaned = cleaned.replace(/\(([^)]+)\)/g, ', $1')
  cleaned = cleaned.replace(/\[([^\]]+)\]/g, ', $1')

  const parts = cleaned.split(/[,;]/)

  return parts
    .map(p => p.trim())
    .filter(p => p.length > 1)
    .filter(p => !p.match(/^\d+%?$/))
    .filter(p => !p.match(/^and$/i))
    .filter(p => !p.match(/^or$/i))
    .filter(p => !p.match(/^et$/i))
    .filter(p => !p.match(/^y$/i))
    .filter(p => !p.match(/^e$/i))
    .filter(p => !p.match(/^und$/i))
    .map(p => p.replace(/^\*+/, '').trim())
    .map(p => p.replace(/\.$/, '').trim())
    .map(p => p.replace(/^and\s+/i, '').trim())
    .map(p => p.replace(/^or\s+/i, '').trim())
    .map(p => p.replace(/^et\s+/i, '').trim())
    .map(p => p.replace(/^y\s+/i, '').trim())
    .map(p => p.replace(/^e\s+/i, '').trim())
    .map(p => p.replace(/^und\s+/i, '').trim())
    .filter(p => p.length > 1)
}


function isNotRealExactWord(ingredient) {
  // strip percentages and parens leftovers, e.g. "sucre 8%" → "sucre"
  const stripped = ingredient.replace(/\d+%?/g, '').replace(/[()[\]]/g, '').trim()
  return notRealExactWords.includes(stripped)
}


function isReal(ingredient) {
  const lower = ingredient.toLowerCase()

  // palm oil exception
  if (lower.includes('palm oil') || lower.includes('palm kernel') || lower.includes('huile de palme')) {
    return lower.includes('red') || lower.includes('unrefined') ||
      lower.includes('virgin') || lower.includes('cold-pressed') ||
      lower.includes('cold pressed') || lower.includes('rouge') ||
      lower.includes('non raffinée')
  }

  // rice exception
  if (lower === 'rice' || lower === 'riz' || lower === 'arroz' || lower === 'riso' || lower === 'reis') {
    return false
  }
  if (lower.includes('rice') || lower.includes('riz') || lower.includes('arroz') || lower.includes('riso')) {
    if (lower.includes('rice vinegar') || lower.includes('rice wine') ||
        lower.includes('vinaigre de riz') || lower.includes('vinagre de arroz')) return true
    if (lower.includes('brown') || lower.includes('black') ||
        lower.includes('red') || lower.includes('wild') ||
        lower.includes('sprouted') || lower.includes('forbidden') ||
        lower.includes('complet') || lower.includes('integral') ||
        lower.includes('integrale') || lower.includes('naturreis')) return true
    return false
  }

  // annatto exception
  if (lower.includes('annatto') || lower.includes('achiote')) {
    if (lower.includes('extract') || lower.includes('color')) return false
    return true
  }

  const allRealFoods = Object.values(realFoodDatabase).flat()
  // exact match or ingredient is contained in a real food entry, but not the reverse —
  // this prevents plain "sucre" matching "sucre de coco"
  return allRealFoods.some(real => lower === real || lower.includes(real))
}


function isNotReal(ingredient) {
  const lower = ingredient.toLowerCase()
  return notRealFood.some(bad => lower.includes(bad))
}


function isCaution(ingredient) {
  const lower = ingredient.toLowerCase()
  return cautionFlags.some(caution => lower === caution || lower.includes(caution))
}