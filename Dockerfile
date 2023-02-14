FROM node:19-alpine3.15
RUN apk update
WORKDIR /app
COPY package.json package-lock.json index.js /app/
RUN npm ci
EXPOSE 3000
CMD ["node", "index.js"]