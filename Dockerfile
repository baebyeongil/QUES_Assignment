FROM node:18

WORKDIR /QUES_ASSIGNMENT

RUN npm install --production

COPY . ./

CMD npm run dev