"use strict";
/**
 *  This module is use to define DAO for tenant model
 *  @module tennat-dao
 *  @author shweta.ghenand
 *  @version 1.0.0
 */



/**
 *  import project module
 */
var db = require("../config/databaseConnection");
var util = require('../util/commonUtil');
var responseConstant = require('../constant/responseConstant');
var logger = require('../util/logger');
var roleDao = require('../dao/role-dao');

module.exports = {
    /**
     * Create  DAO for insert tenant and user
    */
    createUserAndTenant: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("create user and tenant dao started");
            return db.users.findAll({
                where: {
                    email: reqObj.email
                }
            }).then(function (existingUser) {
                if (existingUser.length !== 0) {
                    return reject(util.responseUtil(null, null, responseConstant.DUPLICATION_ERROR));
                }
                else {
                    return db.sequelize.transaction(function (t) {
                        var insertObj = {};
                        insertObj.tenantCompanyName = reqObj.tenantCompanyName
                        return db.tenant.create(insertObj, { transaction: t }).then(function (result) {
                            reqObj.tenantId = result.id;
                            return db.users.create(reqObj, { transaction: t });

                        });
                    }).then(function (result) {
                        logger.debug("createUserAndTenant transaction is commited .");
                        return resolve({
                            id: result.tenantId, email: result.email, password: result.password, mobileNumber: result.mobileNumber, status: result.status,
                            firstName: result.firstName, lastName: result.lastName, eulaAcceptanceTime: result.eulaAcceptanceTime, roleId: result.roleId,
                            userId: result.id
                        })

                    }).catch(function (err) {
                        logger.error(" Database error: " + err);
                        logger.debug(" Database error in createUserAndTenant function.");
                        return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_TRANSACTION_ERROR));

                    });
                }
            });
            logger.debug("create user and tenant dao finished");
        });
    },


    /**
           * Update DAO for update tenant
         */

    updateData: function (tenantUpdated, userUpdated, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("update tenant dao started");
            return db.sequelize.transaction(function (t) {
                return db.tenant.update(tenantUpdated, { where: reqCondition }, { transaction: t }).then(function (result) {
                    if (!(result && result[0]))
                        return reject(
                            util.responseUtil(null, null, responseConstant.TENANT_NOT_FOUND)
                        );
                    roleDao.getRoleIdByName('tenant admin').then(function (result) {
                        var roleId = result.roleId;
                        return db.users.update(userUpdated, { where: { roleId: roleId, tenantId: reqCondition.id } }, { transaction: t }).then(function (result) {
                        }, function (err) {
                            return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_TRANSACTION_ERROR));
                        });
                    });
                }, function (err) {
                    return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_TRANSACTION_ERROR));
                });
            }).then(function (result) {
                logger.debug("updateTenantAndUser transaction is commited .");
                tenantUpdated.id = reqCondition.id
                return resolve({
                    tenantUpdated,
                    userUpdated
                })
            }).catch(function (err) {
                logger.error(" Database error: " + err);
                logger.debug(" Database error in updateTenantAndUser function.");
                return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_TRANSACTION_ERROR));

            });
            logger.debug("update tenant dao finished");
        });
    },

    /**
         * DAO for get  tenant details
     */
    getTenant: function (tenantReqObj, userReqobj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get tenant details by id dao started");
            db.tenant.findOne({
                include: [{
                    model: db.users,
                    where: userReqobj,
                    attributes: ['id', 'email', 'mobileNumber', 'firstName', 'lastName', 'status', 'roleId', 'fleetId']
                }],
                where: tenantReqObj,
                attributes: ['id', 'tenantCompanyName']
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.TENANT_NOT_FOUND)
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
            logger.debug("get tenant details by id dao finished");
        });
    },

    /**
      * DAO for get all tenant data
  */

    getAllTenant: function (reqObj, page, limit, sort, order) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all tenants dao started");
            db.tenant.findAndCountAll({
                where: reqObj,
                limit: limit,
                offset: page,
                order: [[sort, order]],
                attributes: ['id', 'tenantCompanyName']
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
            logger.debug("get all tenants  dao finished");
        });
    },


    /**
   * DAO for delete tenant
   */
    deleteData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("delete tenant dao started");

            return db.tenant.findAll({
                where: reqCondition
            }).then(function (existingTenant) {
                if (existingTenant.length === 0) {
                    return reject(util.responseUtil(null, null, responseConstant.TENANT_NOT_FOUND));
                }
                else {
                    return db.sequelize.transaction(function (t) {
                        return db.tenant.update(reqObj, { where: reqCondition }, { transaction: t }).then(function (result) {
                            roleDao.getRoleIdByName('tenant admin').then(function (result) {
                                var roleId = result.roleId;
                                return db.users.update(reqObj, { where: { roleId: roleId, tenantId: reqCondition.id } }, { transaction: t });
                            });
                        });
                    }).then(function (result) {
                        logger.debug("deleteTenant transaction is commited .");
                        return resolve(result);
                        // Transaction has been committed                        
                    }).catch(function (err) {
                        logger.error(" Database error" + err);
                        logger.debug(" Database error in deleteTenant transaction.");
                        return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                        // Transaction has been rolled back
                    });
                }
            });
            logger.debug("delete tenant dao finished");
        });
    }



}