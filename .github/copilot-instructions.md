# Copilot Agent Instructions for edutech-portal-fe

## Project Overview

- This is a Next.js (TypeScript) monorepo for an education portal frontend.
- Chakra UI is used for UI components; React Query manages data fetching and caching.
- The codebase is modular, with feature folders under `src/components/`, API logic in `src/api/`, and utility functions in `src/lib/` and `src/utils/`.

## Key Architectural Patterns

- **Pages**: All routes are defined in `src/pages/`. Each file is a route; subfolders represent nested routes.
- **API Layer**: API queries/mutations are in `src/api/`, using React Query. Example: `payment.queries.ts` and `payment.mutations.ts`.
- **Feature Components**: Organized by domain (e.g., `payments/`, `dashboard/`, `bookstore/`). Each feature folder contains UI and logic for that domain.
- **State Management**: React Query is preferred for async state; local state uses React hooks. No Redux/MobX.
- **Styling**: Chakra UI theme is customized in `src/theme/`.
- **Type Definitions**: Shared types/interfaces are in `src/typings/index.d.ts`.

## Developer Workflows

- **Start Dev Server**: `pnpm dev` (or `yarn dev`, `npm run dev`)
- **Build for Production**: `pnpm build` (or `yarn build`, `npm run build`)
- **Static Export**: `pnpm export` outputs to `/out` for static hosting.
- **Environment Variables**: Copy `.env.sample` to `.env.local` and fill in required values.
- **Testing**: No test framework detected; add tests in `src/tests/` if needed.

## Project-Specific Conventions

- **Payment Flows**: Payment logic is split between UI modals (e.g., `confirm-payment-modal.tsx`, `make-sundry-payment-modal.tsx`) and API mutations. Use React Query for transaction state and Chakra Modal for dialogs.
- **Timers/Side Effects**: Use React hooks (`useEffect`, `useState`) for timers and cancellation logic (see `ConfirmPaymentModal`).
- **Navigation**: Use Next.js router (`useRouter`) for navigation and deep linking. Payment detail URLs are built with `buildPaymentDetailUrl`.
- **Error Handling**: Use Chakra `useToast` for user-facing errors. API errors should trigger toasts and invalidate queries as needed.
- **Data Fetching**: Always use React Query hooks for API calls; do not fetch directly in components.
- **Component Structure**: Prefer feature-based folders. Shared UI (e.g., modals, buttons) should be reusable and placed in common folders.

## Integration Points

- **Remita Payment**: Integrated via `useRemitaInline` in `src/components/common/remita-inline.tsx`.
- **External APIs**: All API calls are abstracted in `src/api/` and use Axios via `getApi()`.
- **Icons**: Use `react-icons` for iconography, e.g., `IoCheckmarkCircle`, `IoTime`.

## Example Patterns

- To add a new payment modal, follow the structure in `confirm-payment-modal.tsx` and `make-sundry-payment-modal.tsx`.
- For new API queries, add to `src/api/` and use React Query's `useQuery`/`useMutation`.
- For new types, extend `src/typings/index.d.ts`.

## References

- Main entry: `src/pages/index.tsx`
- Payment feature: `src/components/payments/`
- API logic: `src/api/`
- Shared types: `src/typings/index.d.ts`
- Chakra theme: `src/theme/`

---

If any conventions or workflows are unclear, please request clarification or examples from maintainers.
