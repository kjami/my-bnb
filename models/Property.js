import { Schema, models, model } from "mongoose";

const propertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Property name is required"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "Property type is required"],
        trim: true
    },
    description: String,
    location: {
        street: {
            type: String,
            required: [true, "Street is required"],
            trim: true
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true
        },
        zipcode: {
            type: String,
            required: [true, "Zipcode is required"],
            trim: true
        }
    },
    beds: {
        type: Number,
        required: [true, "No. of beds are required"]
    },
    baths: {
        type: Number,
        required: [true, "No. of baths are required"]
    },
    square_feet: {
        type: Number,
        required: [true, "Square feet is required"]
    },
    amenities: [String],
    rates: {
        nightly: Number,
        weekly: Number,
        monthly: Number
    },
    seller_info: {
        name: {
            type: String,
            required: [true, "Seller name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Seller email is required"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Seller phone is required"],
            trim: true
        }
    },
    images: [String],
    is_featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Property = models.Property || model("Property", propertySchema);

export default Property;