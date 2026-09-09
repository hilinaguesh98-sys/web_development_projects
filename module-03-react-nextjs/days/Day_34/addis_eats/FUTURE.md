# Addis Eats Future Work

Updated: 2026-09-09

## Surfaced During Presentation and Review

- Add and verify a real deployed URL before the next presentation.
- Connect `VITE_ORDERS_API_URL` to a deployed orders service.
- Add a server-side order schema and authentication/authorization checks.
- Return a confirmation/reference number after a successful order.
- Show a dedicated success state or receipt instead of immediately returning to the menu.
- Add a retry control and stale-data strategy for failed menu loads.
- Add automated tests for the protected redirect and the complete checkout journey.
- Test keyboard-only navigation and screen-reader announcements on validation and request failure.
- Add an explicit empty-cart guard on the checkout route.
- Add observability for order failures without logging customer phone numbers or notes.

## Near-Term Priorities

1. Deploy the frontend and record the URL in `PRESENTATION.md`.
2. Deploy the orders API and set `VITE_ORDERS_API_URL` in the deployment environment.
3. Add end-to-end coverage for signed-out redirect, valid checkout, failed checkout, and double-submit prevention.

## Decisions to Revisit

- Whether search should move server-side when the menu grows.
- Whether cart persistence should expire or be tied to an authenticated account.
- Whether checkout should remain a modal-style route or become a full page for mobile delivery details.