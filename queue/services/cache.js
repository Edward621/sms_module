const { promisify } = require('util')
const client = require('../cache/redis');

//return promise instead of call back
const get = promisify(client.hgetall).bind(client);
const set = promisify(client.hmset).bind(client);
const del = promisify(client.hdel).bind(client);

//make list from object
var getObjectList = (messages, keys)=>{
  return keys.reduce(function (r, k) {
      return r.concat(k, messages[k]);
  }, [])
}

//check messages in queueProcessing and move it to ready table.
exports.checkQueue = ()=> {
  var keys = [];
  console.log('Cheking queueProcessing for data...')
  get("queueProcessing")
    .then(messages=>{
      if(messages){
        keys = Object.keys(messages);
        var list = getObjectList(messages, keys);
        console.log('Insert messages to ready table...')
        return set("ready", list);
      } else {
        throw 'There is no messages in queueProcessing table!';
      }
    })
    .then(reply=>{
      if (reply) {
        console.log('Deleting messages from queueProcessing table...')
        return del("queueProcessing", keys)
      }
    })
    .then(reply=>{
      console.log('Deleted messages from queueProcessing table.')
    })
    .catch(err=>{
      console.log(err);
    })
    .finally(() => {
      client.quit();
    });

}
