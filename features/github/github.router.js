var express = require('express');
var router = express.Router();
var githubCtrl = require('./github.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET all serials
/**
 * @api {post} api/github/login/:id GitHub Login
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName GitHub Login
 * @apiGroup GitHub
 *  * @apiDescription This api is used to login into the GitHub account to sync user GitHub account.
 *    In body username and password of GitHub account should be given.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully login to GitHub account",
 *        "success": true,
 *        "data": {
 *            github_user : ""
 *        }
 *     }
 */
router.route('/login')
  .post(verify.user,verify.unseal, githubCtrl.loginGitHub);

/**
 * @api {post} api/github/me/:id Get GitHub User Data
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitHub User Data
 * @apiGroup GitHub
 *  * @apiDescription This api is used to get GitHub user account details.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched user GitHub account details",
 *        "success": true,
 *        "data": {
 *            github_user : ""
 *        }
 *     }
 */

router.route('/me')
    .get(verify.user, verify.unseal,githubCtrl.getGitHubUserData);

/**
 * @api {get} api/github/repositories/:id GitHub Repositories
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName GitHub Repositories
 * @apiGroup GitHub
 *  * @apiDescription This api is used to get all GitHub repositories of logged in user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched all GitHub repositories",
 *        "success": true,
 *        "data": {
 *            repositories : [{
 *
 *            }]
 *        }
 *     }
 */

/**
 * @api {post} api/github/repositories Add GitHub Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiVersion 0.1.0
 * @apiName Add GitHub Repository
 * @apiGroup GitHub
 *  * @apiDescription This api is used to add GitHub repository. In body name, description should be passed.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully added GitHub repository",
 *        "success": true,
 *        "data": {
 *            repository : {
 *
 *            }
 *        }
 *     }
 */
router.route('/repositories')
    .get(verify.user,verify.unseal, githubCtrl.getAllGitHubRepo)
    .post(verify.user,verify.unseal, githubCtrl.addRepository);

/**
 * @api {get} api/github/repositories/:repo_name/:id Get GitHub Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 * @apiParam {String} repo_name Repository name.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitHub Repository
 * @apiGroup GitHub
 *  * @apiDescription This api is used to get GitHub specific repository data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched GitHub specific repository",
 *        "success": true,
 *        "data": {
 *            repositories : {
 *
 *            },
 *            file_tree:[{}]
 *        }
 *     }
 */

/**
 * @api {put} api/github/repositories/:repo_name/:id Update GitHub Repository
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 * @apiParam {String} repo_name Repository name.
 *
 * @apiVersion 0.1.0
 * @apiName Update GitHub Repository
 * @apiGroup GitHub
 *  * @apiDescription This api is used to update GitHub specific repository data. In body name, description should be passed.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully updated GitHub specific repository",
 *        "success": true,
 *        "data": {
 *            repositories : {
 *
 *            },
 *            file_tree:[{}]
 *        }
 *     }
 */
router.route('/repositories/:repo_name')
    .get(verify.user, verify.unseal,githubCtrl.getGitHubRepo)
    .put(verify.user, verify.unseal,githubCtrl.updateRepo);

/**
 * @api {get} api/github/repositories/:repo_name/contributors/:id Get GitHub Repository Contributors
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 * @apiParam {String} repo_name Repository name.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitHub Repository Contributors
 * @apiGroup GitHub
 *  * @apiDescription This api is used to get GitHub specific repository contributors data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched GitHub repository contributors",
 *        "success": true,
 *        "data": {
 *              contributors: [{}]
 *        }
 *     }
 */
router.route('/repositories/:repo_name/contributors')
    .get(verify.user,verify.unseal, githubCtrl.getRepoContri);

/**
 * @api {get} api/github/repositories/:repo_name/commits/:id Get GitHub Repository Commits
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 *
 * @apiParam {Number} id User unique ID.
 * @apiParam {String} repo_name Repository name.
 *
 * @apiVersion 0.1.0
 * @apiName Get GitHub Repository Commits
 * @apiGroup GitHub
 *  * @apiDescription This api is used to get GitHub repository commits.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Successfully fetched GitHub repository commits",
 *        "success": true,
 *        "data": {
 *              commits: [{}]
 *        }
 *     }
 */
router.route('/repositories/:repo_name/commits')
    .get(verify.user,verify.unseal, githubCtrl.getRepositoryCommits);

module.exports = router;
