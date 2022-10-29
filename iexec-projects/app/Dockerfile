FROM node:14
### install your dependencies if you have some
RUN npm install -g yarn
RUN mkdir /app && cd /app && yarn install
COPY ./src /app
ENTRYPOINT [ "node", "/app/app.js"]