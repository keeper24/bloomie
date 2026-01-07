# Bloomie MVP Product Backlog

## Epic 1: Authentication & Consent
- **US1: Sign in with Google** (Must)  
  - User can initiate Google social login from the entry screen.  
  - Successful authentication lands the user on Home.  
  - Authentication is required before any other feature is accessible.  
  - Failed login shows an error without exposing sensitive details.
- **US2: Sign in with Apple** (Must)  
  - User can initiate Apple social login from the entry screen.  
  - Successful authentication lands the user on Home.  
  - Authentication is required before any other feature is accessible.  
  - Failed login shows an error without exposing sensitive details.
- **US3: Capture and manage consent** (Must)  
  - First-time login prompts the user for consent before reaching Home.  
  - Consent status is stored and respected across sessions.  
  - Users can view and update consent from Settings.  
  - Consent updates take effect immediately without re-login.

## Epic 2: Diagnostic Questionnaire
- **US4: Complete short diagnostic (5–7 questions)** (Must)  
  - Home provides a clear call to start the diagnostic.  
  - User answers 5–7 questions and can progress linearly.  
  - Submission is blocked until all required answers are provided.  
  - On submit, the system stores responses for result generation.
- **US5: View diagnostic results** (Must)  
  - Result screen displays skin type, sensitivity level, and up to two top concerns.  
  - An explanation references the provided answers.  
  - Results are available immediately after submission.  
  - Results persist for the logged-in user until overwritten.
- **US6: Retake diagnostic overwrites previous result** (Should)  
  - User can retake the diagnostic from Dashboard or Home.  
  - New submission replaces the prior diagnostic result with no history retained.  
  - Updated results flow through to recommendations and dashboard summary.  
  - User is notified that retaking will overwrite the previous result.

## Epic 3: Recommendations & Catalog
- **US7: View rule-based recommendations with rationale** (Must)  
  - Recommendations generate from the latest diagnostic result.  
  - Each recommendation includes a “why recommended” note tied to answers.  
  - Users can open product detail from the recommendation list.  
  - List refreshes after a new diagnostic submission.
- **US8: Browse verified product catalog** (Must)  
  - Catalog lists products marked with a verified badge.  
  - Users can access the catalog from Home or the Catalog tab.  
  - Products display key identifiers (name, brand, category) in list view.  
  - Access to product detail is available from any catalog listing.
- **US9: Product detail with suitability and ingredients** (Must)  
  - Detail view shows ingredients and suitability for the user’s skin profile.  
  - Verified badge appears on the detail page.  
  - Users can mark/unmark as favorite from the detail view.  
  - Product detail is reachable from recommendations and catalog.
- **US10: Apply catalog filters** (Should)  
  - Users can filter catalog by skin type, concern, and category.  
  - Filters can be combined and cleared.  
  - Results update to reflect active filters.  
  - Filters do not expose products outside the verified catalog.

## Epic 4: Favorites & Dashboard
- **US11: Favorite products** (Must)  
  - Users can favorite or unfavorite from recommendation and detail views.  
  - Favorite state persists for the logged-in user.  
  - Favorited items are reflected in the dashboard and catalog lists.  
  - Unfavoriting removes items from favorites immediately.
- **US12: Dashboard shows skin summary and favorites** (Must)  
  - Dashboard displays the latest skin type, sensitivity, and top concerns.  
  - Favorites section shows saved products with quick access to detail.  
  - Dashboard updates after diagnostic retake or favorite changes.  
  - Users can start or retake the diagnostic from the dashboard.

## Epic 5: Compliance & Analytics
- **US13: Delete account** (Must)  
  - Users can initiate account deletion from Settings with confirmation.  
  - Deletion removes user data and logs the user out.  
  - Post-deletion, login prompts creation of a new session.  
  - Deletion flow is available only to authenticated users.
- **US14: Basic analytics events** (Should)  
  - System records login, diagnostic completion, and product viewed events.  
  - Events fire once per user action and avoid duplicates on refresh.  
  - Analytics data does not block core user flows if unavailable.  
  - Tracking respects user consent status.
