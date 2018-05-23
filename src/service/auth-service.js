
'use strict';

/**
 *  This module is use to define controller for auth model 
 *  @module authController
 * @author shweta.ghenand
 *  @version 1.0.0
 * 
 */


var JWT = require('jsonwebtoken');
var redis = require("redis");
var util = require("../util/commonUtil");
var userDao = require("../dao/user-dao");
var roleDao = require('../dao/role-dao');
var responseConstant = require("../constant/responseConstant");
var authConfig = require('../config/config.json');
var appUrl = authConfig[authConfig.activeEnv].frontendUrl + "/reset-password"
var redisConnectionObj = authConfig[authConfig.activeEnv].redis;
authConfig = authConfig[authConfig.activeEnv].auth;
var client = redis.createClient(redisConnectionObj.port, redisConnectionObj.host, redisConnectionObj.option);


var JWT_SECRET_FOR_ACCESS_TOKEN = authConfig.JWT_SECRET_FOR_ACCESS_TOKEN;
var JWT_SECRET_FOR_REFRESH_TOKEN = authConfig.JWT_SECRET_FOR_REFRESH_TOKEN;

// the expiry times should be consistent between the oauth2-server settings and the JWT settings 
var JWT_ACCESS_TOKEN_EXPIRY_SECONDS = authConfig.JWT_ACCESS_TOKEN_EXPIRY_SECONDS;
var JWT_REFRESH_TOKEN_EXPIRY_SECONDS = authConfig.JWT_REFRESH_TOKEN_EXPIRY_SECONDS;


/**
  * export module
  */
module.exports = {
    /**
     * Controller function for login user
     */
    fnLogin: function (req) {
        return new Promise(function (resolve, reject) {
            userDao.fnLoginData({ isDeleted: 0, email: req.body.email }).then(function (result) {
                roleDao.getRoleById(result.roleId).then(function (roleResult) {
                    if (util.comparePasswords(util.encryptPassword(req.body.password), result.password)) {

                        //generate token
                        var token;
                        var secret;
                        var exp = new Date();
                        var payload = { user: { id: result.id, email: result.email, tenantId: result.tenantId, roleName: roleResult.roleName } };//{};//req.user;

                        var options = {
                            algorithm: authConfig.JWT_TOKEN_ALGORITHM_TYPE  // HMAC using SHA-256 hash algorithm
                        };

                        secret = JWT_SECRET_FOR_ACCESS_TOKEN;
                        exp.setSeconds(exp.getSeconds() + JWT_ACCESS_TOKEN_EXPIRY_SECONDS);

                        payload.exp = exp.getTime();
                        token = JWT.sign(payload, secret, options);
                        var response = {
                            access_token: token,
                            expires: payload.exp,
                            userDetails: result
                        };

                        //save token
                        client.set(result.id, token);//store token against the user                       

                        return resolve(util.responseUtil(null, response, responseConstant.SUCCESS));
                    } else {
                        return reject(util.responseUtil(null, null, responseConstant.INVALIDE_CREDENTIAL));
                    }
                }, function (err) {
                    return reject(err);
                });
            }, function (err) {
                return reject(util.responseUtil(err, null, responseConstant.INVALIDE_CREDENTIAL));
            });
        });
    },


    /**
     * Controller function for logout user
     */
    fnLogout: function (req) {
        return new Promise(function (resolve, reject) {
            client.del(req.user.id, function (err, response) {
                if (err) {
                    return reject(util.responseUtil(err, null, responseConstant.LOGGED_OUT_ERROR));
                } else {
                    if (response == 1) {
                        return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                    } else {
                        return reject(util.responseUtil(response, null, responseConstant.LOGGED_OUT_ERROR));
                    }
                }
            });
        });
    },


    /**
    * Controller function for reset Password
    */
    resetPassword: function (req) {
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        return new Promise(function (resolve, reject) {
            if (util.comparePasswords(util.encryptPassword(oldPassword), util.encryptPassword(newPassword))) {
                return reject(
                    util.responseUtil(
                        null,
                        null,
                        responseConstant.PASSWORD_DUPLICATION_ERROR
                    )
                );
            }
            var reqObj = { password: util.encryptPassword(newPassword) };
            userDao.updateData(reqObj, { email: req.body.email, password: util.encryptPassword(oldPassword) }).then(function (result) {
                return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },

    forgotPassword: function (req) {
        return new Promise(function (resolve, reject) {
            userDao.getUser({ email: req.body.email, isDeleted: 0 }).then(function (result) {
                if (result) {
                    var randomPassword = util.generateRandomPassword();
                    var reqObj = { password: util.encryptPassword(randomPassword) };
                    var link = 'https://'+ appUrl + '?token=' + randomPassword + '&email=' + req.body.email;
                    userDao.updateData(reqObj, { email: req.body.email }).then(function (result) {
                        var msg = "Hi " + ",<br><br> Please click the below link to set new password and sign in. <br><br><a href='" + link + "'>" + link + "</a><br><br>Please get in touch with our support team for any queries at admin.support@mobiliya.com <br><br>We are sending this mail as you are registered with mobiliya system.";
                        util.sendMail(req.body.email, "Mobiliya System - Set password", msg, function (err, success) {
                            if (err) {
                                return resolve(util.responseUtil(err, null, responseConstant.UNABLE_TO_SEND_EMAIL));
                            } else
                                return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                        })
                    }, function (err) {
                        return reject(util.responseUtil(null, null, responseConstant.PASSWORD_CHANGE_ERROR));
                    });
                } else {
                    return reject(util.responseUtil(null, null, responseConstant.RECORD_NOT_FOUND));
                }
            }, function (err) {
                return reject(err);
            });
        });
    },

}
