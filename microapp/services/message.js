exports.saveMessages = async (sql, messages)=>{ //save messages in mysql db
  var keys = [];//keys to return for deleting in ready table in redis
  var rows = [];//getting all message rows in array format
  for (let [key, value] of Object.entries(messages)) {
    keys.push(key);
    rows.push([key, value])
  }
  console.log(`Insert messages into "messages" table in mysql...`)
  const queryString = "INSERT INTO messages (phoneNumber, msg) VALUES ?";
  return new Promise((resolve, reject)=>{
    //insert messages into mysql db
    sql.query(queryString, [rows], (err, res) => {
      if (err) {
        reject(err)
      } else {
        console.log(`Messages saved to mysql => ${rows}`);
        resolve(keys);
      }
    });
  });
}
