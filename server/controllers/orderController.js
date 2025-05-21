import OrderTransaction from "../models/orderTransactionModel.js";
// controller for order transactions

// Order fulfillment
// i. After the customer creates an order, the merchant needs to confirm it.
//    Once confirmed, the order is considered final and ready for delivery to
//    the customer.

// TODO: methods
// GET: display transactions
const getAllOrders = async (req, res) => {
    try {
      const orders = await OrderTransaction.find().populate('productId', 'name price');
      console.log(orders);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };

// POST: update order status
const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body; //  status: 0 Pending / 1 Completed / 2 Canceled 
    
    //validate req.body
    if(![0,1,2].includes(status)){
      return res.status(400).json({ message: 'Unable to update due to invalid status in body'});
    }
    
    try {
      const order = await OrderTransaction.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.orderStatus = status;
      await order.save();
  
      return res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating order status', error });
    }
  };

export {getAllOrders, updateOrderStatus};