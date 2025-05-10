import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import '../css/header.css'

const Header = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <header
      style={{
        backgroundColor: "#000000",
        padding: "1rem 2rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2}>
      <HomeIcon fontSize="large" color="primary" />
      </Stack>
      <h2 style={{ margin: 0, paddingLeft: "10px"}}>Ansari Store</h2>

      <div style={{ marginLeft: "auto", paddingRight: "20px", minWidth: "250px" }}>
  {isLoggedIn && location.pathname !== "/login" ? (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" 
      style={{ 
        color: "white",
        backgroundColor: "#3B82F6"
       }} 
      href="/dashboard">
        Dashboard
      </Button>
      <Button variant="outlined" style={{ color: "white", backgroundColor: "#3B82F6" }}>
        Manage Items
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