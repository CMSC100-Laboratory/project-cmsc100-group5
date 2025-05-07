import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import User from './models/userModel.js';

//Add item to the cart

const addToCaart = async (req, res) => {
    try {
        const { email, productId, quantity} = req.body;

        if ( !productId || !quantity || !email) {
            return res.status(400).json({success: false, message: 'Missing required fields'});
        }

        //hanapin product

        const product = await Product.findbyId(productId);
        if(!product){
            return res.status(404).json({success: false, message: 'Product not found'});
        }

        if( product.quantity < quantity) {
            return res.status(400).json({success: false, message: 'Not enough stack for said product'});
        }

        const user = await User.findone({ email});
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        const itemExists = user.Cart.findIndex(
            item => item.productId.toString() === productId
        );

        if (itemExists > 0){
            user.Cart[itemExists].quantity += parseInt(quantity);
        } else{
            user.Cart.push({
                productId: mongoose.Types.ObjectID(productId),
                quantity: parseInt(quantity),
                price: product.price,
                name: product.name,
                type: product.type

            });
        }

        await user.save

        res.status(200).json({ 
            success: true, 
            message: 'Item added to cart successfully',
            cart: user.Cart 
        });       


    } catch (error) {
        console.error('Error adding item to cart: ', error);
        res.status(500).json({ inserted: false, error: error.message });
    } 
}

const removeItemfromCart = async (req, res) => {
    try {
        const {email, productId} = req.body

        if (!email || !productId) {
            return res.status(400).json({ success: false, message: 'Missing fields' });
        }

        const user = await User.findone({ email});
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);

        await user.save();
    }  catch (error) {
        console.error('Error removing item to cart: ', error);
        res.status(500).json({ success: false, error: error.message });
    } 
};

const updateItem = async (req, res) => {
    try {
        const { email, productId, quantity} = req.body;

        if ( !productId || !quantity || !email) {
            return res.status(400).json({success: false, message: 'Missing required fields'});
        }

        const product = await Product.findbyId(productId);

        if(!product){
            return res.status(404).json({success: false, message: 'Product not '});
        }

        if (product.quantity < quantity){
            return res.status(400).json({success: false, message: 'Stock is not enough'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });            
        }

        const itemExists = user.Cart.findIndex(
            item => item.productId.toString() === productId
        );

        if(itemExists === 0){
            return res.status(404).json({
                success: false, error: 'Item not found in cart'
            });
        }

        user.Cart[itemExists].quantity = parseInt(quantity);


        await user.save();

        res.status(200).json({ 
            success: true, 
            message: 'Cart item updated successfully',
            cart: user.Cart 
        });        


    }catch {
        console.error('Error updating item ', error);
        res.status(500).json({ success: false, error: error.message });       
    }
};

//captures all cart contents + 

const getCart = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({success: false, message: 'Missing email fields'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: 'User does not exist'});            
        }

        let totalItems = 0;
        let totalPrice = 0;

        user.Cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += (item.price * item.quantity)
        })

        res.status(200).json({
            success: true,
            cart: user.Cart,
            totalItems,
            totalPrice
        });

    }catch (error) {
        console.error('Error accessing cart:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const clearCart = async (req, res) => {
    try {
        if (!email) {
            return res.status(400).json({success: false, message: 'Missing email fields'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: 'User does not exist'});            
        }

        user.cart = [];

        await user.save();

        res.status(200).json ({
            
            success: true, 
            message: 'Cart item updated successfully',
            cart: user.Cart        
        });

    }catch (error) {
        console.error('Error clearing cart ', error);
        res.status(500).json({ success: false, error: error.message });           
    }

};

export {
    addToCaart,
    removeItemfromCart,
    updateItem,
    getCart,
    clearCart
};