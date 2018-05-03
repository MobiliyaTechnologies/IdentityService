"use strict";

/**
 *  This module is use to define DAO for report model
 *  @module roles-dao
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

 /**
 *  import project module
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
    getAllReportsOfTenant: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all report dao started");
            db.report.findAndCountAll({
                where: reqObj,
                attributes: ['id', 'reportName', 'reportId', 'tenantId']
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
            logger.debug("get all report dao finished");
        });
    }
}