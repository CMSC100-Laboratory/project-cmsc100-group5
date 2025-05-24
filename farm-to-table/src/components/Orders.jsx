function Orders(props) {
  const { orders, onUpdateStatus } = props;
  const statusLabels = {
    0: 'Pending',
    1: 'Completed',
    2: 'Canceled',
  };

  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#14422C]">
                <tr>
                  <th className="px-6 py-3 text-center text-sm font-medium text-white">Product</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-white">Quantity</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-white">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-white">Email</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-white">Date and Time</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 text-sm text-gray-800 text-center">
                      {order.productId
                        ? `${order.productId.name} (Php ${order.productId.price})`
                        : 'Product not found'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.orderQuantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{statusLabels[order.orderStatus]}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-center">{order.date} - ({order.time})</td>
                    <td className="px-6 py-4 text-sm text-center space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => onUpdateStatus(order._id, 1)}
                        disabled={order.orderStatus === 2}
                        className={`px-3 py-1 rounded text-white ${
                          order.orderStatus !== 0 ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        Deliver
                      </button>
                      <button
                        onClick={() => onUpdateStatus(order._id, 2)}
                        disabled={order.orderStatus === 1}
                        className={`px-3 py-1 rounded text-white ${
                          order.orderStatus !== 0 ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-10">
  <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
    <h2 className="text-xl font-semibold text-center py-4">Order Summary</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#14422C]">
        <tr>
          <th className="px-6 py-3 text-center text-sm font-medium text-white">
            Completed Orders
          </th>
          <th className="px-6 py-3 text-center text-sm font-medium text-white">
            Canceled Orders
          </th>
          <th className="px-6 py-3 text-center text-sm font-medium text-white">
            Total Transactions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 text-sm text-gray-800 text-center">
            {orders?.filter(order => order.orderStatus === 1).length ?? 0}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800 text-center">
            {orders?.filter(order => order.orderStatus === 2).length ?? 0}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800 text-center">
            {orders?.length ?? 0}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    </>
  );
}

export default Orders;
