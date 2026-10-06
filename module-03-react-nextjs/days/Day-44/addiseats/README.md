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

## Environment

Copy `.env.example` to `.env.local` and replace the sample `AUTH_SECRET` with a unique secret before production deployment. Generate one with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

`.env.local` and other `.env*.local` files are ignored by Git. `.env.example` is safe to commit because its values are placeholders. Next.js sets `NODE_ENV` automatically; `AUTH_SECRET` is required for production authentication.

Set `NEXT_PUBLIC_SITE_URL` to the canonical site origin (for example, `https://addiseats.example`) when deploying outside Vercel or when using a custom domain. It is used to build absolute metadata, sitemap, and robots URLs. Vercel's production domain is detected automatically; local development defaults to `http://localhost:3000`.

## Food data and images

The complete supplied food dataset is in `lib/data.js`. Images are imported from `app/assets` using the exact filenames requested by the dataset. Rendered images use `next/image`; imported assets provide intrinsic dimensions, and the order API carries dimensions for its URL-backed thumbnails. The shared food photo is also served from `public/addiseats-food.jpg` for the home hero and site-wide social preview. Individual dish pages generate their own social previews from the matching dish data.

The root layout uses `next/font` to bundle Manrope into the app build, so no Google Fonts request is made by visitors.

## Main behavior

- Favorites are stored in browser localStorage.
- Cart quantities are stored in browser localStorage.
- Checkout validates the submitted customer information and cart on the server.
- Orders are kept in a server-side in-memory store for this course project.
- Restarting the Next.js process clears demo orders.
- Lighthouse measurements and the audit caveats are in `PERF.md`.
