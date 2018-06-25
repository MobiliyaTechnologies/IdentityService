
/**
 *  This module is use to define routes 
 *  @module userRoutes
 *  @author shubham.gorde
 *  @version 1.0.0
 */
'use strict';

var express = require('express');
var HttpStatus = require('http-status-codes');
var router = express.Router();
var service = require('../src/service/user-service');
var responseConstant = require("../src/constant/responseConstant");
var constants = require('../src/constant/constants');
var util = require('../src/util/commonUtil');
var empty = require('is-empty');


//Create User API
/**
 * @api {post} /users Create User 
 * @apiVersion 1.0.0
 * @apiName Create User
 * @apiGroup User
 *
 * @apiDescription Create User. 
 *
 * @apiHeader {String} Authorization Autorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"email": "test@company.com","mobileNumber"":"98989898989","firstName":"kim","lastName":"yen","tenantId":"bc313a62-fdf9-4e66-8c22-a84c91f60aa4","roleId":"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6","fleetId":"6467fcb1-8982-4506-af61-361e99417baf"}' http://<ip>:<port>/users
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiParam {String} email User's Email ID.
 * @apiParam {String} mobileNumber User's Mobile number.
 * @apiParam {String} firstName User's FirstName.
 * @apiParam {String} lastName User's LastName.
 * @apiParam {String} licenseNumber Driver's license number.(optional)
 * @apiParam {String} area Area.(optional)
 * @apiParam {UUID} vehicleId Assign Vehicle to driver.(optional)
 * @apiParam {UUID} roleId User's RoleId.
 * @apiParam {UUID} fleetId User's FleetId.(optional)
 * @apiParam {UUID} tenantId User's TenantId.
 * @apiParam {String} area Area.
 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	         
           "email": "test@company.com",
 *           "mobileNumber": "98989898989",
 *           "firstName":"Kim",
 *           "lastName":"yeon",
 *           "roleId":"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6" 
 *           "fleetId":"6467fcb1-8982-4506-af61-361e99417baf",
 *           "tenantId":"bc313a62-fdf9-4e66-8c22-a84c91f60aa4"
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
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} mobileNumber MobileNumber of the User. 
 * @apiSuccess {String} firstName Firstname of the User.
 * @apiSuccess {String} lastName LastName of the User.
 * @apiSuccess {String} licenseNumber Driver's license number.
 * @apiSuccess {String} area Area.
 * @apiSuccess {UUID} vehicleId Assign Vehicle to driver.
 * @apiSuccess {UUID}fleetId FleetId of the User.
 * @apiSuccess {UUID} roleId RoleId of the User.
 * @apiSuccess {UUID}tenantId TenantId of the User.
 * @apiSuccess {String}area Area of the User.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "message": "Success",
 *      "data": {
 *         {
        "id":"5a2a8b63a4894865d03600a7,
        "email": "test@company.com",
        "mobileNumber": "98989898989",
        "status": 1,
        "firstName": "kim",
        "lastName": "yen",
        "roleId": "00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6",
        "fleetId": "6467fcb1-8982-4506-af61-361e99417baf"
        "tenantId": "bc313a62-fdf9-4e66-8c22-a84c91f60aa4"
    }
 *   }
 * }
 *
 * @apiSampleRequest http://localhost:3301/users
 *
 */
router.post('/', function (req, res) {
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
    req.checkBody('roleId', 'Invalid roleId parameter').isUUID();
    if (!empty(req.body.fleetId)) {
        req.checkBody('fleetId', 'Invalid fleetId parameter').isUUID()
    }
    req.checkBody('tenantId', 'TenantId can not be empty').notEmpty();
    req.checkBody('tenantId', 'Invalid tenantId parameter ').isUUID()
    req.checkBody('mobileNumber', 'MobileNumber can not be empty').notEmpty();
    req.checkBody('mobileNumber', 'Invalid mobile number parameter').isInt().isLength({ min: 10, max: 15 });

    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        service.insertData(req).then(function (result) {
            res.status(HttpStatus.CREATED).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Update User API
/**
 * @api {put} /users/:id Update User 
 * @apiVersion 1.0.0
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiDescription Update User. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"mobileNumber": "9876547890","firstName":"jin","lastName":"hook"}' http://<ip>:<port>/users/22e06e49-4fb5-4317-9114-29b6562b481d
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 * 
 * @apiParam {String} [mobileNumber=null] mobileNumber User's Mobile Number(optional).
 * @apiParam {String} [firstName=null] firstName User's FirstName(optional).
 * @apiParam {String} [lastName=null] lastName User's LastName(optional).
 * @apiParam {UUID} [roleId=null] roleId User's RoleId(optional).
 * @apiParam {UUID} [fleetId=null] fleetId User's FleetId(optional).
 * @apiParam {UUID} [tenantId=null] tenantId User's TenantId(optional).
 * @apiParam {Boolean} isRemoveFleet Delete Fleet associated with Fleet Admin (optional).
 *
 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	         
 *           "mobileNumber": "98989898989",
 *           "firstName":"Kim"
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
 * @apiSuccess {String} mobileNumber MobileNumber of the User.
 * @apiSuccess {String} firstName FirstName of the User.  
 * @apiSuccess {String} lastName LastName of the User.
 *  @apiSuccess {UUID} roleId RoleId of the User.  
 *  @apiSuccess {UUID} fleetId FleetId of the User. 
 * @apiSuccess {UUID} tenantId tenantId of the User.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "message": "Success",
 *      "data": {
 *         {
        "id":"22e06e49-4fb5-4317-9114-29b6562b481d,
        "mobileNumber": "98989898989",
        "firstName": "kim"
    }
 *   }
 * }
 *
 * @apiSampleRequest http://localhost:3301/users/22e06e49-4fb5-4317-9114-29b6562b481d
 *
 */
router.put('/:id', function (req, res) {
    req.sanitizeParams('id').trim();
    req.sanitizeBody('firstName').trim();
    req.sanitizeBody('lastName').trim();
    req.sanitizeBody('mobileNumber').trim();

    req.checkParams('id', 'User id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid userId ').isUUID();

    if (!empty(req.body.mobileNumber)) {
        req.checkBody('mobileNumber', 'Invalid mobile number parameter').isInt().isLength({ min: 10, max: 10 });
    }
    if (!empty(req.body.firstName)) {
        req.checkBody('firstName', 'Invalid firstName parameter').isLength(3, 100);
    }
    if (!empty(req.body.lastame)) {
        req.checkBody('lastName', 'Invalid lastName parameter').isLength(3, 100);
    }
    if (!empty(req.body.roleId)) {
        req.checkBody('roleId', 'Invalid roleId parameter').isUUID();
    }
    if (!empty(req.body.tenantId)) {
        req.checkBody('tenantId', 'Invalid tenantId parameter').isUUID();
    }
    if (!empty(req.body.fleetId)) {
        req.checkBody('fleetId', 'Invalid fleetId parameter').isUUID();
    }

    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        service.updateData(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get User's Details API
/**
 * @api {get} /users/:id Get User's Details
 * @apiVersion 1.0.0
 * @apiName GetUserDetails
 * @apiGroup User
 *
 * @apiDescription Get User's Details. 
 * 
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3301/users/c678ec68-2c65-4ced-bdb6-0e34d9c245aa -H "Autherization:<access-token>" -H "Content-Type: application/json"
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
  @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} mobileNumber MobileNumber of the User.
 * @apiSuccess {String} firstName FirstName of the User. 
 * @apiSuccess {String} lastName LastName of the User.
 * @apiSuccess {UUID} tenantId TenantId of the User.
 * @apiSuccess {UUID} roleId RoleId of the User.
 * @apiSuccess {UUID} fleetId fleetId of the User
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "Success",
 *        "data": {
 *       	"id":"c678ec68-2c65-4ced-bdb6-0e34d9c245aa",
        "email": "Test.11@company.com",
        "mobileNumber": "0738557591",
        "firstName":"samdung",
        "lastName":"yeon",
        "status": 1,
        "roleId": "00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6",
        "fleetId": "6467fcb1-8982-4506-af61-361e99417baf",
        "Tenant": {
            "id": "bd8d401d-1d46-4eea-afc0-8937b5ddf0fc",
            "tenantCompanyName": "company"
        }
 *
 * @apiSampleRequest http://localhost:3301/users/c678ec68-2c65-4ced-bdb6-0e34d9c245aa
 *
 */
router.get('/:id', function (req, res) {
    req.checkParams('id', 'User id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid userId ').isUUID();

    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        service.getUser(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get All User List API
/**
 * @api {get} /users Get All User List
 * @apiVersion 1.0.0
 * @apiName GetUserList
 * @apiGroup User
 *
 * @apiDescription Get All User List. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3301/users?limit=10&sort=FirstName&order=desc -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiParam {Number} [page=0] Users Page Number (optional).
 * @apiParam {Number} [limit=10] Users List limit(optional).
 * @apiParam {String} [sort=FirstName] Users Sorting on which field(optional).
 * @apiParam {String} [order=asc] Users Ordering field order(asc|desc)(optional).
 * @apiParam {String} [email=null] User's email (asc|desc)(optional)
 * @apiParam {UUID} [roleId] User's roleId (asc|desc)(optional)
 * @apiParam {UUID} [fleetId] User's fleetId (asc|desc)(optional)
 * @apiParam {Boolean} [isSelf]  Get self information (true|false)(optional)
 * @apiParam {Boolean} [isDriverAssign]  Get list of driver(assign/unassign) (1|0)(optional)
 * @apiParam {Boolean} [isFleetUnAssign]  Get list of assign/unassign (true/false)(optional)
 *
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
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} mobileNumber MobileNumber of the User.
 * @apiSuccess {String} firstName FirstName of the User. 
 * @apiSuccess {String} lastName LastName of the User.
 * @apiSuccess {UUID} fleetId FleetId of the User.
 * @apiSuccess {UUID} roleId RoleId of the User.
 * @apiSuccess {UUID} tenantId TenantId of the User.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *   	"message": "Success",
 *  	 "data": [
 *       	 {
            "id": "33e345e6-83e7-404c-b067-f08c8e1ef79e",
            "email": "Test.15@company.com",
            "mobileNumber": "0234557591",
            "firstName": pisuk,
            "lastName": yen,
            "status": 1,
            "roleId": "00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6",
            "fleetId": "29ad925d-737e-4199-9770-c2589709a0a4",            
            "tenantId": "bc313a62-fdf9-4e66-8c22-a84c91f60aa4"                                   "
        },
        {
            "id":"9a64d906-722d-40d0-8872-25f82fab4161",
            "email": "Test.16@company.com",
            "mobileNumber": "0238557591",
            "firstName": jin,
            "lastName": hook,
            "status": 1,
            "roleId": "69f375e6-686a-447f-b184-1cfc91b6db68",
            "fleetId": "1e280f86-b683-4b84-a837-069131f70ee4",            
            "tenantId": "364f2214-5512-48b1-9669-ff03ed63c8c4"                                 
        }
 *   	]
 * }
 *
 * @apiSampleRequest http://localhost:3301/users
 *
 */
router.get('/', function (req, res) {
    req.checkQuery('limit', 'Invalid limit parameter').optional().isInt();
    req.checkQuery('page', 'Invalid page parameter').optional().isInt();
    req.checkQuery('sort', 'Invalid sort parameter').optional().isIn(constants.usersSortConstants);
    req.checkQuery('order', 'Invalid order parameter').optional().isIn(constants.orderConstants);
    req.checkQuery('email', 'Invalid email parameter').optional().isEmail();
    req.checkQuery('roleId', 'Invalid roleId parameter').optional().isUUID();
    req.checkQuery('fleetId', 'Invalid fleetId parameter ').optional().isUUID();
    req.checkQuery('isDriverAssign', 'Invalid isDriverAssign parameter').optional().isIn([0, 1]);
    req.checkQuery('isFleetUnAssign', 'Invalid isFleetUnAssign parameter').optional().isIn(['true', 'false']);
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        service.getAllUsers(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Delete User API
/**
 * @api {delete} /users/:id Delete User 
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiDescription Delete User. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X DELETE  --data '{}' http://<ip>:<port>/users/4aedcab5-9413-4219-b09f-e652df7be3b6
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
 * @apiSampleRequest http://localhost:3301/users/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.delete('/:id', function (req, res) {
    req.checkParams('id', 'User id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid userId ').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        service.deleteData(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

//Update Multiple User API
/**
 * @api {put} /users/ Update Multilpe User 
 * @apiVersion 1.0.0
 * @apiName Update Multiple User
 * @apiGroup User
 *
 * @apiDescription Update Multiple User. 
 *
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"userIdList":["d7ed14a9-df4c-4099-adcd-ec426845374e,d7ed14a9-df4c-4099-adcd-ec426845374e"]}' http://<ip>:<port>/users/
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 * 
* @apiParam {UUID[]} userIdList List of user Id.
 *
 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	         
 *           "userIdList": ["d7ed14a9-df4c-4099-adcd-ec426845374e,d7ed14a9-df4c-4099-adcd-ec426845374e"]
 *           
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "message": "Success"
 *   }
 * }
 *
 * @apiSampleRequest http://localhost:3301/users/
 *
 */
router.put('/', function (req, res) {
    service.updateManyUserRecords(req).then(function (result) {
        res.status(HttpStatus.OK).send(result);
    }, function (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
});
module.exports = router;
