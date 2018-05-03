'use strict';

/**
 *  This module is use to define authentication
 *  @module database connection
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

 /**
 *  import project modules
 */
var HttpStatus = require('http-status-codes');
var JWT = require('jsonwebtoken');
var redis = require("redis");

var config = require('./config.json');
var redisConnectionObj = config[config.activeEnv].redis;
config = config[config.activeEnv].auth;
var util = require("../util/commonUtil");
var responseConstant = require("../constant/responseConstant");
var client = redis.createClient(redisConnectionObj.port, redisConnectionObj.host, redisConnectionObj.option);
var userDao = require('../dao/user-dao');
var roleDao = require('../dao/role-dao');
var constants = require('../constant/constants');



module.exports = {
    isAuthenticate: function (req, res, next) {
        if (req.headers && req.headers.authorization) {
            // invalid token - synchronous
            try {
                var decoded = JWT.verify(req.headers.authorization, config.JWT_SECRET_FOR_ACCESS_TOKEN);
                if (decoded && decoded.user && decoded.user.id) {//check jwt contains user info 
                    client.get(decoded.user.id, function (err, result) { //get token from user                    
                        if (err) {
                            res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(err, null, responseConstant.UNAUTHORIZE));
                        } else {
                            if (req.headers.authorization === result) { //verify token
                                req.user = decoded.user;
                                next();
                            } else
                                res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                        }
                    });
                } else {
                    res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                }
            } catch (err) {
                res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(err, null, responseConstant.UNAUTHORIZE));
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
        }
    },

    isRolesApiAuthenticate: function (req, res, next) {
        if (req.headers && req.headers.authorization) {
            // invalid token - synchronous
            try {
                var decoded = JWT.verify(req.headers.authorization, config.JWT_SECRET_FOR_ACCESS_TOKEN);
                if (decoded && decoded.user && decoded.user.id) {//check jwt contains user info 
                    userDao.getUser({ id: decoded.user.id, isDeleted: 0 }).then(function (result) {

                        roleDao.getRoleById(result.roleId).then(function (result) {

                            var areEqual = constants.sadminRole.toUpperCase() === result.roleName.toUpperCase();
                            if (areEqual) {
                                client.get(decoded.user.id, function (err, result) { //get token from user   

                                    if (err) {
                                        res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(err, null, responseConstant.UNAUTHORIZE));
                                    } else {
                                        if (req.headers.authorization === result) { //verify token
                                            req.user = decoded.user;
                                            next();
                                        } else
                                            res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                                    }
                                });
                            } else {
                                res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                            }
                        }, function (err) {
                            res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                        });
                    }, function (err) {
                        res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                    });


                } else {
                    res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
                }
            } catch (err) {
                res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(err, null, responseConstant.UNAUTHORIZE));
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send(util.responseUtil(null, null, responseConstant.UNAUTHORIZE));
        }
    }
}
