FROM node:18.16.0

WORKDIR /web

COPY package*.json ./

RUN npm i --force

COPY . .

RUN npm run build

CMD node .output/server/index.mjs