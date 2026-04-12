# Real Food Only

A Clean-Label food scanner that enforces the "Real Food Standard" — a rigorous, non-negotiable ingredient classification system. Built for: Conscious consumers in Toronto who want to cut through marketing noise and eat true whole foods.


## What It Does

Search a food product by name or barcode. Every ingredient is checked against
three tiers: Real, Caution, and Not Real. Products are scored and badged instantly
with no greenwashing — one bad ingredient fails the whole product.

## Setup

1. Clone the repo
2. npm install
3. npm run dev

No API key required. Data from Open Food Facts (world.openfoodfacts.org).

## API Endpoints Used

- Search: https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&json=true
- Product: https://world.openfoodfacts.org/api/v2/product/{barcode}

## Known Challenges

- Open Food Facts ingredient data is user-submitted and inconsistent in format
- Some products have no ingredient data — these show a "no data" state 
- Ingredient parsing handles sub-ingredients in parentheses but complex labels
may occasionally miscategorize edge cases

## Tech Stack

React · React Router · Tailwind CSS · Vite · Open Food Facts API