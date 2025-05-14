import { useState } from "react";

function App(){
    const [cartItems, setCartItems] = useState([]);
    const [activeTab, setActiveTab] = useState('products')

    //const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    const addtoCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if(existingItem) {
            setCartItems(
                cartItems.map(cartItem => 
                  cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                    : cartItem
                )
            );
        }else{
            setCartItems([...cartItems, { ...product, quantity: 1}]);
        }
    };

    const removeFromcart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    }

    const updateCartItemQuantity = (productId, newQuantity) => {
        //If sequences, less than 1

        if(newQuantity < 1){
            removeFromcart(productId);
            return;
        }

        setCartItems(
            cartItems.map(item => item.id === productId ? {...item, quantity: newQuantity}: item
            )
        )
    };


}

export default App;