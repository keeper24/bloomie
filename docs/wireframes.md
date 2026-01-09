Bloomie – Mobile-First Low-Fidelity Wireframes (Grayscale)
===========================================================

Principles
----------
- Mobile-first (iPhone 14 reference ~390×844), responsive web.
- Grayscale only; no imagery; focus on structure, hierarchy, spacing.
- Large tap targets; calm, uncluttered layouts; clear next steps everywhere.
- Login required before content; bottom nav visible after login.
- Tabs: Home, Catalog, Dashboard (3 equal segments, icon+label placeholders).

Global Layout & Patterns
------------------------
- Top area for title/back where needed; scrollable main content; safe-area padding.
- Cards and full-width buttons for primaries; outline/ghost for secondary.
- Bottom nav: hidden on Splash/Login; shown on all post-login screens (can stay on deep screens for consistency).
- Back affordance (text/icon) on non-tab screens (Diagnostic, Result, Detail, Settings).
- Progress: segmented or filled bar under title for Diagnostic steps.
- States: primary buttons disabled until valid (e.g., Diagnostic Next); Saved state for favorites.

Navigation & Flow Overview
--------------------------
- Entry: Splash/Login → Home (after auth).
- Home:
  - Start Skin Diagnostic → Diagnostic Steps (1→7) → Result → View My Recommendations → Product Detail.
  - View Recommendations → Recommendations → Product Detail.
  - Browse Verified Products → Catalog → Product Detail.
- Dashboard:
  - Retake Diagnostic → Diagnostic Steps → Result.
  - Favorites → Product Detail.
- Settings/Compliance reachable from Login links, Home trust link, Dashboard gear/row; Logout → Splash/Login.

Screen 1 — Splash / Login
-------------------------
- Top spacing; centered stack.
- App name text: “Bloomie”.
- Value prop (1 sentence) under name.
- Login buttons (stack):
  - [ Google Login ] (full width, tall)
  - [ Apple Login ] (full width, tall)
- Consent line at bottom: “By continuing, you agree to our [Privacy Policy] and [Terms].”
- Optional “Manage consent” text link.
- Transition: successful login → Home; policy links → Settings/Compliance.

Screen 2 — Home (Tab: Home)
---------------------------
- Top bar: left “Bloomie” label; right avatar placeholder (taps to Dashboard).
- Greeting: “Welcome back” (+ optional subtext).
- Primary CTA card (largest):
  - Title: “Start Skin Diagnostic”
  - Subtext: “Answer 7 quick questions about your skin.”
  - Chevron or “Start” text; full-card tap → Diagnostic Step 1.
- Secondary cards (stacked):
  - “View Recommendations” → Recommendations.
  - “Browse Verified Products” → Catalog.
- Trust message near bottom: “All products verified by Bloomie.” + small “Learn how we verify” link → Settings/Compliance.
- Bottom nav: Home selected.

Screen 3 — Skin Diagnostic (Question Flow, 1 per screen)
--------------------------------------------------------
- Top bar: back text/icon; title “Skin Diagnostic”.
- Progress: “Step X of 7” text + horizontal progress bar (7 segments or fill).
- Question text (large).
- Answer options: vertical stack of full-width buttons; radio behavior; selected state dark border/fill.
- Bottom action: full-width “Next” (disabled until selection). On last step label becomes “See My Results”.
- Optional helper text above button: “You can change this later.”
- Back: previous step; from step 1 → Home (or originating screen).

Screen 4 — Diagnostic Result
----------------------------
- Top bar: back; title “Your Skin Result”.
- Skin type headline (e.g., “Combination Skin”) + short subtext.
- Key concerns: label + 2–3 bullet points.
- Explanation: short paragraph (3–5 lines), non-technical.
- Primary CTA: full-width “View My Recommendations” → Recommendations.
- Secondary CTA: outline/text “Retake Diagnostic” → Diagnostic Step 1 (direct restart or confirm).
- Note: “You can retake this anytime from your Dashboard.”

Screen 5 — Recommendations
--------------------------
- Top bar: back; title “Recommendations”.
- Context line: “Based on your [Skin Type] and concerns.” + “View diagnostic” link → Result.
- List of product cards (scroll):
  - Name (bold), Type (smaller)
  - Small “Verified” label (top-right)
  - Optional one-line note
  - Bottom/right button: “View Details” (card also tappable)
- Bottom nav visible.
- Tap card/button → Product Detail.

Screen 6 — Product Detail
-------------------------
- Top bar: back; title “Product Details” (or truncated name).
- Summary: Product name (large); Type line; small “Verified” label.
- Short description block (3–6 lines).
- Ingredients section (collapsed by default):
  - Row: “Ingredients” + chevron; tap to expand to list/paragraph.
- Suitability section:
  - Title: “Why this works for you”
  - Short paragraph linking to skin type/concerns.
- Primary CTA near bottom: full-width “Save to Favorites”; after tap → state “Saved”.
- Bottom nav visible.

Screen 7 — Catalog (Tab: Catalog)
---------------------------------
- Top bar: title “Catalog”.
- Filters area:
  - Pills/rows: “Skin Type: [Any]”, “Concern: [Any]” with chevrons; tap → simple sheet/list placeholder.
- Product list (single-column for clarity):
  - Same card pattern as Recommendations (Name, Type, Verified, optional line, “View Details”).
- Scrollable; bottom nav with Catalog selected.
- Tap card/button → Product Detail.

Screen 8 — Dashboard (Tab: Dashboard)
-------------------------------------
- Top bar: title “Dashboard”; gear/row to Settings.
- Card: “My Skin Profile”
  - Line: “Skin Type: [X]”
  - Bullets: up to 3 concerns
  - Link: “View full result” → Diagnostic Result.
- Favorites:
  - Title “Favorite Products”
  - Empty state text if none; otherwise 2–4 compact rows (Name, Type, chevron) → Product Detail; optional “See all”.
- Actions:
  - Full-width button: “Retake Diagnostic” → Diagnostic Step 1.
  - Secondary row/button: “Manage Settings” → Settings/Compliance.
- Bottom nav: Dashboard selected.

Screen 9 — Settings / Compliance
--------------------------------
- Top bar: back; title “Settings”.
- Consent/Privacy section (rows with chevrons):
  - “Manage Consent” (note: review analytics/communications).
  - “Privacy Policy” (static page).
  - “How Bloomie verifies products” (tap to simple explanation page/overlay).
- Account section:
  - “Delete Account” (destructive; confirm dialog).
  - “Logout” (confirm; then → Splash/Login and clear session).
- Large tap targets, spaced list.

Bottom Navigation Summary
-------------------------
- Hidden on Splash/Login; visible post-login.
- Tabs: Home | Catalog | Dashboard; each icon+label placeholder; selected tab darker.
- For simplicity, keep nav visible even in deep screens post-login (Diagnostic, Detail, Settings); back still controls flow.

Key Interaction States
----------------------
- Diagnostic Next disabled until an option is chosen.
- Progress bar updates each step; final step button label changes to “See My Results”.
- Favorites button toggles to “Saved” after tap.
- Collapsible Ingredients default collapsed to reduce cognitive load.
- Logout/Delete gated by confirmation prompt (modal/sheet placeholder).

MVP Notes
---------
- No payments, no AI scanning, no social features.
- Textual trust elements only; “Verified” label consistently applied to products.
- Keep copy concise; avoid technical jargon; prioritize next-step clarity on each screen.
