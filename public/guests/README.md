# Guest headshots

Drop guest headshot images here. They’ll be served at `/guests/<filename>`.

## Naming

Use the guest’s **4-character code** so the app can match them:

- `7A8X.jpg` → Nicholas  
- `Q9LT.jpg` → Gamithra  
- `1KSP.jpg` → Sinead  
- … etc.

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

If `photo` is missing or the URL fails, the app falls back to the DiceBear avatar (generated from the guest code).

## Quick reference: code → name

| Code  | Name                |
|-------|---------------------|
| 7A8X  | Nicholas            |
| Q9LT  | Gamithra            |
| 1KSP  | Sinead              |
| 867B  | John                |
| HOGZ  | Tuna                |
| 5DKN  | Andreas             |
| X0FC  | James               |
| D2N5  | Anouk               |
| OPBO  | Hannah              |
| 0PWT  | Chris               |
| UJJM  | Alex                |
| JJQ4  | Theodore            |
| ZNST  | Francesca           |
| BNDK  | Edward              |
| Y4AJ  | DAVIT               |
| IFOM  | David               |
| PRKQ  | Frederick           |
| OZNU  | Emily               |
| 0AQP  | Aadi                |
| 2RFZ  | Peyman              |
| FDQA  | lewis@cantab.net    |
| Q8AE  | Six                 |
| NAGS  | Joshua              |
| D1UM  | Hoagy               |
| ENGM  | Connor              |
| AGAK  | Matt                |
| HXRY  | Davit               |
| 3FW1  | Asil                |
| BAKS  | Martina             |
| KC6F  | Zarinah             |
| FYWA  | Huda                |
| AAHR  | Alessandro          |
| 9TKV  | Jam                 |
| AKW0  | Alexandra           |
