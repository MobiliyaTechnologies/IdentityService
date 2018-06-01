/**
 *  This module is use to define routes 
 *  @module roleRoutes
 * @author shweta.ghenand
 *  @version 1.0.0
 */
'use strict';

var express = require('express');
var HttpStatus = require('http-status-codes');
var router = express.Router();
var service = require('../src/service/role-service');
var util = require('../src/util/commonUtil');
var responseConstant = require('../src/constant/responseConstant');
var constants = require('../src/constant/constants');
var oauth = require('../src/config/authentication');

// Create Role API
/**
 * @api {post} /roles Create Role
 * @apiVersion 1.0.0
 * @apiName Create Role
 * @apiGroup Role
 *
 * @apiDescription Create a Role
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{ "roleName": "Super Admin", "privileges": "Manage users"}' http://<ip>:<port>/roles
 * -H "Authorization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiHeader {String} Authorization Authorization token.
 * 
 * @apiParam {String} roleName Mandatory role's Name.
 * @apiParam {String} privileges Mandatory privileges.
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *		"roleName": "Super Admin",
 *		"privileges": "Manage users"  
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *		{
    "message": "Success",
    "data": {
        "id": "935ba91b-d26d-49c0-8dc0-98556ea2cb2a",
        "roleName": "Super Admin",
        "privileges": "Manage users"
    }
}
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
 * @apiSampleRequest 
 * http://localhost:3301/roles
 *
 */
/* CREATE ROLE. */
router.post('/', oauth.isRolesApiAuthenticate, function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        var err = util.responseUtil(null, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    }
    req.checkBody('roleName', 'Role name can not be empty').notEmpty();
    req.checkBody('privileges', 'Privileges can not be empty').notEmpty();
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.insertData(req).then(function (result) {
            res.status(HttpStatus.CREATED).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


// Update Role's details API
/**
 * @api {put} /roles/:id Update Role's details
 * @apiVersion 1.0.0
 * @apiName Update Role
 * @apiGroup Role
 *
 * @apiDescription Update Role.
 *
 * @apiExample Example usage:
 * curl -i -X PUT  --data '{"roleName":"Tenant Admin","privileges": "Manage users"}' http://<ip>:<port>/roles/bd39049f-5e2a-4904-9571-68accae08aff
 * -H "Authorization:<access-token>" -H "Content-Type: application/json"
 * 
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiParam {String} roleName roleName.
 * @apiParam {String} privileges privileges.
 *
 * @apiParamExample {json} Request-Example:
 *	{
 *		"roleName": "Tenant Admin",
 		"privileges": "Manage users"
 *
 *	}
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *		{
 *       "message": "Success",
 *       "data": 
 *           {
 *               "id": "bd39049f-5e2a-4904-9571-68accae08aff",
 *               "roleName": "Super Admin",
 *               "privileges": "Manage users"
 *           }
 *       
 *   }
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
 * @apiSampleRequest http://localhost:3301/roles/bd39049f-5e2a-4904-9571-68accae08aff
 */
/* PUT update role. */
router.put('/:id', oauth.isRolesApiAuthenticate, function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        var err = util.responseUtil(null, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    }
    req.checkParams('id', 'RoleId can not be empty').notEmpty();
    req.checkParams('id', 'Invalid roleId').isUUID();
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


//Get Role's details API
/**
 * @api {get} /roles/:id Get Role's details
 * @apiVersion 1.0.0
 * @apiName Get Roles Details
 * @apiGroup Role
 * 
 * @apiDescription Show Role information.
 *
 * @apiExample Example usage:
 * curl -i -X GET  --data '{}'  http://localhost:3301/roles/bd39049f-5e2a-4904-9571-68accae08aff -H "Authorization:<access-token>" -H "Content-Type: application/json"
 * 
 * @apiHeader {String} Authorization Authorization token.
 *
 * @apiSuccessExample (json) Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *       "message": "Success",
 *       "data": 
 *           {
 *               "id": "bd39049f-5e2a-4904-9571-68accae08aff",
 *               "roleName": "Super Admin",
 *               "privileges": "Manage users"
 *           }
 *       
 *   }
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
 * 
 * @apiSampleRequest http://localhost:3301/roles/bd39049f-5e2a-4904-9571-68accae08aff
 *
 */
/* GET role by id */
router.get('/:id', oauth.isAuthenticate, function (req, res) {
    req.checkParams('id', 'RoleId can not be empty').notEmpty();
    req.checkParams('id', 'Invalid roleId').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.getRole(req).then(function (result) {
            res.status(HttpStatus.CREATED).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get All Roles List API
/**
 * @api {get} /roles Get All Roles List
 * @apiVersion 1.0.0
 * @apiName Get Roles List
 * @apiGroup Role
 * @apiDescription Get All Roles List.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3301/roles?limit=2&order=DESC&page=1 -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiHeader {String} Authorization Authorization token.
 * 
 * @apiParam {Number} [page=0] page Roles Page Number (optional).
 * @apiParam {Number} [limit=10] limit Roles List limit(optional).
 * @apiParam {Number} [sort=createdAt] sort Roles Sorting on which field(optional).
 * @apiParam {String} [order=asc] order Roles Sorting field order(asc|desc)(optional).
 *
 * @apiSuccessExample (json) Success-Response:
 *     HTTP/1.1 200 OK
 *        {
 *            "message": "Success",
 *            "count": 2,
 *       	 "data": [
        {
            "id": "2d9fbfbf-194c-4316-85e9-97561dea5162",
            "roleName": "Super Admin",
            "privileges": "Manage users"
        },
        {
            "id": "75bf7fb2-56a2-45e4-a1c7-7114fd20f311",
            "roleName": "Tenant Admin",
            "privileges": "Manage tenant specific fleets and users"
        },
        {
            "id": "966b70d1-7879-4473-afa8-eb956ada7b82",
            "roleName": "Fleet Admin",
            "privileges": "Manage fleet specific vehicles and drivers"
        },
        {
            "id": "9da7fee9-b08b-4504-895e-834013cd11ee",
            "roleName": "Driver",
            "privileges": "Create trip"
        }
    ]
 *   }
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
 * 
 * @apiSampleRequest http://localhost:3301/roles
 */
/* GET All Roles */
router.get('/', oauth.isAuthenticate, function (req, res) {
    req.checkQuery('limit', 'Invalid limit parameter').optional().isInt();
    req.checkQuery('page', 'Invalid page parameter').optional().isInt();
    req.checkQuery('sort', 'Invalid sort parameter').optional().isIn(constants.rolesSortConstants);
    req.checkQuery('order', 'Invalid order parameter').optional().isIn(constants.orderConstants);
    var errors = req.validationErrors(true);
    if (errors) {
        var err = util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS);
        res.status(HttpStatus.BAD_REQUEST).send(err);
    } else {
        service.getAllRoles(req).then(function (result) {
            res.status(HttpStatus.OK).send(result);
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});;


//Delete Role API
/**
 * @api {delete} /roles/:id Delete Role
 * @apiVersion 1.0.0
 * @apiName Delete Role
 * @apiGroup Role
 *
 * @apiDescription Delete a Role
 * 
 * @apiExample Example usage:
 * curl -i -X DELETE  --data '{}' http://<ip>:<port>/roles/2a49828d-514d-403c-8868-3d2de896e0dd
 * -H "Authorization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiHeader {String} Authorization Authorization token.
 * 
 @apiSuccess {String} message Message.
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
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
 
 * @apiSampleRequest http://localhost:3301/roles/2a49828d-514d-403c-8868-3d2de896e0dd
 *
 */
/* DELETE Role. */
router.delete('/:id', oauth.isRolesApiAuthenticate, function (req, res) {
    req.checkParams('id', 'RoleId can not be empty').notEmpty();
    req.checkParams('id', 'Invalid roleId').isUUID();
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