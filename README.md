# eNeFTi

NFTs E-Commerce demo.

![eNefti](./docs/preview.png "eNefti")

[![eNeFTi CI](https://github.com/lc-2025/enefti/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/ci.yml) [![eNeFTi CD](https://github.com/lc-2025/enefti/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/cd.yml)

## About

A full-stack application based on MERN consisting of a NFTs e-commerce for demo purposes.

© Luca Cattide 2025. All Rights reserved.

## Features

- Catalogue pagination and details displaying
- NFTs filtering by price and ownership
- Products wishlist and cart persistence
- Checkout simulation and storage
- Persisting purchases history
- Token search by name
- Light/Dark theme with system-detection support

## Stack

### Languages

- HTML
- CSS
- SASS
- JavaScript
- TypeScript
- GraphQL
- YAML
- Bash

### Environments

- DOM
- NodeJS

### Libraries

- Heroicons
- Headless UI
- Apollo GraphQL

### Frameworks

- React
- NextJS
- TailwindCSS
- Express
- Jest
- Cypress

### Pre/Post-Processors

- PostCSS
- Sass

### Linters/Plugins

- stylelint
- ESLint
- Prettier

### Compilers

- Babel
- TypeScript

### Testing

- Jest
- Cypress

### Versioning

- GitHub

### Content-integration/Delivery

- GitHub Actions

### Deployment

- Docker/Compose
- Vercel
- Render

### Data storage

- MongoDB Atlas

## Getting Started

The project production version is available on _Vercel_ at [https://enefti-demo.vercel.app](https://enefti-demo.vercel.app)
For any contribution, maintanance and/or trial needs, please refer to the following specifications and side-ones:

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)

## Repository

The project reflects a monolithic setting - monorepo - using _NPM Workspaces_ to organize both frontend than backend sides.
Workspaces may be globally managed accordingly to the following specifications.

## Setting Up

On terminal, from project root:

- To install dependencies for all the workspaces:

```bash
npm run setup
```

- To build the production version of all the workspaces:

```bash
npm run build
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments) on all the workspaces:

```bash
npm run test:ci
```

## Contributing

Please read more about required best practices on the specific [contributing reference document](./.github/CONTRIBUTING.md)
