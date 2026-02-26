import {useState} from 'react';
import ProductForm from './ProductForm';
import InvoiceCard from './InvoiceCard';
import'../css/Invoice.css';
const InvoiceApp = () => {
  const [products, setProducts] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const addToInvoice = (product, quantity) => {
    const existing = invoiceItems.find(item => item.product.id === product.id);
    if (existing) {
      // If already added, update quantity
      setInvoiceItems(invoiceItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setInvoiceItems([...invoiceItems, { product, quantity }]);
    }
  };

  const removeItem = (index) => {
    const updated = [...invoiceItems];
    updated.splice(index, 1);
    setInvoiceItems(updated);
    // When an item is removed from invoice, add the quantity back to product stock
    const removedItem = invoiceItems[index];
    const productIndex = products.findIndex(p => p.id === removedItem.product.id);
    if (productIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].stock += removedItem.quantity;
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="invoice-app">
      <ProductForm
        products={products}
        setProducts={setProducts}
        addToInvoice={addToInvoice}
        invoiceItems={invoiceItems}
      />
      <InvoiceCard
        invoiceItems={invoiceItems}
        removeItem={removeItem}
      />
    </div>
  );
};


export default InvoiceApp;