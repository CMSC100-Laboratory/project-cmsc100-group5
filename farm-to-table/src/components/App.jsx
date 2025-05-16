import Sales from './Sales';
import Users from './Users';
import Header from './Header';
import axios from "axios";
import { useState, useEffect } from 'react'


function App() {

    const [productsSold, setArray] = useState([]);
    const [sales, setSales] = useState([]);
    const [users, setUsers] = useState([]);

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
    }

    useEffect(() => {
        fetchSales();
        fetchUsers();
    }, [])

    return (
        <>
            <Header />
            {/* <Sales productsSold={productsSold} sales={sales}/> */}
            <Users users={users}/>
        </>
    )
}

export default App
