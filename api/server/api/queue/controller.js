const client = require('../../cache/redis');


exports.post = function(req, res, next) {
  //check if post params is sending correctly
  if (req.body && req.body.hasOwnProperty('phoneNumber') && req.body.hasOwnProperty('msg')) {
    const {phoneNumber, msg} = req.body;
    console.log(`post to ":3000/queue" variables: phoneNumber=>${phoneNumber}, msg=>${msg}`);

    console.log('Saving in queueProcessing...');
    client.hmset("queueProcessing", [phoneNumber, msg], (err, reply)=>{
      if (err) {
        //redis catch error
        next(new Error('Something went wrong while saving in queueProcessing!'));
      } else {
        console.log('Values saved in queueProcessing table.')
        res.status(201).end();
      }
    });

  } else {
    req.errStatus = 400;
    next(new Error('phoneNumber & msg are required.'))
  }
}
