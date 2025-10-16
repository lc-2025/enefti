# eNeFTi - Backend Demo

NFTs E-Commerce backend demo.

![eNefti - Backend - REST](./docs/docs.png 'eNefti - Backend - REST')
![eNefti - Backend - GraphQL](./docs/docs-1.png 'eNefti - Backend - GraphQL')

[![eNeFTi CI](https://github.com/lc-2025/enefti/actions/workflows/ci.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/ci.yml) [![eNeFTi CD](https://github.com/lc-2025/enefti/actions/workflows/cd.yml/badge.svg)](https://github.com/lc-2025/enefti/actions/workflows/cd.yml)

## About

A server application that provides **REST/GraphQL API** to access and manage the e-commerce products data stored on a **NoSQL database** cluster.

© LC. All Rights reserved.

## API Documentation

- The **REST API** documentation is provieded via _Swagger_ at [dedicated endpoint (see)](https://enefti-sha256.onrender.com/docs/rest)
- The **GraphQL API** documentation is accessible via _Apolllo Studio_ at [dedicated endpoint (see)](https://enefti-sha256.onrender.com/graphql)

## Stack

- **Languages**: JavaScript, Typescript, GraphQL, YAML, Bash
- **Environments**: Node.js
- **Libraries**: Apollo GraphQL, Supertest
- **Frameworks**: Express, Jest
- **Linters/Plugins**: ESLint, Prettier
- **Compilers**: Babel, TypeScript
- **Testing**: Jest, Supertest
- **Versioning**: GitHub, Husky
- **Continuous-Integration/Delivery**: GitHub Actions
- **Deployment**: Docker/Compose, GitHub Container Registry, Render
- **Database**: MongoDB Atlas
- **APIs**: CoinGecko

## Getting Started

The project production version is available on _Render_ at [https://enefti-sha256.onrender.com](https://enefti-sha256.onrender.com)
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

_eNeFTi Backend_ is integrated and delivered to production via _GitHub Actions_ workflows pipeline, where the server is being set up, tested, built and containerized with _Docker_.
Then the _Docker_ image is hosted on _GitHub Container Registry_ and deployed on _Render_ production environment available at [https://enefti-sha256.onrender.com](https://enefti-sha256.onrender.com)

## Database

The production database has been populated with mocked data generated via [automated seeding](./src/seed.ts). The process takes advantage of the third-party [CoinGecko API](https://www.coingecko.com/en/api) to provide realistic simulation of e-commerce crypto-related products.
The automated seeding may be tested manually on a [local environment](#environment) via specific script.

On terminal, from project root:

- Seed a _MongoDB_ cluster with 100 NFTs

```bash
npm run seed
```
