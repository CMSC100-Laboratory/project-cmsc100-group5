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
    app.get('/api/shop/products', getAllProducts);
    app.get('/api/shop/product', getProductById);
    app.get('/api/shop/products-by-type', getProductByType);
    
    // Shopping cart routes
    app.post('/api/cart/add', addToCart);
    app.post('/api/cart/remove', removeItemfromCart);
    app.post('/api/cart/update', updateItem);
    app.post('/api/cart/get', getCart);
    app.post('/api/cart/clear', clearCart);
    
    // Order routes
    app.post('/api/orders/create', createOrder);
    app.post('/api/orders/cancel', cancelOrder);
    app.get('/api/orders/user', getUserOrders);
    
};

export default shopRouter;