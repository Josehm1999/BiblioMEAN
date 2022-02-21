import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  role: { type: mongoose.Schema.ObjectId, ref: 'roles' },
  registerDate: { type: Date, default: Date.now },
  dbStatus: { type: Boolean, default: true },
});

const user = mongoose.model('users', userSchema);
export default user;
