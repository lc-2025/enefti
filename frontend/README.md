# eNeFTi - Frontend Demo

NFTs E-Commerce frontend demo.

[![eNeFTi CI](https://github.com/lc-2025/enefti/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/ci.yml) [![eNeFTi CD](https://github.com/lc-2025/enefti/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/cd.yml)

## About

A front-end application consisting of a NFTs e-commerce populated and managed by a dedicated back-end.

© Luca Cattide 2025. All Rights reserved.

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

### Libraries

- Heroicons
- Headless UI
- Apollo GraphQL

### Frameworks

- React
- NextJS
- TailwindCSS
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

## Getting Started

The project production version is available on _Render_ at [https://enefti-demo.vercel.app](https://enefti-demo.vercel.app)
For any contribution, maintanance and/or trial needs, please refer to the following specifications.

### Environment

In order to manage `development` or `production` versions, please set the proper `.env | .env.*` root file according to the distribution guidelines contained in the `.env.dist` version.
The environment configuration contains the core info required by the client in order to start and communicate with the database, as well as perform End-To-End testing. For any local test, please provide the expected one.

### Client

On terminal, from project root:

- To run in `development` mode

```bash
npm run dev
```

- To build the production version

```bash
npm run build
```

- To run in `production` mode

```bash
npm run start
```

### Tests

#### Unit/Integration/End-To-End

On terminal, from project root:

- To run the unit/integration tests in `development` mode

```bash
npm run test
```

- To run the end-to-end tests in `development` mode

```bash
npm run cypress:open
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments)

```bash
npm run test:ci
```

## Deploy

_eNeFTi Frontend_ is integrated and delivered to production via _GitHub Actions_ workflows pipeline, where the client is being set up, tested and built.
Then the artifacts are deployed on _Vercel_ production environment available at [https://enefti-demo.vercel.app](https://enefti-demo.vercel.app)

## Contributing

Please read more about required best practices on the specific [contributing reference document](../.github/CONTRIBUTING.md)
