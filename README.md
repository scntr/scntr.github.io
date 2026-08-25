# SAP Community Türkiye

A static, GitHub Pages-ready website for SAP Community Türkiye. The site presents the community overview, news and announcements, upcoming events, and a browsable archive of local events with agendas and locally stored presentations.

The site uses plain HTML, CSS, and browser JavaScript. Editorial content is kept in local JSON files, so routine updates do not require changes to page markup or styling.

## Pages

- `/` - Community overview, news, upcoming events, and past-event summary.
- `/events/` - Browse upcoming and past events by event type and city.
- `/who-we-are.html` - Read the JSON-backed community description.
- `/event.html?id=sitist-2025` - View an event's details, agenda, speakers, and presentations.

The shared menu also includes an accessible WhatsApp community icon linking to the community invitation.

## Local Preview

JSON files are loaded by the browser, so preview the site through a local static server rather than opening `index.html` with `file://`.

From the repository root, run:

```sh
python3 -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/) in a browser. Stop the server with `Ctrl+C`.

If port 8000 is already in use, choose another port:

```sh
python3 -m http.server 8080
```

Then open [http://localhost:8080/](http://localhost:8080/).

## Updating Content

Edit the JSON files under `content/`:

- `content/site.json` - Site title, overview, and logo metadata.
- `content/news.json` - News and announcements.
- `content/events.json` - Upcoming and past events, agendas, speakers, and presentation links.

See [content/README.md](content/README.md) for schemas, allowed values, examples, path rules, and publishing guidance. Keep optional images and presentation links local, and keep event status explicitly set to `upcoming` or `past`.

## Repository Layout

```text
content/                         JSON content and authoring guide
resources/                       Shared JavaScript, CSS, and image assets
events/index.html                Local event browsing page
who-we-are.html                  JSON-backed community detail page
event.html                       Reusable event detail page
docs/reference-inventory.md      Backup-to-published asset mapping
backup/                          Read-only reference implementation and assets
```

The files under `backup/` are preserved reference material for the original logo, styles, pages, and event assets. Do not delete or modify them. See [docs/reference-inventory.md](docs/reference-inventory.md) for intentional differences and validation notes.

## Development Notes

- No build step or package installation is required.
- Core rendering uses repository-hosted files only; external links are opened only when a visitor selects them.
- Relative paths must work from both root and nested pages.
- Check the landing page, Local Events page, and event detail page at mobile, tablet, and desktop widths before publishing.
