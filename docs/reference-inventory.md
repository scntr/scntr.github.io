# Reference Inventory

The `backup/` directory is a read-only reference. Published files may be reorganized or rendered from JSON, but the source files must remain present and unchanged.

| Source path | Published path | Type | Status | Used by | Notes |
|---|---|---|---|---|---|
| `backup/index.html` | `index.html` | page | copied | Landing page | Visible structure is rebuilt semantically from JSON. |
| `backup/resources/style.css` | `resources/style.css` | style | normalized | All pages | Rebuilt from the reference tokens with semantic, accessible, and responsive additions; preserve `#f0f0f0`, `#FCC000`, white surface, centered layout, and Arial typography. |
| `backup/resources/SAP Community Turkey.png` | `resources/SAP Community Turkey.png` | image | copied | Landing page | Logo asset preserved. |
| `backup/resources/display-icon.png` | `resources/display-icon.png` | icon | copied | Landing page | Existing event-link icon preserved. |
| `backup/resources/pdf.png` | `resources/pdf.png` | icon | copied | Event detail | Existing presentation icon preserved. |
| `backup/events/sitist/2025/index.html` | `event.html?id=sitist-2025` | page | normalized | Event detail | Replaced duplicated table markup with the reusable event view. |
| `backup/events/sitist/2025/resources/ABAP SDK for Google.pdf` | `events/sitist/2025/resources/ABAP SDK for Google.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/ABAP Unit Testing: Zapping Bugs in ERP and BTP.pdf` | `events/sitist/2025/resources/ABAP Unit Testing: Zapping Bugs in ERP and BTP.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/Changing the Game with SAP Business AI - Build your own Smart Agents.pdf` | `events/sitist/2025/resources/Changing the Game with SAP Business AI - Build your own Smart Agents.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/Identity Access Governance.pdf` | `events/sitist/2025/resources/Identity Access Governance.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/Integrating Systems to Talk Smarter.pdf` | `events/sitist/2025/resources/Integrating Systems to Talk Smarter.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/SAP ABAP SDK for Google Cloud.pdf` | `events/sitist/2025/resources/SAP ABAP SDK for Google Cloud.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/SAP Architecture Center - SAP Inside Track Istanbul.pdf` | `events/sitist/2025/resources/SAP Architecture Center - SAP Inside Track Istanbul.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/SAP Business Technology Platform for Developers - Abdulbasit Gulsen - SITIST 2025.pdf` | `events/sitist/2025/resources/SAP Business Technology Platform for Developers - Abdulbasit Gulsen - SITIST 2025.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/SAP Cloud Identity Services - Abdulbasit Gulsen - SITIST 2025.pdf` | `events/sitist/2025/resources/SAP Cloud Identity Services - Abdulbasit Gulsen - SITIST 2025.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/SAP Community Overview.pdf` | `events/sitist/2025/resources/SAP Community Overview.pdf` | presentation | copied | SITIST 2025 agenda | Filename retained. |
| `backup/events/sitist/2025/resources/SITIST 2025 - Afiş.png` | `resources/sitist-2025-poster.png` | image | normalized | Event detail | Published with an ASCII filename so the optional event image resolves reliably across GitHub Pages paths. |

## Intentional Differences

- Editorial content is moved from backed-up HTML into `content/site.json`, `content/news.json`, and `content/events.json`.
- The duplicated event HTML table becomes the reusable `event.html?id=<event-id>` view.
- Semantic markup, meaningful alternative text, graceful empty states, and responsive behavior are added to meet the current specification.
- Any filename normalization must be recorded in this table before the corresponding content link changes.

## Validation Results

Validated 2026-08-25 using `python3 -m http.server 8000` and browser checks:

- Landing page, Local Events page, and reusable event detail view render at desktop and mobile widths.
- The landing page shows two news records, a graceful empty upcoming state, three past-event type groups, and the preserved event link.
- Local Events filtering returns the Istanbul SAP Inside Track event and a friendly empty state for an unpopulated CodeJam/İzmir group.
- The event detail view renders eight agenda sessions, ten presentation links, the normalized poster, speaker links, and zero horizontal overflow.
- All pages have one `h1`, no unnamed links, no missing image `alt` attributes, no console/page errors, and zero measured horizontal overflow.
- All ten presentation files and local HTML references resolve; copied binaries match their backup originals.
- The backup retains 17 inventoried non-metadata files and remains unchanged.
