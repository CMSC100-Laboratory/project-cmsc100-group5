import Sales from './Sales';
import Users from './Users';
import Header from './Header';
import Products from './Products';
import Orders from './Orders';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const deleteUser = async (email) => {
        console.log("hello bitachh")
        console.log(email)
        await axios.post("http://localhost:3000/delete-product", {email: email})
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/get-all-users");
            setUsers(response.data.users);
            console.log(response.data.users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const fetchProducts = async (sortBy, order) => {
        try {
            const response = await axios.get(`http://localhost:3000/sort-products?sortBy=${sortBy}&order=${order}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const sortProducts = async (sortBy, order) => {
        try {
            const response = await axios.get(`http://localhost:3000/sort-products?sortBy=${sortBy}&order=${order}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to sort products:', error);
        }
    };

    const addProduct = async ({name, type, price, description, quantity}) => {
        try{
            const response = await fetch("http://localhost:3000/add-product", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    type: Number(type),
                    price: Number(price),
                    description,
                    quantity: Number(quantity),
                }),
            });
            const data  = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to add product');
            }
            setProducts((previousState)=>[...previousState, data.product])
            console.log("Product added to inventory:", data.product);
        }catch (error){
            console.error('Failed to add product:', error.message);
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:3000/get-all-orders");
            setOrders(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch("http://localhost:3000/update-order-status", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    status: newStatus,
                }),
            });

            const result = await response.json();
            console.log(result.order);
            if (!response.ok) {
                console.log(response);
                throw new Error(result.message || 'Failed to update order status');
            }
         
            // Refresh order list after successful update
            fetchOrders();
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    const updateProduct = async ({ productId, name, type, price, description, quantity }) => {
        const updatedFields = { productId };
        
        //validate request body
        if (name !== undefined && name.trim() !== "") updatedFields.name = name;
        if (type !== undefined && type !== "") updatedFields.type = Number(type);
        if (price !== undefined && price !== "") updatedFields.price = Number(price);
        if (description !== undefined && description.trim() !== "") updatedFields.description = description;
        if (quantity !== undefined && quantity !== "") updatedFields.quantity = Number(quantity);

        console.log("Updating product with:", updatedFields);

        try {
            const response = await fetch("http://localhost:3000/update-product", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFields),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to update product');
            }
            console.log('Updated product:', result.product);
            fetchProducts('quantity', 'asc'); //refresh product list after successful update
        } catch (error) {
            console.error('Failed to update product:', error.message);
        }
    };

    const removeProduct = async (productId) => {
        try{
            const response = await fetch("http://localhost:3000/remove-product", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId}),
            });
            const result = await response.json();
            console.log(result.product);
            if (!response.ok) {
                console.log(response);
                throw new Error(result.message || 'Failed to remove product.');
            }

            // Refresh product list after successful update
            fetchProducts('quantity', 'asc');
        }catch(error){
            console.error('Failed to delete product:', error.message);
        }
    }

    const fetchProductById = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/get-product?id=${productId}`);
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to fetch product');
            return result.product;
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    };

    const decreaseQuantity = async (productId, quantityToDeduct) => {
        try {
            const response = await fetch("http://localhost:3000/decrease-quantity", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId, quantityToDeduct}),
            });
            const result = await response.json();
            if (!response.ok) {
                console.log(response);
                throw new Error(result.message || 'Failed to decrease quantity.');
            }
            // if response is 'Insufficient stock', show warning
            if(result.message === 'Insufficient stock'){
                //display warning 
                console.log('Product has insufficient stock!');
            }

            console.log(result.product);            
            fetchProducts('quantity', 'asc'); // Refresh product list after successful update
        } catch (error){
            console.error('Failed to decrease quantity:', error.message);
        }
    }
    useEffect(() => {
        fetchProducts('quantity', 'asc');
        fetchOrders();
    }, []);
    return (
        <>
            <Header />
            <Routes>
                <Route path = "/sales" element={<Sales/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/products" 
                element={
                <Products products={products} 
                sortProducts={sortProducts} 
                addProduct={addProduct} 
                updateProduct={updateProduct}
                removeProduct={removeProduct}
                />} />
                <Route path="/orders" 
                element={
                    <Orders orders={orders} 
                    onUpdateStatus={updateOrderStatus} 
                    decreaseQuantity={decreaseQuantity} 
                    fetchProductById={fetchProductById}
                />} />
            </Routes>
        </>
    );
}

export default App;
