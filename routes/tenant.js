'use strict';
/**
 *  This module is use to define routes 
 *  @module tenantRoutes
 *  @author shweta.ghenand
 *  @version 1.0.0
 */
var express = require('express');
var HttpStatus = require('http-status-codes');
var router = express.Router();
var service = require('../src/service/tenant-service');
var util = require('../src/util/commonUtil');
var responseConstant = require('../src/constant/responseConstant');
var constants = require('../src/constant/constants');
var empty = require('is-empty');




//Create Tenant  API
/**
 * @api {post} /tenant Create Tenant 
 * @apiVersion 1.0.0
 * @apiName Create Tenant
 * @apiGroup Tenant
 *
 * @apiDescription Create Tenant. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"email": "test@company.com","mobileNumber"":"98989898989","firstName":"kim","lastName":"yen","roleId":"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6","tenantCompanyName": "Agreeya Mobility"}' http://<ip>:<port>/users
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * 
 * @apiParam {String} email User's Email ID.
 * @apiParam {String} mobileNumber User's Mobile number.
 * @apiParam {String} firstName User's FirstName.
 *  @apiParam {String} lastName User's LastName.
 * @apiParam {UUID} roleId User's RoleId.
 * @apiParam {String} tenantCompanyName Tenant's Company Name.
 *
 * @apiParamExample {json} Request-Example:
 *     	{
 *	         "email": "test@company.com",
 *           "mobileNumber": "98989898989",
 *           "firstName":"Kim",
 *           "lastName":"yeon",
 *           "roleId":"ec87094b-66b2-493c-b8d8-bb0f1a41aa56",
 *           "tenantCompanyName":"Agreeya Mobility"
 *  
 *     }
 *
 *@apiError BadRequest Invalid request parameters.
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
 *   
 * 
 * @apiSuccess {String} TenantCompanyName CompanyName of the Tenant.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "message": "Success",
 *     "data": {
        "id": "3d2d5614-69ce-4a9d-a975-154470dd81ad",
        "email": "test@company.com",
        "password": "d040f5e37bd3ef67061cba1323287d79c97080b5c2b294cd7e08f87fa45b1fe7",
        "mobileNumber": "98989898989",
        "status": 1,
        "firstName": "kim",
        "lastName": "yen",
        "roleId": "ec87094b-66b2-493c-b8d8-bb0f1a41aa56",
        "userId": "0bf527c2-e144-4644-8652-21baccee38d3"
    }
 *   }
 * }
 *
 * @apiSampleRequest http://localhost:3301/tenants
 *
 */
router.post('/', function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        var err = util.responseUtil(errors, null, responseConstant.EMPTY_REQUEST_BODY_ERROR);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    }
    req.sanitizeBody('firstName').trim();
    req.sanitizeBody('lastName').trim();
    req.sanitizeBody('email').trim();
    req.sanitizeBody('mobileNumber').trim();

    req.checkBody('email', 'Email can not be empty').notEmpty();
    req.checkBody('email', 'Invalid email parameter').isEmail();
    req.checkBody('firstName', 'FirstName can not be empty').notEmpty();
    req.checkBody('firstName', 'Invalid firstName parameter').isLength(3, 100);
    if (!empty(req.body.lastame)) {
        req.checkBody('lastName', 'Invalid lastName parameter').isLength(3, 100);
    }
    req.checkBody('roleId', 'RoleId can not be empty').notEmpty();
    req.checkBody('roleId', 'Invalid RoleId parameter').isUUID();

    req.checkBody('mobileNumber', 'MobileNumber can not be empty').notEmpty();
    req.checkBody('mobileNumber', 'Invalid mobile number parameter').isInt().isLength({ min: 10, max: 15 });
    req.checkBody('tenantCompanyName', 'TenantCompanyName can not be empty').notEmpty();

    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.insertTenant(req).then(function (result) {
            res.status(HttpStatus.CREATED).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Update Tenant API
/**
 * @api {put} /tenant/:id Update Tenant 
 * @apiVersion 1.0.0
 * @apiName UpdateTenant
 * @apiGroup Tenant
 *
 * @apiDescription Update Tenant. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"tenantCompanyName": "Mobiliya"}' http://<ip>:<port>/tenants/ece9135f-5f3c-4b72-bde1-ac2d574ac0f7
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 * 
 * @apiParam {String} tenantCompanyName TenantCompanyName User's TenantCompanyName.
 * @apiParam {String} [mobileNumber=null] mobileNumber User's Mobile Number(optional).
 * @apiParam {String} [firstName=null] firstName User's FirstName(optional).
 * @apiParam {String} [lastName=null] lastName User's LastName(optional)

 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	         
 *           "tenantCompanyName": "AgreeYa Mobility"
 *           "firstName": "jin"
 *           "lastName": "hook"
 *           "mobileNumber": "0987654322"
 *     }
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
 * 
 * @apiSuccess {String} tenantCompanyName CompanyName of the Tenant.
 *  @apiSuccess {String} mobileNumber MobileNumber of the User.
 * @apiSuccess {String} firstName FirstName of the User.  
 * @apiSuccess {String} lastName LastName of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "message": "Success",
 * 		 "data": {
        "tenantUpdated": {
            "tenantCompanyName": "AgreeYa Mobility",
            "id": "ece9135f-5f3c-4b72-bde1-ac2d574ac0f7"
        },
        "userUpdated": {
            "firstName": "jin ",
            "lastName": "hook",
            "mobileNumber": "0987654322"
        }
    }
 * 	   }
 *
 * @apiSampleRequest http://localhost:3301/tenants/22e06e49-4fb5-4317-9114-29b6562b481d
 *
 */
router.put('/:id', function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        var err = util.responseUtil(errors, null, responseConstant.EMPTY_REQUEST_BODY_ERROR);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    }
    req.checkParams('id', 'Tenant id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid tenantId ').isUUID();
    if (!empty(req.body.mobileNumber)) {
        req.checkBody('mobileNumber', 'Invalid mobile number parameter').isInt().isLength({ min: 10, max: 10 });
    }
    if (!empty(req.body.firstName)) {
        req.checkBody('firstName', 'Invalid firstName parameter').isLength(3, 100);
    }
    if (!empty(req.body.lastame)) {
        req.checkBody('lastName', 'Invalid lastName parameter').isLength(3, 100);
    }

    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.updateData(req).then(function (result) {
            res.status(HttpStatus.CREATED).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get Tenant's Details API
/**
 * @api {get} /tenant/:id Get Tenant's Details
 * @apiVersion 1.0.0
 * @apiName GetTenantDetails
 * @apiGroup Tenant
 *
 * @apiDescription Get Tenant's Details. 
 * 
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3301/tenants/1e280f86-b683-4b84-a837-069131f70ee4 -H "Autherization:<access-token>" -H "Content-Type: application/json"
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
 * 
 * @apiSuccess {String} TenantCompanyName CompanyName of the Tenant.
 * @apiSuccess {UUID} UserId Id of the User
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Success",
 *        "data": {
        "id": "1e280f86-b683-4b84-a837-069131f70ee4",
        "tenantCompanyName": "Microsoft",
        "Users": [
            {
                "id": "6467fcb1-8982-4506-af61-361e99417baf",
                "email": "superadmin@microsoft.com",
                "password": "d040f5e37bd3ef67061cba1323287d79c97080b5c2b294cd7e08f87fa45b1fe7",
                "mobileNumber": "0000000000",
                "firstName": "Super",
                "lastName": "Admin",
                "status": 1,
                "roleId": "29ad925d-737e-4199-9770-c2589709a0a4"
            }
        ]
    }
 * 	   }
 *
 * @apiSampleRequest http://localhost:3301/tenants/1e280f86-b683-4b84-a837-069131f70ee4
 *
 */
router.get('/:id', function (req, res) {
    req.checkParams('id', 'Tenant Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid tenantId').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.getTenant(req).then(function (result) {
            res.status(HttpStatus.CREATED).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get All Tenant List API
/**
 * @api {get} /tenant Get All Tenant List
 * @apiVersion 1.0.0
 * @apiName GetTenantList
 * @apiGroup Tenant
 *
 * @apiDescription Get All Tenant List. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3301/tenant?limit=10 -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiParam {Number} [page=0] Users Page Number (optional).
 * @apiParam {Number} [limit=10] Users List limit(optional).
 * @apiParam {String} [sort=UserId] Users Sorting on which field(optional).
 * @apiParam {String} [order=asc] Users Ordering field order(asc|desc)(optional).
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
 *@apiSuccess {String} tenantCompanyName CompanyName of the Tenant.
 * @apiSuccess {UUID} userId Id of the User
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *   	"message": "Success",
 *  	 "data": [
 *       	{
            "id":"22e06e49-4fb5-4317-9114-29b6562b481d",
            "tenantCompanyName": "Company-A"
        },
        {
            "id":"66599bcb-30ad-40ad-b2c0-710a9d50f97a",
            "tenantCompanyName": "Company-B"
        },
        {
            "id": "bd39049f-5e2a-4904-9571-68accae08aff",
            "tenantCompanyName": "Company-c"
        }
 *   	]
 * }
 *
 * @apiSampleRequest http://localhost:3301/tenants
 *
 */
router.get('/', function (req, res) {
    req.checkQuery('limit', 'Invalid limit parameter').optional().isInt();
    req.checkQuery('page', 'Invalid page parameter').optional().isInt();
    req.checkQuery('sort', 'Invalid sort parameter').optional().isIn(constants.tenantsSortConstants);
    req.checkQuery('order', 'Invalid order parameter').optional().isIn(constants.orderConstants);
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.getAllTenant(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Delete Tenant  API
/**
 * @api {delete} /tenant/:id Delete Tenant 
 * @apiVersion 1.0.0
 * @apiName DeleteTenant
 * @apiGroup Tenant
 *
 * @apiDescription Delete Tenant. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X DELETE  --data '{}' http://<ip>:<port>/tenants/bd39049f-5e2a-4904-9571-68accae08aff
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
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
 * 
 * @apiSuccess {String} message Message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiSampleRequest http://localhost:3301/tenants/bd39049f-5e2a-4904-9571-68accae08aff
 *
 */
router.delete('/:id', function (req, res) {
    req.checkParams('id', 'Invalid tenantId').notEmpty();
    req.checkParams('id', 'Invalid tenantId').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.deleteData(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }

});


module.exports = router;