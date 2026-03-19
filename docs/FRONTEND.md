# Frontend Guide

**Version**: 1.2.0
**Last Updated**: 2026-03-14

## Stack

| Tool | Purpose |
| --- | --- |
| React 19 | UI framework |
| TypeScript (strict) | Type safety |
| Vite 7 + SWC | Build and dev server |
| React Router v7 | Client routing |
| Tailwind CSS v4 | Styling |
| Zustand | Client state |
| zod | Runtime validation |
| Vitest + React Testing Library | Testing |

## Frontend Shape

- App shell starts in `frontend/src/App.tsx` and renders `AppRoutes`.
- Route config lives in `frontend/src/routes/index.tsx`.
- Shared primitives live in `frontend/src/shared/`.
- Domain code lives in `frontend/src/features/`.

## Implemented Feature Domains

- `auth`: login, signup, session bootstrap, protected routes.
- `onboarding`: protected onboarding flow.
- `dashboard`: protected landing area after auth.
- `wardrobe`: wardrobe management UI.
- `outfit-builder`: outfit composition UI.

## Present But Not Routed

- `profile/api.ts` exists, but profile pages are not currently wired into the router.

## Layer Rules

Within a feature, dependencies flow forward only:

```text
Types -> API -> Stores -> Components -> Pages
```

Rules:

- Prefer named exports.
- Keep files under 300 lines.
- Parse API responses with zod at the boundary.
- Shared UI belongs in `frontend/src/shared/ui/`.
- Do not import another feature's components directly; share types or shared primitives instead.

## Routing

### Implemented routes

| Route | Access | Source |
| --- | --- | --- |
| `/` | Redirects to `/login` | `frontend/src/routes/index.tsx` |
| `/login` | Public | `auth` |
| `/signup` | Public | `auth` |
| `/onboarding` | Protected | `onboarding` |
| `/dashboard` | Protected | `dashboard` |
| `/wardrobe` | Protected | `wardrobe` |
| `/outfit-builder` | Protected | `outfit-builder` |
| `*` | Redirects to `/login` | `frontend/src/routes/index.tsx` |

### Planned routes

These are referenced as placeholders in `frontend/src/routes/index.tsx` but are not implemented:

- `/outfits`
- `/previous-looks`
- `/analysis`
- `/profile`

## Auth Pattern

- Public routes render directly.
- Protected routes are wrapped by `ProtectedRoute`.
- Auth initialization runs once from `frontend/src/App.tsx` via `useAuthStore().initialize()`.

## API Pattern

- Use shared clients from `frontend/src/shared/api/`.
- Include the Supabase session token when calling backend endpoints that require auth.
- Return parsed, typed data from feature API modules.

## Styling Direction

- Follow `docs/design-docs/visual-style.md`.
- Current documentation direction is monochrome brutalist luxury inspired by Gentle Monster.
- Favor sharp borders, hard-edged panels, restrained color, and garment-first composition.
- Desktop-only support begins at `1024px`; do not add mobile drawers or hamburger navigation patterns.
- Use the shared viewport tokens in `frontend/src/styles/globals.css`: `--page-px`, `--header-h`, `--controls-h`, and `--canvas-h`.
- The outfit builder is a locked viewport shell. Keep body scroll disabled while active, keep the controls row fixed to `--controls-h`, and allow only internal side-panel scrolling.

## Testing

- Co-locate tests with the unit under test.
- Prefer behavior-focused assertions.
- Mock external APIs over component internals.

## References

- `ARCHITECTURE.md`
- `docs/design-docs/visual-style.md`
- `docs/QUALITY_SCORE.md`
