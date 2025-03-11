# syntax=docker/dockerfile:1
# Docker - Configuration (Production)
# Build Environment
# Base Image
# Better than alpine due to C library dependency
# It may causes problems with Node
# See https://www.rockyourcode.com/dockerize-a-react-app/
# Use node image for base image for all stages
FROM node:18-buster-slim as base
# Working directory
WORKDIR /enefti
# Production dependencies stage
FROM base as deps
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i --omit=dev
# Production build stage
FROM deps as build
# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i
# Copy source files
COPY . .
# Build production version
RUN npm run build
# Production start stage
FROM base as final
# Non-root user run
USER node
# Copy package
COPY package.json .
# Copy production dependencies & build
COPY --from=deps /enefti/node_modules ./node_modules
COPY --from=build /enefti/dist ./dist
# Expore Port
EXPOSE 4000
# Start app
CMD ["npm", "run", "start"]
