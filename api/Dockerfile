FROM node:alpine
ENV NODE_ENV=development

WORKDIR /usr/src/api

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
