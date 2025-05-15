import React from 'react';

function ProductTable({ productList }) {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', minHeight: '100vh' }}>
       <h2>Product List</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Cost Price (Rs)</th>
            <th>Selling Price (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {productList.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.cost.toFixed(2)}</td>
              <td>{product.sellingPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Inline style for page background (optional if handled globally) */}
      <style>{`
        body {
          margin: 0;
          background-color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .styled-table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 auto;
          font-size: 16px;
          background-color: white;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
        }

        .styled-table thead tr {
          background-color: #13b0c1;
          color: #ffffff;
          text-align: left;
        }

        .styled-table th,
        .styled-table td {
          padding: 12px 15px;
          border: 1px solid #ddd;
        }

        .styled-table tbody tr {
          border-bottom: 1px solid #ddd;
        }

        

        .styled-table tbody tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
}

export default ProductTable;
