# eNeFTi

NFT e-commerce storefront and digital asset platform built with **Next.js**, **React**, **TypeScript**, **GraphQL**, and **Node.js** in an **NPM Workspaces** monorepo.

[![eNeFTi CI](https://github.com/lc-2025/enefti/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/ci.yml)
[![eNeFTi CD](https://github.com/lc-2025/enefti/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/cd.yml)

**Live Demo:** [enefti-demo.vercel.app](https://enefti-demo.vercel.app)
> **Note:** Backend services are hosted on Render free-tier containers and may experience cold-start latency on the initial request.

![eNeFTi](./docs/logo.svg "eNeFTi")
![eNeFTi - E-Commerce](./docs/preview.gif "eNeFTi - E-Commerce")

---

## Overview

**eNeFTi** is an end-to-end digital collectibles storefront enabling users to browse paginated NFT catalogs, filter assets by price and ownership, manage persistent wishlists and shopping carts, and simulate checkout flows with persisted purchase history.

### Core Capabilities

- **Catalog Discovery & Filtering:** Browse paginated digital asset listings, inspect token details, search tokens by name, and filter inventory by price range and ownership status.
- **Persistent Cart, Wishlist & Checkout Simulation:** Maintain wishlist and cart state across sessions, execute simulated checkout transactions, and review persisted purchase history in **MongoDB Atlas**.
- **Dual API Layer (GraphQL & REST):** Powered by **Apollo GraphQL** and **Express** to serve structured catalog queries and transactional mutations alongside documented REST endpoints.
- **Adaptive UI & Motion:** Responsive interface built with **Next.js**, **TailwindCSS**, **Headless UI**, and **Motion**, supporting automatic system-detected Light and Dark themes.

---

## System Architecture

The repository is structured as an **NPM Workspaces** monorepo decoupling the Next.js storefront from the containerized GraphQL/REST backend:

```mermaid
flowchart LR
    subgraph Monorepo ["NPM Workspaces Monorepo"]
        FE["frontend/\nNext.js · React · TS\nApollo Client · Tailwind · Motion"]
        BE["backend/\nNode.js · Express · TS\nApollo GraphQL · REST"]
    end

    FE <-- "GraphQL & REST API" --> BE
    BE <-- "Persistence" --> DB[("MongoDB Atlas")]
    FE -- "CI/CD" --> Vercel["Vercel Edge Network"]
    BE -- "Docker Image" --> Render["Render Cloud"]
```

### Repository Layout

```text
enefti/
├── frontend/          # Next.js, React, TypeScript, TailwindCSS, Apollo Client, Motion, Jest, Cypress
├── backend/           # Node.js, Express, TypeScript, Apollo GraphQL, MongoDB Atlas, Jest, Docker
├── docs/              # Documentation assets, brand logo, and preview media
└── .github/workflows/ # Automated CI (lint, unit/E2E tests, build) & CD (Docker -> Render / Vercel)
```

### Engineering Trade-offs

- **Hybrid GraphQL & REST API Architecture:** Combining **Apollo GraphQL** for flexible storefront catalog queries and client-side cache normalization with **Express** REST endpoints provides strict data-fetching efficiency on the UI while preserving straightforward integration and documentation for backend services.
- **End-to-End TypeScript & Code Quality Governance:** Shared TypeScript compilation, ESLint, Prettier, stylelint, and Husky pre-commit hooks enforce consistent code standards across both workspaces before running Jest unit/integration suites and Cypress E2E tests.
- **Decoupled Cloud Deployment:** Automated GitHub Actions CI/CD pipelines validate builds and test suites prior to deploying the frontend storefront to **Vercel** and the containerized backend service via **Docker** to **Render**.

---

## Visual Previews

- **Light Theme:** ![eNeFTi - E-Commerce - Light](./docs/preview.png "eNeFTi - E-Commerce - Light")
- **Dark Theme:** ![eNeFTi - E-Commerce - Dark](./frontend/docs/preview.png "eNeFTi - E-Commerce - Dark")
- **REST API Docs:** ![eNeFTi - Backend - REST](./backend/docs/docs.png "eNeFTi - Backend - REST")
- **GraphQL Playground:** ![eNeFTi - Backend - GraphQL](./backend/docs/docs-1.png "eNeFTi - Backend - GraphQL")

---

## Workspace Documentation

For workspace-specific environment setup, API schemas, Docker Compose workflows, and testing instructions, refer to the dedicated guides:

- **[Frontend Documentation](./frontend/README.md)** — Next.js storefront, Apollo GraphQL client, theme management, Jest & Cypress E2E.
- **[Backend Documentation](./backend/README.md)** — Express & Apollo GraphQL server, MongoDB Atlas persistence, Docker & Render deployment.

---

## Local Development & Scripts

All root scripts orchestrate workspace tasks via NPM Workspaces:

| Command | Scope | Description |
| :--- | :--- | :--- |
| `npm run setup` | All Workspaces | Installs dependencies across root, `frontend`, and `backend` (`--legacy-peer-deps`). |
| `npm run setup:ci` | All Workspaces | Deterministic clean install for CI environments (`npm ci --legacy-peer-deps`). |
| `npm run lint` | `frontend` | Runs ESLint, Stylelint, and Prettier validation on the storefront codebase. |
| `npm run test` | All Workspaces | Executes CI unit and integration test suites across all workspaces (`--ws`). |
| `npm run build` | All Workspaces | Compiles production bundles for both `frontend` and `backend` (`--ws`). |

---

## Copyright & Disclaimer

**All Rights Reserved (`UNLICENSED`).** The source code in this repository is the original work of the author and is published solely for portfolio demonstration and technical evaluation purposes. No license is granted for commercial use, redistribution, or derivative works.

All third-party trademarks, logos, digital asset artwork, and external API references displayed in the application or preview media belong to their respective owners. The author claims no ownership or affiliation with those entities.

All third-party trademarks, logos, digital asset artwork, and external API references displayed in the application or preview media belong to their respective owners. The author claims no ownership or affiliation with those entities.
