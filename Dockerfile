
FROM node:12.16.2-alpine
 
ARG SERVER_PATH=/usr/app
 
RUN mkdir -p ${SERVER_PATH}
WORKDIR =/usr/app/

COPY ./package.json ./tsconfig.json .

RUN npm install --only=prod

RUN npm install typescript

COPY ./src ./src

RUN npm run build

RUN npm uninstall typescript 

RUN rm -rf ./src ./tsconfig.json

WORKDIR ={SERVER_PATH}

EXPOSE 8000 8000
# The docker entry point command

CMD ["npm", "start"]