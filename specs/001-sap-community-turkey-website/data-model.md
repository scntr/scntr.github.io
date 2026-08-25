# Data Model: SAP Community Türkiye Website

## Content Files

- `content/site.json`: one site overview record and shared display content.
- `content/news.json`: an array of News records.
- `content/events.json`: an array of Event records with nested Agenda Items.
- `content/site_tr.json`: Turkish site-level content with the exact structure of `site.json`.
- `content/news_tr.json`: Turkish news content with the exact structure of `news.json`.
- `content/events_tr.json`: Turkish event and agenda content with the exact structure of `events.json`.
- `content/README.md`: contributor-facing schemas, allowed values, examples, and authoring guidance.

## Site Overview

Represents the introduction shown on the landing page.

| Field | Type | Required | Validation |
|---|---|---|---|
| `title` | string | Yes | Must identify SAP Community Türkiye. |
| `description` | string | Yes | Non-empty overview text. |
| `logo` | path | Yes | Must point to a repository-hosted image. |
| `logoAlt` | string | Yes | Meaningful alternative text. |
| `navigation` | array | Yes | Ordered menu items with `id`, `label`, `href`, and optional local `icon`; `href` may be external. |
| `whoWeAre` | object | Yes | Detail-page content with title, description, and highlights. |
| `eventDescriptions` | object | Yes | Non-empty descriptions keyed by `Events`, `SAP Inside Track`, `SAP CodeJam`, and `Meetup`. |

Example:

```json
{
  "title": "SAP Community Türkiye",
  "description": "A community for SAP professionals and enthusiasts in Türkiye.",
  "logo": "resources/SAP Community Turkey.png",
  "logoAlt": "SAP Community Türkiye logo"
}
```

`navigation` controls the shared menu on every page. External items open in a new tab, and icon items expose their label through accessible naming and a tooltip. The `SAP Inside Track`, `SAP CodeJam`, and `Meetup` items link to filtered Event detail views; `whoWeAre` supplies the `/who-we-are.html` page.

`eventDescriptions` supplies the dynamic top description on the Events page. The unfiltered page uses `Events`; each event-type view uses its matching key.

Turkish translations are kept in `content/site_tr.json`, `content/news_tr.json`, and `content/events_tr.json` so the English source records remain unchanged. Each Turkish file has the same recursive key structure, record count, optional fields, IDs, and array order as its English counterpart. Canonical event type, city, date, URL, file path, and speaker-name values remain unchanged for filtering and linking.

## News

Represents a community announcement or update.

| Field | Type | Required | Validation |
|---|---|---|---|
| `id` | string | Yes | Unique slug or identifier. |
| `title` | string | Yes | Non-empty display title. |
| `description` | string | Yes | Non-empty summary or body. |
| `externalLink` | URL | No | Render only when present and valid. |
| `externalLinkText` | string | No | Link label used when `externalLink` is present; use a default label when omitted. |
| `image` | path | No | Repository-hosted image; omit when absent. |
| `imageAlt` | string | No | Required when `image` is present. |
| `date` | ISO date | No | Used for newest-first ordering when present. |

Example:

```json
{
  "id": "community-update",
  "title": "Community update",
  "description": "A short announcement for SAP Community Türkiye members.",
  "externalLink": "https://example.com/community-update",
  "date": "2026-08-25"
}
```

## Event

Represents an upcoming or past community event.

| Field | Type | Required | Validation |
|---|---|---|---|
| `id` | string | Yes | Unique stable slug used by event links. |
| `title` | string | Yes | Non-empty display title. |
| `type` | enum | Yes | `SAP Inside Track`, `SAP CodeJam`, or `Meetup`. |
| `city` | enum | Yes | `İstanbul`, `Ankara`, or `İzmir`; displayed grouping is explicit data. |
| `location` | string | Yes | Non-empty venue or location description. |
| `date` | ISO date | Yes | Displayed event date and ordering value. |
| `status` | enum | Yes | `upcoming` or `past`; authored, not date-derived. |
| `speakers` | array of strings | No | Presenter names associated with the event. |
| `image` | path | No | Repository-hosted image; omit when absent. |
| `imageAlt` | string | No | Required when `image` is present. |
| `agenda` | array | No | Ordered Agenda Item records; empty means not yet published. |

Supported landing-page groupings:

- SAP Inside Track: İstanbul, Ankara
- SAP CodeJam: İstanbul, Ankara, İzmir
- Meetup: İstanbul, Ankara, İzmir

Initial Local Events navigation scope:

- SAP Inside Track: İstanbul, Ankara
- SAP CodeJam: İstanbul, Ankara, İzmir
- Meetup: İstanbul

Example:

```json
{
  "id": "sitist-2025",
  "title": "SAP Inside Track Istanbul 2025",
  "type": "SAP Inside Track",
  "city": "İstanbul",
  "location": "Yeditepe University",
  "date": "2025-05-10",
  "status": "past",
  "agenda": []
}
```

## Agenda Item

Represents one ordered session within an Event.

| Field | Type | Required | Validation |
|---|---|---|---|
| `startTime` | string | Yes | Published schedule time. |
| `endTime` | string | Yes | Published schedule time after `startTime`. |
| `title` | string | Yes | Non-empty session title. |
| `speakers` | array of strings | No | Preserved speaker names; empty when unavailable. |
| `speakerLinks` | array of URLs | No | Optional profile links corresponding to speakers. |
| `presentationLinks` | array of paths | No | Local repository paths; omit controls when empty. |

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

## Reference Inventory Record

This documentation entity is maintained in `docs/reference-inventory.md`, not rendered as visitor content.

| Field | Type | Required | Validation |
|---|---|---|---|
| `sourcePath` | path | Yes | Existing path under `backup/`. |
| `publishedPath` | path | Yes when published | Corresponding public path. |
| `assetType` | enum | Yes | `page`, `style`, `image`, `icon`, or `presentation`. |
| `usedBy` | array of paths | Yes | Pages or records that consume the asset. |
| `status` | enum | Yes | `preserved`, `copied`, `normalized`, or `reference-only`. |
| `notes` | string | No | Intentional differences or filename handling. |

## Relationships and Rules

- A Site Overview supplies the landing-page introduction and logo.
- News records render independently of Events.
- An Event contains zero or more ordered Agenda Items.
- An Event Type and City Group filters Events where both `type` and `city` match exactly.
- An Agenda Item may reference zero or more local presentation files.
- Missing optional paths suppress only their related image or link control.
- Invalid required records MUST fail gracefully without blocking unrelated valid records.
- Event `status` controls upcoming versus past placement; `date` does not override it.
