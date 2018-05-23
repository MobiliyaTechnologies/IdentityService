
'use strict';
/**
 *  This module is use to define service for tenant model 
 *  @module tenant-service
 * @author shweta.ghenand
 *  @version 1.0.0
 */


/**
 *  import project modules
 */
var _ = require('underscore');
var util = require('../util/commonUtil');
var authConfig = require('../config/config.json');
var appUrl = authConfig[authConfig.activeEnv].frontendUrl + "/reset-password"
var util = require('../util/commonUtil');
var tenantDao = require('../dao/tenant-dao');
var responseConstant = require("../constant/responseConstant");
var constants = require('../constant/constants');
var userDao = require('../dao/user-dao');
var roleDao = require('../dao/role-dao');
var empty = require('is-empty');
var request = require('request');
var JWT = require('jsonwebtoken');
var config = require('../config/config.json');
var jwtKey = config[config.activeEnv].auth;
config = config[config.activeEnv];

module.exports = {

    /**
    * Controller function for insert data
    */
    insertTenant: function (req) {
        return new Promise(function (resolve, reject) {

            var insertObj = isEmptyCheck(req.body);
            insertObj.status = constants.statusConstants.ACTIVE;
            insertObj.password = util.encryptPassword('welcome');

            var decoded = JWT.verify(req.headers.authorization, jwtKey.JWT_SECRET_FOR_ACCESS_TOKEN);
            if (decoded.user.roleName === 'super admin') {
                roleDao.getRoleById(req.body.roleId).then(function (result) {
                    var areEqual = constants.tenantRole.toUpperCase() === result.roleName.toUpperCase();
                    if (areEqual) {
                        tenantDao.createUserAndTenant(insertObj).then(function (result) {
                            var link =  'https://'+ appUrl + '?token=' + 'welcome' + '&email=' + req.body.email;
                            var msg = "Hi " + result.firstName + ",<br><br> We are glad to inform you that Super Admin has created your account. <br>To begin exploring the web portal please click the link below to set password and sign in. <br><br><a>" + link + "</a><br><br>Please get in touch with our support team for any queries at admin.support@mobiliya.com <br><br>We are sending this mail as you are registered with mobiliya system.";
                            util.sendMail(req.body.email, "Mobiliya System - Set password", msg, function (err, success) {
                            })
                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            return reject(err);
                        });
                    } else {
                        return reject(util.responseUtil(null, null, responseConstant.INVALIDE_ROLE));
                    }
                },
                    function (err) {
                        return reject(err);
                    });

            } else {
                return reject(util.responseUtil(null, null, responseConstant.INVALID_TOKEN));
            }
        });
    },

    /**
    * Controller function for update data
    */
    updateData: function (req) {
        return new Promise(function (resolve, reject) {

            var updateTenantObj = {};
            if (!empty(req.body.tenantCompanyName)) {
                updateTenantObj.tenantCompanyName = req.body.tenantCompanyName;
            }

            var updateUserObj = {};
            if (!empty(req.body.firstName)) {
                updateUserObj.firstName = req.body.firstName;
            }
            if (!empty(req.body.lastName)) {
                updateUserObj.lastName = req.body.lastName;
            }
            if (!empty(req.body.email)) {
                updateUserObj.email = req.body.email;
            }
            if (!empty(req.body.mobileNumber)) {
                updateUserObj.mobileNumber = req.body.mobileNumber;
            }


            tenantDao.updateData(updateTenantObj, updateUserObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
    * Controller function for get tenant details
    *
    */
    getTenant: function (req) {
        return new Promise(function (resolve, reject) {
            roleDao.getRoleIdByName('tenant admin').then(function (result) {
                var roleId = result.roleId;
                tenantDao.getTenant({ id: req.params.id, isDeleted: 0 }, { roleId: roleId }).then(function (result) {
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                }, function (err) {
                    return reject(err);
                });
            });
        }, function (err) {
            return reject(util.responseUtil(err, null, responseConstant.RECORD_NOT_FOUND));
        });
    },

    /**
    * Controller function for get all tenant Details
    *
    */
    getAllTenant: function (req) {
        return new Promise(function (resolve, reject) {
            var page = 0;
            var limit = 10;
            var sort = 'createdAt';
            var order = 'asc';
            var addCriteria = {};
            //remove page,sort,order and limit variable if exist
            if (req.query.order) {    //order of list
                order = req.query.order;
                //delete req.query.order;
            }
            if (req.query.sort) { //sort of list
                sort = req.query.sort;
                //delete req.query.sort;
            }
            if (req.query.limit) { //limit
                limit = parseInt(req.query.limit);
                //delete req.query.limit
            }
            if (req.query.page) { //which page data
                if (req.query.page >= 2)
                    page = (parseInt(req.query.page) - 1) * limit;
                else
                    page = 0;

                //delete req.query.page;
            }
            addCriteria.tenantCompanyName = { $ne: "root" };
            addCriteria.isDeleted = 0;
            tenantDao.getAllTenant(addCriteria, page, limit, sort, order).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
    * Controller function for delete tenant Details
    *
    */
    deleteData: function (req) {
        return new Promise(function (resolve, reject) {
            var decoded = JWT.verify(req.headers.authorization, jwtKey.JWT_SECRET_FOR_ACCESS_TOKEN);
            if (decoded.user.roleName === 'super admin') {

                //check tenant exist or not
                tenantDao.getTenant({ id: req.params.id, isDeleted: 0 }).then(function (result) {

                    var reqCondition = {};
                    var page = 0;
                    var limit = '';
                    var sort = 'createdAt';
                    var order = 'asc';
                    reqCondition.tenantId = req.params.id;
                    reqCondition.email = { $ne: result.dataValues.Users[0].email };
                    reqCondition.isDeleted = 0;

                    //check whether users exist or not
                    userDao.getAllUsers(reqCondition, page, limit, sort, order).then(function (getAllUsers) {
                        if (getAllUsers.count === 0) {
                            var updateObj = {};
                            updateObj.isDeleted = 1;
                            tenantDao.deleteData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                                return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                            }, function (err) {
                                return reject(err);
                            });
                        } else {
                            return reject(util.responseUtil(null, null, responseConstant.ERROR_IN_DELETION));
                        }
                    }, function (err) {
                        return reject(err);
                    });
                }, function (err) {
                    return reject(err);
                });
            } else {
                return reject(util.responseUtil(null, null, responseConstant.INVALID_TOKEN));
            }
        });

    }
}
/**
Function for empty check
 */

function isEmptyCheck(body) {
    var insertObj = {};
    if (!empty(body.firstName)) {
        insertObj.firstName = body.firstName;
    }
    if (!empty(body.lastName)) {
        insertObj.lastName = body.lastName;
    }
    if (!empty(body.email)) {
        insertObj.email = body.email;
    }
    if (!empty(body.mobileNumber)) {
        insertObj.mobileNumber = body.mobileNumber;
    }
    if (!empty(body.roleId)) {
        insertObj.roleId = body.roleId;
    }
    if (!empty(body.tenantCompanyName)) {
        insertObj.tenantCompanyName = body.tenantCompanyName;
    }

    return insertObj;
}