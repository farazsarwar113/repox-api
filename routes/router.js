var express = require('express');
var users =  require('../features/users/user.router');
var github =  require('../features/github/github.router');
var gitlab =  require('../features/gitlab/gitlab.router');
// var bitbucket =  require('../features/bitbucket/bitbucket.router');
// var amazon =  require('../features/amazon/amazon.router');
var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../server/verify');

module.exports = function (app, config, models) {
  var router = express.Router();

  router.use('/users',users);
  router.use('/github',github);
  router.use('/gitlab',gitlab);
  // router.use('/bitbucket',bitbucket);
  // router.use('/amazon',amazon);


  app.use('/api', router);
};
