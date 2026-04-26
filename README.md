# Real Standard

A full-stack food ingredient scanner that grades products against a strict, fixed standard. Users scan barcodes or search products from the Open Food Facts database, and every ingredient is classified as **Real**, **Caution**, or **Not Real**. A single not-real ingredient fails the entire product — no exceptions, no point-based averaging.

This is Project 2 of the summative, extending the Project 1 Real Food Only scanner with a Flask backend, user authentication, and a personal pantry.

---

## What Makes This Different

Most food scanners use point-based grading where a few good ingredients can offset bad ones. Real Standard does not. The standard is binary by ingredient: **one not-real ingredient fails the whole product**.

The scoring engine now reads ingredient text from Open Food Facts, classifies each item against a multilingual database (English, French, Spanish, Italian, German), and renders a Tier I / Tier II / Tier III verdict.

- **Tier I** — every ingredient passes the standard
- **Tier II** — no not-real ingredients, but caution items present (white rice, gelatin, juice concentrate, etc.)
- **Tier III** — at least one not-real ingredient, automatic fail

---

## Technologies Used

**Backend**
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-Bcrypt (password hashing)
- Marshmallow (validation + serialization)
- Flask-CORS
- SQLite (development)

**Frontend**
- React 19
- React Router
- Vite
- Tailwind v4

**External APIs**
- Open Food Facts (product and ingredient data)

**Privacy**
- UUID primary keys on all models — no sequential IDs
- Email used for login only, never exposed in API responses
- Cascade delete: removing a user removes all their saved data

---

## Setup and Run

### Prerequisites
- Python 3.10+
- Node.js 18+
- pipenv

### Backend

```bash
cd backend
pipenv install
pipenv shell
flask db upgrade
python seed.py
python app.py
```

The backend runs on `http://localhost:5555`.

### Frontend

In a separate terminal:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Seed Credentials

After running `python seed.py`, you can log in with:

- Username: `kaye` · Password: `password123`
- Username: `alex` · Password: `password123`

---

## Core Functionality

### Public Features
- **Search products** from the Open Food Facts database by name or barcode
- **View detailed scoring** with every ingredient classified and explained
- **Filter search results** by tier (All, Tier I, Tier II, Tier III)
- **Manual check** — paste any ingredient list and grade it
- **Pass the Standard alternatives** — when a product fails, the app finds and displays passing alternatives in the same category

### Authenticated Features
- **Sign up and log in** with bcrypt-hashed passwords
- **Save products to a personal pantry** with a single click
- **Add and edit notes** on saved products
- **Remove products** from the pantry
- **Paginated pantry view** for users with large libraries

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signup` | — | Create a new user |
| POST | `/login` | — | Authenticate and start session |
| GET | `/check_session` | session | Verify active session |
| DELETE | `/logout` | session | End session |
| GET | `/saved-products?page=1&per_page=10` | session | List user's saved products (paginated) |
| POST | `/saved-products` | session | Save a new product to pantry |
| PATCH | `/saved-products/:id` | session | Update notes on a saved product |
| DELETE | `/saved-products/:id` | session | Remove a saved product |

All `/saved-products` routes enforce ownership — users can only access their own records.

---

## Data Models

**User** — id (UUID), username, email, password_hash, created_at
**SavedProduct** — id (UUID), user_id (FK), barcode, product_name, brand, rfo_badge, rfo_score, notes, date_saved

The relationship is one-to-many: a User has many SavedProducts. Cascade delete is enforced — removing a user removes all their saved products.

---

## Design

The interface is built around an editorial newspaper aesthetic, drawing visual cues from independent print publications. The typography uses **Bebas Neue** for display, **DM Sans** for body, and **JetBrains Mono** for labels. Every page uses 2px rules and a fixed paper-and-ink palette.

---

## Known Limitations

- Currently uses SQLite for development; production deployment would require PostgreSQL
- Not deployed to a live URL — runs locally only
- Some highly specific Open Food Facts categories (e.g., niche plant-based dairy alternatives) may return few or no passing alternatives
- Multilingual ingredient database covers English, French, Spanish, Italian, and German; other languages may produce more "Unclassified" items
- No barcode camera scanner yet — search by typing barcode or product name (planned for V3)

---

## Roadmap

**V3** — Barcode camera scanner (zxing), OCR label scanning (Tesseract.js), allergen filtering, ingredient-level reasoning expansion

**V4** — Verified product database (user-submitted, moderated), reformulation alerts, retailer locator

---

