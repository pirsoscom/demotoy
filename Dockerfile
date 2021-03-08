FROM node:15.11.0-buster

ENV RELEASE_VERSION=1.0.4 \
    SHELL=/bin/bash

RUN \
  apt-get update && \
  apt-get install  bash g++ make curl nano kafkacat jq && \
  rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /var/cache/distfiles/* && \
  wget https://github.com/openshift/okd/releases/download/4.6.0-0.okd-2021-01-23-132511/openshift-client-linux-4.6.0-0.okd-2021-01-23-132511.tar.gz && \
  tar xfvz openshift-client-linux-4.6.0-0.okd-2021-01-23-132511.tar.gz && \
  mv oc /usr/local/bin && \
  mv kubectl /usr/local/bin/ && \
  rm openshift-client-linux-4.6.0-0.okd-2021-01-23-132511.tar.gz && \
  python3-pip && \
  pip install slack-cleaner2



RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN  npm install \
    && npm audit fix

COPY LICENSE .
COPY public ./public
COPY views ./views
COPY README.md .
COPY scripts ./scripts
COPY app.js .


EXPOSE 3000

CMD ["node", "app.js"]