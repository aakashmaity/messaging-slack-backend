import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address",
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
    username: { 
        type: String, 
        required: [true, "Username is required"] ,
        unique: [true, "Username already exists"],
        match: [
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        ]
    },
    avatar: {
        type: String,
    }
},{timestamps: true})

// Triggered before saving a user
userSchema.pre("save", function saveUser(next) {
    const user = this;
    user.avatar = `http://robohash.org/${user.username}`;

    next();
})

const User = mongoose.model("User", userSchema);

export default User;