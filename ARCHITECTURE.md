# Architecture

**Version**: 1.3.0
**Last Updated**: 2026-03-14

## Overview

Seamless is a full-stack fashion application in one repository.

- `frontend/`: React SPA for auth, onboarding, dashboard, wardrobe, and outfit building.
- `backend/`: FastAPI service for business logic and integrations.
- `supabase/`: database, auth, and storage configuration.

## System Shape

```text
React frontend <-> FastAPI backend <-> Supabase
                          |
                          -> fal.ai
```

## Frontend Structure

```text
frontend/src/
|- features/    # feature domains
|- shared/      # reusable ui and api utilities
|- routes/      # router definition
|- App.tsx      # app bootstrap
```

## Implemented Frontend Domains

### Auth

- Login and signup pages
- Session initialization
- Protected route guard

### Onboarding

- Protected onboarding page

### Dashboard

- Protected post-auth landing page

### Wardrobe

- Wardrobe browsing and management UI

### Outfit Builder

- Outfit composition flow

## Present But Not Fully Implemented In Routes

- `profile` has API code present but no active route.
- Placeholder route comments exist for outfits, previous looks, analysis, and profile.

## Frontend Dependency Rule

Within a feature domain:

```text
Types -> API -> Stores -> Components -> Pages
```

Constraints:

- Dependencies move forward only.
- Shared code belongs in `frontend/src/shared/`.
- Cross-feature reuse should happen through shared primitives or types, not direct page/component imports.

## Current Route Map

| Route | Status | Auth |
| --- | --- | --- |
| `/` | implemented redirect to `/login` | No |
| `/login` | implemented | No |
| `/signup` | implemented | No |
| `/onboarding` | implemented | Yes |
| `/dashboard` | implemented | Yes |
| `/wardrobe` | implemented | Yes |
| `/outfit-builder` | implemented | Yes |
| `*` | implemented redirect to `/login` | No |

## Planned Route Placeholders

Referenced in router comments only:

- `/outfits`
- `/previous-looks`
- `/analysis`
- `/profile`

These should stay documented as planned until page components and active route entries exist.

## Quality Constraints

- Frontend files should stay under 300 lines.
- Validate API responses with zod.
- Keep tests close to features and shared primitives.
- Desktop support starts at `1024px`; mobile-specific navigation/layout patterns are out of scope.
- `outfit-builder` uses a viewport-locked shell that must fit header, canvas, and controls within `100dvh`.

## References

- `docs/FRONTEND.md`
- `docs/design-docs/visual-style.md`
- `docs/features/`
