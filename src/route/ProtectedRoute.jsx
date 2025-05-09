import { Navigate } from 'react-router-dom'
function ProtectedRoute({children}){
    const token = localStorage.getItem('token');
    console.log("token", token);
    if(token === "undefined" || token === null){
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute