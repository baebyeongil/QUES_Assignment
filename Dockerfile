FROM node:18-alpine

WORKDIR /QUES_ASSIGNMENT

COPY package*.json ./

RUN npm install --production

COPY . ./

CMD ["/usr/local/bin/node", "/QUES_ASSIGNMENT/node_modules/@babel/node/lib/_babel-node", "app.js"]