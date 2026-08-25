# Research: SAP Community Türkiye Website

## Decision 1: Use plain browser files with no runtime services

- **Decision**: Implement the website with HTML, CSS, and vanilla JavaScript using only repository-hosted JSON and assets.
- **Rationale**: The constitution requires GitHub Pages deployment, zero backend, no runtime external calls, and no required build step. The current repository is already a static site.
- **Alternatives considered**: A framework or server-backed content system would add deployment and maintenance complexity without satisfying a requirement that cannot be met by static files.

## Decision 2: Use one reusable event detail view with a stable event identifier

- **Decision**: Link event cards to a static event detail page carrying the event identifier in its URL. The page loads the matching local event record and renders the detail view.
- **Rationale**: This satisfies dedicated event navigation while avoiding duplicated authored pages and remaining compatible with GitHub Pages.
- **Alternatives considered**: Generating one physical HTML page per event would duplicate structure and require a build process; a client-side routing library would violate the simplicity constraint.

## Decision 3: Store editorial content in separate JSON files

- **Decision**: Keep site overview, news, and events in separate files under `content/`, with the schema and examples documented beside them.
- **Rationale**: Contributors can update editorial content without changing page structure, scripts, or styles, and the separation matches the constitution.
- **Alternatives considered**: Hard-coded HTML or JavaScript data would make routine content updates dependent on developer changes.

## Decision 4: Preserve the backup as an immutable visual and asset reference

- **Decision**: Treat `backup/` as read-only reference material. Copy or reference required public assets into the published structure and document every source-to-published mapping in `docs/reference-inventory.md`.
- **Rationale**: The backup contains the current logo, colors, stylesheet, page structure, nested event path, and local presentation files. Keeping it unchanged makes visual comparison and recovery possible.
- **Alternatives considered**: Publishing directly from `backup/` would mix reference material with the deployment surface and make future comparisons less reliable.

## Decision 5: Preserve visual tokens while improving responsive structure

- **Decision**: Retain the reference values and visual language: `#f0f0f0` page background, white content surface, `#FCC000` table accent, centered layout, rounded surface, dark headings, and Arial typography. Allow only accessibility or responsive changes that are documented.
- **Rationale**: The constitution makes the existing implementation the source of truth while also requiring usable mobile, tablet, and desktop layouts.
- **Alternatives considered**: A visual redesign would create unnecessary scope and weaken brand continuity.

## Decision 6: Treat event status as authored data

- **Decision**: Store `status` as `upcoming` or `past`; use `date` for display and ordering but never silently recalculate status from the current date.
- **Rationale**: Content maintainers own the lifecycle, and the specification explicitly keeps date/status correction out of runtime behavior.
- **Alternatives considered**: Automatic date comparison could hide authored content or move an event unexpectedly across sections.

## Decision 7: Handle missing schedule details as content readiness work

- **Decision**: Require `startTime` and `endTime` in the published Agenda Item schema. During migration of the backed-up 2025 agenda, verify the original schedule source and record any unresolved timing data for maintainer completion rather than inventing times.
- **Rationale**: The website contract requires session times, while the preserved event HTML exposes session titles, speakers, and presentations but does not provide times.
- **Alternatives considered**: Inventing times would create inaccurate event information; weakening the schema would violate the feature requirement.
