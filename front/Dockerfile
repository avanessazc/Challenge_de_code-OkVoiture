FROM alpine:3.15

WORKDIR /usr/src/app/front

RUN apk add vim && \
    apk add --update nodejs npm

COPY package*.json ./

RUN npm install

# COPY .env ./
COPY tsconfig.json ./
COPY . .
