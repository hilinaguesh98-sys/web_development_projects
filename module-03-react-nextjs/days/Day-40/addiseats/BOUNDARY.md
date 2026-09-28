# AddisEats Boundary Map

| Component / file | Side | Why |
|---|---|---|
| `app/layout.js` | Server | Static application shell and metadata. |
| `components/Header.js` | Client | Reads pathname and browser cart state. |
| `components/DishCard.js` | Client | Favorite and cart buttons use localStorage. |
| `components/CartClient.js` | Client | Cart quantity state and localStorage belong in the browser. |
| `components/Footer.js` | Server | Static navigation and footer content. |
| `app/actions.js` | Server | Validates checkout data and creates orders on the server. |
| `lib/data.js` | Shared | Canonical dish data is used by pages, actions, and API handlers. |
| `lib/orders.js` | Server | Order storage is server-side. |
| `app/api/*` | Server | API route handlers execute on the server. |
| `app/page.js` | Client | Home search and category filters are interactive. |
| `app/menu/page.js` | Client | Menu filters and sorting are interactive. |
| `app/menu/[id]/page.js` | Client | Quantity and add-to-cart controls are interactive. |
| `app/favorites/page.js` | Client | Reads and reacts to localStorage. |
| `app/cart/page.js` | Server | Provides the route shell for the client cart component. |
| `app/cart/checkout/page.js` | Client | Form state and redirect after server action. |
| `app/orders/page.js` | Client | Fetches orders and switches active/past tabs. |
| `app/order-confirmation/[id]/page.js` | Client | Fetches and renders a dynamic order. |
| `app/mobile-flow/page.js` | Server | Static responsive-flow documentation. |
