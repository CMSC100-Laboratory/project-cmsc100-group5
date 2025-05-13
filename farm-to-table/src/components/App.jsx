import Sales from './Sales';
import Header from './Header';
import axios from "axios";
import { useState, useEffect } from 'react'


function App() {

    const [productsSold, setArray] = useState([]);
    const [sales, setSales] = useState([]);

    const fetchSales = async () => 
    {
        const response = await axios.get("http://localhost:3000/sales-report");
        setArray(response.data.productsSold)
        setSales([response.data.week, response.data.month, response.data.year, response.data.total])
    }

    useEffect(() => {
        fetchSales();
    }, [])

    return (
        <>
            <Header />
            <Sales productsSold={productsSold} sales={sales}/>
        </>
    )
}

export default App
