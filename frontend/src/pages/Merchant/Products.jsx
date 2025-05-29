import React, { useEffect, useState } from 'react';
import api from '../../api.js';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        price: '',
        description: '',
        quantity: '',
    });
    const typeLabels = {
        3: 'Others',
        1: 'Crop',
        2: 'Poultry',
    };

  const sortProducts = async (sortBy, order) => {
          try {
              const response = await api.get(`/sort-products?sortBy=${sortBy}&order=${order}`);
              setProducts(response.data);
          } catch (error) {
              console.error('Failed to sort products:', error);
          }
  };

  const fetchProducts = async (sortBy = 'name', order = 'asc') => { 
          try {
              const response = await api.get(`/sort-products?sortBy=${sortBy}&order=${order}`);
              setProducts(response.data);
          } catch (error) {
              console.error('Failed to fetch products:', error);
          }
  };

  useEffect(()=> {
    fetchProducts();
  }, [])

  const addProduct = async ({name, type, price, description, quantity}) => {
        try{
          const response = await api.post("/add-product", {name, type: Number(type), price: Number(price), description, quantity: Number(quantity)});
            if (!response.ok) {
                throw new Error(response.data.message || 'Failed to add product');
            }
            setProducts((previousState)=>[...previousState, response.data.product])
            console.log("Product added to inventory:", response.data.product);
        }catch (error){
            console.error('Failed to add product:', error.message);
        }
    }

      const updateProduct = async ({ productId, name, type, price, description, quantity }) => {
        const updatedFields = { productId };
        
        //validate request body
        if (name !== undefined && name.trim() !== "") updatedFields.name = name;
        if (type !== undefined && type !== "") updatedFields.type = Number(type);
        if (price !== undefined && price !== "") updatedFields.price = Number(price);
        if (description !== undefined && description.trim() !== "") updatedFields.description = description;
        if (quantity !== undefined && quantity !== "") updatedFields.quantity = Number(quantity);

        console.log("Updating product with:", updatedFields);

        try {
            const response = await api.post("/update-product", {updatedFields});

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to update product');
            }
            console.log('Updated product:', result.product);
            fetchProducts('quantity', 'asc'); //refresh product list after successful update
        } catch (error) {
            console.error('Failed to update product:', error.message);
        }
    };

    const removeProduct = async (productId) => {
        try{
            const response = await api.post("/remove-product", {productId});
            const result = await response.json();
            console.log(result.product);
            if (!response.ok) {
                console.log(response);
                throw new Error(result.message || 'Failed to remove product.');
            }
            // Refresh product list after successful update
            fetchProducts('quantity', 'asc');
        }catch(error){
            console.error('Failed to delete product:', error.message);
        }
    }

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      type: product.type,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      type: '',
      price: '',
      description: '',
      quantity: '',
    });
  };

  const handleUpdate = () => {
    if (!editingProduct) return;
    updateProduct({productId: editingProduct._id, ...formData,});
    closeEditModal();
  };

  const showMessage = (isValid) => {
    alert(isValid ? "Form validated!" : "Some fields are missing or invalid.");
  };

  // ensures each field is not null
  const validateForm = () => {
    const { name, type, price, description, quantity } = formData;
    const isValid =
      name &&
      description &&
      [1, 2, 3].includes(type) &&
      !isNaN(price) && price >= 0 &&
      !isNaN(quantity) && quantity >= 0;

    showMessage(isValid);
    return isValid;
  };

  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <div className="w-full max-w-3xl">

          {/* Sort By Button */}
          <div className="flex justify-end mb-2 relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-[#14422C] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#0f361f] transition"
            >
              Sort By
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-56">
                {['name', 'price', 'type', 'quantity'].map((key) => (
                  <div key={key} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="capitalize">{key}</span>
                      <div className="space-x-1">
                        <button
                          onClick={() => {
                            sortProducts(key, 'asc');
                            setDropdownOpen(false);
                          }}
                          className="text-sm text-green-600 hover:text-green-800"
                          title="Sort ascending"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => {
                            sortProducts(key, 'desc');
                            setDropdownOpen(false);
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                          title="Sort descending"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add Product Button */}
            <button
            onClick={() => setShowAddModal(true)}
            className="ml-2 bg-[#14422C] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#0f361f] transition"
            >
            Add Product
            </button>
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                        <option value="">Select Type</option>
                        <option value={1}>Crop</option>
                        <option value={2}>Poultry</option>
                        <option value={3}>Others</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                        >
                        Cancel
                        </button>
                        <button
                        onClick={()=> { 
                            console.log("Add Form Data:", formData);
                            if (validateForm()){
                              addProduct(formData);
                              setShowAddModal(false);
                              setFormData({
                                name: '',
                                type: '',
                                price: '',
                                description: '',
                                quantity: '',
                              });
                            }
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                        Save
                        </button>
                    </div>
                    </div>
                </div>
                )}
          </div>
          {/* Number of Products Table */}
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
          {/* Products Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
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
                    <th className="px-6 py-3 text-center text-sm font-medium text-white">
                        Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-gray-500">
                        No products available.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.description}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-center">{typeLabels[product.type] || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-center">
                          Php {Number(product.price).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 text-center">{product.quantity}</td>
                        {/* edit and delete buttons beside each row */}
                        <td className="px-6 py-4 text-sm text-center">
                            <button
                                onClick={() => openEditModal(product)}
                                className="text-blue-600 hover:text-blue-800 mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                  if(window.confirm('Are you sure to delete this product?')){
                                    removeProduct(product._id)
                                  };
                                 }
                                }
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
{/* Edit modal */}
{showEditModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Edit Product</h2>

      {/* Name */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="type" className="text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: Number(e.target.value) })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Type</option>
          <option value={1}>Crop</option>
          <option value={2}>Poultry</option>
          <option value={3}>Others</option>
        </select>
      </div>

      {/* Price */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Quantity */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
        <input
          id="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-2">
        <button onClick={closeEditModal} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Apply
        </button>
      </div>
    </div>
  </div>
)}

    
    </>
  );
}

export default Products;
