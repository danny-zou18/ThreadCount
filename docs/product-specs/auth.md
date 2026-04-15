# Feature: User Authentication

**Status**: Completed
**Priority**: P0
**Domain**: Auth (`src/features/auth/`)
**Last Updated**: 2026-04-15

## User Story

As a new user, I want to create an account and log in so that I can access my virtual wardrobe and save my outfits.

## Acceptance Criteria

### Signup

- [x] User can create account with email and password
- [x] User can sign up with Google OAuth
- [x] Email validation (valid format required)
- [x] Password requirements enforced (minimum 6 characters)
- [x] Error messages shown for validation failures
- [x] After signup, user is redirected to the onboarding flow (see user-profile.md)

### Login

- [x] User can log in with email and password
- [x] User can log in with Google OAuth
- [x] Error message shown for invalid credentials
- [x] Redirect to onboarding (or originally requested page) after successful login

### Session Management

- [x] Auth token stored securely (via Supabase session)
- [x] Token automatically refreshed by Supabase SDK before expiry
- [x] User redirected to login on session expiry
- [x] Logout clears all stored tokens and state

### Protected Routes

- [x] Unauthenticated users redirected to /login
- [x] After login, user returns to originally requested page

## Pages

| Route     | Component  | Description                           |
| --------- | ---------- | ------------------------------------- |
| `/login`  | LoginPage  | Email + password form, link to signup, Google OAuth |
| `/signup` | SignupPage | Email + password form, link to login, Google OAuth |

## Design References

- **Actual Implementation**: Frontend uses Supabase JS client directly (`@supabase/supabase-js`)
- See `docs/design-docs/auth-strategy.md` for original design intent
- Backend does not have auth endpoints; Supabase handles auth directly

## Out of Scope (for now)

- Multi-factor authentication — future enhancement
- Password reset via email — next iteration
- Email verification — next iteration
- "Remember me" option — next iteration
