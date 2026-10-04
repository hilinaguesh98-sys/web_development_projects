# Addis Eats Authentication

## Session model

`lib/session.js` is the shared server entry point for `getSession()`. Session tokens are signed with HMAC-SHA-256 using Web Crypto, contain a seven-day expiry, and are rejected if their signature, role, or expiry is invalid. Middleware uses the same verifier from `lib/session-token.js` because middleware receives the request cookie directly.

The `addis_eats_session` cookie is `httpOnly`, `secure`, `sameSite: 'lax'`, and scoped to `/`. Local development uses a development-only signing key. Set a unique `AUTH_SECRET` in the environment before deploying; production refuses to issue a session if it is missing.

The demo accounts are seeded in `lib/users.js`; passwords are stored as scrypt hashes:

| Role | Email | Password |
| --- | --- | --- |
| Customer | `customer@addiseats.test` | `AddisEats123!` |
| Staff | `staff@addiseats.test` | `Kitchen123!` |

These fixed accounts are for this classroom demo only. A deployed application should use a persistent user store, account provisioning, password resets, rate limiting, and a managed secret.

## Protected routes and layers

| Route | Middleware | Server-side check | Data/write boundary |
| --- | --- | --- | --- |
| `/cart/checkout` | `middleware.js` redirects missing or invalid sessions to `/signin?next=...`. | The checkout action calls `getSession()` and rejects direct unauthenticated calls. | `placeOrder` takes `userId` from the verified session, never from the form or request body. |
| `/orders` | `middleware.js` protects the orders path. | The page calls `getSession()` and loads only `getOrdersForUser(session.id)`. | `GET /api/orders` applies the same filter. `POST /api/orders` requires a session and assigns the owner from it. |
| `/orders/[id]` | `middleware.js` protects the detail path. | The page loads via `getOrderForUser(id, session.id)` and returns not-found for another account's order. | `GET /api/orders/[id]` also checks ownership and returns 404 for an order owned by someone else. |
| `/kitchen` | Not included in the middleware matcher. | The server page requires `session.role === 'staff'` before loading or rendering any orders. | The all-orders query is only called after the server-side role check. Hiding the navigation link is not an authorization control. |

The middleware matcher is intentionally narrow: `/cart/checkout/:path*` and `/orders/:path*`. API handlers and server actions repeat authentication and ownership checks because middleware is not their authorization boundary.

## Sign-in return destination

Middleware preserves the requested path and query in the `next` parameter. `/api/auth` accepts only a local path beginning with one `/`; protocol-relative URLs, backslashes, and `/signin` are rejected. The form displays the rejection rather than navigating to an external site.

Try this crafted link while signed out:

```text
/signin?next=https%3A%2F%2Fevil.example
```

Submitting valid credentials with that `next` value returns HTTP 400 and does not create a session. Also try `next=%2F%2Fevil.example`; the double-slash destination is rejected.

## Manual verification

1. Open `/orders` signed out; confirm it redirects to `/signin?next=%2Forders`.
2. Sign in as the customer and confirm the browser returns to `/orders`.
3. Place an order, sign out, and sign in as the staff account. Confirm the customer order is absent from `/api/orders` and requesting its `/api/orders/[id]` endpoint returns 404.
4. Visit `/kitchen` as the customer and confirm the server redirects to `/orders`; sign in as staff and confirm the kitchen page is available.
5. Sign out and confirm `/api/auth` reports no session and protected routes redirect again.

Orders are held in an in-memory demo store, so they are reset when the server restarts. The owner checks still apply to every read and write in that store.