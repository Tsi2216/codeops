# Performance and accessibility verification

## Environment

- Framework: React 19 + Vite
- Build command: `npm run build`
- Preview command: `npm run preview`
- Measurement status: **Not measured on a deployed URL yet.** Do not report invented Lighthouse scores.

## Run the checks

1. Install dependencies with `npm ci`.
2. Run `npm run build` and record whether the production build succeeds.
3. Deploy the build, then open the exact public URL in Chrome.
4. Open DevTools → Lighthouse, select Mobile, and run Performance and Accessibility.
5. Repeat once on Desktop if time allows.
6. Test the main flow on a real phone: menu → dish detail → add to basket → adjust quantity → checkout → place order → confirm it appears in order history.
7. Test keyboard navigation, visible focus, form labels, image alternative text, empty basket, empty search results, and narrow viewport layout.

## Results to fill from the real deployed build

| Metric | Mobile result | Desktop result |
|---|---:|---:|
| Performance score | Not measured | Not measured |
| Accessibility score | Not measured | Not measured |
| Best Practices score | Not measured | Not measured |
| SEO score | Not measured | Not measured |
| Largest Contentful Paint (LCP) | Not measured | Not measured |
| Cumulative Layout Shift (CLS) | Not measured | Not measured |
| Total Blocking Time (TBT) | Not measured | Not measured |

## Known performance considerations

- Menu photos are remote Unsplash images; image availability and load time depend on the network.
- Google Fonts are imported from an external stylesheet in `src/index.css`; fallback fonts are present.
- This is a small client-rendered SPA and currently has no API/data-fetching layer.
- Test production output, not only the Vite development server. Save screenshots or export the Lighthouse report as evidence.
