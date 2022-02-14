import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "El nombre es obligatorio"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  price: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  description: {
    type: String,
  },
  isAvailible: {
    type: Boolean,
    default: true,
  },
  registerDate: { type: Date, default: Date.now },
  dbStatus: {
    type: Boolean,
    required: [true, "El estado es obligatorio"],
    default: true,
  },
  img: {
    type: String,
  },
});

const book = mongoose.model("books", bookSchema);
export default book;
