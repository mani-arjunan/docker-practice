FROM node:alpine
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 8000
CMD node index.js