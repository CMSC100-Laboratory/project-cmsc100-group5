import Sales from './Sales';
import Users from './Users';
import Header from './Header';
import Products from './Products';
import Orders from './Orders';
import axios from "axios";
import { useState, useEffect } from 'react'


function App() {

    const [productsSold, setArray] = useState([]);
    const [sales, setSales] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrder] = useState([]);

    const fetchSales = async () => 
    {
        const response = await axios.get("http://localhost:3000/sales-report");
        setArray(response.data.productsSold)
        setSales([response.data.week, response.data.month, response.data.year, response.data.total])
    }

    const fetchUsers = async () => 
    {
        const response = await axios.get("http://localhost:3000/get-all-users");
        setUsers(response.data.users)
        console.log(response.data.users)
        
    }

    const fetchProducts = async (sortBy = 'quantity', order = 'asc') => 
    {
        try {
            const response = await axios.get(`http://localhost:3000/sort-products?sortBy=${sortBy}&order=${order}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }

    const fetchOrders = async () => 
    {
        try{
            const response = await axios.get("http://localhost:3000/get-all-orders");
            setOrder(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    }

    useEffect(() => {
        fetchSales();
        fetchUsers();
        fetchProducts('quantity', 'asc');
        fetchOrders();
    }, [])

    return (
        <>
            <Header />
            {/* <Sales productsSold={productsSold} sales={sales}/> */}
            <Users users={users}/>
            <Products products={products}/>
            <Orders orders={orders}/>
            
        </>
    )
}

export default App
