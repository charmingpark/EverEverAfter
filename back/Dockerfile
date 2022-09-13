# syntax=docker/dockerfile:1\
FROM node:16.17
WORKDIR /home/node
COPY ./dist/ /home/node/.
COPY ./package.json /home/node/
COPY ./yarn.lock /home/node/
RUN yarn install --production
CMD ["node", "server.js"]
EXPOSE 8000