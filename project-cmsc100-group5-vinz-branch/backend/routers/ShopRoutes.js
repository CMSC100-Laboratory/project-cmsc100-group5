import express from 'express';

import { 
    getAllProducts,
    getProductById,
    getProductByType,
    createOrder,
    cancelOrder,
    getUserOrders
} from '../controllers/ShopController.js';

import {
    addToCart,
    removeItemfromCart,
    updateItem,
    getCart,
    clearCart
} from '../controllers/ShoppingCartController.js';

const shopRouter = (app) => {
    // Product routes
    app.get('/products', getAllProducts);
    app.get('/product', getProductById);
    app.get('/products-by-type', getProductByType);
    
    // Shopping cart routes
    app.post('/cart/add', addToCart);
    app.post('/cart/remove', removeItemfromCart);
    app.post('/cart/update', updateItem);
    app.post('/cart/get', getCart);
    app.post('/cart/clear', clearCart);
    
    // Order routes
    app.post('/orders/create', createOrder);
    app.post('/orders/cancel', cancelOrder);
    app.get('/orders/user', getUserOrders);
    
};

export default shopRouter;