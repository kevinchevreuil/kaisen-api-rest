FROM node:latest
WORKDIR /srv/app/
COPY . /srv/app
RUN npm install
EXPOSE 4000
ENTRYPOINT [ "npm", "start" ]
