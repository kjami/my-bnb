import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"],
        trim: true,
        lowercase: true
    },
    image: {
        type: String
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: "Property"
    }]
}, {
    timestamps: true
});

const User = models.User || model("User", userSchema);

export default User;