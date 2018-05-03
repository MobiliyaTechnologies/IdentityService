"use strict";
/**
 *  This module is use to define DAO for role model
 *  @module roles-dao
 *  @author shweta.ghenand
 *  @version 1.0.0
 */



/**
 *  import project modules
 */

var db = require("../config/databaseConnection");
var util = require('../util/commonUtil');
var responseConstant = require('../constant/responseConstant');
var logger = require("../util/logger");


module.exports = {
    /**
     * Create  DAO for insert role data
     */
    insertData: function (insertObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("create role dao started");
            db.roles.create(insertObj).then(
                function (result) {
                    return resolve({
                        id: result.id, roleName: result.roleName, privileges: result.privileges
                    });
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
            logger.debug("create role dao finished");
        });

    },

    /**
       * Update DAO for update role data
     */

    updateData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("update role dao started");
            db.roles.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve({
                            "id": reqCondition.id,
                            "roleName": reqObj.roleName,
                            "privileges": reqObj.privileges
                        });
                    else
                        return reject(
                            util.responseUtil(null, result, responseConstant.RECORD_NOT_FOUND)
                        );
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
            logger.debug("update role dao started");
        });
    },

    /**
         * DAO for get role details
     */
    getRole: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get role details by id dao started");
            db.roles.findOne({
                where: reqObj,
                attributes: ['id', 'roleName', 'privileges']
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.RECORD_NOT_FOUND)
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
            logger.debug("get role details by id dao finished");
        });
    },

    /**
        * DAO for get all role data
    */

    getAllRoles: function (reqObj, page, limit, sort, order) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all roles dao started");
            db.roles.findAndCountAll({
                where: reqObj,
                limit: limit,
                offset: page,
                order: [[sort, order]],
                attributes: ['id', 'roleName', 'privileges']
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
            logger.debug("get all role dao finished");
        });
    },

    /**
       * DAO for delete role
       */

    deleteData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("delete role dao started");
            db.roles.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0]) {
                        return resolve(result);
                    }
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.RECORD_NOT_FOUND)
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

            logger.debug("delete role  dao finished");
        });
    },


    //validate role by roleId
    getRoleById: function (roleId) {
        return new Promise(function (resolve, reject) {
            logger.debug("validate roleId dao started");
            return db.roles.findOne({
                where: {
                    id: roleId, isDeleted: 0
                }
            }).then(function (result) {
                if (result) {
                    //   console.log("result", result.roleName);
                    return resolve(result);
                } else {
                    return reject(util.responseUtil(null, null, responseConstant.ROLE_NOT_FOUND));
                }
            },
                function (err) {
                    logger.error(err);
                    return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                });

            logger.debug("validate roleId dao finished");
        });
    },

    getRoleIdByName: function (roleName) {
        return new Promise(function (resolve, reject) {
            logger.debug("get roleId by roleName dao started");
            return db.roles.findOne({
                where: {
                    roleName: roleName, isDeleted: 0
                }
            }).then(function (result) {
                if (result) {
                    return resolve({ "roleId": result.id });
                } else {
                    return reject(util.responseUtil(null, null, responseConstant.ROLE_NOT_FOUND));
                }
            },
                function (err) {
                    logger.error(err);
                    return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                });

            logger.debug("get roleId by roleName  dao finished");
        });
    }
}
