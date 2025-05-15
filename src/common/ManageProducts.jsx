import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const productSuggestions = [
  'Apple iPhone 15',
  'Samsung Galaxy S24',
  'Google Pixel 8',
  'Sony Headphones',
  'Dell Laptop',
  'HP Printer',
  'Apple Watch',
  'Amazon Echo',
  'Logitech Mouse',
];

const ManageProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: '',
    cost: '',
    sellingPrice: '',
  });

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const addProducts = async () => {
    const response = await fetch('http://localhost:8080/api/product/save', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    console.log("response", response);
    if (response.ok) {
        alert('Product added successfully!');
        console.log("Submitted Product:", formData);
    }
    if(response.status === 401){
        localStorage.removeItem('token');
        navigate('/Login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("e.target", e.target);
    console.log("name", name);
    console.log("value", value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'name') {
      const filtered = productSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(value ? filtered : []);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      name: suggestion,
    }));
    setFilteredSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with an API call to save the product
    addProducts();
    setFormData({ name: '', description: '', stock: '', cost: '', sellingPrice: '' });
  };


  return (
    <div className="page-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Enter product name"
        />
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, idx) => (
              <li key={idx} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
        />

        <label>Cost Price ($)</label>
        <input
          type="number"
          step="0.01"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          placeholder="Enter cost price"
        />

        <label>Selling Price ($)</label>
        <input
          type="number"
          step="0.01"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          placeholder="Enter selling price"
        />

        <button type="submit">Add Product</button>
      </form>

      <style>{`
        body {
          margin: 0;
          background-color: #f4f6f8;
          font-family: 'Segoe UI', sans-serif;
        }

        .page-wrapper {
          min-height: 100vh;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 3rem 1rem;
        }

        .product-form {
          width: 100%;
          max-width: 500px;
          background: #ffffff;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .product-form h2 {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .product-form label {
          display: block;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        .product-form input,
        .product-form textarea {
          width: 95%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }

        .product-form textarea {
          resize: vertical;
        }

        .product-form button {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .product-form button:hover {
          background-color: #0056b3;
        }

        .suggestions-list {
          list-style: none;
          margin-top: -0.5rem;
          margin-bottom: 1rem;
          padding: 0;
          background: white;
          border: 1px solid #ccc;
          border-radius: 5px;
          max-height: 150px;
          overflow-y: auto;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .suggestions-list li {
          padding: 0.5rem 0.75rem;
          cursor: pointer;
        }

        .suggestions-list li:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default ManageProducts;
