import Table from './Table.jsx'
import axios from "axios";
import { useState, useEffect } from 'react';




function Sales() {
    const [totalSales, setSales] = useState([]);
    const [totalProducts, setProductsSold] = useState([]);

    const fetchSales = async () => {
        try {
            console.log("try")
            const response = await axios.get("http://localhost:3000/sales-report");
            console.log(response.data.productsSold)
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

    useEffect(() => {
        fetchSales();
    }, []);

    let productsSold = totalProducts;
    let sales = totalSales;
    console.log(sales);

    let listSoldProducts = productsSold;
    const salesData = [{ week: sales[0], month: sales[1], year: sales[2], total: sales[3] }]

    let keys = [];

    const productItems = [];

    listSoldProducts.forEach(obj => {
        keys.push(Object.keys(obj)[0]);
    })

    for (let i = 0; i < listSoldProducts.length; i++) {
        productItems.push(Table(keys[i], listSoldProducts[i][keys[i]]))
    }

    return (
        <>

            <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#14422C]">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Weekly Sales
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Monthly Sales
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Yearly Sales
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Total Sales
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {salesData.map((sale) => (
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">₱{sale.week}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">₱{sale.month}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">₱{sale.year}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">₱{sale.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#14422C]">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Product Sales
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {productItems}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    );
}

export default Sales
