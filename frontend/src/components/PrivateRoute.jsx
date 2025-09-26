import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  if (!token) return <Navigate to="/login" replace />;
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/products" replace />;
  return children;
}
