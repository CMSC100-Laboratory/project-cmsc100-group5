import Product from "../models/productModel.js";

// Product listings
// i. Create a list of products, including their inventory. Inventory is
// categorized as follows:
//  1. Product Name
//  2. Product Type: The product type could be either crops or poultry items.
//  3. Product Price: Price is a variable.
//  4. Product Description
//  5. Quantity: The quantity is a variable; manage the inventory
//  quantity of products by decreasing the number of items when
//  order is confirmed, and update categories as needed.
// ii. List the products in the inventory in ascending or descending order by
// name, type, price, or quantity.

// TODO: methods

// POST: add products in database
const addProduct = async (req, res) => {
    try {
      const { name, type, price, description, quantity } = req.body;
      
      //validate req.body: type can only be (1) crop / (2) poultry / (3) others 
      if(![1,2,3].includes(type)){
        res.status(400).json({ message: 'Invalid type'});
      }

      const product = new Product({ name, type, price, description, quantity });
      await product.save();
  
      res.status(200).json({ message: 'Product added', product });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
};

// GET: display products from database (sort in (1)asc/(-1)desc according to quantity)
const sortProducts = async (req, res) => {
    const { sortBy, order = 'asc'} = req.query;

    //validate query 
    if (!['name','price','type','quantity'].includes(sortBy)){
      res.status(400).json({ message: 'Invalid sortBy parameter in query'});
    }   
    if (!['desc','asc'].includes(order)){
      res.status(400).json({ message: 'Invalid order parameter in query'});
    } 
    const sortOrder = order === 'desc' ? -1 : 1;

    try {
      const products = await Product.find().sort({ [sortBy]: sortOrder });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
};

// POST: decrease quantity of a product once order is confirmed
const decreaseQuantity = async (req, res) => {
    const { productId, quantityToDeduct } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      
      //validate if there is enough stock
      if (product.quantity < quantityToDeduct) {
        return res.status(500).json({ message: 'Insufficient stock' });
      }
  
      product.quantity -= quantityToDeduct;
      await product.save();
  
      res.status(200).json({ message: 'Quantity updated', product });
    } catch (error) {
      res.status(500).json({ message: 'Error updating quantity', error });
    }
  };

// POST: update type (either 1-crops or 2-poultry)
const updateProductType = async (req, res) => {
    const { productId, newType } = req.body; // newType should be either 'crops' or 'poultry'

    //validate input newType?? type can only be (1) crop / (2) poultry / (3) others 
    if(![1,2,3].includes(newType)){
        res.status(400).json({ message: 'Invalid type'});
    }

    try {
      const product = await Product.findByIdAndUpdate(productId, { type: newType });
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      res.status(200).json({ message: 'Product type updated', product });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product type', error });
    }
};

const removeProduct = async (req, res) => {
    const { productId } = req.body;

    try{
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await Product.deleteOne({ _id: productId });
      res.status(200).json({ message: 'Successfully removed product', product });
    }catch (error){
      res.status(500).json({ message: 'Error removing product', error });
    }
}

export {addProduct, sortProducts, decreaseQuantity, updateProductType, removeProduct};