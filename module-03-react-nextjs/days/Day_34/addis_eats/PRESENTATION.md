# Addis Eats Capstone Presentation

## Presentation Status

- Deployed URL: **Not supplied in the workspace/session**
- Repository: https://github.com/IBT-Qiyas-Full-Stack-Academy/sq6-hilina-guesh
- Local verification URL used during preparation: `http://localhost:5174/`
- Honest limitation: the presentation should be delivered from the deployed URL once the deployment link is supplied; local verification is recorded here only as evidence, not as a deployed link.

## Eight-Minute Walkthrough

### 0:00-1:00 - Problem and user

Addis Eats lets a customer browse an Ethiopian food menu, filter it, build a cart, and submit delivery details. The main user journey is menu discovery to a protected checkout without losing the order total or form values.

### 1:00-2:30 - Client and server tabs

- **Server tab:** `src/api.js` loads `public/dishes.json` with an abort signal and reports non-OK responses.
- **Client tab:** `src/Menu.jsx` owns category/search interaction, cart totals, loading state, and error state.
- The client passes the selected category to the server loader and filters the returned dishes by the search term.

### 2:30-4:00 - Protected action

Open `/checkout` while signed out. `RequireAuth` redirects to `/signin` and preserves the original destination. After sign-in, the user returns to checkout. The form validates name, TeleBirr phone, and delivery area; notes are optional.

### 4:00-5:15 - Query and state

Category selection is stored in the URL query string as `category`, so a filtered menu can be refreshed and shared. Search is local state because it is a view-level filter. Cart state is persisted through Zustand.

### 5:15-6:30 - Refactor

`src/hooks/useFetch.js` centralizes loading, error, abort, and unmount behavior. This keeps `Menu` focused on presentation and user interaction instead of repeating request lifecycle code.

### 6:30-7:30 - Accessibility and resilience

Checkout fields have labels, `aria-invalid`, `aria-describedby`, and alert messages. Blur controls when errors appear. Invalid submit focuses the first bad field. Submission disables the button to prevent double-send, and request failures preserve the entered values.

### 7:30-8:00 - Close

The next production step is to connect `VITE_ORDERS_API_URL` to a deployed orders service and verify the same flow against that deployed URL. The current frontend has a local fallback so the capstone journey remains demonstrable without a backend.

## Questions and Honest Answers

### Why is checkout protected?

The protected route prevents an unauthenticated user from entering the delivery flow and preserves the intended destination through the sign-in redirect.

### What happens when the menu request fails?

`useFetch` stores the error and `Menu` renders an explicit failure state instead of attempting to render missing dishes.

### What is still unfinished?

The workspace does not contain a deployed URL or a deployed orders backend. The frontend contract is ready, but deployment configuration and production API verification still need to be completed.