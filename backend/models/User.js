import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { correct: { type: Number, default: 0 }, incorrect: { type: Number, default: 0 } },
});

export default mongoose.model("User", userSchema);