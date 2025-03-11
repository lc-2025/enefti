# eNefti - Backend Demo

NFT E-Commerce backend demo.

## About

A server application that provides **REST/GraphQL API** to access and manage the e-commerce products data stored on a **MongoDB Atlas** cluster.

© Luca Cattide 2025. All Rights reserved.

## API

The **REST API** documentation is provieded via _Swagger_ at [dedicated endpoint (see)](https://:4000/docs/rest)
The **GraphQL API** documentation is accessible via _GraphQL UI_ at [dedicated endpoint (see)](https://:4000/graphql)

## Stack

### Languages

- JavaScript
- TypeScript
- GraphQL
- Bash

### Environments

- NodeJS

### Frameworks

- Express
- Jest

### Linters/Plugins

- ESLint
- Prettier

### Compilers

- Babel
- TypeScript

### Testing

- Jest (Unit)

### Versioning

- Husky
- GitHub

### Content-integration/Delivery

- GitHub Actions

## Deploy

- Docker/Compose
- Heroku

## Getting Started

### Environment

Please set the proper `.env` root file according to the distribution guidelines contained in the `.env.dist` version.

### Server

On terminal, from project root:

- To run in `development` mode

```bash
npm run dev
```

- To run in `production` mode

```bash
npm run start
```

- To build the production version

```bash
npm run build
```

### Testing

#### Unit

To run the tests:

```
npm run test
```

### Using Docker

You may use Docker to build the container and run the image required in the deployment step.

Build the image and run the container:

```bash
docker-compose up -d --build
```

Stop the container:

```bash
docker-compose stop
```

## Deployment

TBD

## Contributing

Please read more about required best practices on the specific [contributing reference document](../.github/CONTRIBUTING.md)
