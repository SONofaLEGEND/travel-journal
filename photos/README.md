# Trip Photos

Upload your trip photos here. Each subfolder corresponds to a trip.

## Folder Structure

```
photos/
├── india/          → used by all india-*.html trip pages
├── uae/            → used by uae-dubai.html
├── ireland/        → used by all ireland-*.html trip pages
├── sri-lanka/      → used by sri-lanka.html
├── central-europe/ → used by central-europe.html
└── bhutan/         → used by bhutan.html
```

## Suggested File Naming per Trip Page

Each trip page expects these images (set via inline `style` attributes on the relevant elements):

| Element              | Suggested filename     | Usage                              |
|----------------------|------------------------|------------------------------------|
| `.trip-hero-bg`      | `cover.jpg`            | Full-bleed hero background         |
| `.photo-break-img`   | `break.jpg`            | Full-width photo break section     |
| `.memoir-image.mi-1` | `mid-1.jpg`            | Left memoir split image            |
| `.memoir-image.mi-2` | `mid-2.jpg`            | Right memoir split image           |
| `.gallery-item.g-1`  | `g1.jpg`               | Gallery item 1 (large, spans 3)    |
| `.gallery-item.g-2`  | `g2.jpg`               | Gallery item 2                     |
| `.gallery-item.g-3`  | `g3.jpg`               | Gallery item 3                     |
| `.gallery-item.g-4`  | `g4.jpg`               | Gallery item 4                     |
| `.gallery-item.g-5`  | `g5.jpg`               | Gallery item 5                     |
| `.gallery-item.g-6`  | `g6.jpg`               | Gallery item 6                     |

## How to Wire Up Images

In each `trips/*.html` file, find the `<style>` block at the top and replace the gradient placeholders:

```css
/* Before */
.trip-hero-bg { background: linear-gradient(160deg, #33322c 0%, #0a0a0a 55%); }

/* After */
.trip-hero-bg { background-image: url('../photos/india/cover.jpg'); background-size: cover; }
```

Or use inline styles directly on the elements:

```html
<div class="trip-hero-bg" style="background-image:url('../photos/india/cover.jpg')"></div>
```

## Image Optimisation Tips

- Resize to max **2400px wide** before uploading (Cloudflare serves them globally anyway)
- Use **JPEG at 80-85% quality** for photos — good balance of size and quality
- Hero/cover images: aim for **under 500KB**
- Gallery images: aim for **under 200KB each**
