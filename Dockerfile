FROM node:latest
RUN mkdir -p /srv/app
WORKDIR /srv/app/
COPY package.json /srv/app
RUN npm install
COPY . /srv/app
EXPOSE 4000
CMD [ "npm", "start" ]
