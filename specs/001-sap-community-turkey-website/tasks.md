---

description: "Task list for the SAP Community Türkiye static website"
---

# Tasks: SAP Community Türkiye Website

**Input**: Design documents from `/specs/001-sap-community-turkey-website/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), and [quickstart.md](quickstart.md)

**Tests**: No separate automated test tasks are included because the feature specification does not request TDD. Each story includes an independent manual acceptance criterion, and the final phase runs the documented quickstart checks.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated as an independently valuable increment after shared setup and foundation work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it uses different files and has no dependency on incomplete work.
- **[Story]**: Maps a task to the corresponding user story in [spec.md](spec.md).
- Every task includes the exact file or directory path it changes or validates.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the static site directories and preserve the backed-up reference boundary.

- [X] T001 Create the planned static site directories `content/`, `events/`, `resources/`, and `docs/` at the repository root.
- [X] T002 [P] Copy the backed-up logo and interface icons into `resources/SAP Community Turkey.png`, `resources/display-icon.png`, and `resources/pdf.png` while leaving the originals under `backup/resources/` unchanged.
- [X] T003 [P] Copy or preserve all required SAP Inside Track 2025 presentation files under `events/sitist/2025/resources/` from the corresponding `backup/events/sitist/2025/resources/` references.
- [X] T004 [P] Create the initial source-to-published asset inventory in `docs/reference-inventory.md`, covering the backed-up pages, styles, images, icons, and presentation files.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared page shells, content conventions, loading behavior, and visual tokens before story work begins.

**Checkpoint**: The static page shells, content schema, shared loader, and reference-derived stylesheet exist; user story implementation can proceed in priority order.

- [X] T005 [P] Document Site Overview, News, Event, Agenda Item, and reference inventory schemas with valid examples in `content/README.md`.
- [X] T006 [P] Create semantic page shells and stable page markers in `index.html`, `events/index.html`, and `event.html`.
- [X] T007 [P] Implement local JSON loading, page initialization, path resolution, empty-state helpers, and graceful error handling in `resources/app.js`.
- [X] T008 [P] Establish reference-derived layout, typography, color tokens, table styles, link states, and responsive primitives in `resources/style.css`.

## Phase 3: User Story 1 - Discover the community (Priority: P1) - MVP

**Goal**: Make the root landing page show the community identity, overview, news, upcoming events, and past-event summary with graceful empty and missing-field states.

**Independent Test**: Serve the repository with the command in [quickstart.md](quickstart.md), open `/`, and verify the logo, overview, news, upcoming, past-event sections, working event link, and friendly empty states at desktop and mobile widths.

### Implementation for User Story 1

- [X] T009 [P] [US1] Add the landing-page overview and logo metadata in `content/site.json`, including meaningful logo alternative text.
- [X] T010 [P] [US1] Add representative News records with required fields and optional-link/image cases in `content/news.json`.
- [X] T011 [US1] Migrate the backed-up event baseline, including the SAP Inside Track 2025 event, all eight sessions, speakers, presentation paths, authored status, and verified schedule times, into `content/events.json`.
- [X] T012 [US1] Render Site Overview, News & Announcements, Upcoming Events, Past Events, type/city summary, links, optional images, and empty placeholders from local JSON in `resources/app.js`.
- [X] T013 [US1] Add landing-page containers, headings, accessible navigation, and event links for the rendered sections in `index.html`.
- [X] T014 [US1] Style the landing page cards, lists, summary groups, empty states, and responsive layout using the reference tokens in `resources/style.css`.

## Phase 4: User Story 2 - Find and inspect an upcoming event (Priority: P1)

**Goal**: Let a visitor open any event from a listing and see complete event metadata, ordered agenda content, speakers, and available local presentations.

**Independent Test**: Open an upcoming event and the preserved SAP Inside Track 2025 event through their stable event identifiers, then verify metadata, agenda order, session times, speaker information, optional images, and every provided local presentation link.

### Implementation for User Story 2

- [X] T015 [US2] Implement stable event-identifier lookup and detail rendering for title, date, location, image, speakers, agenda, missing-record state, and missing-agenda state in `resources/app.js`.
- [X] T016 [P] [US2] Add semantic event metadata, agenda containers, presentation link containers, and navigation controls to `event.html`.
- [X] T017 [US2] Add event detail table/list styles, presentation controls, speaker links, and responsive behavior in `resources/style.css`.

## Phase 5: User Story 3 - Browse local event history (Priority: P1)

**Goal**: Provide event-type and city browsing that returns only matching past events and reaches every populated event detail view.

**Independent Test**: Open the Local Events view, select each supported populated type/city group, confirm only exact matches appear, verify empty-group messaging, and open a past event detail view from each result.

### Implementation for User Story 3

- [X] T018 [P] [US3] Add Local Events navigation controls and accessible type/city group containers to `events/index.html`.
- [X] T019 [US3] Implement exact event-type and city filtering, supported grouping rules, result links, selected-group state, and empty-group placeholders in `resources/app.js`.
- [X] T020 [US3] Style Local Events controls, grouped results, selected states, and narrow-screen behavior in `resources/style.css`.

## Phase 6: User Story 4 - Maintain content without code changes (Priority: P2)

**Goal**: Make routine editorial updates possible through documented content files without changes to markup, scripts, or styles.

**Independent Test**: Add one valid News record and one valid Event record following `content/README.md`, reload the site, and verify both render in the correct sections without changing `index.html`, `event.html`, `events/index.html`, `resources/app.js`, or `resources/style.css`.

### Implementation for User Story 4

- [X] T021 [US4] Complete contributor authoring guidance, required/optional field rules, allowed values, status ownership, path rules, and local-preview instructions in `content/README.md`.
- [X] T022 [US4] Remove any remaining editorial literals from rendering code and make optional fields, invalid records, and absent content fail gracefully in `resources/app.js`.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Complete reference fidelity, accessibility, responsive behavior, preservation checks, and end-to-end validation.

- [X] T023 [P] Update `docs/reference-inventory.md` with every published page and asset, source path, published path, usage, preservation status, and intentional difference.
- [X] T024 [P] Review image alternative text, heading hierarchy, keyboard focus order, link names, and graceful missing-content behavior across `index.html`, `events/index.html`, `event.html`, and `resources/app.js`.
- [X] T025 [P] Complete mobile, tablet, and desktop responsive adjustments for all page types in `resources/style.css` without introducing horizontal page scrolling or overlap.
- [X] T026 [P] Verify root and nested GitHub Pages-relative paths, case-sensitive local filenames, eight migrated sessions, and all presentation references against `backup/` and `docs/reference-inventory.md`.
- [X] T027 [P] Confirm the backup reference remains unchanged and all originally inventoried files remain present under `backup/`.
- [X] T028 Run every landing, Local Events, event-detail, reference/path, and responsive scenario in `specs/001-sap-community-turkey-website/quickstart.md` and record any intentional deviations in `docs/reference-inventory.md`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T002, T003, and T004 can run in parallel after the directories in T001 exist.
- **Foundational (Phase 2)**: Depends on T001; T005 through T008 can run in parallel because they use separate files and establish shared prerequisites.
- **User Story 1 (Phase 3)**: Depends on T005 through T008 and the required asset tasks T002 and T003; this is the MVP.
- **User Story 2 (Phase 4)**: Depends on T007, T008, and the event records from T011; it can begin after the shared foundation and US1 content baseline are ready.
- **User Story 3 (Phase 5)**: Depends on T007, T008, and T011; it can proceed independently of the event-detail styling work in US2 once the shared detail contract exists.
- **User Story 4 (Phase 6)**: Depends on T005 and the rendering behavior from T012 and T015; it hardens the content-maintenance contract after the primary views exist.
- **Polish (Phase 7)**: Depends on all desired user stories and the complete published asset set.

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on Setup, Foundation, required local assets, and the baseline content records; no other story is required.
- **User Story 2 (P1)**: Depends on the shared loader and event records; it can be validated independently once an event identifier is available.
- **User Story 3 (P1)**: Depends on the shared loader and event records; it can be validated independently through the Local Events page.
- **User Story 4 (P2)**: Depends on the documented schemas and the first rendered content views; it validates maintainability rather than adding a visitor-facing page.

### Parallel Opportunities

- Setup asset copying (T002-T004) can run in parallel after T001.
- Foundation documentation, page shells, loader, and stylesheet (T005-T008) can run in parallel.
- US1 content files (T009-T010) can be authored in parallel; T011 follows the event migration inventory.
- US2 page-shell work (T016) can run in parallel with US1 styling after the foundation.
- US3 page-shell work (T018) can run in parallel with US2 implementation after the foundation.
- US4 documentation (T021) can run in parallel with the final US3 styling task, but T022 follows the complete rendering paths.
- Polish tasks T023-T027 can run in parallel where they inspect different files; T028 runs after implementation and fixes are complete.

## Parallel Example: User Story 1

```text
Task: "Add the landing-page overview and logo metadata in content/site.json"
Task: "Add representative News records with optional-link/image cases in content/news.json"
```

## Parallel Example: User Story 2

```text
Task: "Add semantic event metadata, agenda containers, presentation link containers, and navigation controls to event.html"
Task: "Implement stable event-identifier lookup and detail rendering in resources/app.js"
```

## Parallel Example: User Story 3

```text
Task: "Add Local Events navigation controls and accessible type/city group containers to events/index.html"
Task: "Style Local Events controls, grouped results, selected states, and narrow-screen behavior in resources/style.css"
```

## Parallel Example: User Story 4

```text
Task: "Complete contributor authoring guidance and path rules in content/README.md"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Run the independent landing-page check in `specs/001-sap-community-turkey-website/quickstart.md`.
5. Deploy or demonstrate the landing page once the required content and local assets pass the check.

### Incremental Delivery

1. Deliver the landing page and content baseline as the MVP.
2. Add the reusable event detail view and validate the preserved eight-session agenda.
3. Add Local Events type/city browsing and validate populated and empty groups.
4. Harden contributor-only JSON maintenance and graceful invalid/optional data handling.
5. Complete the cross-cutting reference, accessibility, responsive, path, and backup-preservation checks.

### Notes

- No external APIs, frameworks, build tools, databases, routing libraries, or state-management libraries are required.
- The `backup/` directory is a read-only reference boundary; implementation tasks must not delete, replace, or repurpose it.
- Presentation times absent from the backed-up HTML must be verified from the source schedule before the corresponding production content record is marked complete.
