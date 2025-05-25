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

    // validate req. body
    if (!name || !type || !price || !description || quantity == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 1 Crop / 2 Poultry / 3 others
    if (![1, 2, 3].includes(type)) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    if (typeof price !== 'number' || price < 0 || typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ message: 'Invalid price or quantity' });
    }

    const product = new Product({ name, type, price, description, quantity });
    await product.save();

    return res.status(200).json({ message: 'Product added', product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};


// GET: display products from database (sort in (1)asc/(-1)desc according to quantity)
const sortProducts = async (req, res) => {
    const { sortBy, order = 'asc'} = req.query;

    //validate query 
    if (!['name','price','type','quantity'].includes(sortBy)){
      return res.status(400).json({ message: 'Invalid sortBy parameter in query'});
    }   
    if (!['desc','asc'].includes(order)){
      return res.status(400).json({ message: 'Invalid order parameter in query'});
    } 
    const sortOrder = order === 'desc' ? -1 : 1;

    try {
      const products = await Product.find().sort({ [sortBy]: sortOrder });
      console.log(products);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching products', error });
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

      return res.status(200).json({ message: 'Quantity updated', product });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating quantity', error });
    }
  };

// POST: method to update product field in db
const updateProduct = async (req, res) => {
  const { productId, name, type, price, description, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'productId is required' });
  }

  const updates = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ message: 'Invalid name. Must be a non-empty string.' });
    }
    updates.name = name.trim();
  }

  if (type !== undefined) {
    if (![1, 2, 3].includes(type)) {
      return res.status(400).json({ message: 'Invalid type. Must be 1 (Crop), 2 (Poultry), or 3 (Others).' });
    }
    updates.type = type;
  }

  if (price !== undefined) {
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ message: 'Invalid price. Must be a non-negative number.' });
    }
    updates.price = price;
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({ message: 'Invalid description. Must be a non-empty string.' });
    }
    updates.description = description.trim();
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ message: 'Invalid quantity. Must be a non-negative number.' });
    }
    updates.quantity = quantity;
  }

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

//POST: remove product from inventory
const removeProduct = async (req, res) => {
    const { productId } = req.body;
    console.log("Deleting productId:", productId);
    try{
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      await Product.deleteOne({ _id: productId });
      return res.status(200).json({ message: 'Successfully removed product', product });
    }catch (error){
      return res.status(500).json({ message: 'Error removing product', error: error.message });
    }
}

export {addProduct, sortProducts, decreaseQuantity, updateProduct, removeProduct};