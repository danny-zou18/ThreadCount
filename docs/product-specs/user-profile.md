# Feature: Onboarding & User Profile

**Status**: Planned
**Priority**: P0
**Domain**: Profile (`src/features/profile/`)
**Last Updated**: 2026-02-12

## User Story

As a new user, I want to upload a full body photo of myself after signing up so the app can create an avatar for AI-generated try-on images. As a returning user, I want to manage my photos and profile.

## Acceptance Criteria

### Onboarding (first-time after signup)

- [ ] After signup, user is redirected to an onboarding screen
- [ ] User prompted to upload a full body photo of themselves
- [ ] Instructions shown (stand straight, neutral background, full body visible)
- [ ] Photo preview shown before confirming upload
- [ ] Photo sent to backend for avatar/model creation
- [ ] Success confirmation shown
- [ ] User proceeds to dashboard after completing onboarding
- [ ] Skip option available (can set up later from profile)

### Avatar Management (returning users)

- [ ] User can view their current avatar photo from their profile
- [ ] User can delete their photo and upload a new one to update their avatar
- [ ] Updating the avatar triggers a new model creation on the backend

### Profile Management

- [ ] User can view their profile information
- [ ] User can edit display name
- [ ] User can change password
- [ ] User can delete their account (with confirmation)

## Pages

| Route         | Component      | Description                                      |
| ------------- | -------------- | ------------------------------------------------ |
| `/onboarding` | OnboardingPage | Full body photo upload flow (shown after signup) |
| `/profile`    | ProfilePage    | Avatar photo, profile info, edit options         |

## Design References

- Backend endpoints: `GET /profile`, `PUT /profile`, `POST /profile/avatar`, `DELETE /profile/avatar`
- Avatar processing happens on backend (feeds into AI model for try-on)

## Out of Scope (for now)

- Multiple photos from different angles — future enhancement
- 3D avatar visualization on frontend — future enhancement
- Social profile (public/private) — future enhancement
