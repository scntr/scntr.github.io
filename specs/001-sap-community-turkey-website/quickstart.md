# Quickstart: SAP Community Türkiye Website

## Prerequisites

- Python 3 is available for the local static preview.
- The repository is checked out with the `backup/` reference files and local presentation assets.

## Start a Local Preview

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. Do not use `file://` to validate JSON loading or relative paths.

## Validation Scenarios

### Landing page

1. Open `/`.
2. Confirm the centered SAP Community Türkiye logo, overview, News & Announcements, Upcoming Events, and Past Events sections render.
3. Confirm missing optional images and links do not produce broken controls.
4. Confirm empty lists show a friendly placeholder.

### Local event browsing

1. Open the Events view from the landing page.
2. Select each supported event type and city with representative data.
3. Confirm the results include both upcoming and past events, with upcoming events listed first, and that each result opens its event detail view.
4. Select an empty group and confirm its friendly placeholder.
5. On the landing page, confirm each city group shows no more than three newest past events and that a More control opens the Events page with the matching type and city preselected.

### Shared navigation and Who We Are

1. Confirm the shared menu displays `Who We Are?`, `SAP Inside Track`, `SAP CodeJam`, and `Meetup` on the landing, Events, and event detail pages.
2. Open `/who-we-are.html` and confirm its title, description, and highlights come from `content/site.json`.
3. Open each event-type menu item and confirm the Events page opens with the matching type selected.

### Event detail

1. Open a listed upcoming event and the preserved SAP Inside Track 2025 event.
2. Confirm title, date, location, optional image, agenda order, start time, end time, and title are shown.
3. Select every provided presentation link and confirm the local file opens.
4. Open the detail view directly with its event identifier and confirm it renders without first visiting the landing page.

### Reference and path checks

1. Compare logo placement, page background, white content surface, heading color, yellow table accent, centered layout, and Arial typography with `backup/resources/style.css` and `backup/index.html`.
2. Open the nested event path directly and verify all shared and presentation resources resolve.
3. Confirm the `backup/` files remain present and unchanged.
4. Review `docs/reference-inventory.md` for every published reference page and asset and for any intentional filename normalization.

### Responsive check

Review `/`, the Local Events view, and an event detail view at mobile, tablet, and desktop widths. Confirm there is no horizontal page scrolling, overlapping content, unreadable text, or inaccessible link control.

## Expected Result

The site renders entirely from repository files, works from root and nested GitHub Pages paths, preserves the backed-up reference identity and event content, and exposes no visible loading, missing-asset, or empty-list defects.
