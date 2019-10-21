FROM node:lts as BUILDER

USER root

COPY /package.json /app/package.json
WORKDIR /app

RUN npm install -dd

COPY /src /app

FROM node:lts-alpine as RUNNER

WORKDIR /app

# ENVS
ENV ETCD_URLS ""

# SETUP
COPY --from=BUILDER /app /app

# RUN
CMD [ "npm", "start" ]