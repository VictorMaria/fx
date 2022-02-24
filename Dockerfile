FROM node:12.14.1-alpine3.11

RUN mkdir /fx

ADD . /fx

WORKDIR /fx

RUN npm install

RUN npm run build

EXPOSE 2000

CMD ["npm", "start"]