# Habesha Eatery

Habesha Eatery is a responsive multi-page restaurant website for an Ethiopian dining experience in Bole, Addis Ababa. The site presents the restaurant's story, signature dishes, contact information, table reservation form, and a visual menu of traditional Ethiopian food.

This is a static HTML and CSS project. It does not require a framework, package manager, JavaScript runtime, backend, or database.

## Features

- Full-screen restaurant hero section with a food image background.
- Responsive navigation with a mobile hamburger menu built with HTML and CSS.
- Home page introduction and featured dishes.
- Menu page with Ethiopian dishes, descriptions, images, badges, and ETB prices.
- About page describing the restaurant's mission, signature dishes, and values.
- Contact page with address, phone, email, contact form, and embedded Google Map.
- Reservation page with fields for guest details, date, time, number of guests, and special requests.
- Responsive card grids that adapt from one column on mobile to three columns on large screens.
- Shared color variables, spacing, buttons, cards, forms, and footer styling in one stylesheet.

## Technology

- HTML5
- CSS3
- CSS Grid and Flexbox
- CSS custom properties for the color palette and spacing system
- Embedded Google Maps iframe on the contact page

## Getting Started

### Requirements

Only a modern web browser is required. A local HTTP server is recommended for consistent behavior, but the pages can also be opened directly from the file system because the project uses relative HTML, CSS, and image paths.

### Open directly

Open [index.html](index.html) in a browser. Use the navigation links to move between the pages.

### Run a local server

From the Habesha Eatery directory, use Python:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

If Node.js is installed and a static server is available, this also works:

```bash
npx serve .
```

## Site Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | [index.html](index.html) | Introduces the restaurant, highlights selected dishes, and links to the menu and reservation pages |
| Menu | [menu.html](menu.html) | Displays the complete menu with descriptions, dish images, and prices |
| About | [about.html](about.html) | Explains the restaurant's story, mission, signature dishes, and reasons to visit |
| Contact | [contact.html](contact.html) | Shows contact information, a message form, and a Google Maps location |
| Reservation | [reservation.html](reservation.html) | Provides a table reservation form |

## Restaurant Information

The site currently presents the following restaurant details:

- **Location:** Bole, Addis Ababa, Ethiopia
- **Phone:** +251 911 123 456
- **Email:** habeshaeatery@gmail.com
- **Cuisine:** Authentic Ethiopian food and traditional coffee

## Menu

The menu page currently includes:

| Dish | Price |
| --- | ---: |
| Doro Wat | 1000 ETB |
| Shekla Tibs | 700 ETB |
| Beef Tibs | 600 ETB |
| Key Wot | 500 ETB |
| Beyaynetu | 400 ETB |
| Shiro Wat | 300 ETB |
| Alcha Kik | 200 ETB |
| Misir Wot | 200 ETB |

Dish content is written directly in `menu.html`. To add or update a dish, edit the corresponding card and place its image in the `assets/` folder.

## Project Structure

```text
Habesha_eatery/
├── assets/
│   ├── main.png             # Home page hero image
│   ├── doro wot.png        # Dish image assets
│   ├── shekla tibs.png
│   ├── beef tibs.png
│   ├── keywot.png
│   ├── beya.png
│   ├── shiro wat.png
│   ├── alcha kk.png
│   └── misr wot.png
├── index.html               # Home page
├── menu.html                # Full menu
├── about.html               # Restaurant information
├── contact.html             # Contact details and map
├── reservation.html         # Table reservation form
├── styles.css               # Shared responsive styles
└── README.md                # Project documentation
```

## Design and Styling

The visual design is defined in [styles.css](styles.css). The site uses warm, earthy colors that match the restaurant theme:

- Brown primary and secondary colors for buttons and headings
- Cream background for the page surface
- White content cards with soft shadows
- Dark brown footer
- Rounded cards and controls
- Responsive breakpoints at approximately 768px and 1100px

The `.page` wrapper creates the full-page layout, while reusable classes such as `.navbar`, `.hero-btn`, `.menu-grid`, `.card`, `.contact`, and `.reserve` keep the pages visually consistent.

## Forms and Current Behavior

The contact and reservation forms are currently presentation-only HTML forms. They include required fields and browser-native validation, but they do not submit to a server or save data. To make them functional in production, connect each form to a backend endpoint or a trusted form-processing service and add success and error states.

The Privacy Policy and Terms of Service links are placeholders using `#` and should be replaced with real policy pages before deployment.

## Responsive Behavior

- On desktop, the navigation is displayed horizontally.
- On smaller screens, the CSS checkbox and hamburger label control the mobile navigation state.
- Menu cards use one column on small screens, two columns on medium screens, and three columns on wide screens.
- Images scale to their containing elements with `max-width: 100%`.
- Forms and content sections use constrained widths so they remain readable on large screens.

## Validation Checklist

After opening the site, verify:

- Every navigation link opens the intended page.
- The hero image and all menu images load correctly.
- The menu displays all dishes and prices.
- The reservation form prevents submission when required fields are empty.
- The contact form validates required fields and email format.
- The Google Map appears on the contact page when internet access is available.
- The hamburger navigation is usable on a narrow viewport.
- Menu cards reflow correctly at mobile, tablet, and desktop widths.
- Footer links and contact information remain readable in every layout.

## Future Improvements

Possible next steps include:

- Connect reservations to a backend or email service.
- Connect contact messages to a support inbox.
- Add an online ordering or delivery workflow.
- Add a real privacy policy and terms page.
- Improve form success and error feedback.
- Add structured menu data so dishes can be maintained without editing repeated HTML.
- Add automated accessibility and responsive layout checks.
