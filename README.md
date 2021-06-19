# Simple SMS Module

## Table of Contents

- [Install](#install)
- [Introduction](#introduction)
  - [Mysql](#mysql)
  - [Redis](#redis)
  - [Api](#api)
  - [Queue](#queue)
  - [Microapp](#microapp)
- [Description](#description)
- [How to POST Message](#post-message)
- [Test Outcome](#test-outcome)


## Install

This is a [Docker](https://www.docker.com/) base application.
You need to have [docker](https://docs.docker.com/get-docker/) as well as [docker-compose](https://docs.docker.com/compose/install/) installed in you machine.

Here is how you can clone & run the project:

1- clone from the repository:

```sh
$ git clone https://github.com/Edward621/simple_sms_module.git
```

2- Go to the project root directory:

```sh
$ cd <project-directory>
```

3- run docker compose up:

```sh
$ sudo docker-compose up
```

* if you want to run the system at the background you can use -d option:

```sh
$ sudo docker-compose up -d
```

* to stop runnign the system at the background, simply run:

```sh
$ sudo docker-compose down
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

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"phoneNumber": "6014938293", "msg": "happy go lucky"}' 127.0.0.1:3000/queue
```


## Test Outcome

In order to test the outcome, you need to connect to redis as well as mysql.

1- Test redis outcome:

 * first connect to redis running container:
 
 ```sh
 $ docker exec -it redis bash
 ```
 
 * then connect to redis-cli
 
 ```sh
 $ redis-cli
 ```
 
 * to check all keys and values store in queueProcessing table simply run:

  ```sh
  $ HGETALL queueProcessing
  ```
  
  * similarly for checking keys and values store in ready table run:

  ```sh
  $ HGETALL ready
  ```
  
  Note: Queue & Microapp is running every 5min almost at the same time, so if you don't see anything in ready table, that means Microapp has already saved those     keys and values in mysql and removed it from ready table in redis.
  
  2- Test Mysql outcome:
  
  * first connect to mysql running container:

  ```sh
  $ docker exec -it mysql bash
  ```
  
  * then connect to mysql with these values, user=admin password=admin database=message_service

  ```sh
  $ mysql -uadmin -padmin message_service
  ```
  
  * to select all messages saved to database, run:

  ```sh
  $ SELECT * FROM messages;
  ```
  
  
 
