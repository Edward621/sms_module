const { promisify } = require('util')

//get all from ready table in redis if there is any messages
exports.getCache = (client)=>{
  //promisify hgetall instead of call back
  const get = promisify(client.hgetall).bind(client);
  console.log("Checking ready table in redis for messages...")
  return get("ready")
    .then( msgs=>{
      if(msgs) return msgs;
      throw new Error('Redis ready table is empty!')
    })
}

//delete all messages from ready table in redis after being saved in mysql db
exports.emptyCache = (client, keys)=>{
  //promisify hdel instead of call back
  const del = promisify(client.hdel).bind(client);
  console.log(`Deleting saved messages from redis ready table...`)
  return del("ready", keys);
}
