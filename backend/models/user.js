import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: { type: mongoose.Schema.ObjectId, ref: "roles" },
  dbStatus: { type: Boolean, default: true },
});

const user = mongoose.model("users", userSchema);
export default user;
