const redis = require("redis");
const client = redis.createClient({
  host: "redis",
  port: 6379
});

client.on("connect", ()=>{
  console.log("connected to redis")
})
client.on("error", function(error) {
  console.error(`Connection Error: ${error}`);
});

module.exports = client;
