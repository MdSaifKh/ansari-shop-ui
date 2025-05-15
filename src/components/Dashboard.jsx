import { useEffect, useState } from "react";
import ProductTable from "../common/ProductTable.jsx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [productList, setProductList] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchProductList = async () => {
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
      setProductList(data);
    }
    if(response.status === 401){
        localStorage.removeItem('token');
        navigate('/Login');
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [token]);

  useEffect(() => {
    console.log("product list", productList);
  }, [productList]);


  return (
    <div>
      {productList && (
        <ProductTable productList={productList} />
      )}
    </div>
  );
}

export default Dashboard;