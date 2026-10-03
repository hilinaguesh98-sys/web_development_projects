# addiseats

AddisEats is a Next.js food delivery capstone built with JavaScript and the App Router. The UI follows the supplied Addis Eats reference: compact header navigation, orange accent, restaurant-style food cards, dark footer, cart, orders, confirmation, and responsive mobile flow.

## Routes

- `/` - Home
- `/menu` - Menu with categories, search, and sorting
- `/menu/[id]` - Dish details
- `/favorites` - Saved dishes
- `/cart` - Shopping cart
- `/cart/checkout` - Checkout and server action
- `/orders` - Active and past orders
- `/order-confirmation/[id]` - Order confirmation
- `/mobile-flow` - Mobile flow documentation screen

## API

- `GET /api/dishes`
- `GET /api/dishes/[id]`
- `GET /api/orders`
- `POST /api/orders`
- `GET /api/orders/[id]`

## Run

```powershell
npm install
npm run dev
```

Production:

```powershell
npm run build
npm start
```

## Food data and images

The complete supplied food dataset is in `lib/data.js`. Images are imported from `app/assets` using the exact filenames requested by the dataset. The project package includes working image files under those names so the project can run immediately. Replace those image files with your own real food images when available; no code changes are required.

## Main behavior

- Favorites are stored in browser localStorage.
- Cart quantities are stored in browser localStorage.
- Checkout validates the submitted customer information and cart on the server.
- Orders are kept in a server-side in-memory store for this course project.
- Restarting the Next.js process clears demo orders.
