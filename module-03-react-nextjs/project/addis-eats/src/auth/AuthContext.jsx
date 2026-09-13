import { useState } from 'react';
import AuthContext from './auth-context';
const STORAGE_KEY = 'addisEatsUser';

export function AuthProvider({ children }) {
	const [user, setUser] = useState(() => {
		try {
			const savedUser = localStorage.getItem(STORAGE_KEY);
			return savedUser ? JSON.parse(savedUser) : null;
		} catch {
			return null;
		}
	});

	const signIn = (name, phone) => {
		const safeName = name.trim();
		const safePhone = phone.trim();
		const nextUser = { name: safeName, phone: safePhone };

		setUser(nextUser);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
		return nextUser;
	};

	const signOut = () => {
		setUser(null);
		localStorage.removeItem(STORAGE_KEY);
	};

	return (
		<AuthContext.Provider value={{ user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
