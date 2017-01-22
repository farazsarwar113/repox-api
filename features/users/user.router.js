var express = require('express');
var router = express.Router();
var userCtrl = require('./user.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET users
router.get('/', verify.user, userCtrl.listAll);

//Add user
/**
 * @api {post} api/users/register Register
 * @apiVersion 0.1.0
 * @apiName Register
 * @apiGroup User
 *  * @apiDescription This api is used to register user into the app.
 *  User firstname, lastname, username and password should be given in body.
 *  If username already exists server return with an error. Username should be unique.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "User registered",
 *        "success": true,
 *        "data": null
 *     }
 */
router.post('/register', userCtrl.register);

//Login
/**
 * @api {post} api/users/login Login
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup User
 *  * @apiDescription This api is used to login into the app.
 *    In body username and password should be given which is entered at the time of register.
 *    The main server who calls this login api will save the token to that user to call the further api
 *    The token will be attached in the header for all other request
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Login successful - (Existing/New User)",
 *        "success": true,
 *        "data": {
 *            token : "",
 *            user : {}
 *        }
 *     }
 */
router.post('/login', userCtrl.login);

//Logout
router.get('/logout', userCtrl.logout);

//Verify me
/**
 * @api {get} api/users/me User Detail
 * @apiHeader {String} x-access-token Access token provided by this API server at the time of login.
 * @apiVersion 0.1.0
 * @apiName User Detail
 * @apiGroup User
 *  * @apiDescription This api is used to get user detail data which is logged in.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "User data fetched successful",
 *        "success": true,
 *        "data": {
 *            token : "",
 *            user : {}
 *        }
 *     }
 */
router.get('/me', verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser);

module.exports = router;