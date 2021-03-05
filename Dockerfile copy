FROM node:8-alpine

ENV RELEASE_VERSION=1.0.4 \
    SHELL=/bin/bash

RUN \
  apk add --update bash g++ make curl && \
  curl -o /tmp/stress-${RELEASE_VERSION}.tgz https://fossies.org/linux/privat/stress-${RELEASE_VERSION}.tar.gz && \
  cd /tmp && tar xvf stress-${RELEASE_VERSION}.tgz && rm /tmp/stress-${RELEASE_VERSION}.tgz && \
  cd /tmp/stress-${RELEASE_VERSION} && \
  ./configure && make -j$(getconf _NPROCESSORS_ONLN) && make install && \
  apk del g++ make curl && \
  rm -rf /tmp/* /var/tmp/* /var/cache/apk/* /var/cache/distfiles/*


RUN wget https://github.com/openshift/okd/releases/download/4.6.0-0.okd-2021-01-23-132511/openshift-client-linux-4.6.0-0.okd-2021-01-23-132511.tar.gz && tar xfvz openshift-client-linux-4.6.0-0.okd-2021-01-23-132511.tar.gz && mv oc /usr/local/bin && mv kubectl /usr/local/bin/ && rm openshift-client-linux-4.6.0-0.okd-2021-01-23-132511.tar.gz


RUN mkdir /app
WORKDIR /app

COPY package.json .

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && npm audit fix \
    && apk del build-dependencies

COPY LICENSE .
COPY README.md .
COPY public ./public
COPY views ./views
COPY scripts ./scripts
COPY app.js .


EXPOSE 3000

CMD ["node", "app.js"]
