from marshmallow import Schema, fields, validate, validates, ValidationError

class UserSchema(Schema):
    # dump_only means this field is only included in responses
    # never accepted as input from the client
    id = fields.String(dump_only=True)
    created_at = fields.String(dump_only=True)

    # required on signup — must be at least 3 characters
    username = fields.String(
        required=True,
        validate=validate.Length(min=3, error="Username must be at least 3 characters.")
    )

    # required on signup — must be a valid email format
    email = fields.Email(required=True)

    # load_only means this field is accepted as input but never sent back
    # passwords should never appear in API responses
    password = fields.String(
        load_only=True,
        required=True,
        validate=validate.Length(min=6, error="Password must be at least 6 characters.")
    )


class SavedProductSchema(Schema):
    # auto-generated fields — never sent by the client
    id = fields.String(dump_only=True)
    user_id = fields.String(dump_only=True)
    date_saved = fields.String(dump_only=True)

    # required when saving a product
    barcode = fields.String(required=True)
    product_name = fields.String(
        required=True,
        validate=validate.Length(min=1, error="Product name cannot be empty.")
    )
    brand = fields.String()

    # badge must be one of the three valid tiers
    rfo_badge = fields.String(
        required=True,
        validate=validate.OneOf(
            ["real", "good", "processed"],
            error="Badge must be real, good, or processed."
        )
    )

    # score must be between 0 and 100
    rfo_score = fields.Integer(
        required=True,
        validate=validate.Range(min=0, max=100, error="Score must be between 0 and 100.")
    )

    # optional — only sent when user adds or edits notes
    notes = fields.String(load_default=None)


class NoteSchema(Schema):
    # used only for the PATCH /saved-products/:id route
    # only the notes field can be updated
    notes = fields.String(required=True)