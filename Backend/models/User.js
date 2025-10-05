import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true, min: 2, max: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: { type: String, required: true, minlength: 6 },
  isAdmin: { type: Boolean, default: false },
});

const User = model("User", userSchema);

export default User;
