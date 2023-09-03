# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.14.0

### Base image
##################################################
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src/app
RUN apk add --no-cache git xdg-utils && \
    apk update && \
    apk upgrade && \
    npm install -g npm@latest

### Install dependencies
##################################################
FROM base AS deps

RUN --mount=type=bind,source=package.json,target=package.json,rw \
    --mount=type=bind,source=package-lock.json,target=package-lock.json,rw \
    npm i --force

### Build
##################################################
FROM deps AS build

COPY . .
RUN npm run lint
RUN npm run build

### Final image
##################################################
FROM base AS final

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/ .

EXPOSE 3000

CMD ["npm", "run", "start"]
