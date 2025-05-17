import mongoose from "mongoose";
import Product from "./productModel.js";
import User from "./userModel.js";

const orderTransactionModel = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    orderQuantity: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: Number,
        required: true,
        default: 0, // 0: pending, 1: completed, 2: cancelled
    },
    email : {
        type: String,
        required: true,
        ref: 'User',
    },
    date : {
        type: Date,
        default: Date.now,
    },
    time : {
        type: String,
        default: new Date().toLocaleTimeString(),
    }
});

const OrderTransaction = mongoose.model("OrderTransaction", orderTransactionModel);
export default OrderTransaction;