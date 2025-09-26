import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/home';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // redirect after logout
  };

  const setUserFromLogin = (userObj) => {
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          {/* Update the root path redirect */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setUserFromLogin} />} />
          <Route path="/register" element={<Register onRegister={setUserFromLogin} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
          <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
          {/* Add a catch-all route for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
