import '../css/mediaPrint.css';
import { useState, useRef } from 'react';

const InvoiceCard = ({ invoiceItems, removeItem, onInvoiceCleared }) => {
  const [printing, setPrinting] = useState(false);
  const [finished, setFinished] = useState(false);
  const componentRef = useRef();
  const total = invoiceItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

  // Print invoice section only
  const handlePrint = async () => {
    setFinished(false);
    setPrinting(true);
    const printContents = componentRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Invoice</title>');
    printWindow.document.write('<link rel="stylesheet" href="../css/mediaPrint.css" />');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.onafterprint = () => {
      setPrinting(false);
    };
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
    setFinished(true);
  };

  // Finish invoice: save to backend, clear items
  const handleFinish = async () => {
    if (typeof window !== 'undefined' && window.confirm('Invoice finished. Save and clear all items?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/invoice/finish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ products: invoiceItems.map(item => ({ id: item.product.id, quantity: item.quantity })) })
        });
        if (!response.ok) {
          throw new Error('Failed to save invoice');
        }
        // Clear invoice items
        if (typeof onInvoiceCleared === 'function') onInvoiceCleared();
      } catch (e) {
        alert('Failed to save invoice to backend.');
      }
    }
    setFinished(false);
  };

  return (
    <>
      <div ref={componentRef} className="invoice-card">
        <h2>Invoice</h2>
        <h3>Ansari store</h3>
        {invoiceItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th className="remove-btn-header"><span className="remove-btn-header-label">Remove</span></th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.product.sellingPrice}</td>
                  <td>₹{item.product.sellingPrice * item.quantity}</td>
                  <td className="remove-btn-cell">
                    <button onClick={() => removeItem(idx)} className="remove-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {invoiceItems.length > 0 && <h3>Total: ₹{total.toFixed(2)}</h3>}
      </div>
      {/* Action buttons at the bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <button
          onClick={handlePrint}
          disabled={printing || invoiceItems.length === 0}
          className="invoice-action-btn print-btn"
        >
          {printing ? 'Saving...' : 'Print Invoice'}
        </button>
        <button
          onClick={handleFinish}
          disabled={!finished}
          className="invoice-action-btn finish-btn"
        >
          {finished ? 'Finished' : 'Finish Invoice'}
        </button>
      </div>
    </>
  );
};

export default InvoiceCard;