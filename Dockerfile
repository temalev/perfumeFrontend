FROM node:18.16.0

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}

RUN npm i --force

RUN npm run build
CMD node .output/server/index.mjs