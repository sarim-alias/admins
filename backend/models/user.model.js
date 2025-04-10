import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
        type: String,
        unique: true,  
        lowercase: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], 
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    gameHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    // createdAt, updatedAt
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;