import { useEffect, useState } from "react";
import api from "../../api.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/get-all-orders");
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  //Initialized orderds
  useEffect(() => {
    fetchOrders();
  }, [])

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await api.post("/update-order-status", { orderId, status: newStatus })
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  }

  const decreaseQuantity = async (productId, quantityToDeduct) => {
    try {
      const response = await api.post("/decrease-quantity", {productId, quantityToDeduct});
      // if response is 'Insufficient stock', show warning
      if (response.message === 'Insufficient stock') {
        console.log('Product has insufficient stock!');
        alert("Product has insufficient stock");
      }
      console.log(response.data.product);
      fetchProducts('quantity', 'asc'); // Refresh product list after successful update
    } catch (error) {
      console.error('Failed to decrease quantity:', error.message);
    }
  };

  const fetchProductById = async (productId) => {
    try {
      const response = await api.get(`/get-product?id=${productId}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  const statusLabels = {
    0: 'Pending',
    1: 'Completed',
    2: 'Canceled',
  };

  return (
    <>
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
                        onClick={async () => {
                          try {
                            const productId = order.productId._id;
                            if (!productId) {
                              alert('Invalid product ID.');
                              return;
                            }
                            const product = await fetchProductById(productId);
                            if (!product) {
                              alert('Product not found.');
                              return;
                            }
                            if (product.quantity === 0) {
                              alert('Cannot deliver. Product is out of stock.');
                              return;
                            }
                            if (product.quantity < order.orderQuantity) {
                              alert('Cannot deliver. Insufficient stock.');
                              return;
                            }
                            await decreaseQuantity(productId, order.orderQuantity);
                            await updateOrderStatus(order._id, 1);
                          } catch (error) {
                            console.error('Error processing delivery:', error);
                            alert('Something went wrong while delivering the product.');
                          }
                        }}
                        disabled={order.orderStatus !== 0}
                        className={`px-3 py-1 rounded text-white ${order.orderStatus !== 0
                            ? 'bg-green-300 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                          }`}
                      >
                        Deliver
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order._id, 2)}
                        disabled={order.orderStatus !== 0}
                        className={`px-3 py-1 rounded text-white ${order.orderStatus !== 0 ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
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

    </>
  );
}

export default Orders;
