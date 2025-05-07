import mongoose from "mongoose";

// Define schema for order transactions
const orderTransactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true },
    productId: { type: String, required: true },
    orderQuantity: { type: Number, required: true },
    orderStatus: { type: Number, required: true }, // 0 = Pending, 1 = Completed, 2 = Canceled
    email: { type: String, required: true },
    dateOrdered: { type: Date, required: true },
    time: { type: String, required: true }  
  },
  { collection: "orderTransactions", timestamps: true } // `timestamps: true` automatically adds createdAt and updatedAt
);

// Create and export the model
const OrderTransaction = mongoose.model("OrderTransaction", orderTransactionSchema);

export { OrderTransaction };
