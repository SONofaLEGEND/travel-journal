#!/usr/bin/env bash
# cleanup.sh — removes old root-level duplicates after verifying assets/ versions are good.
# Run this ONLY after confirming the site works correctly with the new structure.
# Usage: bash cleanup.sh

echo "Removing old root-level asset duplicates..."

# CSS / JS / Font (now in assets/)
rm -f style.css trip.css globe.css
rm -f script.js trip.js globe.js about.js
rm -f Vilaka.ttf

# Images (now in assets/images/)
rm -f hero.png india.png ireland.png srilanka.png uae.png whoami.png aboutme.png
rm -f 1.jpeg 2.jpeg 3.jpeg 4.jpeg

# Old trip template (replaced by trip-template.html + trips/)
rm -f trip.html

# Empty old srilanka folder
rm -rf srilanka

# Generator script (no longer needed after initial setup)
# rm -f generate-trips.sh  # Uncomment to also remove this

echo "Done. Check the site still works, then commit."
