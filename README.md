## The Lightsmith Website

Static marketing site for The Lightsmith headlight restoration service.

### Local development
- Open the root folder in your editor.
- Serve with any static server (VS Code Live Server, `python -m http.server`, etc.).

### Google Reviews carousel
1. Enable the Places API (new v1) in your Google Cloud project.
2. Create an API key restricted to your domain(s) and to the Places API.
3. Paste the values in `reviews.html` and `index.html`:
   ```html
   <meta name="google-places-api-key" content="YOUR_KEY">
   <meta name="google-places-place-id" content="YOUR_PLACE_ID">
   ```
   Use the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder) to grab your Place ID once the business listing is live.

### Analytics
- Google Analytics: create a GA4 property and add the Measurement ID to each page head:
  ```html
  <!-- Replace G-XXXXXXX with your Measurement ID -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  </script>
  ```
- Privacy-friendly option: [Plausible](https://plausible.io/) – after creating an account paste their `<script data-domain="lightsmith.llc" src="https://plausible.io/js/script.js" defer></script>` tag into the head.

### Social sharing image
- Default preview lives at `images/social-preview.png` (1200×630). Replace it with your own branded artwork to control link previews on Facebook/X/LinkedIn.

### SEO helpers
- `sitemap.xml` and `robots.txt` are included – submit the sitemap in Google Search Console once deployed.
- Structured data is already embedded (LocalBusiness + FAQPage).

### Image assets
- Optimised gallery images are stored in `images/gallery/` (1600×1200 JPEG).
- Favicons and PWA manifest live in `images/` and `manifest.webmanifest`.
