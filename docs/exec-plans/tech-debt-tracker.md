# Tech Debt Tracker

**Last Updated**: 2026-04-13

## Active Debt

| Item                    | Domain  | Priority | Notes                                                   |
| ----------------------- | ------- | -------- | ------------------------------------------------------- |
| No backend tests        | Backend | P1       | FastAPI endpoints lack unit tests and integration tests |
| No pre-commit hooks     | All     | P1       | Add pre-commit hooks for linting and type checking      |

## Anticipated Debt

| Item                              | Domain   | Priority | Notes                                                                              |
| --------------------------------- | -------- | -------- | ---------------------------------------------------------------------------------- |
| Mock API responses                | All      | P1       | Backend not ready yet. Replace mocks with real FastAPI calls when available        |
| Image processing client-side only | Wardrobe | P2       | Consider moving heavy processing to backend if it causes mobile performance issues |
| No E2E tests                      | All      | P2       | Add Playwright or Cypress for critical user journeys once core features stable     |
| No CI pipeline                    | All      | P1       | Set up GitHub Actions for lint + test + build                                      |

## Resolved Debt

None yet.
