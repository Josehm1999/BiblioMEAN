import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  description: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: {
    type: Boolean,
    default: true,
  },
});

const role = mongoose.model("roles", roleSchema);
export default role;
