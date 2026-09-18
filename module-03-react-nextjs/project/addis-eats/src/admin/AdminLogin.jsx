import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAdminAuth from './useAdminAuth';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login(form.username, form.password)) {
      setError('Invalid admin credentials.');
      return;
    }
    navigate(location.state?.from?.pathname || '/admin', { replace: true });
  };

  return (
    <main className="auth-page admin-login-page">
      <form className="auth-card auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Addis Eats</p>
        <h1>Admin portal</h1>
        <p className="subtle-text">Manage the menu and keep orders moving.</p>
        <div className="field-group"><label htmlFor="admin-username">Username</label>
        <input id="admin-username" value={form.username} 
        onChange={(event) => setForm({ ...form, username: event.target.value })} 
        required autoComplete="username" /></div>
        <div className="field-group"><label htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" value={form.password} 
        onChange={(event) => setForm({ ...form, password: event.target.value })} 
        required autoComplete="current-password" /></div>
        {error && <p className="error-message">{error}</p>}
        <button className="primary-button full-width" type="submit">Sign in</button>
      </form>
    </main>
  );
}