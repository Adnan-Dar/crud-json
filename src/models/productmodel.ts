import mongoose, { Schema } from "mongoose";

const Product = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.models.Product || mongoose.model("Product", Product);

export default product;
