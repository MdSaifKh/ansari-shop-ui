import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './route/ProtectedRoute';
import Dashboard from './components/Dashboard';
import CommonLayout from './common/CommonLayout'
import ManageProducts from './common/ManageProducts'
import bgImage from './asset/background.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      >
    
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
    </div>
  );
}

export default App;
