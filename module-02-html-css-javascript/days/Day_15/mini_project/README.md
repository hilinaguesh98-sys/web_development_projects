# Ethio Telecom Landing Page

This mini-project is a single-page, responsive telecom landing page inspired by Ethio telecom. It presents a connected digital-services experience with a full-screen hero video, animated promotional messages, subscriber statistics, product cards, community initiatives, cybersecurity guidance, impact videos, and a structured footer.

The project is built with plain HTML and CSS. It has no JavaScript, package manager, framework, backend, database, or build step.

## Features

- Full-screen hero section with an autoplaying, muted, looping background video.
- Ethio telecom logo and green navigation bar.
- CSS animated promotional text slider with three messages:
	- Telestream smart streaming
	- Enterprise smart solutions
	- A connected digital Ethiopia
- Hero call-to-action link.
- Subscriber statistics for mobile voice, mobile data, fixed line, Telebirr, fiber, and VSAT.
- Products and services cards for mobile packages, Telebirr SuperApp, and Zemen Gebeya.
- Community section covering education, fundraising, and community support.
- Cybersecurity section covering vishing calls, lost SIM cards, and social engineering.
- Impact section with three embedded YouTube videos.
- Multi-column footer for online services, personal services, business, international services, customer service, and company information.
- Responsive card grids using CSS Grid and flexible wrapping.
- Smooth scrolling and hover states for navigation, calls to action, and cards.

## Technology

- HTML5
- CSS3
- CSS Grid and Flexbox
- CSS keyframe animations
- HTML5 video
- YouTube iframe embeds
- Local image, audio, and video assets

## Getting Started

### Requirements

Only a modern web browser is required. A local HTTP server is recommended for reliable loading of media and consistent browser behavior.

### Open directly

Open [index.html](index.html) in a browser. The page uses relative paths for its stylesheet and local media files.

### Run a local server

From the mini-project directory, start a Python server:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

With Node.js, a static server can also be used:

```bash
npx serve .
```

## Page Sections

| Section | Purpose |
| --- | --- |
| Hero | Introduces digital services with a video background and rotating promotional text |
| Our Subscribers | Displays sample subscriber figures for major telecom services |
| Products & Services | Highlights mobile packages, Telebirr, and Zemen Gebeya |
| Our Community | Presents education, fundraising, and community-support initiatives |
| Cyber Security | Shares awareness content about common fraud and account-safety risks |
| Our Impact | Embeds videos about digital commerce, connectivity, and financial inclusion |
| Footer | Groups placeholder service links by audience and business area |

## Project Structure

```text
mini_project/
├── Assets/
│   ├── logo.png              # Ethio telecom logo
│   ├── ethio.mp4             # Hero background video
│   ├── ethio.mp3             # Audio asset included with the project
│   ├── 3.jpg                 # Product image
│   ├── 4.jpg                 # Product or campaign image
│   ├── 5.jpg                 # Product or campaign image
│   ├── 6.jpg                 # Mobile packages image
│   ├── data.jpg              # Data-related image
│   ├── data (4).jpg          # Zemen Gebeya image
│   ├── c3 (1).jpg            # Community image
│   ├── c3 (2).jpg            # Community image
│   ├── c3 (3).jpg            # Community image
│   ├── cs (1).jpg            # Cybersecurity image
│   ├── cs (2).jpg            # Cybersecurity image
│   └── cs (3).jpg            # Cybersecurity image
├── index.html                # Complete single-page website
├── styles.css                # All layout, typography, color, animation, and responsive styles
└── README.md                 # Project documentation
```

## Design System

The page uses a green-and-white visual direction associated with the Ethio telecom-inspired concept:

- Green `#8DC63F` for navigation, headings, buttons, borders, and highlights.
- White content surfaces and cards.
- Gray footer background with white text.
- Dark text for readable card and section content.
- Rounded corners and soft shadows for statistics and product panels.
- Responsive grids based on `repeat(auto-fit, minmax(...))`.

The main styles are organized around reusable classes such as `.navbar`, `.hero`, `.hero-content`, `.subscribe`, `.products`, `.products-grid`, `.card`, `.video-container`, and `.footer-link`.

## Media and External Content

- The hero uses `Assets/ethio.mp4` as a muted background video.
- `Assets/ethio.mp3` is included but is not currently referenced by `index.html`.
- Product, community, and cybersecurity cards use local JPG files from `Assets/`.
- The impact section embeds three videos from YouTube, so those videos require an internet connection.

## Current Interaction Scope

This is a visual frontend exercise. The following elements are currently presentational:

- Navigation items use `#` placeholders and do not open separate pages.
- The **Read More**, **Download SuperApp**, and **Learn More** buttons do not have destinations or click handlers.
- Subscriber figures are static sample values.
- The hero text slider is a CSS animation, not a JavaScript-controlled carousel.
- Footer links are placeholders.
- There is no login, service ordering, payment, account management, or contact form.

To turn this into a production website, connect each navigation and card action to real routes or external services, replace placeholder content with verified information, and add an accessible interactive menu for mobile users.

## Customization Guide

### Change the hero content

Edit the `.slide` elements in [index.html](index.html). Each slide contains one heading and one supporting paragraph. The current animation uses three slides with a three-second delay between them.

### Change the colors

Update the green values in [styles.css](styles.css), especially the declarations used by `.navbar`, `.hero-btn`, `.subscribe`, `.products`, `.column h4`, and hover states.

### Add a product or campaign card

Copy an existing `.card` inside the relevant section, update its image path, heading, description, and button label, then add the matching asset to `Assets/`.

### Replace embedded videos

Update the `src` values of the three `<iframe>` elements in the **Our Impact** section. Keep descriptive `title` attributes and `allowfullscreen` support for accessibility and usability.

## Validation Checklist

After opening the page, verify:

- The logo and hero video load.
- The promotional text transitions between all three slides.
- The hero call-to-action is visible over the video.
- Subscriber statistic cards display in a responsive grid.
- All local product, community, and cybersecurity images load.
- Product and informational cards remain readable at narrow widths.
- The three YouTube embeds load when internet access is available.
- Footer columns wrap without overlapping on smaller screens.
- Hover states remain visible with sufficient text contrast.

## Future Improvements

- Add real destinations for navigation and call-to-action buttons.
- Add a working responsive menu for mobile navigation.
- Replace static statistics with data from a trusted source.
- Add service detail pages and customer support contact flows.
- Add accessibility improvements such as reduced-motion support and stronger focus styles.
- Optimize the hero video and images for faster loading.
- Add a Content Security Policy and other deployment security headers.
