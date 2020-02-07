FROM node:13.8.0-alpine as BUILDER

USER root

COPY /package.json /app/package.json
WORKDIR /app

RUN npm install -dd
RUN npm rebuild

COPY . /app

# ENVS
ENV ETCD_URLS ""
ENV TELEGRAM_TOKEN ""

# RUN
CMD [ "npm", "start" ]