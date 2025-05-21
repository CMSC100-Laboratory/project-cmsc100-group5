function Orders(props){
    let orders = props.orders
    return (
        <>
            <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#14422C]">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Quantity
                                </th>
                                 <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Date and Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.productId.name} Php {order.productId.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.orderQuantity}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.orderStatus}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.date} - {order.time}</td>
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
                                    Number of Order Transactions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 text-center">{orders.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Orders;