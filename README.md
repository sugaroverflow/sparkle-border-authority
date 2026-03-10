# Sparkle Border Authority

A self-service **Immigration Kiosk** web app for the **Ration Club Border Control** event. Guests enter a 4-character immigration code, confirm identity, state purpose of visit and declarations, then receive an approval decision and an A6-format visa to print. The UI uses a sci-fi spaceport terminal look with celestial accents, built for iPad kiosk mode.

**Created with**: [Polymet AI](https://polymet.ai)

---

## Project overview

- **Guest list**: Source of truth is `data/guests.json`. Each guest has a unique 4-character `code` (e.g. `7A8X`), `name`, `agentCode`, `status`, `passportType`, `visaClass`, `basePrivileges`, and `printed` / `arrived` flags. `public/guests.json` is generated from this file in `predev`/`prebuild`.
- **Guest photos**: Optional headshots per guest. Put images in `public/guests/` named by code (e.g. `7A8X.jpg`) and set each guest’s `photo` in `data/guests.json` to `"/guests/7A8X.jpg"`. See `public/guests/README.example.md` for details. If `photo` is missing or invalid, the app uses a generated avatar.
- **Visa taglines**: Random one-liners for approved visas come from `public/visa-taglines.json`.
- **Decision engine**: Validates 1–2 purposes of visit and ≥1 declaration; can trigger secondary screening (random ~7.5%); assigns privileges from guest record plus optional extras from a pool.
- **Printing**: A6 visa card with CSS `@page`; print preview then success/instructions.

---

## Application flow

| Step | Route | Description |
|------|--------|-------------|
| 1 | `/` | **Welcome** – entry point, stats ticker, “Enter immigration code” leads to code entry |
| 2 | `/code-entry` | **Code entry** – guest enters 4-character code; invalid → border assistance |
| 3 | `/identity-confirmation` | **Identity confirmation** – shows guest name/agent code/passport type; confirm to continue |
| 4 | `/purpose-of-visit` | **Purpose of visit** – select 1–2 purposes (e.g. Cake Acquisition, Diplomacy, Dancefloor Transit) |
| 5 | `/declarations` | **Declarations** – select at least one (e.g. Sparkles, Snacks, Excellent Vibes); “Nothing to Declare” is rejected |
| 6 | *(optional)* | **Secondary screening** – random chance; extra question before decision |
| 7 | `/processing` | **Processing** – short animated “border authority” processing |
| 8 | `/decision` | **Decision** – Approved (visa number, privileges) or Rejected (reason + retry caption) |
| 9 | `/print-preview` | **Print preview** – A6 visa card layout for printing |
| 10 | `/print-success` | **Print success** – instructions after print |

**Alternative paths**

- **Border checkpoint** (`/border-checkpoint`) – for guests without a code or who need in-person verification.
- **Admin** (`/admin`) – hidden admin panel for live metrics.
- **Statistics dashboard** (`/statistics-dashboard`) – dashboard view of stats.

---

## Passport and document types

**Passport type** (per guest in `data/guests.json`)

- **`fancy`** – Citizen / VIP / Special Envoy style (full “Ration Club” citizen look).
- **`visitor`** – Visitor style (Visitor Admission Permit).

**Visa classes** (assigned per guest or by flow)

- Citizen Entry Visa
- Diplomatic Entry Visa
- Visitor Admission Permit
- Sparkle Transit Waiver
- Temporary Celebration Authorization

**Document types** (for badges/issuance UI)

| Type | Label |
|------|--------|
| `citizen-passport` | Citizen Passport |
| `border-passport` | Border-Issued Passport |
| `visitor-passcard` | Visitor Passcard |
| `photo-permit` | Photo Booth Permit |

---

## Guest statuses and privileges

**Guest status** (in `data/guests.json`): `Citizen` | `Visitor` | `VIP` | `Diplomat` | `Special Envoy`

Privileges are stored in each guest’s `basePrivileges` and can be extended by the decision engine (e.g. Glitter Transit Waiver, Galactic Trade Authorization). Examples used in data: Standard Sparkle Protocol, Lounge Access, Sparkle Clearance II/III, Cake Priority Queue, Polaroid Access, Trusted Agent, Hug Privilege.

- **Citizens**: typically 1–2 base privileges, 240 min validity.
- **VIP / Special Envoy**: more privileges, 300 min validity.

---

## Notes

- Legacy Polymet plan/example artifacts were removed to simplify maintenance.
- The active implementation lives in:
  - `src/polymet/prototypes/immigration-kiosk.tsx`
  - `src/polymet/pages/*` (current routed screens)
  - `src/polymet/components/*` (currently used UI building blocks)
  - `src/polymet/data/immigration-data.tsx`

---

## Tech stack

- **Vite** – build and dev server
- **TypeScript** – types
- **React** + **React Router** – UI and routing
- **Tailwind CSS** – styling
- **shadcn-ui** – components
- **Recharts** – charts (e.g. admin/dashboard)
- **Zod** – validation where used

---

## Getting started

```sh
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
npm i
npm run dev
```

| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start dev server with hot reload |
| **Build** | `npm run build` | Production build |
| **Preview** | `npm run preview` | Serve production build locally |
| **Type check** | `npm run type-check` | TypeScript check |
| **Lint** | `npm run lint` | Lint |
| **Lint fix** | `npm run lint:fix` | Auto-fix lint |
| **Format** | `npm run format` | Prettier format |

---

## Kiosk operator runbook

### 1) Before guests arrive (2-3 minutes)

1. Start app: `npm run dev` (or open deployed URL).
2. Open on iPad Safari and verify:
   - Welcome screen loads.
   - Code entry accepts 4 chars.
   - Print preview opens and printer is reachable.
3. Confirm printer setup:
   - A6 adhesive sheet
   - Portrait orientation
   - No margins
4. Enable iPad kiosk behavior:
   - Add to Home Screen
   - Guided Access ON
   - Notifications/app switching OFF
   - Auto-lock = Never

### 2) Normal guest flow

1. Guest enters 4-char code.
2. Guest confirms identity (name + agent code).
3. Guest submits purpose/declarations.
4. If approved:
   - Print visa
   - Guest sees success instructions
   - Use "Proceed to checkpoint" for border verification
5. Border checkpoint scans and marks guest as arrived.

### 3) If guest has issues

- **Invalid code or rejection**: use "Proceed to border for assistance" (SSSS path).
- **Needs staff exception**:
  - Open `/admin` (PIN currently `1234`)
  - Use guest lookup
  - Use "Override + Print" to force approval and print
- **Walk-in / no registry entry**:
  - Admin -> Print Manual Visa
  - Enter name + agent code
  - Print and direct to checkpoint

### 4) Printer fallback

If printer fails:

1. Retry from Print Preview once.
2. If still failing, use manual fallback:
   - Pre-printed blank visa
   - Fill by hand
   - Send to border agent for stamp/checkpoint
3. Keep line moving; complete digital print later if needed.

### 5) During event monitoring

- Use `/admin` and `/statistics-dashboard` for live status.
- `printed`/`arrived` flags and stats persist in browser localStorage.
- App auto-resets on idle timeout and success timer, so station is ready for next guest.

### 6) Quick recovery checklist

- App frozen? Refresh once.
- Wrong guest state? Reprint from admin.
- Guest marked wrong? Re-open admin and verify code before overriding.
- Full outage? Switch to paper fallback + stamp control, continue intake.

---

## Deploy

- **Polymet AI** – use the project dashboard deployment.
- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: `npm run build`, then upload the `dist` folder to [netlify.com/drop](https://netlify.com/drop)

---

## Library versions

| Library | Version | Purpose |
|---------|---------|---------|
| React | 18.3.1 | UI |
| Vite | 6.2.0 | Build & dev server |
| TypeScript | 5.7.2 | Type safety |
| Tailwind CSS | 3.4.17 | Styling |
| React Router DOM | 6.26.2 | Routing |
| Recharts | 2.12.7 | Charts |
| Zod | 3.23.8 | Validation |
