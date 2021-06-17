const redis = require("redis");
const config = require("../config");

const client = redis.createClient({
  host: config.cache.HOST,
  port: config.cache.PORT
});

client.on("connect", ()=>{
  console.log("connected to redis")
})
client.on("error", function(error) {
  console.error(`redis connection error: ${error}`);
});

module.exports = client;
