const cache = require('./dbs/redis');
const sql = require('./dbs/mysql');

const { getCache, emptyCache } = require('./services/cache');
const { saveMessages } = require('./services/message');

async function main() {
  try {
    var messages = await getCache(cache)//get messages from ready table in redis
    var keys = await saveMessages(sql, messages);//save messages into mysql db
    await emptyCache(cache, keys);//delete messages from ready table in redis
  }
  catch(err) {
    console.log(err.message);
  }
  finally {
    cache.quit();
    sql.end();
  }
}

main();
