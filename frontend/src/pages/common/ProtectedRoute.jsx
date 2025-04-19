import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../utils/storageUtility';

const ProtectedRoute = () => {
  const token = getTokenFromLocalStorage();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
