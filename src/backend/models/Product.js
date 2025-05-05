import mongoose from "mongoose";

// Define the Product schema
const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: Number, required: true }, // 1 = Crop, 2 = Poultry
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { collection: "Products", timestamps: true } 
);

// Create the Product model
const Product = mongoose.model("Product", productSchema);

export { Product, mongoose };
