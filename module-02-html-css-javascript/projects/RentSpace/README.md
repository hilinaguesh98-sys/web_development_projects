# RentSpace

RentSpace is a responsive property-rental web application for discovering homes in Addis Ababa. Visitors can search and filter approved listings, inspect property details, save favorites, contact landlords about viewings, and switch between light and dark themes.

The project also includes browser-based renter and landlord accounts and a local admin dashboard for approving listings, featuring properties, adding listings, deleting listings, and reviewing basic analytics.

RentSpace is a static HTML, CSS, and JavaScript prototype. It does not use a backend or database. Demo users, properties, favorites, inquiries, and sessions are stored in the browser with `localStorage` and `sessionStorage`.

## Features

### Property discovery

- Browse approved rental listings from the home page.
- Search by property title, description, or location.
- Filter by property type and neighborhood.
- View rent, property type, bedrooms, bathrooms, landlord, and location.
- Open a property detail page with an image gallery and similar properties.
- Save and remove properties from Favorites.
- Persist the selected light or dark theme.
- Use responsive navigation on smaller screens.

### Viewing inquiries

From a property detail page, a renter can submit:

- Full name
- Phone number
- Preferred contact method: phone, Telegram, or email
- A message to the landlord

Submitted inquiries are saved locally and show a confirmation message. A viewing is simulated as being available within 24 hours.

### Accounts and landlord profiles

- Register as either a renter or landlord.
- Sign in using a registered email and selected role.
- View a landlord profile and that landlord's listings.
- Landlords viewing their own profile can see inquiries for their properties.

### Admin dashboard

- View total properties, approved listings, featured listings, and inquiries.
- Approve or reject property listings.
- Mark properties as featured.
- Add new properties through the dashboard form.
- Delete properties.
- Sign out of the admin session.

## Technology

- HTML5 for page structure
- CSS3 for responsive layouts, themes, navigation, cards, forms, and admin styling
- Vanilla JavaScript for rendering, filtering, forms, navigation, and storage
- JSON for the initial property catalogue
- Browser `localStorage` and `sessionStorage` for demo persistence

## Getting Started

### Requirements

- A modern web browser
- Python 3, Node.js, or another local HTTP server

The app should be served over HTTP instead of opened directly with `file://`. On startup, `storage.js` fetches `data/properties.json`; many browsers block that request when an HTML file is opened directly.

### Start with Python

From the RentSpace directory:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser.

### Start with Node.js

If a static server such as `serve` is available:

```bash
npx serve .
```

Open the local URL printed in the terminal.

## Main Pages

| Page | File | Purpose |
| --- | --- | --- |
| Home | [index.html](index.html) | Search, filter, and browse approved properties |
| Property details | [property-details.html](property-details.html) | View a listing, similar properties, and send an inquiry |
| Favorites | [favorites.html](favorites.html) | Review saved properties |
| Login | [login.html](login.html) | Sign in as a renter or landlord |
| Registration | [register.html](register.html) | Create a local renter or landlord account |
| Landlord profile | [landlord-profile.html](landlord-profile.html) | View a landlord's listings and, for the owner, received inquiries |
| Admin login | [admin-login.html](admin-login.html) | Enter the local admin portal |
| Admin dashboard | [admin.html](admin.html) | Manage properties and view analytics |

## Typical Renter Flow

1. Open the home page and search for a location, keyword, property type, or neighborhood.
2. Select **View Details** on a property card.
3. Review the gallery, description, rent, features, landlord, and similar listings.
4. Click the favorite button to save the property.
5. Complete the inquiry form with contact details and a viewing message.
6. Open **Favorites** later to return to saved properties.

## Typical Landlord Flow

1. Open [register.html](register.html).
2. Create an account with **Landlord** selected as the account type.
3. Sign in through [login.html](login.html) with the same email and role.
4. Open the landlord profile to view listings associated with the account.
5. Review inquiries received for the landlord's properties.

The account system is only a browser demo. It does not use passwords or provide secure identity verification.

## Admin Demo

Open [admin-login.html](admin-login.html) and use:

```text
Username: hilina
Password: 12345
```

After signing in, the dashboard allows you to manage the local property catalogue. Listing status determines visibility: the public home page displays only properties whose status is `approved`.

## Project Structure

```text
RentSpace/
├── data/
│   └── properties.json       # Initial property catalogue
├── proporty-image/           # Logos, property photos, landlord photos, and hero video
├── index.html                # Public property search page
├── property-details.html    # Property details and inquiry page
├── favorites.html            # Saved properties page
├── login.html                # Renter and landlord login
├── register.html             # Account registration
├── landlord-profile.html    # Landlord listings and inquiries
├── admin-login.html          # Admin sign-in page
├── admin.html                # Admin dashboard
├── styles.css                # Public pages and theme styles
├── admin.css                 # Admin layout and table styles
├── app.js                    # Public page rendering and interactions
├── auth.js                   # Registration and login behavior
├── landlord.js               # Landlord profile rendering
├── admin.js                  # Admin authentication and management
├── nav.js                    # Responsive navigation menu
├── storage.js                # Browser storage abstraction
└── README.md                # Project documentation
```

## Data Model

Properties are loaded from [data/properties.json](data/properties.json). A property can contain:

```json
{
	"id": 1,
	"title": "Modern 4-Bedroom Villa",
	"description": "Property description",
	"price": 65000,
	"type": "villa",
	"location": "Bole",
	"city": "Addis Ababa",
	"bedrooms": 4,
	"bathrooms": 3,
	"status": "approved",
	"featured": true,
	"landlordId": 12,
	"landlordName": "Abebe",
	"images": ["proporty-image/abebe1.jpg"]
}
```

When adding data, keep IDs unique, use image paths relative to the project root, and use `approved` or `rejected` for the listing status. The public catalogue filters out rejected or pending properties.

## Browser Storage

The storage layer centralizes the following keys in [storage.js](storage.js):

| Key | Storage | Purpose |
| --- | --- | --- |
| `rentspace_properties` | `localStorage` | Current property catalogue, including admin changes |
| `rentspace_favorites` | `localStorage` | Favorite property IDs |
| `rentspace_inquiries` | `localStorage` | Submitted viewing inquiries |
| `rentspace_users` | `localStorage` | Registered demo users |
| `rentspace_current_user` | `localStorage` | Current renter or landlord profile |
| `rentspace_admin_session` | `sessionStorage` | Current admin login state |
| `rentspace_theme` | `localStorage` | Light or dark theme preference |

To restore the initial demo state, clear the site's local storage and session storage in browser developer tools, then reload the app. The next startup will seed properties from `data/properties.json` again.

## How the Application Works

1. `storage.js` initializes browser storage and seeds the property catalogue by fetching `data/properties.json`.
2. `app.js` detects the current page and initializes the correct view.
3. The home page reads approved properties, applies search and filter criteria, and renders property cards.
4. Query-string IDs connect property cards to `property-details.html?id=<id>` and landlord cards to `landlord-profile.html?id=<id>`.
5. `auth.js` stores registered users and the current user locally.
6. `admin.js` protects the dashboard with a session flag and updates the local property catalogue.
7. `nav.js` controls the mobile menu and closes it when navigation or resizing requires it.

## Validation Checklist

After starting the local server, verify:

- The property catalogue loads without a fetch error.
- Search matches title, description, and location.
- Type and neighborhood filters work together.
- Favorites remain available after navigating between pages.
- A property detail page opens with the correct `id`.
- An inquiry is saved and appears on the matching landlord profile.
- Registration and login route renters to the home page and landlords to their profile.
- Admin login protects the dashboard.
- Approving, featuring, adding, and deleting a property updates the dashboard.
- The theme survives a page reload.
- Navigation works on both desktop and mobile widths.

## Limitations

This is a frontend prototype and should not be used with real personal data. It does not include:

- A backend API or database
- Secure authentication or password storage
- Server-side authorization
- Real messaging, email, Telegram, or phone integration
- Real property submission workflows for landlords
- Image upload handling
- Production-grade validation or input sanitization
- Cross-device synchronization

For production, replace the storage layer with a backend and database, implement secure authentication, validate and sanitize all input on the server, store media through a managed upload service, and protect admin operations with server-side authorization.
