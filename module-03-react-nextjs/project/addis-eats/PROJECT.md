# Addis Eats

Addis Eats is a React food-ordering application for browsing Ethiopian and international dishes, managing a cart, and completing an order.

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in a browser.

## Available commands

```bash
npm run dev       # Start the development server
npm run lint      # Check the source files with ESLint
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

## Main workflows

- Browse the menu and filter dishes by category.
- Open a dish to view its details and add it to the cart.
- Review quantities and totals in the cart.
- Sign in through the local authentication flow.
- Complete checkout and view the order confirmation and order history.

Menu data is stored in `public/menu-data.json`, and food images are in `src/assets`.
