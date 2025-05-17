import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ProductTable({ productList }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [serachTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  // filter based on search
  const filteredData = productList.filter(item =>
    item.name.toLowerCase().includes(serachTerm.toLocaleLowerCase())
  )

  // pagintion logic
  const totalPages = Math.ceil(filteredData.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemPerPage);

  const deletProduct = async (name) => {
    const response = await fetch(`http://localhost:8080/api/product/delete/${name}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (response.ok) {
      window.location.reload();
    }
    if(response.status === 401){
        localStorage.removeItem('token');
        navigate('/Login');
    }
  };

  const handleSearch = (e) =>{
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }
  
  const handleEdit = (productName) =>{
    navigate("/manageProducts",
      {
        state :{
            name : productName,
        }
      }
    );
  }

  const handleDelete = (name) => {
    deletProduct(name);
    alert("Product delete successfully !!");
  }
  return (
    <div style={{ padding: '2rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', minHeight: '100vh' }}>
      <div>
        <h1 style={{color: "white", }}>Product List</h1>
       <input
        type='text'
        placeholder='Search by Name'
        value={serachTerm}
        onChange={handleSearch}
        style={{
          padding: '0.60rem', 
          width:'20%',
          marginBottom:"5px",
          display: 'flex', justifyContent: 'flex-end' 
        }}
        />
      </div>
       
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Cost Price (Rs)</th>
            <th>Selling Price (Rs)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.stock}</td>
              <td>{product.cost}</td>
              <td>{product.sellingPrice}</td>
              <td>
                <button style={{ 
                  backgroundColor: '#3B82F6', 
                  color: 'white', 
                  borderRadius: "5px",
                  padding: "0.35rem 1rem", 
                  marginRight:'5px', 
                  cursor: "pointer", 
                  fontSize: ".90rem",
                  border: "none",
                }}
                onClick={() => handleEdit(product.name)}
                > Edit</button>
                <button 
                style={{ 
                  backgroundColor: '#DC2626', 
                  color: 'white',
                  padding: "0.35rem .80rem", 
                  fontSize: ".90rem", 
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() => handleDelete(product.name)}
                > Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ backgroundColor: '#13b0c1', color: 'white', borderRadius: "5px",}}
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button style={{ backgroundColor: '#13b0c1', color: 'white', borderRadius: "5px",}}
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

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
