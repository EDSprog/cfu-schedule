FROM node:9.8

WORKDIR /app

ADD . /app

RUN npm install 

EXPOSE 8080

CMD ["npm", "start"]
