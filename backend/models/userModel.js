import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    MiddleName: {
        type: String,
        required: false,
    },
    LastName: {
        type: String,
        required: true,
    },
    isMerchant: {
        type: Boolean,
        default: false,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Cart: {
        type: Array,
        default: [],
    },
}); 

const User = mongoose.model("User", userSchema);

export default User;