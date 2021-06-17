const _ = require('lodash');

var config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
}

//merge either development.js | test.js | production.js base on env (by default is development)
var nodeEnv = require(`./${config.env}`);
module.exports = _.merge(config, nodeEnv);
