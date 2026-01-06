# Bloomie MVP Spec (Single Source of Truth)

## App overview
- Name: Bloomie
- Type: Responsive web application (mobile first)
- Access: Login required for all access
- Login: Social login only (Google, Apple)
- Purpose: Skin diagnostic + verified K-beauty recommendations
- Exclusions: No payments, no subscriptions, no bookings, no AI scan, no community, no influencer features

## MVP scope (MoSCoW)
### Must have
- Social login (Google, Apple)
- Short diagnostic questionnaire (5–7 questions)
- Result: skin type + concerns + explanation text
- Rule based recommendations with "why recommended"
- Verified product catalog
- Product detail: ingredients, suitability, verified badge
- Favorites
- Dashboard: skin summary + favorites
- Settings: consent and account deletion

### Should have
- Catalog filters (skin type, concern, category)
- Basic analytics events (login, diagnostic completed, product viewed)

### Could have
- Simple routine suggestion (AM / PM)
- Email notification after diagnostic completion

### Won't have
- Payments and subscriptions
- Booking services
- AI skin scanning
- Community or influencer features

## Navigation structure
### Tabs (post login)
- Home
- Catalog
- Dashboard

### Key flows
1) Entry
App launch -> Social Login -> Consent (first time only) -> Home

2) Main flow
Home -> Start Diagnostic -> Questions 1..7 -> Submit -> Results
Results -> View Recommendations -> Recommendation list -> Product detail -> Favorite -> Dashboard

3) Catalog flow
Home or Catalog -> Catalog list -> Filters (optional) -> Product detail -> Favorite

4) Return user
Login -> Home -> Dashboard -> Retake diagnostic (optional) -> Results overwrite previous

5) Compliance
Dashboard -> Settings -> Manage consent
Dashboard -> Settings -> Delete account -> Confirmation -> Logout

## Diagnostic logic
- 5–7 questions total
- Output:
  - Skin type
  - Sensitivity level
  - Top concerns (up to 2)
  - Explanation text referencing answers
- Retake diagnostic overwrites previous result (no history in MVP)

## Data entities (MVP)
- User
- DiagnosticQuestion
- DiagnosticOption
- DiagnosticResult
- Recommendation
- Product
- Ingredient
- ProductIngredient
- Favorite

## Integrations and architecture
- Frontend: responsive web app
- Backend: REST API
- Database: relational
- External services: social login provider, analytics, optional email notifications
