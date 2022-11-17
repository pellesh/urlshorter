FROM node:alpine

WORKDIR /usr/src/server

COPY . .
RUN npm ci

EXPOSE ${EXPRESS_PORT}
CMD [ "npm", "run", "start" ]