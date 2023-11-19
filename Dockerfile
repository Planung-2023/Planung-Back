FROM node:18.12.1-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "npm","start" ]
