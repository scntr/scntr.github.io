# Feature Specification: SAP Community Türkiye Website

**Feature Branch**: `001-sap-community-turkey-website`

**Created**: 2026-08-25

**Status**: Draft

**Input**: User description: "Set up a static, GitHub Pages-hosted website for SAP Community Türkiye, content-driven via JSON, styled after the existing reference implementation, covering a landing page, past/upcoming events, and per-city/per-event-type local event listings. Existing contents have been moved into `backup/` and must remain available as the reference for logo, colors, styles, pages, and local presentation assets."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover the community (Priority: P1)

A prospective attendee or current member opens the site and immediately understands what SAP Community Türkiye is, sees current announcements, finds upcoming events, and can recognize the available past-event history.

**Why this priority**: The landing experience is the primary entry point and must establish the community's purpose and current activity before visitors browse deeper.

**Independent Test**: Load the landing page with representative news and event data and verify that the logo, overview, news, upcoming events, and past-event summary are all visible and usable without a visible loading or empty-state defect.

**Acceptance Scenarios**:

1. **Given** the landing page contains representative content, **When** a visitor opens it, **Then** the centered SAP Community Türkiye logo, overview paragraph, News & Announcements list, Upcoming Events list, and Past Events summary are visible.
2. **Given** a news item has an external link, **When** the visitor selects the item, **Then** the linked destination opens; **when** it has no external link, **then** no broken link control is shown.
3. **Given** a news item has no image, **When** the landing page renders, **Then** the item remains readable without a broken image icon or empty image space.
4. **Given** any landing-page content list is empty, **When** the page renders, **Then** that section shows a short friendly message instead of a blank area or visible error.
5. **Given** the backed-up landing page and reference assets are available, **When** the public site is rebuilt, **Then** the landing page preserves the recognizable title, logo, existing event entry, and required local resources.

---

### User Story 2 - Find and inspect an upcoming event (Priority: P1)

A visitor reviews upcoming events, selects one, and reads its date, location, image, and complete agenda so they can decide whether to attend.

**Why this priority**: Upcoming events are the community's most time-sensitive call to action and need a direct path from discovery to useful event information.

**Independent Test**: Provide one upcoming event with a full agenda, select it from the landing page, and verify that its detail view contains all required event information and ordered agenda items.

**Acceptance Scenarios**:

1. **Given** an event is marked upcoming, **When** the visitor views the Upcoming Events section, **Then** the event is listed and selectable.
2. **Given** the visitor selects an upcoming event, **When** its detail view opens, **Then** the title, date, location, image when provided, and full ordered agenda are shown.
3. **Given** the upcoming-event list is empty, **When** the landing page renders, **Then** it shows a friendly "nothing here yet" message for that section.

---

### User Story 3 - Browse local events (Priority: P1)

A visitor browses upcoming and past events by event type and city, with upcoming events shown first, selects a specific event, and opens its details or locally stored presentation files preserved from the backed-up reference.

**Why this priority**: The archive demonstrates the community's activity and lets visitors find relevant sessions by the location and format they care about.

**Independent Test**: Load upcoming and past events across the supported types and cities, select each populated type/city group, and verify that both statuses appear with upcoming events first, only matching events appear, each event opens its own detail view, and the backed-up event content remains available.

**Acceptance Scenarios**:

1. **Given** upcoming and past events exist for an event type and city, **When** the visitor selects that group, **Then** matching events of both statuses are shown with upcoming events first.
2. **Given** a populated past-event group, **When** the visitor selects an event, **Then** its dedicated detail view shows title, date, location, image when provided, and full agenda.
3. **Given** an agenda item has a presentation link, **When** the visitor selects it, **Then** the locally stored presentation file opens.
4. **Given** an agenda item has no presentation link, **When** the detail view renders, **Then** no broken or empty presentation link is shown.
5. **Given** a selected type/city group has no events, **When** the visitor views it, **Then** a friendly "nothing here yet" message is shown.
6. **Given** the backed-up SAP Inside Track 2025 agenda contains eight sessions and local presentation files, **When** the event detail view is opened, **Then** all preserved sessions, speakers, and available presentations are identifiable and usable.
7. **Given** a landing-page city group has more than three past events, **When** the visitor views it, **Then** only the three newest past events are shown and a More control opens the Events page with that event type and city selected.

---

### User Story 4 - Maintain content without code changes (Priority: P2)

A community organizer adds or updates a news item or event by editing the documented content data while leaving page structure and presentation code unchanged.

**Why this priority**: Separating editorial content from code keeps the site sustainable for volunteer maintainers who may not be developers.

**Independent Test**: Add one valid news item and one valid event following the documented schemas, then load the site and verify that both appear in the appropriate views without markup or script changes.

**Acceptance Scenarios**:

1. **Given** a contributor follows the documented News schema, **When** they add a valid news entry, **Then** it appears in News & Announcements with its required title and description.
2. **Given** a contributor follows the documented Event and Agenda Item schemas, **When** they add a valid event, **Then** it appears in the correct upcoming or past grouping and its detail view renders the available fields.
3. **Given** an optional image, external link, or presentation link is omitted, **When** the related content renders, **Then** the corresponding element is omitted without breaking the layout.

### Edge Cases

- A news, upcoming-event, or selected past-event list is empty: show a short friendly "nothing here yet" message rather than blank space.
- An event marked upcoming has a date in the past: preserve the authored status and display it as upcoming; content maintainers are responsible for moving the event to past status.
- An event's agenda is omitted or empty: show the event details and a clear message that the agenda is not yet available.
- An optional image is missing: omit the image element and preserve the surrounding layout.
- An optional presentation file has been removed from the repository: the site does not validate the file at runtime; the missing link is a content-maintenance issue.
- A required field is missing or invalid in content data: the affected item MUST fail gracefully without preventing unrelated valid content from rendering, and maintainers MUST correct the entry before publishing.
- The site is opened at mobile width: content remains readable and usable without horizontal scrolling or overlapping controls.
- A backed-up asset has spaces or non-ASCII characters in its filename: the rebuilt site MUST preserve a working case-sensitive reference or document the deliberate normalized path.
- A page is opened directly at its nested GitHub Pages path: all local resources MUST still resolve correctly.
- The backup contains markup defects or duplicated tags: the rebuilt page MUST preserve intended visible content while using valid maintainable structure.
- Files in `backup/` fall outside the selected website scope: they remain reference material and MUST NOT be published unless explicitly included in the content inventory.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The landing page MUST display the SAP Community Türkiye logo centered, using the logo asset from the existing reference implementation.
- **FR-002**: The landing page MUST display an overview section that introduces SAP Community Türkiye.
- **FR-003**: The landing page MUST display a News & Announcements section sourced from News content, showing each item's title and description and using its external link when present.
- **FR-004**: The landing page MUST display an Upcoming Events section containing Event entries whose authored status is `upcoming`; each entry MUST be selectable and lead to that event's detail view.
- **FR-005**: The landing page MUST display a Past Events overview grouped by event type and city, supporting SAP Inside Track in İstanbul and Ankara, SAP CodeJam in İstanbul, Ankara, and İzmir, and Meetup in İstanbul, Ankara, and İzmir.
- **FR-006**: The site MUST provide a "SAP Community Türkiye - Local Events" navigation structure that supports SAP Inside Track -> İstanbul and Ankara, SAP CodeJam -> İstanbul, Ankara, and İzmir, and Meetup -> İstanbul as the initial published navigation scope.
- **FR-007**: Every event MUST have a dedicated detail view reachable from event listings, showing its title, location, date, image when provided, and full ordered agenda when available.
- **FR-008**: Every agenda item MUST show its start time, end time, and title, and MUST show each locally stored presentation file when `presentationLinks` are provided.
- **FR-009**: All News and Event editorial content MUST be authored in documented JSON content files separate from HTML, CSS, and JavaScript source.
- **FR-010**: The content documentation MUST define the Site Overview, News, Event, and Agenda Item schemas, including required fields, optional fields, allowed event types, allowed cities, event status values, and at least one example entry for each content type.
- **FR-011**: The visual design MUST derive logo placement, colors, typography, spacing, and general visual language from the existing reference implementation. Any intentional deviation MUST be documented during planning or review.
- **FR-012**: The site MUST be fully static and deployable to GitHub Pages without a server runtime, database, runtime external API, or required build step.
- **FR-013**: Core rendering MUST use only repository-hosted content and assets; external network dependencies MUST NOT be required for the page to render.
- **FR-014**: All authored links and image references MUST use paths that work from GitHub Pages locations and are case-sensitive correct; missing optional references MUST hide their related UI element.
- **FR-015**: The site MUST remain readable and usable at mobile, tablet, and desktop widths, without horizontal scrolling or overlapping content.
- **FR-016**: Event status MUST be an authored value of `upcoming` or `past`; the event date MUST be displayed and MAY be used for ordering, but the site MUST NOT silently change status based on the current date.
- **FR-017**: News items MUST be shown newest first when a date is provided. The initial release MUST retain all active news entries without pagination; maintainers are responsible for archiving or removing old entries as appropriate.
- **FR-018**: Empty content lists and empty type/city groups MUST render a short friendly placeholder rather than blank space, a broken control, or a visible console error.
- **FR-019**: A reusable event detail experience MUST support every event through its stable event identifier, so maintainers do not need to author a separate page for each event.
- **FR-020**: The public site MUST restore the backed-up root landing page, SAP Inside Track 2025 event experience, logo, display icon, PDF icon, shared stylesheet, and required local presentation files as part of the initial content baseline.
- **FR-021**: The restored SAP Inside Track 2025 event experience MUST preserve all eight backed-up agenda sessions, including session titles, speaker information, and every provided local presentation file, including multiple files for one session.
- **FR-022**: Local links from both root and nested pages MUST resolve correctly under GitHub Pages with case-sensitive filenames, including links to backed-up presentation files.
- **FR-023**: The `backup/` reference files MUST remain present and unmodified so maintainers can compare the published experience against the original implementation.
- **FR-024**: The project MUST document an inventory of reference files used, the pages they support, and any intentional differences between the backed-up reference and published site.
- **FR-025**: The initial release MUST limit restoration work to the backed-up public experience and the broader website behaviors defined in this specification; new unrelated content, search, accounts, analytics, and administrative editing are outside this feature.
- **FR-026**: Each landing-page past-event city group MUST show at most the three newest past events; when additional past events exist, it MUST show a More control that navigates to the Events page with the corresponding event type and city preselected.
- **FR-027**: Every published page MUST display a shared menu whose labels and local destinations are sourced from `content/site.json`, including `Who We Are?`, `SAP Inside Track`, `SAP CodeJam`, and `Meetup`; the event-type items MUST open their corresponding filtered event view.
- **FR-028**: The `Who We Are?` menu item MUST open a dedicated page whose title, description, and highlight content are sourced from `content/site.json`.
- **FR-029**: The shared menu MUST include an accessible WhatsApp icon that links to `https://chat.whatsapp.com/KuSSrOM7DOk272mUBW9Jkm` and opens the external community invitation in a separate browser tab.
- **FR-029**: The Events page MUST source its top description from `content/site.json`, using distinct descriptions for the unfiltered Events view and the SAP Inside Track, SAP CodeJam, and Meetup views.

### Key Entities

- **Site Overview**: The landing-page introduction and identity content. Required attributes: `title`, `description`, `logo`, and `logoAlt`, where `logo` is a repository-hosted image path and `logoAlt` is meaningful alternative text.
- **News**: A community announcement or update. Required attributes: `id`, `title`, and `description`. Optional attributes: `externalLink`, `externalLinkText`, `image`, `imageAlt`, and `date` for ordering. `id` is a unique slug or identifier; `imageAlt` is required when `image` is present.
- **Event**: A community event shown as upcoming or past. Required attributes: `id`, `title`, `type`, `city`, `location`, `date`, and `status`. Optional attributes: `image`, `imageAlt`, and `agenda`. `type` is one of `SAP Inside Track`, `SAP CodeJam`, or `Meetup`; `city` is one of `İstanbul`, `Ankara`, or `İzmir`; `status` is `upcoming` or `past`; `imageAlt` is required when `image` is present.
- **Agenda Item**: An ordered session within an event. Required attributes: `startTime`, `endTime`, and `title`. Optional attributes: `speakers`, `speakerLinks`, and `presentationLinks`, which point to preserved speaker profiles and locally stored presentation files.
- **Event Type and City Group**: A navigable pairing of one supported event type and one supported city, used to filter past events and represent the local-event structure. The data model supports İstanbul, Ankara, and İzmir directly rather than deriving groups from display text.
- **Backup Reference Asset**: A preserved file used to reconstruct or verify the public site, including HTML, CSS, image, icon, or presentation files. Key attributes are source path, asset type, intended page, and whether publication is required.
- **Reference Inventory**: The documented list connecting backed-up assets and pages to their published counterparts, including intentional differences and normalized paths.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a representative content set, a first-time visitor can identify the community, locate News & Announcements, locate Upcoming Events, and locate Past Events from the landing page in under 60 seconds.
- **SC-002**: From the landing page, a visitor can reach at least one populated past event for every event type/city combination with available data in no more than two selections.
- **SC-003**: At mobile, tablet, and desktop widths, 100% of core pages remain readable and usable with no horizontal scrolling or overlapping content during a responsive review.
- **SC-004**: For a representative set of valid content entries, 100% of required News, Event, and Agenda Item fields render in their defined locations, while omitted optional fields produce no broken image, empty link, or layout defect.
- **SC-005**: A content maintainer can add one valid news item and one valid event by editing documented content data only, with both entries visible in the correct sections after the page is reloaded.
- **SC-006**: A visitor can open every populated event detail view from its listing, and every provided presentation link opens the corresponding locally stored file during a broken-link spot check.
- **SC-007**: When no content exists for a supported list or type/city group, 100% of those empty states display a friendly explanatory message instead of blank space or a visible error.
- **SC-008**: Project maintainers judge the deployed site immediately recognizable as SAP Community Türkiye by comparing logo use, yellow accent, light page background, white content surface, centered layout, and Arial-based typography with the existing reference implementation.
- **SC-009**: 100% of the eight agenda sessions present in the backed-up SAP Inside Track 2025 page are visible in the rebuilt event experience with their preserved titles and speaker information.
- **SC-010**: 100% of required backed-up presentation files, logo assets, icons, and styles load or open successfully from their corresponding published pages during a spot check at both root and nested paths.
- **SC-011**: A maintainer can identify every published page, required asset, and intentional reference difference in the documented inventory in under five minutes.
- **SC-012**: The `backup/` directory retains 100% of its originally inventoried files unchanged after the website implementation is completed.

## Assumptions

- The supplied reference implementation remains the source of truth for the initial visual identity: centered logo, light gray page background, white content surface, yellow accent color, centered content, and Arial typography.
- Event status is explicit in content data because maintainers, rather than the current date, are responsible for moving events between upcoming and past collections.
- One reusable event detail view addressed by a stable event identifier is sufficient to satisfy "dedicated detail page" behavior while keeping the site static and avoiding duplicated authored markup.
- News is retained as an active list and ordered newest first when dates are present; maintainers archive or remove older items manually, and pagination is deferred until content volume requires it.
- The initial Local Events navigation follows the supplied scope of Meetup -> İstanbul, while the landing-page Past Events summary and the data model support Meetup in all three cities.
- Event dates are ISO dates for consistent ordering and display; no automatic timezone-sensitive status conversion is required.
- Contributors have access to the repository and can use a documented local static preview when browser restrictions prevent local JSON loading from a `file://` URL.
- Runtime validation of broken local files is out of scope; maintainers may add a development-time content or link check later.
- The `backup/` directory is the authoritative reference for the site state before the file reorganization and is not the public deployment root.
- The initial restoration baseline includes the backed-up root landing page, SAP Inside Track 2025 event page, required images and icons, shared stylesheet, and local presentation files.
- Local presentation filenames may retain spaces or non-ASCII characters when they can be referenced reliably; any normalized filename is recorded in the reference inventory.
- External speaker profile links may remain clickable, but no external request is required for the pages to render.
- Responsive and accessibility improvements are allowed only when they preserve the reference identity and are recorded during implementation review.

## Out of Scope

- User accounts, comments, submissions, or any visitor write-back.
- Search functionality.
- Analytics or tracking integrations.
- A CMS or administrator UI; contributors edit versioned content files directly.
- Automatic correction of event status based on the current date.
- Runtime validation of broken links or missing local images and presentations.
- Pagination or "show more" controls for news in the initial release.
- Deleting, replacing, or repurposing the `backup/` reference files.
