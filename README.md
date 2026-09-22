# IBT Qiyas Academy Portfolio

This repository contains my coursework, exercises, experiments, and projects from the IBT Qiyas Academy software development program. Work is organized by module and, where applicable, by class day.

The repository follows the program from programming fundamentals through frontend development, backend systems, databases, testing, deployment, architecture, and a market-ready sprint.

## Contents

| Module | Focus | Main contents |
| --- | --- | --- |
| [01 - Foundation](module-01-foundation/) | Programming fundamentals | Python exercises, object-oriented programming, and a banking project |
| [02 - HTML, CSS, and JavaScript](module-02-html-css-javascript/) | Web fundamentals | HTML/CSS practice, JavaScript exercises, and browser projects |
| [03 - React and Next.js](module-03-react-nextjs/) | Modern frontend development | React/Next.js lessons, daily implementations, and Addis Eats |
| [04 - Backend](module-04-backend/) | Server-side development | Backend lessons and a mini-project area |
| [05 - Databases](module-05-databases/) | Data storage and querying | Database lessons and a mini-project area |
| [06 - QA and Testing](module-06-qa-testing/) | Software quality | Testing lessons and a mini-project area |
| [07 - DevOps and CI/CD](module-07-devops-ci-cd/) | Delivery and operations | DevOps lessons and a mini-project area |
| [08 - Software Architecture](module-08-software-architecture/) | System design | Architecture lessons and a mini-project area |
| [09 - Market-Ready Sprint](module-09-market-ready-sprint/) | Product development | Sprint work, resources, and the final mini-project area |

Additional planning and submission documents are in [docs/](docs/).

## Featured Projects

### Addis Eats

Addis Eats is the main frontend project in the React and Next.js module. The repository includes both a Vite/React implementation and a later Next.js implementation:

- [Vite/React project](module-03-react-nextjs/project/addis-eats/)
- [Next.js Day 36 project](module-03-react-nextjs/Days/Day_36/addis-eats/)

The Vite version uses React, React Router, Zustand, and Vite. The Next.js version uses Next.js, React, and Tailwind CSS.

### RentSpace

RentSpace is a browser-based property rental project built with HTML, CSS, and JavaScript. Its entry point is [index.html](module-02-html-css-javascript/projects/RentSpace/index.html), with separate pages for authentication, property details, favorites, administration, and landlord profiles.

## Running the Projects

There is no single root-level install command because each runnable application has its own dependencies.

### Prerequisites

- Git
- Node.js and npm for the React and Next.js projects
- A modern web browser for the static HTML/CSS/JavaScript projects

### Run Addis Eats with Vite

From the repository root:

```powershell
Set-Location module-03-react-nextjs/project/addis-eats
npm install
npm run dev
```

Use the local URL printed by Vite. Useful checks for this version are:

```powershell
npm run lint
npm run build
```

### Run Addis Eats with Next.js

```powershell
Set-Location module-03-react-nextjs/Days/Day_36/addis-eats
npm install
npm run dev
```

For a production build:

```powershell
npm run build
npm start
```

### Open the static projects

Static projects can be opened directly in a browser. Start with [RentSpace](module-02-html-css-javascript/projects/RentSpace/index.html), or open any day folder containing an `index.html` file. A small local server is recommended when a project uses browser storage, modules, or fetch requests.

## Repository Layout

```text
.
├── docs/                         # Submission and reflection documents
├── module-01-foundation/         # Python foundations
├── module-02-html-css-javascript/ # Browser fundamentals
├── module-03-react-nextjs/       # React, Next.js, and Addis Eats
├── module-04-backend/             # Backend development
├── module-05-databases/           # Databases
├── module-06-qa-testing/          # Quality assurance and testing
├── module-07-devops-ci-cd/        # DevOps and CI/CD
├── module-08-software-architecture/ # Architecture and design
└── module-09-market-ready-sprint/ # Final product sprint
```

Within the first three modules, `days/` or `Days/` folders contain class exercises, while `project/`, `projects/`, and `mini-project/` folders contain larger pieces of work.

## Working Conventions

- Keep exercises in their corresponding module and day folder.
- Use meaningful commit messages that describe the change.
- Commit and push progress regularly.
- Keep generated dependencies and build output local unless a project explicitly requires them.
- Add project-specific instructions to the nearest project README when a project needs setup beyond the commands above.

## Learning Progression

1. Build programming fundamentals with Python.
2. Learn how webpages are structured and styled.
3. Add interactivity with JavaScript.
4. Build component-based interfaces with React and Next.js.
5. Continue into backend services, databases, testing, deployment, and architecture.
6. Apply the full stack of skills during the market-ready sprint.
