import Sales from './Sales';
import Users from './Users';
import Header from './Header';
import Products from './Products';
import Orders from './Orders';
import axios from "axios";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [productsSold, setProductsSold] = useState([]);
    const [sales, setSales] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchSales = async () => {
        try {
            const response = await axios.get("http://localhost:3000/sales-report");
            setProductsSold(response.data.productsSold);
            setSales([
                response.data.week,
                response.data.month,
                response.data.year,
                response.data.total
            ]);
        } catch (error) {
            console.error('Failed to fetch sales:', error);
        }
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

    const fetchProducts = async (sortBy = 'quantity', order = 'asc') => {
        try {
            const response = await axios.get(`http://localhost:3000/sort-products?sortBy=${sortBy}&order=${order}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

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

    useEffect(() => {
        fetchSales();
        fetchUsers();
        fetchProducts('quantity', 'asc');
        fetchOrders();
    }, []);

    return (
        <>
            <Header />
            <Routes>
                {/* <Route path="/sales" element={<Sales productsSold={productsSold} sales={sales} />} /> */}
                <Route path="/users" element={<Users users={users} />} />
                <Route path="/products" element={<Products products={products} />} />
                <Route path="/orders" element={<Orders orders={orders} onUpdateStatus={updateOrderStatus} />} />
            </Routes>
        </>
    );
}

export default App;
