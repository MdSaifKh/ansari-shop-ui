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
    <header className="header-main">
      {/* Left group: icon, separator and title */}
      <div className="header-left">
        <span onClick={handleIconClick} style={{cursor: 'pointer'}}> 
          <FaHome size="30px" color="#13b0c1" />
        </span>
        <span style={{paddingLeft: '10px'}}>|</span>
        <h3 style={{ margin: 0, paddingLeft: "10px"}}>Ansari Store</h3>
      </div>

      {/* Right group: menu + auth controls */}
      <div className="header-right">
        <div className="header-btn-group">
          {isLoggedIn && location.pathname !== "/login" ? (
            <Stack direction="row" spacing={2}>
              <Button variant="text"
                  className="header-btn header-mui-btn-special"
                  href="/manageProducts">
                Manage Products
              </Button>
              <Button variant="text" className="header-btn header-mui-btn-special" href="/invoice">
                Order Summary
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} style={{ visibility: "hidden" }}>
              <Button variant="outlined">Placeholder</Button>
              <Button variant="outlined">Placeholder</Button>
            </Stack>
          )}
        </div>
        <div className="header-auth-btn">
          {!isLoggedIn && location.pathname === "/" && (
            <Link to="/login">
              <button className="nav-button header-btn header-mui-btn-special">
                Login
              </button>
            </Link>
          )}
          {isLoggedIn && location.pathname !== "/login" && (
            <button
              onClick={handleClick}
              className="logout-button header-btn"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;