# Simple SMS Module

## Table of Contents

- [Install](#install)
- [Introduction](#introduction)
- [Description](#description)
  - [Mysql](#mysql)
  - [Redis](#redis)
  - [Api](#api)
  - [Queue](#queue)
  - [Microapp](#microapp)

- [How to POST Message](#post-message)


## Install

This is a [Docker](https://www.docker.com/) base application.
You need to have [docker](https://docs.docker.com/get-docker/) installed in you machine.

Here is how you can clone & run the project:

1- clone from the repository:

```
git clone https://github.com/Edward621/simple_sms_module.git
```

2- Go to the project root directory:

```
cd <project-directory>
```

3- run docker compose up:

```
sudo docker-compose up
```

* if you want to run the system at the background you can use -d option:

```
sudo docker-compose up -d
```

* to stop runnign the system at the background, simply run:

```
sudo docker-compose down
```


## Introduction
Few Images work together to create this Simple SMS module.

### [Mysql](https://hub.docker.com/_/mysql)
  * SQL database used to save messages.

### [Redis](https://hub.docker.com/_/redis)
  * In-memory data structure store to Cache incoming messages.

### Api
  * Receive messages via Http POST request, and save it to queueProcessing table.

### Queue
  * Check queueProcessing table every 5min, and if there is any message in it, get and save it to ready table in cache.

### Microapp
  * Check ready table every 5min, and if there is any message in it, get and save it to messages table in mysql database.


## Description
Send message with two params (phoneNumber, msg) via http POST request, save message in queueProcessing in redis cache.
Check every 5min to see if there is any message in queueProcessing, if yes, move it to ready table in redis cache.
Check ready table in redis cache every 5min to see if there is any message, if yes, save it to messages table in message_service in mysql database.

## Post Message

You can use your desired platform to send message to the api application.
e.g. Using terminal:

```
curl -X POST -H "Content-Type: application/json" -d '{"phoneNumber": "6014938293", "msg": "happy go lucky"}' 127.0.0.1:3000/queue
```
