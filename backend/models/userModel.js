import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    MiddleName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    isMerchant: {
        type: Boolean,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", orderTransactionModel);
export default User;