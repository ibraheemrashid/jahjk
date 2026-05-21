# Jamiat Ahle Hadees JK — Redesigned Website

## Project Overview
A complete single-page application (SPA) redesign of jahjk.org with an Islamic aesthetic.
All 27 pages are contained in `index.html` and navigate internally via JavaScript — no page reloads.

## File Structure
```
jahjk-website/
├── index.html          ← Main SPA (all 27 pages)
├── README.md
├── src/
│   ├── app/
│   │   ├── router.js       ← Page routing logic (extracted)
│   │   ├── carousel.js     ← Carousel component
│   │   ├── salah.js        ← Prayer times & live clock
│   │   └── reveal.js       ← Scroll reveal animations
│   └── assets/
│       ├── css/
│       │   └── main.css    ← All styles (extracted)
│       └── images/
│           └── (add your photos here for carousel)
└── pages/              ← Individual page HTML snippets (for Angular/React integration)
    ├── home.html
    ├── smert.html
    ├── aims.html
    ├── about.html
    ├── constitution.html
    ├── events.html
    ├── fatwa-form.html
    ├── ifta-board.html
    ├── fatwa-status.html
    ├── waqf.html
    ├── waqf-reg.html
    ├── waqf-unreg.html
    ├── waqf-darasgah.html
    ├── waqf-other.html
    ├── friday.html
    ├── schools.html
    ├── colleges.html
    ├── madarsa.html
    ├── masjid.html
    ├── kuliyat-boys.html
    ├── kuliyat-girls.html
    ├── markaz-ibn.html
    ├── markaz-aisha.html
    ├── sunday.html
    ├── books.html
    ├── new-pub.html
    └── weekly.html
```

## How to Use
**As a standalone site:** Just open `index.html` in any browser. No build step needed.

**For Angular integration:** Each file in `pages/` is the HTML content for its Angular component. Copy the styles from `src/assets/css/main.css` into your `styles.scss`. Copy each JS module from `src/app/*.js` into Angular services.

**To add real photos to the carousel:**
Replace any `<div class="slide-ph">` block with:
```html
<img src="assets/images/your-photo.jpg" alt="Description"
     style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">
```

## Fonts Used
- Cinzel (headings)
- Cormorant Garamond (body)
- Amiri (Arabic text)
All loaded via Google Fonts — no installation needed.

## Colour Palette
| Name         | Hex       | Usage                    |
|--------------|-----------|--------------------------|
| Green Deep   | #0d2818   | Darkest bg, topbar       |
| Green Dark   | #133a22   | Nav, dark sections       |
| Green Mid    | #1a5c34   | Primary buttons, accents |
| Green Accent | #2a8a52   | Hover states             |
| Gold         | #c9a84c   | Dividers, highlights     |
| Gold Light   | #e8c97a   | Hero text, dark bg text  |
| Cream        | #faf7ef   | Page background          |

## Pages (27 total)
| Route         | Page                         |
|---------------|------------------------------|
| home          | Home / Landing               |
| smert         | SMERT — Structure & Aims     |
| aims          | Aims & Objectives            |
| about         | About Us                     |
| constitution  | Our Constitution             |
| events        | Events & Programmes          |
| fatwa-form    | Submit a Fatwa Question      |
| ifta-board    | Ifta Board                   |
| fatwa-status  | Check Fatwa Status           |
| waqf          | Waqf-I-Tanzeem               |
| waqf-reg      | Registered Masajid           |
| waqf-unreg    | Unregistered Masajid         |
| waqf-darasgah | Darasgah & Institutions      |
| waqf-other    | Other Properties             |
| friday        | Friday Khutba Schedule       |
| schools       | Schools                      |
| colleges      | Colleges                     |
| madarsa       | Madarsas                     |
| masjid        | Masjids                      |
| kuliyat-boys  | Al Kulyat us Salafia (Boys)  |
| kuliyat-girls | Al Kulyat us Salafia (Girls) |
| markaz-ibn    | Markaz Ibn Masood            |
| markaz-aisha  | Markaz Aisha                 |
| sunday        | Sunday / Vocational Classes  |
| books         | Books Published              |
| new-pub       | New Publications             |
| weekly        | Weekly Muslim Archive        |
