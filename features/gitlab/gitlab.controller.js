var User = require('../users/user.model.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var gitlab = require('node-gitlab');

exports.loginGitlab = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    User.findById(req._user._id)
        .exec(function (err, user) {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            client.users.list({username: req.body.username},function (err, data) {
                log(err);
                log(data);
                if(err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Something went wrong. Please try again.',
                        data: err
                    });
                }
                user.gitlab.gl_id = data.id;
                user.gitlab.gl_username = data.username;
                user.save(function (err, updatedUser) {
                    if(err) {
                        return res.status(500).json({
                            success: false,
                            message: 'Something went wrong. Please try again.',
                            data: err
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: 'Successfully login to GitLab.',
                        data: {
                            gitlab: data,
                            user: updatedUser
                        }
                    });
                })

            });
        });
    

};

exports.getAllGitLabRepo = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);

    client.projects.list(function (err, data) {
        log(err);
        log(data);
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully fetched repositories of GitLab.',
            data: {
                gitlab: data
            }
        });
    });
};

exports.getGitLabRepo = function (req,res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    client.projects.get({id: req.params.rid},function (err, data) {
        log(err);
        log(data);
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        client.repository.getTree({id: req.params.rid, path: '/', ref_name: 'master'}, function (err, tree) {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            res.status(200).json({
                success: true,
                message: 'Successfully fetched repository of GitLab.',
                data: {
                    gitlab:{
                        repository: data,
                        contents: tree
                    }
                }
            });
        });

    });
};
exports.addGitLabRepo = function (req,res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    var obj = {
        name: req.body.name,
        decription: req.body.description
    };
    client.projects.create(obj,function (err, data) {
        log(err);
        log(data);
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully add repository of GitLab.',
            data: data
        });
    });
};

exports.updateGitLabRepo = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    var obj = {
        id: req.params.rid,
        description: req.body.description
    };
    client.projects.update(obj,function (err, data) {
        log(err);
        log(data);
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully update repository of GitLab.',
            data: data
        });
    });
};

exports.deleteGitLabRepo = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    client.projects.remove({id: req.params.rid},function (err, data) {
        log(err);
        log(data);
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully deleted repository of GitLab.',
            data: null
        });
    });
};

exports.getRepoMembers = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    client.projectMembers.list({id: req.params.rid},function (err, data) {
        log(err);
        log(data);
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully fetched repository members of GitLab.',
            data: data
        });
    });
};

exports.addRepoMembers = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    client.users.list({username: req.body.username},function (err, user) {

        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        var userId;
        for(var i = 0; i<user.length; i++){
            userId = user[i].id;
        }
        var obj = {
            id: req.params.rid,
            user_id: userId,
            access_level: req.body.access_level
        };

        client.projectMembers.create(obj,function (err, data) {
            log(err);
            log(data);
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again.',
                    data: err
                });
            }
            res.status(200).json({
                success: true,
                message: 'Successfully created repository members of GitLab.',
                data: data
            });
        });
    });
};
exports.deleteRepoMembers = function (req,res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    client.projectMembers.remove({id: req.params.rid, user_id: req.params.mid}, function (err, member) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully remove member from repository GitLab.',
            data: null
        });
    });
};
exports.getRepCommits = function (req, res) {
    var client = gitlab.create({
        api: 'https://gitlab.com/api/v3',
        privateToken: req.body.private_token
    });
    log(client);
    client.repository.getCommits({id: req.params.rid, ref_name: 'master'}, function (err, commits) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'Successfully fetched repository commits of GitLab.',
            data: commits
        });
    });
};