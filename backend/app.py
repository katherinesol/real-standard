from flask import Flask, request, session, jsonify
from config import create_app, db
from models import User, SavedProduct
from schemas import UserSchema, SavedProductSchema, NoteSchema
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

app = create_app()

# instantiate schemas for serializing single objects and lists
user_schema = UserSchema()
saved_product_schema = SavedProductSchema()
saved_products_schema = SavedProductSchema(many=True)
note_schema = NoteSchema()


# ============================================
# AUTH ROUTES
# ============================================

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    # guard against empty request body
    if not data:
        return jsonify({"error": "Request body required"}), 400

    try:
        # validate incoming data against the schema
        validated = user_schema.load(data)

        # create the new user
        user = User(
            username=validated["username"],
            email=validated["email"]
        )

        # hash and store the password via the hybrid property setter
        user.password_hash = validated["password"]

        db.session.add(user)
        db.session.commit()

        # log the user in immediately after signup
        session["user_id"] = user.id

        return jsonify(user.to_dict()), 201

    except ValidationError as e:
        # marshmallow validation failed — bad input from client
        db.session.rollback()
        return jsonify({"errors": e.messages}), 422

    except IntegrityError:
        # username or email already exists in the database
        db.session.rollback()
        return jsonify({"error": "Username or email already taken"}), 422

    except ValueError as e:
        # model level validation failed
        db.session.rollback()
        return jsonify({"error": str(e)}), 422

    except Exception as e:
        # catch all fallback for unexpected errors
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    # guard against empty request body
    if not data:
        return jsonify({"error": "Request body required"}), 400

    username = data.get("username")
    password = data.get("password")

    # guard against missing fields
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    try:
        # look up user by username
        user = User.query.filter_by(username=username).first()

        # verify the password against the stored hash
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return jsonify(user.to_dict()), 200

        # invalid credentials — do not reveal which field was wrong
        return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/check_session", methods=["GET"])
def check_session():
    # check if there is an active session
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    try:
        user = User.query.filter_by(id=user_id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify(user.to_dict()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/logout", methods=["DELETE"])
def logout():
    # check session exists before clearing
    if not session.get("user_id"):
        return jsonify({"error": "Not logged in"}), 401

    session.clear()
    return jsonify({}), 204


# ============================================
# SAVED PRODUCTS ROUTES
# ============================================

@app.route("/saved-products", methods=["GET"])
def get_saved_products():
    # check the user is logged in
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        # parse pagination params with safe defaults
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 10, type=int)

        # clamp per_page to a reasonable range to prevent abuse
        if per_page > 100:
            per_page = 100
        if per_page < 1:
            per_page = 10
        if page < 1:
            page = 1

        # only return products belonging to the logged in user
        # newest first
        query = SavedProduct.query.filter_by(user_id=user_id).order_by(
            SavedProduct.date_saved.desc()
        )

        # paginate the results
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            "products": [p.to_dict() for p in pagination.items],
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total": pagination.total,
            "pages": pagination.pages,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/saved-products", methods=["POST"])
def save_product():
    # check the user is logged in
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()

    # guard against empty request body
    if not data:
        return jsonify({"error": "Request body required"}), 400

    try:
        # validate incoming data against the schema
        validated = saved_product_schema.load(data)

        product = SavedProduct(
            user_id=user_id,
            barcode=validated["barcode"],
            product_name=validated["product_name"],
            brand=validated.get("brand"),
            rfo_badge=validated["rfo_badge"],
            rfo_score=validated["rfo_score"],
            notes=validated.get("notes")
        )

        db.session.add(product)
        db.session.commit()

        return jsonify(product.to_dict()), 201

    except ValidationError as e:
        db.session.rollback()
        return jsonify({"errors": e.messages}), 422

    except ValueError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 422

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/saved-products/<string:id>", methods=["PATCH"])
def update_notes(id):
    # check the user is logged in
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()

    # guard against empty request body
    if not data:
        return jsonify({"error": "Request body required"}), 400

    try:
        # validate incoming data
        validated = note_schema.load(data)

        # filter by both id and user_id — users can only edit their own products
        product = SavedProduct.query.filter_by(id=id, user_id=user_id).first()

        if not product:
            return jsonify({"error": "Product not found"}), 404

        product.notes = validated["notes"]
        db.session.commit()

        return jsonify(product.to_dict()), 200

    except ValidationError as e:
        db.session.rollback()
        return jsonify({"errors": e.messages}), 422

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/saved-products/<string:id>", methods=["DELETE"])
def delete_saved_product(id):
    # check the user is logged in
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    try:
        # filter by both id and user_id — users can only delete their own products
        product = SavedProduct.query.filter_by(id=id, user_id=user_id).first()

        if not product:
            return jsonify({"error": "Product not found"}), 404

        db.session.delete(product)
        db.session.commit()

        return jsonify({}), 204

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ============================================
# RUN
# ============================================

if __name__ == "__main__":
    app.run(port=5555, debug=True)