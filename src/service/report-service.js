
'use strict';
/**
 *  import project modules
 */
var _ = require('underscore');
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
            //remove page,sort,order and limit variable if exist
            criteria.tenantId = req.params.tenantId;
            console.log(criteria.tenantId);
            reportDao.getAllReportsOfTenant(criteria).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    }
}