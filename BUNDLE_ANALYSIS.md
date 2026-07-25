# Bundle Analysis

Last updated: 2026-07-25

## Current State

The main entry chunk (`index-*.js`) is ~625 KB (176 KB gzipped). This contains:
- Clerk authentication SDK (~200+ KB)
- React + React DOM
- TanStack Router core + Start framework
- Shared UI components (Navbar, Footer, etc.)
- All eagerly-loaded page components (landing, sign-in, sign-up, about, etc.)

## Code Splitting (Implemented 2026-07-25)

These heavy pages are now lazy-loaded via `React.lazy()` + `Suspense`:

| Route              | Lazy Chunk Size | Gzipped |
|--------------------|----------------|---------|
| /analytics         | 24.70 KB       | 5.66 KB |
| /employers         | 23.95 KB       | 5.55 KB |
| /employers/$slug   | 26.13 KB       | 5.68 KB |
| /dashboard         | 25.50 KB       | 5.65 KB |
| /careers           | 17.34 KB       | 5.07 KB |
| /onboarding        | 12.85 KB       | 3.72 KB |
| /matches           | 11.89 KB       | 3.18 KB |

The route stubs themselves are now ~0.45-0.50 KB each.

## Remaining Work

The main 625 KB chunk is dominated by Clerk. Options to reduce further:
1. **Dynamic Clerk import**: Lazy-load Clerk on pages that need auth (not on landing page). This is the single biggest win.
2. **Manual chunk splitting**: Use `build.rollupOptions.output.manualChunks` to separate Clerk, React, and router into their own cacheable chunks.
3. **Route-based chunking**: Move shared page chrome (Navbar, Footer) into a shared chunk loaded on demand.

## How to Analyze

```bash
cd /home/team/shared/site
bun run build 2>&1 | grep -E "dist/client/assets"
```
