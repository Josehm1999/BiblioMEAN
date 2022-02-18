import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
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
    default: true,
  },
  img: {
    type: String,
  },
});

const book = mongoose.model("books", bookSchema);
export default book;
