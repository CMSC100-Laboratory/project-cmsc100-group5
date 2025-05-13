import Card from './Card.jsx'

function Sales(props) {

    let productsSold = props.productsSold;
    let sales = props.sales;
    console.log(sales);

    let listSoldProducts = productsSold;
    const salesData = [{week: sales[0], month: sales[1], year: sales[2], total: sales[3]}]

    let keys = [];

    const cardItems = [];

    listSoldProducts.forEach(obj => {
        keys.push(Object.keys(obj)[0]);
    })

    for (let i = 0; i < listSoldProducts.length; i++) {
        cardItems.push(Card(keys[i], listSoldProducts[i][keys[i]]))
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 border-b">Weekly Sales</th>
                            <th className="px-6 py-4 border-b">Monthly Sales</th>
                            <th className="px-6 py-4 border-b">Yearly Sales</th>
                            <th className="px-6 py-4 border-b">Total Sales</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {salesData.map((sale) => (
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b text-center">{sale.week}</td>
                                <td className="px-6 py-4 border-b text-center">{sale.month}</td>
                                <td className="px-6 py-4 border-b text-center">{sale.year}</td>
                                <td className="px-6 py-4 border-b text-center">{sale.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="flex flex-wrap gap-4 p-4 justify-center">
                {cardItems}
            </div>
        </>
    );
}

export default Sales
