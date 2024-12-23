FROM node:latest AS build
RUN mkdir -p /srv/app
WORKDIR /srv/app/
COPY package.json server.js /srv/app/
RUN npm install

FROM build AS clean
WORKDIR /srv/app
RUN npm ci

FROM alpine:3.20 AS final
RUN apk --no-cache add nodejs
WORKDIR /srv/app
COPY --from=clean /srv/app ./
EXPOSE 4000
ENTRYPOINT ["node","server.js"]
