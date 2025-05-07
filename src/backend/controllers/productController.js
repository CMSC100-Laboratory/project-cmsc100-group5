import { Product } from "../models/product";

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
  
      const product = new Product({ name, type, price, description, quantity });
      await product.save();
  
      res.status(201).json({ message: 'Product added', product });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product', error });
    }
  };

// GET: display products from database (sort in asc/desc according to name)
const getProductsSorted = async (req, res) => {
    const { sortBy = 'name', order = 'asc' } = req.query;
    const sortOrder = order === 'desc' ? -1 : 1;
  
    try {
      const products = await Product.find().sort({ [sortBy]: sortOrder });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  };

// GET: display products from database (sort in asc/desc according to type)

// GET: display products from database (sort in asc/desc according to price)

// GET: display products from database (sort in asc/desc according to quantity)

// POST: decrease quantity of a product once order is confirmed
const decreaseQuantity = async (req, res) => {
    const { productId, quantityToDeduct } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      if (product.quantity < quantityToDeduct) {
        return res.status(400).json({ message: 'Insufficient stock' });
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
  
    try {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      product.type = newType;
      await product.save();
  
      res.status(200).json({ message: 'Product type updated', product });
    } catch (error) {
      res.status(500).json({ message: 'Error updating product type', error });
    }
  };