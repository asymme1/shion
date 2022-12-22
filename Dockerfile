FROM node:18-alpine3.17 as build

WORKDIR /app
RUN apk add g++ make py3-pip

COPY . .
RUN npm install --frozen-lockfile
RUN npm run build

FROM node:18-alpine3.17 as run
WORKDIR /app
COPY --from=build /app . 
CMD npm start