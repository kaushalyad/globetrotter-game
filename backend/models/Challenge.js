import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  inviterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  inviteeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inviterScore: { correct: Number, incorrect: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Challenge", challengeSchema);