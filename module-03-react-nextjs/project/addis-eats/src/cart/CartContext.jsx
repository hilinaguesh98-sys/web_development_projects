import { useEffect, useMemo, useState } from 'react';
import CartContext from './cart-context';

export function CartProvider({ children }) {
	const [cart, setCart] = useState(() => {
		try {
			const savedCart = localStorage.getItem('addiseatscart');
			return savedCart ? JSON.parse(savedCart) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem('addiseatscart', JSON.stringify(cart));
	}, [cart]);

	const addToCart = (dish) => {
		setCart((currentCart) => {
			const existingItem = currentCart.find((item) => item.id === dish.id);

			if (existingItem) {
				return currentCart.map((item) =>
					item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
				);
			}

			return [...currentCart, { ...dish, quantity: 1 }];
		});
	};

	const increaseQuantity = (id) => {
		setCart((currentCart) =>
			currentCart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		);
	};

	const decreaseQuantity = (id) => {
		setCart((currentCart) =>
			currentCart
				.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
				)
				.filter((item) => item.quantity > 0),
		);
	};

	const removeFromCart = (id) => {
		setCart((currentCart) => currentCart.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

	const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

	const value = useMemo(
		() => ({
			cart,
			addToCart,
			increaseQuantity,
			decreaseQuantity,
			removeFromCart,
			clearCart,
			subtotal,
			cartCount,
		}),
		[cart, subtotal, cartCount],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
