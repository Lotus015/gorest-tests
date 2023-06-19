FROM node:16.20.0-alpine3.18
WORKDIR /app
COPY . .
RUN npm install -D pactum
RUN npm install -D mocha
ENTRYPOINT ["npm", "run", "test"]