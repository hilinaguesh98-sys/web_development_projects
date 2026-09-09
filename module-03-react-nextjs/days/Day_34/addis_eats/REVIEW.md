# Peer Review: Addis Eats

## Three Strengths

1. **The primary journey is easy to discover.** A user can move from the menu to category filtering, search, cart quantity controls, and checkout without learning a new interaction model.
2. **The checkout protects user input well.** Required fields show clear messages after interaction, the first invalid field receives focus, and a failed request does not erase the customer’s values.
3. **The request lifecycle is thoughtfully refactored.** `useFetch` owns loading, abort, unmount, and error handling, which keeps menu rendering readable and avoids setting state after an abandoned request.

## Three Questions Worth Answering

1. **What is the production order boundary?** The frontend currently has a local fallback when `VITE_ORDERS_API_URL` is absent. How will the deployed build guarantee that a real order is persisted rather than only acknowledged locally?
2. **What does the customer see after a successful order?** Returning to the menu is functional, but a confirmation reference, receipt, or visible success state would make the completion of the transaction clearer.
3. **How will menu freshness and failure recovery work in production?** The menu has an error state, but there is no visible retry action or stale-data policy. What is the intended recovery experience when the menu service is temporarily unavailable?

## Review Method

I reviewed the application flow before reading implementation details: menu load, category query, search, cart, protected checkout redirect, empty-form validation, and successful checkout. The code comments above are based on that user journey and then traced to the relevant implementation.