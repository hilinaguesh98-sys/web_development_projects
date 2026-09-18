import { useState } from 'react';

const STORAGE_KEY = 'addisEatsAdmin';
const ADMIN_USERNAME = 'hilina';
const ADMIN_PASSWORD = '123';

function readSession() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export default function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(readSession);

  const login = (username, password) => {
    const valid = username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    if (valid) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAdmin(true);
    }
    return valid;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
}