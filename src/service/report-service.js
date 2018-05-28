
'use strict';
/**
 *  This module is use to define controller for report model 
 * 
 */
/**
 *  import project modules
 */

var util = require('../util/commonUtil');
var reportDao = require('../dao/report-dao');
var responseConstant = require("../constant/responseConstant");
/**
  * export module
  */
module.exports = {
    /**
     * Controller function for get data
     */
    getAllReportsOfTenant: function (req) {
        return new Promise(function (resolve, reject) {

            var criteria = {};
            criteria.tenantId = req.params.tenantId;
            reportDao.getAllReportsOfTenant(criteria).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    }
}