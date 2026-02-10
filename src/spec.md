# Specification

## Summary
**Goal:** Refresh the app’s visual theme to an orange-forward palette on near-black backgrounds, with red used only as a secondary accent.

**Planned changes:**
- Update global Tailwind/CSS theme tokens in `frontend/src/index.css` so light and dark modes use a near-black background in `.dark`, with readable foreground contrast and clearly orange-forward primary tokens.
- Replace the existing green/forest accent token with a red accent token in both `:root` and `.dark`, and update any gradient/wordmark styling in `frontend/src/index.css` that references the accent so it no longer trends green.
- Audit and adjust page-level background/overlay utility classes across top-level marketing/app sections to preserve contrast and avoid muddy or low-contrast combinations, without changing any UI component files or introducing new copy.

**User-visible outcome:** The application displays an orange-on-dark look with optional red accents; primary CTAs and key highlights remain clearly readable across the landing and app pages in both light and dark modes.
