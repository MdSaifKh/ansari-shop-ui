import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './route/ProtectedRoute';
import Layout from './route/Layout';
import Dashboard from './components/Dashboard';
import CommonLayout from './common/CommonLayout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <CommonLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/layout" element={<ProtectedRoute><Layout /></ProtectedRoute>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      </CommonLayout>
    </Router>
  );
}

export default App;
