FROM node:18-alpine3.17 as build

WORKDIR /app

COPY . .
RUN apk add g++ make py3-pip
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:18-alpine3.17 as run

WORKDIR /app

COPY --from=build . . 
RUN apk add g++ make py3-pip
RUN yarn install --frozen-lockfile
RUN yarn build

CMD yarn start

CMD yarn start