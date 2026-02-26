import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import '../css/ProductForm.css'

const ProductForm = ({ products, setProducts, addToInvoice, invoiceItems }) => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  // Fetch products from backend
  const fetchAll = async () => {
    const response = await fetch('http://localhost:8080/api/product/all', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log("response", response);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
    if(response.status === 401){
        localStorage.removeItem('token');
        navigate('/Login');
    }
  }
  useEffect(() => {
    fetchAll();
  }, []);
  const product = products.find(p => p.id === parseInt(selectedProductId));
  // Find current quantity in invoice for selected product
  const invoiceItem = invoiceItems?.find(item => item.product.id === product?.id);

  useEffect(() => {
    // When product changes, set quantity to invoice quantity if exists, else blank
    if (invoiceItem) {
      setQuantity(invoiceItem.quantity);
    } else {
      setQuantity();
    }
  }, [selectedProductId, invoiceItems]);

  const handleQuanityChange = (e) =>{
    const value = parseInt(e.target.value);
    if(!isNaN(value)){
      setQuantity(value);
      if(product && value > product.stock){
        setError(`Quantity exceed the available stock (${product.stock})`);
        setQuantity();
      }else{
        setError('');
      }
    }
  }

  const handleAdd = () => {
    
    if (!product) return;

    if(quantity > product.stock){
      setError(`Can not add more than available stock (${product.stock})`)
      return;
    }
    product.stock -= quantity; // optimistically update stock in UI
    setProducts([...products]);
    addToInvoice(product, quantity);
    setQuantity(); // reset
    setSelectedProductId('');
    setError('');
  };

  const handleChange = (e) => {
    console.log("Selected product id:", e.value);
    setSelectedProductId(e.value);
  };

  return (
    <div className="product-form">
      <h2>Add Product</h2>
      <label>Product</label>
      <Select
        value={selectedProductId}
        onChange={handleChange}
        options={products.map(p => ({ value: p.id, label: p.name }))}
        placeholder="Select a product"
        isSearchable={true}
        styles={{
          control: (base) => ({
            ...base,
            padding: '0.35rem 1.5rem',
            borderRadius: "5px",
          }),
        }}
      />
      {product && (
        <>
        <p><strong>Available stock: </strong> {product.stock}</p>
        <p><strong>Cost Price: </strong> {product.cost}</p>
        <p><strong>Selling Price: </strong> {product.sellingPrice}</p>
        <label>Quantity</label>
        <input
          type="number"
          min="1"
          onChange={handleQuanityChange}
          className={error ? "error-input":''}
        />
        {error && <p className='error-text'>{error}</p>}

        <button type="button" onClick={handleAdd} disabled={!!error}>Add to Invoice</button>
        </>
      )}
      
    </div>
  );
};


export default ProductForm;
