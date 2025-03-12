# eNefti - Backend Demo

NFTs E-Commerce backend demo.

## About

A server application that provides **REST/GraphQL API** to access and manage the e-commerce products data stored on a **NoSQL database** cluster.

© Luca Cattide 2025. All Rights reserved.

## API Documentation

The **REST API** documentation is provieded via _Swagger_ at [dedicated endpoint (see)](https://enefti-sha256.onrender.com/docs/rest)
The **GraphQL API** documentation is accessible via _Apolllo Studio_ at [dedicated endpoint (see)](https://enefti-sha256.onrender.com/graphql)

## Stack

### Languages

- JavaScript
- TypeScript
- GraphQL
- YAML
- Bash

### Environments

- NodeJS

### Libraries

- Apollo GraphQL

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

- Jest

### Versioning

- GitHub

### Content-integration/Delivery

- GitHub Actions

### Deployment

- Docker/Compose
- Render

### Data storage

- MongoDB Atlas

### APIs

- CoinGecko

## Getting Started

The project production version is available on _Heroku_ at https://
For any contribution, maintanance and/or trial needs, please refer to the following specifications.

### Environment

In order to manage `development` or `production` versions, please set the proper `.env | .env.*` root file according to the distribution guidelines contained in the `.env.dist` version.
The environment configuration contains the core info required by the server in order to start and communicate with the database. Live data resides on a _MongoDB Atlas_ cluster. For any local test, please provide the expected _MongoDB_ one.

### Server

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

#### Unit/Integration

On terminal, from project root:

- To run the tests in `development` mode

```bash
npm run test
```

- To run the tests in `testing` mode (staging or content-integration/delivery environments)

```bash
npm run test:ci
```

### Using Docker

You may use Docker to build the container and run the image required in the deployment step.

On terminal, from project root:

- Build the image and run the container

```bash
docker-compose up -d --build
```

- Stop the container

```bash
docker-compose stop
```

## Deploy

TBD

## Storage

The production database has been populated with mocked data generated via [automated seeding](./src/seed.ts). The process takes advantage of the third-party [CoinGecko API](https://www.coingecko.com/en/api) to provide realistic simulation of e-commerce crypto-related products.
The automated seeding may be tested manually on a [local environment](#environment) via specific script.

On terminal, from project root:

- Seed a _MongoDB_ cluster with 100 NFTs

```bash
npm run seed
```

## Contributing

Please read more about required best practices on the specific [contributing reference document](../.github/CONTRIBUTING.md)
