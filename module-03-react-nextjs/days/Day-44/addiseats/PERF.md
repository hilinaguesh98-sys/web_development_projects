# Addis Eats Performance Notes

## Lighthouse comparison

Both measurements use Lighthouse 13.5.0 against the production build at `/`, using Chrome headless, mobile form factor, and simulated throttling. The baseline is the original single run captured before the image, font, and environment changes. The current result is the median of three repeat runs on the same browser and settings; lab scores and timings vary between runs.

| Metric | Before (single run) | After (median of 3 runs) | Change |
| --- | ---: | ---: | --- |
| Lighthouse performance score | 0.73 | 0.88 | +0.15 |
| Largest Contentful Paint | 10.23 s | 3.45 s (3.39–3.72 s across runs) | 6.78 s faster (66.3%) |
| Cumulative Layout Shift | 0.000 | 0.000 | No shift in either measurement |
| Interaction to Next Paint | Not reported | Not reported | Lighthouse navigation mode did not emit an INP audit for localhost |

INP needs an interaction-bearing Lighthouse timespan/user flow or real-user field data. A localhost navigation audit has no CrUX field sample and the generated JSON contains no `interaction-to-next-paint` audit, so an INP value is not available from these runs. It is intentionally not inferred from Total Blocking Time.

## What changed

- The 1.4 MB hero was a CSS background and was not discoverable as an image preload. It is now a static `next/image` with `priority`, `fetchPriority="high"`, a full-viewport `sizes` value, and intrinsic metadata from the imported asset. The explicit fetch priority makes the preload hint visible to Lighthouse; it is the only prioritized image. This is the main reason LCP improved.
- Dish cards, detail, cart, and order-history thumbnails now use `next/image`. Static imports provide their true source dimensions; order thumbnails carry those dimensions with the API object. Each surface declares sizes matching its rendered width, enabling responsive image selection and reserving image geometry.
- The layout uses `next/font` with Manrope, bundled at build time and served by the app. The baseline had no external font link and already measured CLS 0, so this change preserved the zero-shift result rather than reducing it further.
- The app source contains no third-party script tags, so there was no script to migrate to `next/script`. No external runtime script requests were added.
- `.env.example` lists the only application-specific variable, `AUTH_SECRET`, with a placeholder value. `.env*.local` is Git-ignored while `.env.example` remains trackable.

## Reproduce

Build and serve the production app, then run the same mobile simulated-throttling audit:

```powershell
npm run build
npm start -- --port 3002
npm exec --yes --package=lighthouse -- lighthouse http://localhost:3002/ --chrome-path="C:\Program Files\Google\Chrome\Application\chrome.exe" "--chrome-flags=--headless --no-sandbox" --throttling-method=simulate --form-factor=mobile --output=json --quiet --no-enable-error-reporting
```

The before value is the recorded original baseline; the after values are the median and range from three fresh JSON runs after the fetch-priority fix. Lighthouse scores and lab timings can vary between runs.
