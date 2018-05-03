
/**
 *  This module is use to define service for roles model
 *  @module role-service
 * @author shweta.ghenand
 *  @version 1.0.0
 */
'use strict';
/**
 *  import project modules
 */

var _ = require('underscore');
var roleDao = require('../dao/role-dao');
var util = require('../util/commonUtil');
var responseConstant = require('../constant/responseConstant');
var logger = require('../util/logger');
var constants = require('../constant/constants');

/**
  * export module
  */
module.exports = {

    /**
     * Controller function for insert data
     */
    insertData: function (reqObj) {
        var insertObj = {
            "roleName": reqObj.body.roleName,
            "privileges": reqObj.body.privileges
        }
        return new Promise(function (resolve, reject) {
            roleDao.insertData(insertObj).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
     * Controller function for update data
     */
    updateData: function (req) {
        return new Promise(function (resolve, reject) {
            req.body = _.pick(req.body, 'roleName', 'privileges');
            roleDao.updateData(req.body, { id: req.params.id }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
    * Controller function for get Details
    *
    */
    getRole: function (req) {
        return new Promise(function (resolve, reject) {
            roleDao.getRole({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
    * Controller function for get all roles Details
    *
    */
    getAllRoles: function (req) {
        return new Promise(function (resolve, reject) {
            var page = 0;
            var limit = 10;
            var sort = 'createdAt';
            var order = 'asc';
            var reqObj = {};
            //remove page,sort,order and limit variable if exist
            if (req.query.order) {    //order of list
                order = req.query.order;
                //delete req.query.order;
            }
            if (req.query.sort) { //sort of list
                sort = req.query.sort;
                //delete req.query.sort;
            }
            if (req.query.limit) { //limit
                limit = parseInt(req.query.limit);
                //delete req.query.limit
            }
            if (req.query.page) { //which page data
                if (req.query.page >= 2)
                    page = (parseInt(req.query.page) - 1) * limit;
                else
                    page = 0;

                //delete req.query.page;
            }
            reqObj.isDeleted = 0;
            roleDao.getAllRoles(reqObj, page, limit, sort, order).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
    * Controller function for delete roles Details
    *
    */
    deleteData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = {};
            updateObj.isDeleted = 1;
            roleDao.deleteData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    }

}