import { OrderTransaction } from "../models/OrderTransaction"; 

// controller for order transactions

// Order fulfillment
// i. After the customer creates an order, the merchant needs to confirm it.
//    Once confirmed, the order is considered final and ready for delivery to
//    the customer.

// TODO: methods

// GET: display transactions

const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('customer').populate('items.product');
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };

// POST: update order status
const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; // e.g., 'confirmed', 'shipped', 'delivered'
  
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error });
    }
  };