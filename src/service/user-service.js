
'use strict';


/**
 *  This module is use to define service for user model 
 *  @module user-service
 * @author shweta.ghenand
 *  @version 1.0.0
 */

var authConfig = require('../config/config.json');
var appUrl = authConfig[authConfig.activeEnv].frontendUrl + "/reset-password"
var userDao = require('../dao/user-dao');
var tenantDao = require('../dao/tenant-dao');
var responseConstant = require("../constant/responseConstant");
var roleDao = require('../dao/role-dao');
var constants = require('../constant/constants');
var async = require('async');
var empty = require('is-empty');
var JWT = require('jsonwebtoken');
var config = require('../config/config.json');
var util = require("../util/commonUtil");
var jwtKey = config[config.activeEnv].auth;
config = config[config.activeEnv];

var getVehicleCount = function (req, tenantId, callback) {
    return new Promise(function (resolve, reject) {
        var get_data = JSON.stringify({});
        var options = {
            hostname: config.hostname_fleet,
            port: config.port_fleet,
            method: 'GET',
            path: '/' + tenantId + '/vehicles?userId=' + req.params.id,
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Length': get_data.length
            }
        };
        util.httpRequest(get_data, options, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    });
}
var getFleetCount = function (req, tenantId, callback) {
    return new Promise(function (resolve, reject) {
        var get_data = JSON.stringify({});
        var options = {
            hostname: config.hostname_fleet,
            port: config.port_fleet,
            method: 'GET',
            path: '/' + tenantId + '/fleets?fleetAdminId=' + req.params.id,
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Length': get_data.length
            }
        };
        util.httpRequest(get_data, options, function (err, result1) {
            if (err) {
                callback(err);
            } else {
                callback(err, result1);
            }
        });
    });
}

var assignVehicleToDriver = function (req, result, vehicleId, callback) {
    return new Promise(function (resolve, reject) {
        var put_data = JSON.stringify({ userId: result.id });
        var options = {
            hostname: config.hostname_fleet,
            port: config.port_fleet,
            method: 'PUT',
            path: '/' + result.tenantId + '/vehicles/' + vehicleId,
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Length': put_data.length
            }
        };
        console.log("option::", options, put_data);
        util.httpRequest(put_data, options, function (err, result1) {
            if (err) {
                callback(err);
            } else {
                callback(err, result1);
            }
        });
    });
}



/**
  * export module
  */

module.exports = {
    /**
     * Controller function for get data
     */
    getAllUsers: function (req) {
        return new Promise(function (resolve, reject) {
            var page = 0;
            var limit = '';
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

            if (req.query.email) {
                addCriteria.email = req.query.email;

            }
            if (req.query.roleId) {
                addCriteria.roleId = req.query.roleId;
            }
            if (req.query.fleetId) {
                addCriteria.fleetId = req.query.fleetId;
            }
            if (req.query.isDriverAssign) {
                addCriteria.isDriverAssign = req.query.isDriverAssign;
            }
            if (req.query.isFleetUnAssign === 'true') {
                addCriteria.fleetId = null;
            }
            if (req.query.isFleetUnAssign === 'false') {
                addCriteria.fleetId = { $ne: null };
            }
            addCriteria.isDeleted = 0;

            var decoded = JWT.verify(req.headers.authorization, jwtKey.JWT_SECRET_FOR_ACCESS_TOKEN);
            //Hiding self information
            addCriteria.id = { $ne: decoded.user.id };

            //Displaying self information
            if (req.query.isSelf && req.query.isSelf === 'true') {
                delete addCriteria.id;
            }

            if (decoded.user.roleName === 'super admin') {
                var asyncObject = {};
                asyncObject.superAdminCriteria = function (callback) {
                    callback(null, addCriteria);
                }
            }
            else if (decoded.user.roleName === 'tenant admin') {
                var asyncObject = {};
                asyncObject.tenantCriteria = function (callback) {
                    addCriteria.tenantId = decoded.user.tenantId;
                    callback(null, addCriteria);
                }
            }
            else if (decoded.user.roleName === 'fleet admin') {
                var asyncObject = {};

                asyncObject.fleetCriteria = function (callback) {
                    userDao.getUser({ id: decoded.user.id, isDeleted: 0 }).then(function (result) {
                        addCriteria.tenantId = decoded.user.tenantId;
                        addCriteria.fleetId = result.dataValues.fleetId;
                        callback(null, addCriteria);
                    }, function (err) {
                        callback(err);
                    });
                }

            }
            else if (decoded.user.roleName === 'driver') {
                var asyncObject = {};
                asyncObject.driverCriteria = function (callback) {
                    addCriteria.id = decoded.user.id;
                    callback(null, addCriteria);
                }
            }
            async.parallel(asyncObject, function (err, callabackResult) {
                if (err) {
                    return reject(err);
                } else {
                    var reqCondition = {};
                    if (callabackResult.fleetCriteria) {
                        reqCondition = callabackResult.fleetCriteria;
                    }

                    if (callabackResult.tenantCriteria) {
                        reqCondition = callabackResult.tenantCriteria;
                    }
                    if (callabackResult.driverCriteria) {
                        reqCondition = callabackResult.driverCriteria;
                    }
                    if (callabackResult.superAdminCriteria) {
                        reqCondition = callabackResult.superAdminCriteria;
                    }
                    userDao.getAllUsers(reqCondition, page, limit, sort, order).then(function (result) {
                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                    }, function (err) {
                        return reject(err);
                    });

                }
            });

        });
    },

    /**
    * Controller function for get details
    */
    getUser: function (req) {
        return new Promise(function (resolve, reject) {
            userDao.getUser({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                getVehicleCount(req, result.Tenant.id, function (err, vehicleResult) {
                    if (err) {
                        return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                    } else {
                        getFleetCount(req, result.Tenant.id, function (err, fleetResult) {
                            if (err) {
                                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                            } else {
                                result.dataValues.vehicleCount = vehicleResult.count;
                                result.dataValues.fleetCount = fleetResult.count;
                                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                            }
                        });
                    }
                });
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
     * Controller function for insert data
     */
    insertData: function (req) {
        return new Promise(function (resolve, reject) {
            var insertObj = isEmptyCheck(req.body);
            insertObj.status = constants.statusConstants.ACTIVE;
            insertObj.password = util.encryptPassword('welcome');
            var decoded = JWT.verify(req.headers.authorization, jwtKey.JWT_SECRET_FOR_ACCESS_TOKEN);
            //check roleId exist or not
            roleDao.getRoleById(req.body.roleId).then(function (roleResult) {
                if (roleResult.roleName === 'driver' || roleResult.roleName === 'fleet admin') {
                    userDao.insertData(insertObj).then(function (result) {

                        tenantDao.getTenant({ id: result.tenantId, isDeleted: 0 }).then(function (tenantResult) {
                            var link = 'https://' + appUrl + '?token=' + 'welcome' + '&email=' + req.body.email;
                            var msg = "Hi " + result.firstName + ",<br><br> We are glad to inform you that " + tenantResult.dataValues.tenantCompanyName + " has created your account. <br>To begin exploring the web portal please click the link below to set password and sign in. <br><br><a>" + link + "</a><br><br>Please get in touch with our support team for any queries at admin.support@" + tenantResult.dataValues.tenantCompanyName + ".com  <br><br>We are sending this mail as you are registered with " + tenantResult.dataValues.tenantCompanyName + " system.";
                            util.sendMail(req.body.email, "Mobiliya System - Set password", msg, function (err, success) {
                            })
                            if (!empty(req.body.vehicleId) && roleResult.roleName === 'driver') {
                                assignVehicleToDriver(req, result, req.body.vehicleId, function (err, vehicleResult) {
                                    if (vehicleResult.data[0] === 0) {
                                        result.vehicleName = "Invalid Vehicle";
                                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                    } else {
                                        if (err) {
                                            return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                                        } else {
                                            userDao.updateData({ isDriverAssign: 1 }, { id: result.id }).then(function (updateResult) {
                                                result.vehicleName = vehicleResult.data.brandName;
                                                result.isDriverAssign = 1;
                                                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                            }, function (err) {
                                                return reject(err);
                                            });
                                        }
                                    }
                                });
                            } else
                                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            return reject(err);
                        });
                    }, function (err) {
                        return reject(err);
                    });
                } else {
                    return reject(util.responseUtil(null, null, responseConstant.INVALIDE_ROLE));
                }
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
     * Controller function for Update data
     */
    updateData: function (req) {
        return new Promise(function (resolve, reject) {

            var insertObj = isEmptyCheck(req.body);
            //check roleId exist or not
            if (!empty(req.body.roleId)) {
                roleDao.getRoleById(req.body.roleId).then(function (result) {
                },
                    function (err) {
                        return reject(err);
                    });
            }
            userDao.updateData(insertObj, { id: req.params.id }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });



        });
    },

    /**
      * Controller function for delete data
      */
    deleteData: function (req) {
        return new Promise(function (resolve, reject) {
            var decoded = JWT.verify(req.headers.authorization, jwtKey.JWT_SECRET_FOR_ACCESS_TOKEN);

            //check tenant exist or not
            userDao.getUser({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                roleDao.getRoleById(result.dataValues.roleId).then(function (roleResult) {
                    if (roleResult.roleName === 'super admin') {
                        return reject(util.responseUtil(null, null, responseConstant.ERROR_IN_DELETION));
                    }
                    else if (roleResult.roleName === 'driver') {

                        if (decoded.user.roleName === 'super admin' || decoded.user.roleName === 'tenant admin' || decoded.user.roleName === 'fleet admin') {
                            if (result.dataValues.isDriverAssign === 0) {
                                var updateObj = {};
                                updateObj.isDeleted = 1;
                            } else {
                                return reject(util.responseUtil(null, null, responseConstant.ERROR_IN_DELETION));
                            }
                        } else {
                            return reject(util.responseUtil(null, null, responseConstant.INVALID_TOKEN));
                        }
                    }
                    else if ((roleResult.roleName === 'fleet admin')) {
                        if (decoded.user.roleName === 'super admin' || decoded.user.roleName === 'tenant admin') {
                            if (result.dataValues.fleetId === null) {
                                var updateObj = {};
                                updateObj.isDeleted = 1;
                            } else {
                                return reject(util.responseUtil(null, null, responseConstant.ERROR_IN_DELETION));
                            }
                        } else {
                            return reject(util.responseUtil(null, null, responseConstant.INVALID_TOKEN));
                        }
                    }
                    userDao.deleteData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                        return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                    }, function (err) {
                        return reject(err);
                    });
                }, function (err) {
                    return reject(err);
                });
            }, function (err) {
                return reject(err);
            });

        });
    },
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
    if (!empty(body.tenantId)) {
        insertObj.tenantId = body.tenantId;
    }
    if (!empty(body.fleetId)) {
        insertObj.fleetId = body.fleetId;
    }
    if (!empty(body.area)) {
        insertObj.area = body.area;
    }
    if (!empty(body.licenseNumber)) {
        insertObj.licenseNumber = body.licenseNumber;
    }
    if (!empty(body.isDriverAssign)) {
        insertObj.isDriverAssign = parseInt(body.isDriverAssign);
    }
    if (body.isRemoveFleet && body.isRemoveFleet === 'true') {
        insertObj.fleetId = null;
    }

    return insertObj;
}