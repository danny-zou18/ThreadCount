# Design Decision: Authentication Strategy

**Status**: Needs Update
**Last Updated**: 2026-04-15

## Problem Statement

Seamless needs user authentication for account creation, login, and protecting routes. Users should be able to sign up with email/password and potentially OAuth providers later.

## Original Decision (Not Implemented)

Use Supabase Auth through the FastAPI backend. The frontend never talks to Supabase directly.

```
1. User enters credentials in frontend
2. Frontend sends POST to FastAPI /auth/login
3. FastAPI authenticates with Supabase Auth
4. FastAPI returns JWT access token + refresh token
5. Frontend stores tokens (httpOnly cookies preferred, localStorage fallback)
6. Frontend sends token in Authorization header on subsequent requests
7. FastAPI validates token on each request
```

## Actual Implementation

**The frontend talks to Supabase directly using the `@supabase/supabase-js` client.**

```
1. User enters credentials in frontend
2. Frontend uses Supabase client directly: supabase.auth.signInWithPassword() or signUp()
3. Supabase returns session with access token + refresh token
4. Frontend stores session in localStorage via Supabase SDK
5. Frontend includes Supabase token in requests to backend
6. Backend validates token via Supabase (or uses service role for admin operations)
```

## Rationale for Current Implementation

- **Simpler setup**: Direct Supabase SDK avoids backend auth endpoint development
- **Supabase handles token refresh**: SDK automatically refreshes tokens
- **OAuth is easier**: Google OAuth works out of the box with Supabase SDK

## Why Original Design Wasn't Followed

- Backend auth endpoints were never implemented
- Google OAuth was easier to implement with direct Supabase SDK

## Frontend Responsibilities

- Use Supabase client from `src/shared/api/supabase.ts`
- Store auth tokens via Supabase SDK (localStorage)
- Attach Supabase session token to backend API requests via shared HTTP client
- Redirect to login on 401 responses
- Protect routes with `ProtectedRoute` component
- Manage auth state in Zustand store (`src/features/auth/store.ts`)

## Implementation Notes

- Auth store: `src/features/auth/store.ts`
- API layer: `src/features/auth/api.ts`
- Protected route: `src/features/auth/components/ProtectedRoute.tsx`
- Supabase client: `src/shared/api/supabase.ts`
- Token refresh: Handled automatically by Supabase SDK

## Alternative: Restore Original Design

If the original design is preferred, the backend would need:
- `POST /auth/login` - proxy to Supabase
- `POST /auth/signup` - proxy to Supabase
- `POST /auth/refresh` - handle token refresh
- `POST /auth/logout` - handle logout

Frontend would remove direct Supabase client usage.
