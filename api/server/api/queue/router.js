const router = require('express').Router();
const ctrl = require('./controller');

//queue router, when requesting to host:port/queue/
router.route('/')
  .post(ctrl.post);

module.exports = router;
