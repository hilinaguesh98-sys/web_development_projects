# Live Data Query Notes

This app uses SWR. It does not have a `staleTime` option; freshness is controlled with revalidation and request deduplication instead.

| Query | Key | Refresh / freshness rule | Why |
| --- | --- | --- | --- |
| Order status | `/api/orders/${id}` | Server-rendered order is supplied as `fallbackData`. Poll every 5 seconds, do not revalidate on focus, and deduplicate requests for 1 second. | The server result paints immediately; a five-second interval is frequent enough for order progress without unnecessary requests. |
| Menu search | `['/api/dishes', search, category, sort, page]` | Key is `null` while the debounced search is empty. For searches, retain prior data between keys, revalidate on key change, disable focus revalidation, and deduplicate identical requests for 2 seconds. | No request is useful for an empty term because the server-seeded menu already supports local filtering and paging. Previous results remain visible while a new search is in flight. |
| Menu without a search | No SWR query (`null` key) | Uses server-rendered dish data; category, sort, and page updates are local. The page number is kept in the `page` query-string parameter. | The dish list is a small static dataset, so another network request would add latency without improving freshness. |

Menu search keys include every value that changes the response: term, category, sort order, and page. The order key includes the order ID so cached responses cannot be mixed between orders. Menu pages contain six dishes. `dedupingInterval` is a request-coalescing window, not a `staleTime`; the order poll interval is the explicit freshness target.