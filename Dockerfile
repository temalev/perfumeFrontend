FROM node:18.16.0

WORKDIR /web

ARG PUBLIC_API_BASE_URL
ARG NODE_ENV
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./

RUN npm i --force

COPY . .

RUN npm run build

CMD node .output/server/index.mjs