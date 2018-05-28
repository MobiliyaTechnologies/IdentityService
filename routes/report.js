/**
 *  This module is use to define reports 
 */
'use strict';

var express = require('express');
var HttpStatus = require('http-status-codes');
var router = express.Router();
var service = require('../src/service/report-service');
var util = require('../src/util/commonUtil');
var responseConstant = require('../src/constant/responseConstant');




//Get All Report List API
/**
 * @api {get} /reports Get All Report List of tenant
 * @apiVersion 1.0.0
 * @apiName GetReportList
 * @apiGroup Tenant
 *
 * @apiDescription Get All Report List. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3301/report?tenantId='' -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiParam {String} [TenantId=null] Tenant Id 
 *
 * @apiError BadRequest Invalid request parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message": "Invalid request parameters"
 *     }
 * 
 * @apiError Unauthorized The User token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     }
 * 
 * @apiSuccess {String} parameterName Name of report parameter.
 * @apiSuccess {String} reportId Report Id of report.
 * @apiSuccess {UUID} Id report UUID. 
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *   	"message": "Success",
 *  	 "data": [
 *       	 {
            "Id":'7E70930F-E546-E811-80C3-000D3A117A02',
            "parameterName":"mileage",
            "reportId":'80a8d526-01a6-470c-a1bb-0620d7d4724a'
            "tenantId": "364f2214-5512-48b1-9669-ff03ed63c8c4"                                 
        },
        {
            "Id":'9BAB9DFE-E446-E811-80C3-000D3A117A02',
            "parameterName":"speed",
            "reportId":'80a8d526-01a6-470c-a1bb-0620d7d4724a'
            "tenantId": "364f2214-5512-48b1-9669-ff03ed63c8c4"                                 
        }
 *   	]
 * }
 *
 * @apiSampleRequest http://localhost:3301/users
 *
 */
router.get('/:tenantId', function (req, res) {
    req.checkParams('tenantId', 'tenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        service.getAllReportsOfTenant(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

module.exports = router;