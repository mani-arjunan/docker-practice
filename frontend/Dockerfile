FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
# RUN npm test

EXPOSE 3000

CMD [ "npm", "start" ]