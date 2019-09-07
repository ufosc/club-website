FROM node:12

WORKDIR /app/

COPY package*.json /app/

RUN npm install && npm install nodemon -g

COPY server/ /app/server/

COPY server/config/keys.docker.js /app/server/config/keys.js
