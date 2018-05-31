
"use strict";
/**
 *  This module is use to define DAO for user  model
 *  @module user-dao
 * @author shweta.ghenand
 *  @version 1.0.0
 */

/**
*  import project modules
*/

var db = require("../config/databaseConnection");
var util = require("../util/commonUtil");
var responseConstant = require("../constant/responseConstant");
var logger = require('../util/logger');
var Sequelize = require('sequelize');


/**
 * export module
 */
module.exports = {
    /**
     * DAO for get All Users
     */
    getAllUsers: function (reqObj, page, limit, sort, order) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all user dao started");
            db.users.findAndCountAll({
                where: reqObj,
                limit: limit,
                offset: page,
                order: [[sort, order]],
                attributes: ['id', 'email', 'password', 'mobileNumber', 'firstName', 'status', 'roleId', 'fleetId', 'tenantId', 'isDriverAssign', 'licenseNumber']
            }).then(
                function (result) {
                    return resolve(result);
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("get all user dao finished");
        });
    },

    /**
     * DAO for get User by id
     */
    getUser: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get user details by id dao started");
            db.users.findOne({
                include: [{
                    model: db.tenant,
                    attributes: ['id', 'tenantCompanyName']
                }],
                where: reqObj,
                attributes: ['id', 'email', 'password', 'mobileNumber', 'firstName', 'status', 'roleId', 'fleetId', 'isDriverAssign', 'licenseNumber']
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.USER_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("get user details by id dao finished");
        });
    },

    /**
     * DAO for insert User 
     */
    insertData: function (reqObj) {

        return new Promise(function (resolve, reject) {
            logger.debug("create user dao started");
            return db.users.findAll({
                where: {
                    email: reqObj.email
                }
            }).then(function (existingUser) {
                if (existingUser.length == 0) {
                    return db.users.create(reqObj).then(function (result) {
                        return resolve({
                            id: result.id, email: result.email, password: result.password, mobileNumber: result.mobileNumber, status: result.status,
                            firstName: result.firstName, lastName: result.lastName, eulaAcceptanceTime: result.eulaAcceptanceTime, roleId: result.roleId,
                            fleetId: result.fleetId, tenantId: result.tenantId, area: result.area, licenseNumer: result.licenseNumber, isDriverAssign: result.isDriverAssign
                        })
                    }).catch(function (err) {
                        logger.error(err);
                        return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                    });
                }
                else {
                    return reject(util.responseUtil(null, null, responseConstant.DUPLICATION_ERROR));
                }
            }, function (err) {
                logger.error(err);
                return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
            })
            logger.debug("create user dao finished");
        });
    },

    /**
     * DAO for update user
     */
    updateData: function (reqObj, reqCondition) {

        return new Promise(function (resolve, reject) {
            logger.debug("update user dao started");
            return db.users.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve({
                            "id": reqCondition.id,
                            "mobileNumber": reqObj.mobileNumber,
                            "firstName": reqObj.firstName,
                            "lastName": reqObj.lastName,
                            "roleId": reqObj.roleId,
                            "fleetId": reqObj.fleetId,
                            "tenantId": reqObj.tenantId
                        });
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.USER_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                }
            );
            logger.debug("update user dao finished");
        });
    },
    /**
   * Dao for delete user
   *
   */
    deleteData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("delete user dao started");
            db.users.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0]) {
                        return resolve(result);
                    }
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.USER_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                }
            );
            logger.debug("delete user dao started");
        });
    },


    /**
   * DAO for user login
   */
    fnLoginData: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("user's login dao started");
            db.users.findOne({
                include: [{
                    model: db.tenant,
                    attributes: ['id', 'tenantCompanyName']
                }],
                where: reqObj,
                attributes: ['id', 'email', 'password', 'tenantId', 'roleId']
            }).then(
                function (result) {

                    if (result) {
                        return resolve({ id: result.id, email: result.email, password: result.password, tenantId: result.tenantId, roleId: result.roleId, tenantCompany: result.Tenant.tenantCompanyName, tenantId: result.Tenant.id });
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.USER_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("user's login dao finished");
        });
    },

};
