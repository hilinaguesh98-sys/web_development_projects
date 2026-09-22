# Addis Eats Rendering Strategy

| Route | Strategy | Why |
| --- | --- | --- |
| `/` | Static | The landing page contains stable marketing content and does not depend on a request. |
| `/menu` | ISR with `revalidate = 60` | The menu has no request-specific reads, so Next.js can cache it and refresh it periodically while its dish list streams behind `Suspense`. |
| `/menu/[id]` | Static generation | `generateStaticParams` creates one page for each known dish at build time. |
| `/cart` | Static | The cart screen is a stable shell with no request-specific read. |
| `/checkout` | Dynamic | It reads request-specific `searchParams` for the active checkout step, so it must render per request. |
| Not found | Static boundary | `notFound()` handles unknown dish IDs with a shared fallback screen. |

## Build Evidence

The production build generated 14 static pages, including 8 dish pages from `generateStaticParams`. The menu route is marked static with a 60-second revalidation window, while checkout is dynamic. The menu layout remains mounted while navigating from the catalogue to a dish.