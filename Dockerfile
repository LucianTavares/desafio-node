FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .
RUN apk update && apk add --no-cache wget
RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]