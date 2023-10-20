FROM node:18.12.1-alpine
RUN npm install -g ts-node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm","start" ]


