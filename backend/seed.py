from config import create_app, db
from models import User, SavedProduct

app = create_app()

with app.app_context():

    # clear existing data in the correct order
    # delete child records before parent records to avoid foreign key errors
    print("Clearing existing data...")
    SavedProduct.query.delete()
    User.query.delete()
    db.session.commit()

    # create test users
    print("Creating users...")

    kaye = User(
        username="kaye",
        email="kaye@realstandard.com"
    )
    kaye.password_hash = "password123"

    alex = User(
        username="alex",
        email="alex@realstandard.com"
    )
    alex.password_hash = "password123"

    db.session.add_all([kaye, alex])
    db.session.commit()

    # create saved products for kaye
    print("Creating saved products...")

    products = [
        SavedProduct(
            user_id=kaye.id,
            barcode="0123456789",
            product_name="Almond Flour Crackers Sea Salt",
            brand="Simple Mills",
            rfo_badge="real",
            rfo_score=100,
            notes="Buy at Whole Foods — aisle 3"
        ),
        SavedProduct(
            user_id=kaye.id,
            barcode="9876543210",
            product_name="Organic Peanut Butter",
            brand="Kirkland",
            rfo_badge="real",
            rfo_score=100,
            notes="Only the unsalted version passes"
        ),
        SavedProduct(
            user_id=kaye.id,
            barcode="5551234567",
            product_name="Triscuit Original",
            brand="Nabisco",
            rfo_badge="good",
            rfo_score=85,
            notes=None
        ),
        SavedProduct(
            user_id=kaye.id,
            barcode="1112223334",
            product_name="Oreo Original",
            brand="Nabisco",
            rfo_badge="processed",
            rfo_score=0,
            notes="Failed — cane sugar and natural flavors"
        ),
        SavedProduct(
            user_id=alex.id,
            barcode="4445556667",
            product_name="Whole Milk Greek Yogurt",
            brand="Siggi's",
            rfo_badge="real",
            rfo_score=100,
            notes=None
        ),
    ]

    db.session.add_all(products)
    db.session.commit()

    print("Done. Seeded 2 users and 5 saved products.")