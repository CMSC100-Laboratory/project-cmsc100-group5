import React, { useState, useEffect } from 'react';
import api from '../../api';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const productTypes = {
    1: 'Crop',
    2: 'Poultry',
    3: 'Dairy',
    4: 'Meat',
    5: 'Others'
};

const orderStatusMap = {
    0: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    1: { text: 'Completed', color: 'bg-lime-100 text-lime-800' },
    2: { text: 'Cancelled', color: 'bg-red-100 text-red-800' }
};

const imageMap = {
    'Tilapia (per kg)': 'tilapia.png',
    'Pineapple (per piece)': 'pineapple.png',
    'Milkfish (per kg)': 'milkfish.png',
    'Cabbage (1 head)': 'cabbage.png',
    'White Onions (1kg)': 'white_onion.png',
    'Pumpkin (1kg)': 'pumpkin.png',
    'Red Rice (5kg)': 'red_rice.png',
    'Eggplant (1kg)': 'eggplant.png',
    'Organic Carrots': 'carrots.png',
    'Kangkong (bundle)': 'kangkong.png',
    'Garlic (250g)': 'garlic.png',
    'Brown Eggs (1 Dozen)': 'brown_eggs.png',
    'Sweet Mangoes (1kg)': 'mango.png',
    'Tomato (1kg)': 'tomatoes.png',
    'White eggs (1dozen)': 'white_eggs.png',
    'Cilantro': 'cilantro.png',
    'Coconut': 'coconut.png',
    'Russet Potatoes': 'russet_potatoes.png',
    'Chicken Breast (1kg)': 'chicken_breast.png',
    'Beef': 'beef.png',
    'Chicken Legs': 'chicken_leg.png',
    'Chicken Thighs': 'chicken_thigh.png',
};

const ConsumerOrders = () => {
    const [orderTransactions, setOrderTransactions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelMessage, setCancelMessage] = useState('');
    const {auth} = useContext(AuthContext)
    const userEmail = auth.email;

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await api.get('/orders/user', {
                params: {
                    email: userEmail
                }
            });
        
            if (response.data.success) {
                const orders = response.data.orders || [];
                
                // Group orders by transaction ID
                const groupedOrders = {};
                
                orders.forEach(order => {
                    const transactionId = order._id.slice(0, 12);
                    
                    if (!groupedOrders[transactionId]) {

                    groupedOrders[transactionId] = {
                        transactionId: transactionId,
                        date: order.date,
                        time: order.time,
                        orderStatus: order.orderStatus,
                        items: [],
                        totalAmount: 0
                    };
                    }
                    
                    groupedOrders[transactionId].items.push({
                        id: order._id,
                        productId: order.productId,
                        orderQuantity: order.orderQuantity,
                        itemTotal: (order.productId?.price * order.orderQuantity || 0)
                    });
                    
                    groupedOrders[transactionId].totalAmount += (order.productId?.price * order.orderQuantity || 0);
                });
                setOrderTransactions(groupedOrders);
            } else {
                setError('Failed to fetch orders');  
            }
        } catch (err) {
            setError(`Error: ${err.message}`);
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

  const handleCancelOrder = async (transactionId) => {
    const transaction = orderTransactions[transactionId];
   
    if (!window.confirm(`Are you sure you want to cancel this entire order (Transaction: ${transaction.transactionId})?`)) {
      return;
    }

    try {
      // Cancel all items in the transaction
        const cancelPromises = transaction.items.map(item =>
            api.post('/orders/cancel', {
                email: userEmail,
                orderId: item.id
            })
        );

        const responses = await Promise.all(cancelPromises);

        // Check if all cancellations were successful
        const allSuccessful = responses.every(response => response.data.success);
     
        if (allSuccessful) {
            setCancelMessage('Order cancelled successfully!');
            fetchOrders(); 
       
            setTimeout(() => {
                setCancelMessage('');
            }, 3000);
      } else {
            alert('Some items could not be cancelled. Please try again.');
      }
    } catch (err) {
        console.error('Error cancelling order:', err);
        alert(`Error: ${err.message}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4">
        {error}
      </div>
    );
  }

  const transactionEntries = Object.entries(orderTransactions);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-lime-700 mb-6">Your Orders</h2>

      {cancelMessage && (
        <div className="bg-lime-100 border border-lime-400 text-lime-700 px-4 py-3 rounded mb-6">
          {cancelMessage}
        </div>
      )}

      {transactionEntries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <img
            src="/images/empty_cart.png"
            alt="No orders"
            className="mx-auto h-24 w-24 mb-4"
          />
          <h3 className="text-xl font-medium text-gray-700">No orders found</h3>
          <p className="text-gray-500 mt-2">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {transactionEntries.map(([transactionId, transaction]) => (
            <div key={transactionId} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Transaction detaills */}
              <div className="bg-lime-50 px-6 py-4 border-b">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Transaction #{transaction.transactionId}
                    </h3>
                    <p className=" text-gray-600">
                      {formatDate(transaction.date)} at {transaction.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-7">
                    <span className={`text-sm font-medium rounded-full ${orderStatusMap[transaction.orderStatus]?.color}`}>
                      {orderStatusMap[transaction.orderStatus]?.text}
                    </span>
                    {/* Cancel button */}
                    {transaction.orderStatus === 0 && (
                      <button
                        onClick={() => handleCancelOrder(transactionId)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {transaction.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded object-contain bg-white"
                          src={`/images/${imageMap[item.productId?.name] || 'placeholder.png'}`}
                          alt={item.productId?.name || 'Product'}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-md font-medium text-gray-900">
                          {item.productId?.name || 'Product Name'}
                        </h4>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-lime-100 text-lime-800">
                          {productTypes[item.productId?.type] || 'Unknown'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          Qty: {item.orderQuantity}
                        </div>
                        <div className="text-sm text-gray-600">
                          ₱{item.productId?.price?.toFixed(2) || '0.00'} each
                        </div>
                        <div className="font-semibold text-lime-700">
                          ₱{item.itemTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transaction Total */}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Total Items: {transaction.items.length}
                    </div>
                    <div className="text-xl font-bold text-lime-700">
                      Total: ₱{transaction.totalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsumerOrders;