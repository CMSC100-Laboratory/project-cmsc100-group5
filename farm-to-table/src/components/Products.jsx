function Products(props){
    let products = props.products
    return (
        <>
            <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#14422C]">
                            <tr>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Product Name
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Description
                                </th>
                                 <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-medium text-white">
                                    Quantity
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">Php {product.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.quantity}</td>
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
                                    Number of Products
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-800 text-center">{products.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Products;