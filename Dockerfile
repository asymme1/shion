FROM node:18-alpine3.17 as build

WORKDIR /app

COPY . .
RUN apk add g++ make py3-pip
RUN npm install --frozen-lockfile
RUN npm run build

FROM node:18-alpine3.17 as run
WORKDIR /app
COPY --from=build . . 
CMD npm start