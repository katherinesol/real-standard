import uuid
from config import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

def generate_uuid():
    # generate a random UUID string for each new record
    # using strings instead of UUID type so it works with SQLite
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = "users"

    # UUID primary key — randomly generated, no sequential pattern
    # tells you nothing about the person behind the account
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    
    # store the bcrypt hash only — never the real password
    _password_hash = db.Column(db.String, nullable=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # one user has many saved products
    # delete-orphan means if user is deleted, all their saved products go too
    saved_products = db.relationship(
        "SavedProduct",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    @validates("username")
    def validate_username(self, key, value):
        # username must exist and be at least 3 characters
        if not value or len(value.strip()) < 3:
            raise ValueError("Username must be at least 3 characters.")
        return value.strip()

    @validates("email")
    def validate_email(self, key, value):
        # email must contain an @ symbol
        if not value or "@" not in value:
            raise ValueError("Invalid email address.")
        return value.strip().lower()

    @hybrid_property
    def password_hash(self):
        # block any attempt to read the password hash directly
        raise AttributeError("Password is write-only.")

    @password_hash.setter
    def password_hash(self, password):
        # hash the password with bcrypt before storing
        self._password_hash = bcrypt.generate_password_hash(
            password.encode("utf-8")
        ).decode("utf-8")

    def authenticate(self, password):
        # hash the login attempt and compare to the stored hash
        # returns True if they match, False if not
        return bcrypt.check_password_hash(self._password_hash, password)

    def to_dict(self):
        # return only safe fields — never expose the password hash
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": str(self.created_at)
        }


class SavedProduct(db.Model):
    __tablename__ = "saved_products"

    # UUID primary key — same pattern as User
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    
    # foreign key links to users.id — stores the UUID string, not a name
    # this is the only link between a saved product and its owner
    user_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    
    barcode = db.Column(db.String, nullable=False)
    product_name = db.Column(db.String, nullable=False)
    brand = db.Column(db.String)
    
    # the RFO verdict — real, good, or processed
    rfo_badge = db.Column(db.String, nullable=False)
    
    # score out of 100
    rfo_score = db.Column(db.Integer, nullable=False)
    
    # optional user notes — added or edited after saving
    notes = db.Column(db.Text)
    
    date_saved = db.Column(db.DateTime, server_default=db.func.now())

    # belongs to one user
    user = db.relationship("User", back_populates="saved_products")

    @validates("rfo_badge")
    def validate_badge(self, key, value):
        # badge must be one of the three valid tiers
        allowed = ["real", "good", "processed"]
        if value not in allowed:
            raise ValueError(f"Badge must be one of: {allowed}")
        return value

    @validates("rfo_score")
    def validate_score(self, key, value):
        # score must be between 0 and 100
        if not 0 <= value <= 100:
            raise ValueError("Score must be between 0 and 100.")
        return value

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "barcode": self.barcode,
            "product_name": self.product_name,
            "brand": self.brand,
            "rfo_badge": self.rfo_badge,
            "rfo_score": self.rfo_score,
            "notes": self.notes,
            "date_saved": str(self.date_saved)
        }