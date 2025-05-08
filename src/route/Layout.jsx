import { Link, Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate = useNavigate();

    const handleLogOut = () =>{
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={handleLogOut}>Logout</button>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;