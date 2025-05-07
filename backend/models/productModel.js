
const productModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }, 
});

const Product = mongoose.model("Product", productModel);
export default Product;