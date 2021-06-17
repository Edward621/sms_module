FROM node:alpine

WORKDIR /usr/src/microapp
COPY . .

RUN npm install

RUN apk upgrade --available && apk add openrc busybox-initscripts

RUN chmod a+x ./bin/run

RUN echo "*/5 * * * * /usr/src/microapp/bin/run" >  /etc/crontabs/root

CMD ["/usr/sbin/crond", "-f"]
