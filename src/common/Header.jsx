import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <header
      style={{
        backgroundColor: "#1F2937",
        padding: "1rem 2rem",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>My App</h2>

      <div>
        {!isLoggedIn && location.pathname === "/" && (
          <Link to="/login">
            <button
              style={{
                backgroundColor: "#3B82F6",
                color: "white",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
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