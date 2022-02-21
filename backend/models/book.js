import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, 'Author is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  category: {
    type: String,
    required: [true, 'Category s required'],
  },
  description: {
    type: String,
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

const book = mongoose.model('books', bookSchema);
export default book;
