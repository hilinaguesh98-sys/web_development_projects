import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAdminAuth from './useAdminAuth';

export default function RequireAdmin() {
  const { isAdmin } = useAdminAuth();
  const location = useLocation();

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace state={{ from: location }} />;
}