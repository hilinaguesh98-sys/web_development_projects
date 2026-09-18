import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAdminAuth from './useAdminAuth';

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/admin/login', { replace: true }); };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div><p className="eyebrow">Addis Eats</p><h1>Admin</h1></div>
        <nav aria-label="Admin navigation"><NavLink to="/admin" end>Dashboard</NavLink><NavLink to="/admin/dishes">Dishes</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink></nav>
        <button type="button" className="text-button admin-logout" onClick={handleLogout}>Sign out</button>
      </aside>
      <main className="admin-main"><Outlet /></main>
    </div>
  );
}