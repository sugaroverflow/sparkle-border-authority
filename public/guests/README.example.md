# Guest headshots

Drop guest headshot images here. They’ll be served at `/guests/<filename>`.

## Naming

Use each guest’s **4-character immigration code** as the filename (you’ll find these in your guest list data), e.g.:

- `7A8X.jpg`
- `Q9LT.png`

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

## Wiring photos in the app

Update each guest’s `photo` field in `data/guests.json` (source of truth). `public/guests.json` is generated from it.

**Local headshots (files in this folder):**

```json
"photo": "/guests/7A8X.jpg"
```

**External URL (e.g. hosted elsewhere):**

```json
"photo": "https://example.com/path/to/headshot.jpg"
```

If `photo` is missing or the URL fails, the app falls back to a generated avatar.

---

For a **private** code→name reference (do not commit), keep a local `README.md` in this folder with your guest list table.
