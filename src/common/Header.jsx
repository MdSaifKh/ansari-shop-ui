import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../css/header.css'
import { FaHome } from "react-icons/fa"

const Header = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const handleIconClick = () =>{
    console.log("icon clicked");
    navigate('/dashboard');
  }

  return (
    <header
      style={{
        //backgroundColor: "#f6f7f8",
        backgroundColor: "black",
        padding: ".5rem 2rem",
        //color: "#474141",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span onClick={handleIconClick} style={{cursor: 'pointer'}}> 
        <FaHome size="30px" color="#13b0c1" />
        {/* <img src={myIcon} alt="|" /> */}
      </span>
      <span style={{paddingLeft: '10px'}}>|</span>
     
      <h3 style={{ margin: 0, paddingLeft: "10px"}}>Ansari Store</h3>
      <div style={{ marginLeft: "auto", paddingRight: "20px", minWidth: "250px" }}>
      {isLoggedIn && location.pathname !== "/login" ? (
        <Stack direction="row" spacing={2}>
          <Button variant="text"
              style={{ 
                //color: "#474141",
                color: "white",
              }} 
              href="/manageProducts">
            Manage Products
          </Button>
          <Button variant="text" style={{ 
            //color: "#474141"
            color: "white",
             }}>
            Order Summary
          </Button>
        </Stack>
      ) : (
     // Invisible placeholders to preserve layout space
      <Stack direction="row" spacing={2} style={{ visibility: "hidden" }}>
        <Button variant="outlined">Placeholder</Button>
        <Button variant="outlined">Placeholder</Button>
      </Stack>
      )}
      </div>


      <div>
        {!isLoggedIn && location.pathname === "/" && (
          <Link to="/login">
            <button className="nav-button"
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2563EB")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3B82F6")}
            >
              Login
            </button>
          </Link>
        )}

        {isLoggedIn && location.pathname !== "/login" && (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#EF4444",
              color: "white",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#DC2626")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#EF4444")}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;