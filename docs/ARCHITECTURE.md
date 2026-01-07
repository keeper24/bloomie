# Bloomie MVP System Architecture (High-Level)

## Components
- Frontend: responsive web application (mobile-first) handling UI, navigation (Home, Catalog, Dashboard), diagnostic flow, recommendations, product detail, favorites, and settings.
- Backend API: REST services for authentication handoff, diagnostic submission and result generation, recommendation retrieval, product catalog, filters, favorites, dashboard data, consent, account deletion, analytics event capture, and optional email trigger post-diagnostic.
- Database: relational store for users, diagnostic questions/options, diagnostic results (one active per user), recommendations, products, ingredients, product-ingredient links, favorites, and analytics events.

## External Integrations
- Social login providers: Google, Apple for authentication.
- Analytics: records login, diagnostic completion, and product viewed events (consent-aware, idempotent per action where applicable).
- Email notification (optional): send post–diagnostic-completion notification; non-blocking to core flows.

## Data Flows
- Login: Frontend starts Google/Apple auth → provider returns token → Backend validates and creates/updates user → Consent prompt on first login → upon consent, session established and Home shown.
- Diagnostic submission: Frontend collects 5–7 answers → submits to Backend → Backend stores responses, derives skin type, sensitivity, top concerns, explanation → stores/overwrites user’s DiagnosticResult (one active) → optionally triggers email notification → exposes results to Frontend.
- Recommendations generation: Backend rule engine uses latest DiagnosticResult and product data (verified-only) to create Recommendations with rationale → Frontend retrieves list and links to product detail.
- Product browsing: Frontend requests catalog and optional filters (skin type, concern, category) → Backend returns verified products with list metadata → Frontend opens Product detail with ingredients, suitability, verified badge.
- Favorites: Frontend toggles favorite in recommendation or product detail → Backend upserts Favorite (unique per user/product) → Dashboard and lists reflect updated state.

## Security and Privacy Notes
- Consent gating: Analytics and optional email respect consent_status; consent updates take effect immediately; access requires authenticated session.
- Account deletion: Initiated from Settings with confirmation; Backend marks user deleted and blocks further access; dependent data removed or anonymized per policy; session terminated post-deletion.
- Data minimization: Only verified catalog exposed; diagnostic overwrite avoids retaining historical results by design.

## Mermaid Diagram
```mermaid
flowchart TD
    subgraph FE[Frontend (Web App)]
        UIHome[Home / Dashboard / Catalog]
        UIDiag[Diagnostic Q&A]
        UIRec[Recommendations & Favorites]
        UISettings[Settings (Consent, Delete Account)]
    end

    subgraph BE[Backend API (REST)]
        Auth[Auth & Session]
        Diag[Diagnostic Engine]
        Rec[Rule-based Recommendations]
        Catalog[Catalog & Filters]
        Fav[Favorites]
        Consent[Consent Mgmt]
        Delete[Account Deletion]
        Analytics[Analytics Events]
        Email[Email Notification (optional)]
    end

    subgraph DB[(Relational Database)]
        Users[User]
        Qs[DiagnosticQuestion/Option]
        Result[DiagnosticResult (unique per user)]
        Recs[Recommendation]
        Products[Product + Ingredient links]
        Favs[Favorite (user, product unique)]
        Events[AnalyticsEvent]
    end

    FE -->|Social login start| Auth
    Auth -->|Token exchange| Social[Social Login Providers (Google/Apple)]
    Auth --> Users
    FE -->|Submit answers| Diag
    Diag --> Result
    Diag --> Email
    FE -->|Fetch results| Diag
    Rec --> Result
    Rec --> Products
    FE -->|Get recommendations| Rec
    FE -->|Browse/Filter| Catalog
    Catalog --> Products
    FE -->|View detail| Products
    FE -->|Favorite toggle| Fav
    Fav --> Favs
    FE -->|Consent update| Consent
    Consent --> Users
    FE -->|Delete account| Delete
    Delete --> Users
    FE -->|Event capture| Analytics
    Analytics --> Events
```
