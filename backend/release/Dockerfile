# Docker - Configuration (Production)
# Build Environment
# Base Image
# Better than alpine due to C library dependency
# It may causes problems with Node
# See https://www.rockyourcode.com/dockerize-a-react-app/
FROM node:14-buster-slim as build
# Working directory
WORKDIR /enefti
# Copy source files
COPY . .
# Install dependencies & build production version
RUN npm i && npm run build
# Start app
CMD ["npm", "run", "start"]
