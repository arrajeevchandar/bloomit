import mongoose, { Schema, model, models } from "mongoose";

const AdSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default models.Ad || model("Ad", AdSchema);
