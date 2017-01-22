var User = require('../users/user.model.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var github = require('octonode');

exports.loginGitHub = function (req, res) {
  var client = github.client({
    username: req.body.username,
    password: req.body.password
  });

  client.get('/user', {}, function (err, status, body, headers) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong. Please try again.',
        data: err
      });
    }
    var githubData = body;

    User.findById(req._user._id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: null
        });
      }
      log(user);

      user.github.g_id = githubData.id || user.github.g_id;
      user.github.g_username = githubData.login || user.github.g_username;
      
      user.save(function (err, user) {
        if(err) {
          return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.',
            data: err
          });
        }
        res.status(200).json({
          success: true,
          message: 'Successfully login to GitHub.',
          data: {
            github: githubData,
            user: user
          }
        });
      })
    });
  });
};

exports.getGitHubUserData = function (req, res) {
  var client = github.client();
  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: err
      });
    }

    client.get('/users/'+user.github.g_username, {}, function (err, status, data, headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: err
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully fetched user GitHub Data.',
        data: data
      });
    });
  });
};

exports.getAllGitHubRepo = function (req, res) {
  var client = github.client();
  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: null
      });
    }
    var ghuser = client.user(user.github.g_username);
    ghuser.repos(function (err,data,headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: null
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully fetched all GitHub repositories.',
        data: {
          github: data
        }
      });
    });
  });
};
exports.addRepository = function (req, res) {

  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: err
      });
    }
    var client = github.client({
      username: user.github.g_username,
      password: req.body.password
    });
    var ghme = client.me();
    log(ghme);

    ghme.repo({
      "name": req.body.name,
      "description": req.body.description,
    }, function (err,data,headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: err
        });
      }
      log(err);
      log(data);
      log(headers);
      res.status(200).json({
        success: true,
        message: 'Successfully create GitHub repository.',
        data: data
      });
    });
  });

};
exports.getGitHubRepo = function (req, res) {
  var client = github.client();
  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: null
      });
    }
    var ghrepo = client.repo(user.github.g_username+'/'+req.params.repo_name);
    ghrepo.info(function (err,data,headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: null
        });
      }
      ghrepo.contents('', "master", function (err, contents, headers) {
        if (err) {
          return res.status(500).json({
            message: 'Something went wrong while finding contents',
            success: false,
            data: null
          });
        }
        res.status(200).json({
          success: true,
          message: 'Successfully fetched GitHub repository data.',
          data: {
            github: {
              repository: data,
              contents: contents
            }
          }
        });
      });
    });
  });
};
exports.updateRepo = function (req,res) {
  var client = github.client();
  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: err
      });
    }
    var ghrepo = client.repo(user.github.g_username+'/'+req.params.repo_name);
    ghrepo.update({
      "name": req.body.name
    },function (err,data,headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: err
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully update GitHub repository.',
        data: data
      })
    });
  });
};
exports.getRepoContri = function (req, res) {
  var client = github.client();
  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: null
      });
    }
    var ghrepo = client.repo(user.github.g_username+'/'+req.params.repo_name);
    ghrepo.contributors(function (err,data,headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: null
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully fetched GitHub repository contributors.',
        data: data
      })
    });
  });
};
exports.getRepositoryCommits = function (req, res) {
  var client = github.client();
  User.findById(req._user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong while finding user',
        success: false,
        data: null
      });
    }
    var ghrepo = client.repo(user.github.g_username+'/'+req.params.repo_name);
    ghrepo.commits(function (err,data,headers) {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong while finding user',
          success: false,
          data: null
        });
      }
      res.status(200).json({
        success: true,
        message: 'Successfully fetched GitHub repository all commits data.',
        data: data
      })
    });
  });
};