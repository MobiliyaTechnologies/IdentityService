
/**
 *  This module is use to define routes 
 *  @module indexRoutes
 *  @author shweta.ghenand
 *  @version 1.0.0
 */
'use strict';

var express = require('express');
var HttpStatus = require('http-status-codes');
var router = express.Router();
var oauth = require('../src/config/authentication');
var service = require('../src/service/auth-service');
var util = require('../src/util/commonUtil');
var responseConstant = require('../src/constant/responseConstant');


// Health Check API
/**
 * @api {get} /healthcheck Health Check
 * @apiVersion 1.0.0
 * @apiName GetHealthCheck
 * @apiGroup Health
 *
 * @apiDescription Application health Check.

 * @apiSampleRequest http://localhost:3301/healthcheck
 *
 */
router.get('/healthcheck', require('express-healthcheck')({
    healthy: function () {
        return { everything: 'is ok' };
    }
}));

//User Login API
/**
 * @api {post} /login User Login
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiDescription User Login. 
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{ "email": "superadmin@company.com", "password": "welcome"}' http://<ip>:<port>/login
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "email": "superadmin@company.com",
 *      "password": "welcome"
 *   } 
 *
 * @apiError BadRequest  Invalid request parameters.
 * @apiErrorExample Response (400 example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": {
 *               "email": {
 *                   "location": "body",
 *                   "param": "email",
 *                   "msg": "Invalid"
 *               },
 *               "password": {
 *                   "location": "body",
 *                   "param": "password",
 *                   "msg": "Invalid"
 *               },
                "non authoritative information": {
 *                  "message": "Invalid Credential."
 
 *           }
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     } 
 * 
 * @apiSuccess (200) {Object} data Data to return access_token and expires of access token.
 * @apiSuccess (200) {String} message Success Message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Success",
 *          "data":{
 *                   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJoM0NPNnc0VjM0amZOaDgtbE5wTUwzSloxZmx4b3h2TyIsImV4cCI6MTUxMjc1MTIwNzUxMywiaWF0IjoxNTEyNzQxMjA3fQ.lvNp8mtyTOyBcrDGhX_p8FzCy-f9-PbuzY148Mm81AM",
 *                   "expires": 1512751207513
 *           }
 *     }
 *
 * @apiSampleRequest http://localhost:3301/login
 *
 */

router.post('/login', function (req, res) {
    req.checkBody('email', 'Email can not be empty').isEmail();
    req.checkBody('email', 'Invalid email parameter').notEmpty();
    req.checkBody('password', 'Password can not be empty').notEmpty();
    var errors = req.validationErrors(true);
    if (errors || req.body.email && typeof req.body.email !== 'string') {
        res.status(HttpStatus.BAD_REQUEST).send({ "message": "Invalid Credential.", "error": errors });
    } else {
        service.fnLogin(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.BAD_REQUEST).send(err);
        });
    }
});


//User Logout API
/**
 * @api {post} /logout User Logout
 * @apiVersion 1.0.0
 * @apiName LogoutUser
 * @apiGroup Auth
 *
 * @apiDescription User Logout. 
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{}' http://<ip>:<port>/logout
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *  
 * * @apiHeader {String} Authorization Authorization token.
 * 
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     }
 *
 * @apiError Unauthorized The User token was Invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 * 
 * @apiSuccess (200) {String} message success message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Success"
 *     }
 *
 * @apiSampleRequest http://localhost:3301/logout
 *
 */
router.post('/logout', oauth.isAuthenticate, function (req, res) {
    service.fnLogout(req).then(function (result) {
        res.status(HttpStatus.OK).send(result);
    }, function (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});


//Reset Password API
/**
 * @api {put} /reset-password Reset Password
 * @apiVersion 1.0.0
 * @apiName ResetPassword
 * @apiGroup Auth
 *
 * @apiDescription User Reset Password. 
 *
 * @apiExample Example usage:
 * curl -i -X PUT  --data '{}' http://<ip>:<port>/reset-password
 *
 * @apiParam {String} email User's email
 * @apiParam {String} oldPassword User's oldPassword
 * @apiParam {String} newPassword User's newPassword for Reset
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "email": "test@company.com",
 *      "oldPassword":"Welcome@123",
 *      "newPassword":"9zOdSzxj"
 *   }
 *
 * @apiError BadRequest  Invalid request parameters.
 * @apiErrorExample Response (400 example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": {
 *               "newPassword": {
 *                   "location": "body",
 *                   "param": "newPassword",
 *                   "msg": "Invalid"
 *               },
 *               "email": {
 *                   "location": "body",
 *                   "param": "email",
 *                   "msg": "Invalid"
 *               },
 *               "oldPassword": {
 *                   "location": "body",
 *                   "param": "oldPassword",
 *                   "msg": "Invalid"
 *               }
 *           }
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     { 
 *        "message": "InternalServerError"
 *     }
 *
 * @apiSuccess (200) {String} message success message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Success"
 *     }
 *
 * @apiSampleRequest http://localhost:3301/reset-password/
 *
 */
router.put('/reset-password', function (req, res) {
    req.checkBody('newPassword', 'NewPassword can not be empty').notEmpty();
    req.checkBody('oldPassword', 'OldPassword can not be empty').notEmpty();
    req.checkBody('email', 'Email can not be empty').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.resetPassword(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

/**
 * @api {post} /forgot-password Forgot Password
 * @apiVersion 1.0.0
 * @apiName ForgotPassword
 * @apiGroup Auth
 *
 * @apiDescription User Login. 
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{ "email": "superadmin@company.com"}' http://<ip>:<port>/forgot-password
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiParam {String} email User's email.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "email": "superadmin@compnay.com"
 *   } 
 *
 * @apiError BadRequest  Invalid request data.
 * @apiErrorExample Response (400 example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "error": {
 *               "email": {
 *                   "location": "body",
 *                   "param": "email",
 *                   "msg": "Invalid"
 *               }
 *           }
 *     }
 *
 * @apiError Unauthorized The User token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     { 
 *        "message": "InternalServerError"
 *     }
 *
 * @apiSuccess (200) {String} message success message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Success"
 *     }
 *
 * @apiSampleRequest http://localhost:3301/forgot-password */
router.post('/forgot-password', function (req, res) {
    req.checkBody('email', 'Email can not be empty').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        service.forgotPassword(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

module.exports = router;
