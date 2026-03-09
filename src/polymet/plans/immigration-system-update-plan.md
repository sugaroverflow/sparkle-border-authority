# Immigration System Update Plan

## User Request
Update the Immigration Kiosk application to match the technical implementation guide with proper decision engine, privilege assignment, secondary screening, and complete application flow.

## Related Files
- @/polymet/data/immigration-data (to update) - Add guest records, privileges, decision logic
- @/polymet/pages/welcome (to update) - Add statistics ticker
- @/polymet/pages/code-entry (to create) - New immigration code entry screen
- @/polymet/pages/identity-confirmation (to create) - New identity confirmation screen
- @/polymet/pages/purpose-of-visit (to create) - New purpose selection screen (replaces declaration-form)
- @/polymet/pages/declarations (to create) - New declarations screen
- @/polymet/pages/processing (to create) - New animated processing screen
- @/polymet/pages/decision (to create) - New decision screen with approval/rejection
- @/polymet/pages/print-preview (to create) - New A6 visa print preview
- @/polymet/pages/print-success (to create) - New print success instructions
- @/polymet/pages/admin-panel (to create) - New hidden admin panel
- @/polymet/components/statistics-ticker (to create) - Animated stats component
- @/polymet/components/visa-card (to create) - A6 visa layout component
- @/polymet/prototypes/immigration-kiosk (to update) - Update routes for new flow

## TODO List
- [x] Update immigration-data with guest records, privileges, decision engine
- [x] Create statistics-ticker component
- [x] Create visa-card component for A6 printing
- [x] Update welcome page with statistics ticker
- [x] Create code-entry page
- [x] Create identity-confirmation page
- [x] Create purpose-of-visit page
- [x] Create declarations page
- [x] Create processing page with animated messages
- [x] Create decision page (approval/rejection)
- [x] Create print-preview page with A6 layout
- [x] Create print-success page
- [x] Create secondary-screening page (5-10% random)
- [x] Create admin-panel page
- [x] Update prototype with new routes

## Important Notes
- Decision engine: 1-2 purposes required, ≥1 declaration required
- Automatic rejection: "Nothing to Declare" or invalid combinations
- Secondary screening: 5-10% random chance
- Privilege assignment: weighted by guest status (Visitor/VIP/Diplomat/Special Envoy)
- A6 printing format with CSS @page settings
- Guest records stored in JSON with 4-character codes
- Flow: Welcome → Code Entry → Identity → Purpose → Declarations → Processing → Decision → Print Preview → Print Success

  
## Plan Information
*This plan is created when the project is at iteration 1, and date 2026-03-09T22:14:06.673Z*
