var express = require('express');
var router = express.Router();
var gitlabCtrl = require('./gitlab.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//login to gitlab
/**
 * @api {post} api/gitlab/login GitLab Login
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiVersion 0.1.0
 * @apiName GitLab Login
 * @apiGroup GitLab
 *  * @apiDescription This api is used to login into the gitlab account to sync user gitlab account.
 *    In body username and private token (which can be found on gitlab account setting) of GitLab account should be given.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully login to GitLab account",
 *        "success": true,
 *        "data": {
 *            gitlab_user : ""
 *        }
 *     }
 */
router.route('/login')
    .post(verify.user, verify.unseal, gitlabCtrl.loginGitlab);

// router.route('/me/:id')
//     .get(verify.user, githubCtrl.getGitHubUserData);
//
/**
 * @api {get} api/gitlab/repositories GitLab Repositories
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiVersion 0.1.0
 * @apiName GitLab Repositories
 * @apiGroup GitLab
 *  * @apiDescription This api is used to get all gitlab repositories of logged in user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched all GitLab repositories",
 *        "success": true,
 *        "data": {
 *            repositories : [{
 *
 *            }]
 *        }
 *     }
 */
router.route('/repositories')
    .post(verify.user,verify.unseal, gitlabCtrl.getAllGitLabRepo);
/**
 * @api {post} api/gitlab/repositories/add Add GitLab Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiVersion 0.1.0
 * @apiName Add GitLab Repository
 * @apiGroup GitLab
 *  * @apiDescription This api is used to add gitlab repository. In body name, description, private: boolen should be passed.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully added GitLab repository",
 *        "success": true,
 *        "data": {
 *            repository : {
 *
 *            }
 *        }
 *     }
 */
router.route('/repositories/add')
    .post(verify.user,verify.unseal, gitlabCtrl.addGitLabRepo);
/**
 * @api {get} api/gitlab/repositories/:rid Get GitLab Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitLab Repository
 * @apiGroup GitLab
 *  * @apiDescription This api is used to get specific gitlab repository.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched GitLab specific repository data",
 *        "success": true,
 *        "data": {
 *            repository : {
 *
 *            },
 *            file_tree: [{}]
 *        }
 *     }
 */

/**
 * @api {put} api/gitlab/repositories/:rid Update GitLab Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Update GitLab Repository
 * @apiGroup GitLab
 *  * @apiDescription This api is used to update specific gitlab repository. In body name, description, private: boolen should be passed.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully updated GitLab repository data",
 *        "success": true,
 *        "data": {
 *            repository : {
 *
 *            }
 *        }
 *     }
 */

/**
 * @api {delete} api/gitlab/repositories/:rid Delete GitLab Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Delete GitLab Repository
 * @apiGroup GitLab
 *  * @apiDescription This api is used to delete specific gitlab repository.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully deleted GitLab repository",
 *        "success": true,
 *        "data": null
 *     }
 */
router.route('/repositories/:rid')
    .post(verify.user,verify.unseal, gitlabCtrl.getGitLabRepo)
    .put(verify.user,verify.unseal, gitlabCtrl.updateGitLabRepo)

router.route('/repositories/:rid/delete')
    .post(verify.user,verify.unseal, gitlabCtrl.deleteGitLabRepo);
/**
 * @api {get} api/gitlab/repositories/:rid/members Get GitLab Repository Members
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitLab Repository Members
 * @apiGroup GitLab
 *  * @apiDescription This api is used to get specific gitlab repository all members.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched GitLab specific repository members",
 *        "success": true,
 *        "data": {
 *            repository_members : [{
 *
 *            }]
 *        }
 *     }
 */
router.route('/repositories/:rid/members')
    .post(verify.user,verify.unseal, gitlabCtrl.getRepoMembers);

/**
 * @api {post} api/gitlab/repositories/:rid/members/add Add GitLab Repository Member
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Add GitLab Repository Member
 * @apiGroup GitLab
 *  * @apiDescription This api is used to add specific gitlab repository member.
 *           In body, gitlab user username whom you wanted to add and access level, it will be a number.
 *           40 to give full access, 30 for developer access, 20 for guest.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully add GitLab repository member",
 *        "success": true,
 *        "data": {
 *            repository_member : {
 *
 *            }
 *        }
 *     }
 */

router.route('/repositories/:rid/members/add')
    .post(verify.user,verify.unseal, gitlabCtrl.addRepoMembers);

/**
 * @api {delete} api/gitlab/repositories/:rid/members/:mid Delete GitLab Repository Member
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 * @apiParam {Number} mid Member unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Delete GitLab Repository Member
 * @apiGroup GitLab
 *  * @apiDescription This api is used to delete specific gitlab repository member.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully deleted GitLab repository member",
 *        "success": true,
 *        "data": null
 *     }
 */
router.route('/repositories/:rid/members/:mid')
    .delete(verify.user,verify.unseal, gitlabCtrl.deleteRepoMembers);

/**
 * @api {get} api/gitlab/repositories/:rid/commits Get GitLab Repository Commits
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiHeader {String} private-token private token of GitLab account entered at the time of login.
 *
 * @apiParam {Number} rid Repository unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitLab Repository Commits
 * @apiGroup GitLab
 *  * @apiDescription This api is used to get specific gitlab repository commits.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched GitLab repository commits",
 *        "success": true,
 *        "data": {
 *             commits: [{}]
 *         }
 *     }
 */
router.route('/repositories/:rid/commits')
    .post(verify.user,verify.unseal, gitlabCtrl.getRepCommits);
//
// router.route('/repositories/:repo_name/:id')
//     .get(verify.user, githubCtrl.getGitHubRepo);
//
// router.route('/repositories/:repo_name/commits/:id')
//     .get(verify.user, githubCtrl.getRepositoryCommits);

module.exports = router;
