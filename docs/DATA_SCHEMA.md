# Bloomie MVP High-Level Data Schema

## Entities and Key Attributes
- **User**  
  - id (PK)  
  - email (nullable if social id only), display_name  
  - social_provider (Google, Apple), social_provider_id  
  - consent_status (granted | revoked), consent_updated_at  
  - created_at, deleted_at (null until account deletion)

- **DiagnosticQuestion**  
  - id (PK)  
  - text, order_index  
  - status (active/inactive) to allow future revisions without deletion

- **DiagnosticOption**  
  - id (PK)  
  - question_id (FK → DiagnosticQuestion)  
  - text, value_code (used by rule engine), order_index

- **DiagnosticResult**  
  - id (PK)  
  - user_id (FK → User, unique)  
  - skin_type, sensitivity_level, top_concern_1, top_concern_2  
  - explanation_text  
  - submitted_at

- **Recommendation**  
  - id (PK)  
  - user_id (FK → User)  
  - diagnostic_result_id (FK → DiagnosticResult)  
  - product_id (FK → Product)  
  - rationale_text  
  - generated_at

- **Product**  
  - id (PK)  
  - name, brand, category  
  - verified_flag (boolean)  
  - suitability_notes (for skin profile alignment)

- **Ingredient**  
  - id (PK)  
  - name, common_function

- **ProductIngredient**  
  - id (PK)  
  - product_id (FK → Product)  
  - ingredient_id (FK → Ingredient)  
  - concentration_note (optional)

- **Favorite**  
  - id (PK)  
  - user_id (FK → User)  
  - product_id (FK → Product)  
  - favorited_at

- **AnalyticsEvent**  
  - id (PK)  
  - user_id (FK → User)  
  - event_type (login | diagnostic_completed | product_viewed)  
  - event_context (JSON or key-value)  
  - occurred_at

## Relationships
- User 1—1 DiagnosticResult (latest result overwrites prior; see constraints).  
  - DiagnosticResult 1—N Recommendation.  
- User 1—N Recommendation (tied to a specific DiagnosticResult).  
- User 1—N Favorite; Product 1—N Favorite (many-to-many via Favorite).  
- Product 1—N Recommendation.  
- Product N—N Ingredient via ProductIngredient.  
- DiagnosticQuestion 1—N DiagnosticOption.  
- User 1—N AnalyticsEvent.

## Constraints Supporting Business Logic
- DiagnosticResult.user_id is unique to enforce “retake overwrites previous”; new submissions replace the existing row for that user.  
- Favorite has a unique constraint on (user_id, product_id) to prevent duplicates.  
- Recommendation references both product_id and diagnostic_result_id to ensure recs align with the latest diagnostic; regenerate and replace after retake.  
- Product.verified_flag must be true for inclusion in catalog and recommendations.  
- Consent gating: user records must have consent_status = granted before analytics events are recorded; updates to consent take effect immediately.  
- Account deletion sets deleted_at and cascades or anonymizes dependent data per policy; access is blocked afterward.  
- Analytics events should be idempotent per user action where applicable (e.g., avoid duplicate event_type for the same view in a short window).  
- DiagnosticOption value_code drives rule-based recommendation selection; keep options stable once active to preserve rule integrity.
