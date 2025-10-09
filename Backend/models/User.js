import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, min: 2, max: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, select:false, minlength: 6 },
  isAdmin: { type: Boolean, default: false },
});

//struttura che si attiva ogni volta che sta per salvare, prima di fare save nel db attiva questa funzione
userSchema.pre("save", async function (next) {
  //prima controlliamo se il campo e' cambiato
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
