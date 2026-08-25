# Content Authoring Guide

Edit the JSON files in this directory to update editorial content. Do not edit page markup, JavaScript, or CSS for routine content changes. Use a local static server such as `python3 -m http.server 8000` to preview changes; do not use `file://` because browsers may block local JSON loading.

The site opens in Turkish by default. Visitors can switch between the English and Turkish flag buttons in the top navigation; the selected language is remembered across pages. English source content remains in `site.json`, `news.json`, and `events.json`. Turkish translations are kept in `site_tr.json`, `news_tr.json`, and `events_tr.json`. Each Turkish file mirrors its English counterpart exactly, including all keys, records, optional fields, and agenda items; only translatable text values differ.

## Site Overview (`site.json`)

`site.json` contains one object:

| Field | Required | Rule |
|---|---|---|
| `title` | Yes | Identifies the community. |
| `description` | Yes | Non-empty overview HTML/text content. |
| `logo` | Yes | Repository-hosted image path. |
| `logoAlt` | Yes | Meaningful alternative text. |
| `navigation` | Yes | Ordered array of menu items with `id`, `label`, `href`, and optional local `icon`. `href` may be external. |
| `whoWeAre` | Yes | Detail-page content with `title`, `description`, and `highlights`. |
| `eventDescriptions` | Yes | Descriptions keyed by `Events`, `SAP Inside Track`, `SAP CodeJam`, and `Meetup`. |

```json
{
  "title": "SAP Community Türkiye",
  "description": "A community for SAP professionals and enthusiasts in Türkiye.",
  "logo": "resources/SAP Community Turkey.png",
  "logoAlt": "SAP Community Türkiye logo"
}
```

Navigation and Who We Are example:

```json
{
  "navigation": [
    { "id": "who-we-are", "label": "Who We Are?", "href": "who-we-are.html" },
    { "id": "sap-inside-track", "label": "SAP Inside Track", "href": "events/?type=SAP%20Inside%20Track" }
  ],
  "whoWeAre": {
    "title": "Who We Are?",
    "description": "A volunteer SAP community across Türkiye.",
    "highlights": [
      { "title": "Learn together", "description": "Share practical knowledge." }
    ]
  }
}
```

Menu labels and destinations are rendered from `navigation`. External menu items open in a new tab; an optional `icon` path renders an icon-only link with an accessible label and tooltip. The event-type items open the Events detail view with the corresponding event type selected. The `whoWeAre` record supplies the `/who-we-are.html` detail page.

The `eventDescriptions` object supplies the top description on the Events page. Its `Events` value is used for the unfiltered page, and the matching event-type value is used when a menu item or filter selects a type. Description fields support authored HTML such as paragraphs, emphasis, and links.

## Turkish Translations (`site_tr.json`, `news_tr.json`, `events_tr.json`)

`site_tr.json` mirrors `site.json` and contains Turkish site descriptions, menu labels, event-type descriptions, and Who We Are content. `news_tr.json` mirrors `news.json` record-for-record, and `events_tr.json` mirrors `events.json` record-for-record with translated event text and agenda titles. Records retain the same IDs and agenda array order. Interface-only labels are kept in the renderer because they have no corresponding fields in the site JSON schema.

## News (`news.json`)

`news.json` contains an array of objects:

| Field | Required | Rule |
|---|---|---|
| `id` | Yes | Unique slug or identifier. |
| `title` | Yes | Non-empty title. |
| `description` | Yes | Non-empty summary or body HTML/text content. |
| `externalLink` | No | Rendered only when present. |
| `externalLinkText` | No | Link label used when `externalLink` is present; falls back to a default label when omitted. |
| `image` | No | Repository-hosted image path. |
| `imageAlt` | No | Required when `image` is present. |
| `date` | No | ISO date used for newest-first ordering. |

## Events (`events.json`)

`events.json` contains an array of Event objects:

| Field | Required | Rule |
|---|---|---|
| `id` | Yes | Unique stable identifier used in event URLs. |
| `title` | Yes | Non-empty title. |
| `type` | Yes | `SAP Inside Track`, `SAP CodeJam`, or `Meetup`. |
| `city` | Yes | `İstanbul`, `Ankara`, or `İzmir`. |
| `location` | Yes | Venue or location text. |
| `date` | Yes | ISO date. |
| `status` | Yes | `upcoming` or `past`; maintainers update it manually. |
| `speakers` | No | Presenter names associated with the event. |
| `image` | No | Repository-hosted image path. |
| `imageAlt` | No | Required when `image` is present. |
| `agenda` | No | Ordered array of Agenda Items. |

The landing page supports SAP Inside Track in İstanbul and Ankara, SAP CodeJam in İstanbul, Ankara, and İzmir, and Meetup in all three cities. The Local Events navigation initially publishes Meetup -> İstanbul.

## Agenda Items

Each Agenda Item requires `startTime`, `endTime`, and `title`. Optional arrays preserve the backed-up speaker and presentation information:

| Field | Required | Rule |
|---|---|---|
| `startTime` | Yes | Published schedule time. |
| `endTime` | Yes | Time after `startTime`. |
| `title` | Yes | Non-empty session title. |
| `speakers` | No | Speaker names. |
| `speakerLinks` | No | Profile URLs corresponding to speakers. |
| `presentationLinks` | No | Local repository paths; multiple files are allowed. |

Example:

```json
{
  "startTime": "10:00",
  "endTime": "10:45",
  "title": "SAP Community",
  "speakers": ["Hilal Kurt"],
  "speakerLinks": ["https://www.linkedin.com/in/hilal-kurt-804ab9186/"],
  "presentationLinks": ["events/sitist/2025/resources/SAP Community Overview.pdf"]
}
```

## Publishing Rules

- Keep IDs unique and paths case-sensitive.
- Keep event `status` explicit; a past date does not automatically change an event listed as `upcoming`.
- Do not invent missing schedule times. Verify them from the source agenda before publishing a migrated session.
- Omit optional fields when unavailable. The site hides their related image or link.
- When adding or changing a title, description, location, or agenda item, add the corresponding Turkish value in `news_tr.json` or `events_tr.json` under the same record ID. Keep speaker names, event IDs, paths, URLs, dates, and canonical event type/city values unchanged.
- Keep `site_tr.json`, `news_tr.json`, and `events_tr.json` structurally identical to `site.json`, `news.json`, and `events.json`; preserve every key, optional field, ID, path, URL, date, status, type, city, speaker, and agenda position while translating display text.
- Add a new example to this guide when a content schema changes, and update every renderer that consumes the field.
- Keep `backup/` unchanged and record any deliberate published difference in `docs/reference-inventory.md`.
