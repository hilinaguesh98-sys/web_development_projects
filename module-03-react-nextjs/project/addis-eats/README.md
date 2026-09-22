# Addis Eats

Addis Eats is a responsive React food-ordering application for discovering Ethiopian and international dishes, building a cart, placing delivery orders, and managing the menu through a local admin portal.

This project is a frontend-only learning project. It uses Vite for development and bundling, React Router for navigation, React Context for cart and customer session state, Zustand for the persisted theme preference, and browser `localStorage` as a lightweight data store.

## Features

### Customer experience

- Browse a menu of Ethiopian and international dishes.
- Search dishes by name.
- Filter dishes by category.
- Open a dedicated dish details page with ingredients and description.
- Add dishes to the cart and increase, decrease, or remove quantities.
- Save favorite dishes in the browser.
- Sign in with a name and Ethiopian phone number.
- Select a delivery area and calculate the delivery fee.
- Add optional delivery instructions.
- Place an order and view an order confirmation.
- Track active and past orders with simulated status progression.
- Reorder items from a previous order.
- Switch between light and dark themes.
- Use responsive desktop and mobile navigation.

### Admin experience

- Sign in through the protected admin portal.
- View order and menu statistics on the dashboard.
- See the most frequently ordered dishes.
- Search, add, edit, and delete menu dishes.
- Review order details.
- Update order statuses.
- Delete local orders.

## Technology Stack

- React 19
- Vite 8
- React Router DOM 7
- Zustand 5
- ESLint 10
- CSS with responsive layouts and theme variables

## Getting Started

### Requirements

- Node.js 18 or newer
- npm
- A modern browser with `localStorage` enabled

### Install and run

From this directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The default development address is usually `http://localhost:5173`.

### Production preview

Create and preview a production build with:

```bash
npm run build
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run lint` | Run ESLint against the project |
| `npm run build` | Build the application for production |
| `npm run preview` | Serve the production build locally |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page with featured content and entry points into the menu |
| `/menu` | Searchable and filterable menu |
| `/menu/:id` | Details for a single dish |
| `/favorites` | Dishes saved as favorites |
| `/cart` | Current cart contents and quantity controls |
| `/checkout` | Sign-in flow and delivery checkout form |
| `/order-confirmation` | Confirmation after a successful order |
| `/orders` | Active and past order history with reorder actions |
| `/admin/login` | Admin sign-in page |
| `/admin` | Admin dashboard |
| `/admin/dishes` | Admin menu management |
| `/admin/orders` | Admin order management |

## Typical Customer Flow

1. Open **Menu** and search or filter the available dishes.
2. Select a dish to view its details, then add it to the cart.
3. Open **Cart** to adjust quantities and review the subtotal.
4. Continue to **Checkout** and sign in with a name and Ethiopian phone number.
5. Select a delivery area. The delivery charge is added to the order total.
6. Add optional instructions and place the order.
7. Review the confirmation, then monitor the order from **Orders**.

The accepted delivery areas and fees are:

| Area | Fee |
| --- | ---: |
| Megenagna | 100 ETB |
| Bole | 150 ETB |
| Mexico | 200 ETB |
| Piassa | 250 ETB |
| Kazanchis | 250 ETB |

## Admin Demo

The admin portal is available at `/admin/login`.

```text
Username: hilina
Password: 123
```

These credentials are intentionally hardcoded for this local learning project. They are not suitable for a real deployment. The admin session and all admin changes are stored only in the current browser's `localStorage`.

## Project Structure

```text
addis-eats/
├── public/
│   └── menu-data.json             # Default menu data loaded at runtime
├── src/
│   ├── admin/                     # Admin login, dashboard, menu, and order management
│   ├── api/                       # Client-side data loading helpers
│   ├── assets/                    # Dish images and other bundled assets
│   ├── auth/                      # Customer authentication context and hook
│   ├── cart/                      # Cart context, state, and hooks
│   ├── checkout/                  # Checkout and delivery form
│   ├── favorites/                 # Favorite dish persistence helpers
│   ├── menu/                      # Menu page and dish cards
│   ├── pages/                     # Home, cart, orders, favorites, and detail pages
│   ├── state/                     # Zustand theme store
│   ├── App.jsx                    # Router, providers, and route definitions
│   ├── Layout.jsx                 # Customer navigation, footer, and theme handling
│   ├── App.css                    # Application component styles
│   └── index.css                  # Global styles and theme variables
├── index.html                     # Vite HTML entry point
├── package.json                   # Scripts and dependencies
└── vite.config.js                 # Vite configuration
```

## Data and State

### Menu data

The default menu is defined in [public/menu-data.json](public/menu-data.json). Dish images are imported from [src/assets/](src/assets/). The menu loader resolves image filenames to bundled asset URLs.

If an admin creates or edits dishes, the updated list is saved under `addisEatsDishes` and takes precedence over the default JSON data in that browser.

### Browser storage

The application uses these local storage keys:

| Key | Stores |
| --- | --- |
| `addisEatsUser` | Signed-in customer name and phone number |
| `addiseatscart` | Current cart items and quantities |
| `addisEatsFavorites` | Favorite dish IDs |
| `addisEatsOrders` | Locally created orders |
| `addisEatsDishes` | Admin-created or edited menu data |
| `addisEatsAdmin` | Local admin login session |
| `addis-eats-theme` | Persisted light/dark theme preference from Zustand |

To reset the demo, clear the site's local storage in the browser and reload the application.

## Architecture Overview

`src/main.jsx` mounts the React application. `src/App.jsx` defines the public and admin routes and wraps the application with `AuthProvider` and `CartProvider`.

The customer layout renders shared navigation and an `Outlet` for each customer page. Menu data is loaded through `src/api/dishes.js`. Cart operations are exposed through the cart context, while customer identity is exposed through the auth context. Favorites use a local storage helper, and the theme store uses Zustand's `persist` middleware.

The admin area is protected by `RequireAdmin`. It reads and writes the same local menu and order data used by the customer experience, which makes it useful for demonstration without a backend.

## Demo Checklist

Use this checklist to verify the main application flows after starting the development server:

- Open the home page and navigate to **Menu**.
- Search for a dish and filter by category.
- Open a dish, mark it as a favorite, and add it to the cart.
- Change the cart quantity and confirm that the subtotal updates.
- Continue to checkout, sign in with a name and a valid phone number such as `0911456830`, and select a delivery area.
- Place the order and confirm that it appears under **Orders**.
- Open the admin portal, update an order status, and confirm that the order data changes locally.
- Add or edit a dish in **Admin > Dishes**, then return to the customer menu.
- Toggle the theme and reload the page to confirm that the preference persists.

## Troubleshooting

### The menu does not load

Make sure the app is being served through Vite and that [public/menu-data.json](public/menu-data.json) is present. The menu loader requests this file from the application root.

### Old menu, cart, or order data is appearing

The application stores demo data in browser storage. Clear the site data for the local development address, then reload the page. This resets the cart, favorites, orders, customer session, admin session, and locally edited dishes.

### The admin changes are not visible in another browser

That is expected. This project has no backend, so menu edits and orders belong only to the current browser profile.

### The development port is already in use

Start Vite with another port:

```bash
npm run dev -- --port 5174
```

## Validation and Development

Before opening a pull request or submitting work, run:

```bash
npm run lint
npm run build
```

When changing menu data, confirm that:

- The dish has a unique `id`.
- `name`, `category`, `price`, `image`, `imageAlt`, `description`, and `ingredients` are present when needed by the UI.
- The image filename matches a file in `src/assets/`.
- `price` is stored as a number.

When changing routes, update the route table in this README and verify both desktop and mobile navigation.

## Current Scope and Limitations

This version is intentionally a frontend prototype. It does not provide:

- A real backend or database.
- Server-side authentication or authorization.
- Secure password handling.
- Real payment processing.
- Real-time order updates across devices.
- Persistent data shared between browsers or users.
- Image uploads from the admin form.

For production use, the local storage layer should be replaced with an API and database, authentication should be handled securely on the server, and admin credentials should be managed through environment-backed identity management.
