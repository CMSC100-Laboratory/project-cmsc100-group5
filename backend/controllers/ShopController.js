import Product from '../models/productModel.js';
import OrderTransaction from '../models/orderTransactionModel.js';
import User from '../models/userModel.js';

const getUserOrders = async (req,res) => {
    try {

        const {email} = req.query

        if(!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });            
        }

        const orders = await OrderTransaction.find({ email }).populate('productId', 'name description price type');

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error){
        console.error('Error getting user orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllProducts = async (req, res ) => {
    try {
        const products = await Product.find({ quantity: { $exists: true } });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ success: false, message: error.message });       
    }
};

const getProductById = async (req, res ) => {
    try {
     const {id} = req.query;

     if (!id) {
        return res.status(400).json({success: false, message: 'Product id is missing'});
    }

    const product = await Product.findById(id);

     if (!product) {
        return res.status(400).json({success: false, message: 'Product is not found'});
    }     

    res.status(200).json({
        success: true,
        product
    });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ success: false, message: error.message });       
    }
};

const getProductByType = async (req, res ) => {
    try {
        const {type} = req.query;
        const productType = parseInt(type);

        if (![1, 2, 3, 4, 5].includes(productType)){
            return res.status(400).json({ success: false, message: 'Invalid product type'});
        }

        const products = await Product.find({ type: productType, quantity: { $exists: true}});

        res.status(200).json({
            success: true,
            count: products.length,
            products
        }); 

    } catch (error) {
        console.error('Error getting products By type:', error);
        res.status(500).json({ success: false, message: error.message });       
    }
};

const createOrder = async (req, res) => {
    try{
        const { email} = req.body

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: 'User not found'});
        }
        
        const orders = [];

        for (const item of user.Cart) {
            const product = await Product.findById(item.productId);

            if(!product) continue;

            if(product.quantity < item.quantity){
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock available for ${product.name}`
                });
            }

            const newOrder = new OrderTransaction({
                productId: item.productId,
                orderQuantity: item.quantity,
                orderStatus: 0,
                email,
                date: new Date(),
                time: new Date().toLocaleTimeString()
            });

            await newOrder.save();
            orders.push(newOrder);
        }

        user.Cart = [];
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Orders created successfully',
            orders
        });        
    } catch (error) {
        console.error('Error creating orders:', error);
        res.status(500).json({ success: false, message: error.message });        
    }
};

const cancelOrder = async (req, res) => {
    try{
        const { email, orderId} = req.body

        if (!email) {
            return res.status(400).json({ success: false, message: 'Missing fields'});
        }

        const order = await OrderTransaction.findById(orderId);

        if(!order){
            return res.status(404).json({success: false, message: 'Order is not found'});
        }
        
        if (order.email !== email){
            return res.status(403).json({ success: false, message: 'Cannot cancel this order.'});
        }

        if (order.orderStatus !== 0) {
            return res.status(400).json({ success: false, message: 'Only pending orders can be cancelled' });
        }
        
        order.orderStatus = 2;
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            order            
        });

    } catch (error) {
        console.error('Error cancelling orders:', error);
        res.status(500).json({ success: false, message: error.message });        
    }
};



export {
    getAllProducts,
    getProductById,
    getProductByType,
    createOrder,
    cancelOrder,
    getUserOrders,
};
