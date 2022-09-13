FROM node:16.17
 
WORKDIR /app
 
COPY package.json package.json
COPY yarn.lock yarn.lock
 
RUN yarn install --production
 
COPY ./dist dist
 
CMD [ "node", "dist/server.js" ]