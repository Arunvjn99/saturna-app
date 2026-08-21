# Saturna Participant Portal — Recovery & Fix Analysis

## 1. What was broken

The project (React + Vite) was shared via cloud sync and arrived with a **corrupted git repository**:
every copy found on this machine (`saturna-app`, `saturna-app 2`, `saturna-app.zip`,
`saturna-app (1).zip`) has the identical problem — 11 source files are staged in git's index
(`git status` shows them as `AD`) but their blob objects are missing from `.git/objects`, and the
files themselves are gone from disk. `git fsck` confirms missing blobs/trees and a repo with no
commits (`HEAD` is an unborn branch). This is real data loss, not a working-tree edit — there is no
local copy of these files anywhere to restore from.

**Missing files (all under `src/components/`):**
- `layout/AppLayout.jsx` — main app shell (topbar + sidebar nav + `<Outlet/>`)
- `layout/Header.jsx` — top bar: logo, user avatar chip, participant-switcher dropdown, sign out
- `layout/Sidebar.jsx` — left icon nav (Dashboard / Profile / Transactions / Reports / Portfolio)
- `layout/AuthGates.jsx` — `RequireAuth` / `GuestOnly` route guards
- `layout/EnrollmentLayout.jsx` — simplified topbar shell used by the enrollment flow
- `dashboard/OverallBalance.jsx` — account balance + loan summary card
- `dashboard/PlanCard.jsx` — one plan tile (badge, notice, balance/vested stats)
- `dashboard/QuickLinks.jsx` — 3-up quick action tiles
- `dashboard/Transactions.jsx` — "Recent Transactions" compact widget
- `dashboard/RetirementGoalSimulator.jsx` — side-panel readiness donut
- `dashboard/LearningPortal.jsx` — side-panel "Enrich" promo card

Everything else in the repo (pages, `ParticipantContext`, data files, all CSS) is intact.

## 2. Also found while testing

- **`node_modules/.bin` had corrupted/broken symlinks** (`vite` binary pointed nowhere) — fixed by a
  clean `npm install`.
- **No `public/_redirects` (or `netlify.toml`)** — confirmed on the live Netlify site: navigating
  directly to `/enrollment` (or refreshing any inner route) returns Netlify's 404 page, because this
  is a client-side-routed SPA (`BrowserRouter`) with no server rewrite rule. This is a real bug on
  the current deployment, independent of the missing-files issue. **Fix:** add
  `public/_redirects` with `/*  /index.html  200`.

## 3. How the missing files were reconstructed

No source backup exists, so each component was rebuilt by:
1. Reading the CSS that already ships in the repo (`src/styles/index.css`) — it still contains the
   exact class names these components render into (`.topbar`, `.nav`, `.user-chip`,
   `.user-dropdown`, `.overall-balance`, `.plan-card`, `.quick-grid`, `.rr-card`, `.learn-side`,
   `.tx-list`, etc.), which fixes the required markup shape.
2. Reading every page that imports these components (`Dashboard.jsx`, `PlanDetails.jsx`,
   `Profile.jsx`, `App.jsx`) to recover the exact props/data contracts (e.g. `PlanCard` receives
   `{ plan }` with `badge`, `badgeClass`, `cardClass`, `notice`, `noticeClass`, `noticeLink`, `stats`).
3. Inspecting the **live production site**, `https://saturnaparticipantportal.netlify.app`
   (built from this same codebase before it broke), via its rendered DOM for every participant
   scenario (auto-enrolled w/ loan, not-eligible, eligible-not-enrolled, eligible-enrolled, opted-out)
   to confirm exact copy text, conditional states (loan row, empty transactions, ineligible plan
   styling, badge variants), icons used (all `lucide-react`, confirmed by class name, e.g.
   `lucide-layout-grid`, `lucide-user-round`, `lucide-arrow-left-right`, `lucide-file-text`,
   `lucide-wallet`, `lucide-log-out`, `lucide-book-open`, `lucide-users`, `lucide-trending-up`), and
   the participant-switcher dropdown behavior in the header.

This means the rebuilt components are a faithful, pixel-matched reconstruction of what's live today
— not a guess — verified against both the code contracts and the deployed DOM.

## 4. Profile page — old portal field reference

Per request, `src/pages/Profile.jsx` (which already existed, not missing) is being extended using
`https://participant-demo.coreretirementsolutions.com` (Galileo demo, logged in as Michael Carter)
as the field reference, rebuilt with the **new portal's** design system (`.profile-hero`, `.panel`,
`.pf-fields`, existing card/badge styles) — not the old portal's visual style.

Old portal's Profile tabs and fields (via live inspection):
- **Personal Details:** First/Middle/Last name, Employee ID, SSN, Company name, Employment status,
  Gender, Marital status, Date of birth, Email, Primary/Secondary phone, Address lines 1–3, City,
  Country, State, Zip
- **Employment Information:** Payroll frequency, Date of hire, QDRO flag, Ownership %, Family member
  of owner, Officer, HCE, Key employee, Insider/Restricted, rehire history
- **Employee Classification:** Location, Division, Department, Paycode, classification
  type/code/name/dates (mostly empty in the demo account)
- **Bank Details:** presence flag only (no account numbers pulled — out of scope/sensitive)
- **Beneficiary Details:** name/relationship/share (already modeled in this app's data)

**What's being added to this app's Profile page:** Gender, Marital Status, and Employment Status
join the existing Personal/Contact/Employment/Beneficiaries panels (DOB, SSN, email, phone, address,
employer, employee ID, hire date, work status, beneficiaries already existed). Bank details and
employee-classification are **not** added — they carry no real data in this demo app's data model
and pulling in blank/fabricated bank fields would add sensitive-looking UI with nothing behind it.

## 5. Plan — what changes, what doesn't

**Adding (new/reconstructed files only):**
- The 11 missing `.jsx` files above, reconstructed as described.
- `public/_redirects` (SPA rewrite fix).
- Two new profile fields (`gender`, `maritalStatus`) added to each entry in
  `src/data/participants.js` (additive — existing keys/usages untouched).
- `Profile.jsx` gets 2 more `<Field>` rows in the existing "Personal Information" panel for those
  new fields — no structural/layout change, same components and CSS classes already in use.

**Not touching:** routing (`App.jsx`), `ParticipantContext`, any other page, any CSS file, build
config. All existing flows (login, enrollment, investments, transactions, reports, portfolio) read
from the same data/context contracts as before, so they are unaffected by this recovery.

## 6. Verification plan

1. `npm install` clean, `npm run build` must succeed with zero errors.
2. `npm run dev`, click through every nav item for at least 2 participant scenarios
   (auto-enrolled-with-loan, eligible-enrolled) and compare visually against the live Netlify site.
3. Confirm login → dashboard → plan details → profile → transactions → reports → portfolio →
   enrollment flow all still navigate correctly (AuthGates/routes unchanged).
4. Push to a new GitHub repo under the user's account, then relink Netlify's existing site to that
   repo (done manually by the user in Netlify's UI, or driven step-by-step with confirmation before
   any save).
