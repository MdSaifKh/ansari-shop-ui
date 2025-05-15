import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './route/ProtectedRoute';
import Dashboard from './components/Dashboard';
import CommonLayout from './common/CommonLayout'
import ManageProducts from './common/ManageProducts'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <CommonLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/manageProducts" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
      </Routes>
      </CommonLayout>
    </Router>
  );
}

export default App;
