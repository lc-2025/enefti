
# eNefti

NFTs E-Commerce demo.

[![eNefti CI](https://github.com/lc-2025/enefti/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/ci.yml) [![eNefti CD](https://github.com/lc-2025/enefti/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/cd.yml)

## About

A full-stack demo application based on MERN stack consisting of a NFTs e-commerce for demo purposes.

© Luca Cattide 2025. All Rights reserved.

## Features

TBD

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

- Apollo GraphQL

### Frameworks

- React
- NextJS
- TailwindCSS
- Express
- Jest

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

The project production version is available on _Vercel_ at https://
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
