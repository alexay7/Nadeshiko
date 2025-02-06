# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json .
RUN npm install

COPY --link . .

RUN npm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production
ENV NUXT_APP_BASE_URL_BACKEND=http://192.168.1.136:3013/api/v1

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
