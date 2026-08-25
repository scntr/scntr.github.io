<!--
Sync Impact Report
- Version change: scaffold (unversioned) -> 1.0.0
- Modified principles: template placeholders -> six ratified SAP Community Türkiye principles
- Added sections: Content Governance, Development Workflow
- Removed sections: none
- Follow-up TODOs: none
-->

# SAP Community Türkiye Website Constitution

## Core Principles

### I. Static-First, Zero Backend (NON-NEGOTIABLE)
The site MUST be 100% static and deployable as-is to GitHub Pages. It MUST NOT
use a database, server-side code, runtime external API calls, or build-time
calls to paid or rate-limited third-party services. Client-side JavaScript MAY
render local JSON and handle navigation or filtering, but it MUST run entirely
in the browser against repository-hosted assets. This guarantees zero hosting
cost, zero server maintenance, and long-term sustainability for a volunteer-run
community.

### II. Content/Code Separation
All editorial content, including news, events, agendas, links, and image
references, MUST live in JSON files and MUST NOT be hard-coded into HTML or
JavaScript templates. Code renders content; it does not contain it. A
contributor who can edit JSON MUST be able to add a news item or event without
editing markup, scripts, or CSS. This keeps content maintenance accessible to
community organizers who are not necessarily developers.

### III. Simplicity Over Sophistication (KISS)
The project MUST use plain HTML, CSS, and vanilla JavaScript unless a concrete
requirement cannot be met without a framework, build tool, or bundler. It MUST
NOT add client-side routing or state-management libraries without an explicit
constitution amendment. Implementations MUST prefer one clear approach over
configurable abstractions and MUST choose the simplest solution that meets the
requirement. Complexity is a maintenance liability for a volunteer project.

### IV. Reference-Driven Visual Identity
The existing reference implementation is the source of truth for the logo,
color palette, typography, spacing, and general visual language. New pages and
components MUST reuse its design tokens and logo usage. Any deviation MUST be
called out and justified in the implementation plan or review. This preserves
a consistent and recognizable community brand without an unplanned redesign.

### V. Professional Polish, Minimal Means
The site MUST present consistent spacing, responsive layouts for mobile,
tablet, and desktop, readable typography, working links and images, and no
visibly broken states. Empty lists MUST render a graceful placeholder rather
than blank space or a console error. Implementation simplicity MUST NOT reduce
visual quality or attention to detail; the result must look professional and
trustworthy.

### VI. Accessible, Maintainable Structure
The site MUST use semantic HTML and meaningful alt text sourced from content
JSON rather than hard-coded templates. Its file and folder structure MUST be
self-explanatory to a new contributor. Every content type MUST have documented
JSON fields and at least one checked-in example entry. This keeps the project
accessible to contributors and maintainable over time.

## Technical Constraints

- The target hosting platform is GitHub Pages, with no server runtime,
	environment variables, or secrets.
- The project MUST NOT use a database, including client-side IndexedDB, unless
	explicitly authorized by a later constitutional amendment. Versioned JSON
	files are the source of truth for content.
- The site MUST make no external network calls at page-load time. A CDN MAY be
	used only for non-critical enhancement; core rendering MUST work when
	third-party requests fail or are blocked.
- Images and presentation files, including session slides, MUST be stored
	locally in the repository rather than linked from external file hosts.
- JavaScript-rendered content MAY fetch local JSON files. Local preview
	documentation MUST instruct contributors to use a static server rather than
	`file://`, because browser fetch restrictions can block local JSON requests.
- No build step is required to view or deploy the site. Any future build step
	MUST be optional, and unbuilt source MUST remain directly viewable or
	servable.

## Content Governance

- News and events, and their fields, MUST follow the documented content schema
	and MUST NOT be extended without updating the schema documentation and every
	UI that renders the affected fields.
- Link fields, including external links, presentation links, and image paths,
	MUST degrade gracefully when missing: the related element MUST be hidden and
	the layout MUST remain valid.
- City groupings MUST directly support İstanbul, Ankara, and İzmir, and event
	types MUST directly support SAP Inside Track, SAP CodeJam, and Meetup. These
	structural concepts MUST NOT be inferred through ad hoc string matching.

## Development Workflow

- Changes MUST be proposed and reviewed against this constitution and the
	feature specification before implementation planning begins.
- A solution that conflicts with Static-First, Zero Backend or Simplicity Over
	Sophistication MUST be flagged in the plan with an explicit justification.
- Visual changes MUST be checked against the reference implementation's logo,
	color, typography, and spacing tokens before completion.
- Contributors MUST use the repository's documented local-preview and
	validation procedures before review.

## Governance

This constitution supersedes conflicting ad hoc implementation preferences.
Every pull request and review MUST verify compliance with the principles,
technical constraints, content governance, and visual identity requirements.
Any violation MUST be resolved before merge or accompanied by an approved
constitution amendment.

Amendments MUST document the proposed change, rationale, affected principles,
compatibility impact, migration plan when needed, and updated validation
criteria. Amendments require review and approval by the project maintainers
before they take effect.

Constitution versions follow Semantic Versioning: MAJOR for backward-incompatible
principle removals or redefinitions, MINOR for new principles or materially
expanded governance, and PATCH for clarifications, wording, and other
non-semantic refinements. Compliance MUST be reviewed whenever the constitution
or an affected implementation changes.

**Version**: 1.0.0 | **Ratified**: 2026-08-25 | **Last Amended**: 2026-08-25
