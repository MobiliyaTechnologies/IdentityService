'use strict';
/**
 *  This module is use to define error messages
 *  @module message
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * import project modules
 */
var constants = require('./responseConstant');
var err_obj = [];
var store = {};

//success resposnse
err_obj[constants.SUCCESS] = "Success";

//DB ERROR
err_obj[constants.SEQUELIZE_DATABASE_ERROR] = "Invalid request information";//"Database query is wrong.";
err_obj[constants.SEQUELIZE_CONSTRAINT_ERROR_CODE] = "Invalid request information";//"Database unique field data required."
err_obj[constants.UNDEFINED_DATABASE_ERROR] = "Invalid request information";//"Database undefined error."
err_obj[constants.SEQUELIZE_DATABASE_TRANSACTION_ERROR] = "Invalid request information";//"Database transaction error."
//error response
err_obj[constants.UNABLE_TO_SEND_EMAIL] = "Error in sending email";
err_obj[constants.RUN_TIME_ERROR] = "Internal Server Error";
err_obj[constants.DUPLICATION_ERROR] = "User already exist";
err_obj[constants.LOGGED_OUT_ERROR] = "User already logged out";
err_obj[constants.UNAUTHORIZE] = "We are sorry but we are not able to authenticate you. Login again";
err_obj[constants.INVALID_CREDENTIAL] = "Invalid credentials";
err_obj[constants.INVALID_REQUEST_PARAMETERS] = "Invalid request";
err_obj[constants.PASSWORD_CHANGE_ERROR] = "Error in changing the password";
err_obj[constants.INVALID_ROLE] = "Invalid role";
err_obj[constants.PASSWORD_DUPLICATION_ERROR] = "The old password and new password cannot be same";
err_obj[constants.ROLE_NOT_FOUND] = "Role not found";
err_obj[constants.USER_NOT_FOUND] = "User not found";
err_obj[constants.INVALID_VEHICLE] = "Vehicle not found";
err_obj[constants.FLEET_NOT_FOUND] = "Fleet not found"
err_obj[constants.INVALID_TOKEN] = "Invalid authorization token";
err_obj[constants.TENANT_NOT_FOUND] = "Tenant not found";
err_obj[constants.FLEET_NULL_ERROR] = "Fleet can not be empty";
err_obj[constants.SUPERADMIN_DELETION_ERROR] = "Super admin might be supervising Tenant, Unable to delete super admin";
err_obj[constants.TENANT_DELETION_ERROR] = "Tenant admin might be supervising Fleet, Unable to delete tenant admin";
err_obj[constants.FLEETADMIN_DELETION_ERROR] = "Fleet admin might be supervising Fleet, Driver or Dongle. Unable to delete fleet admin";
err_obj[constants.DRIVER_DELETION_ERROR] = " Driver might be assigned to vehicle. Unable to delete";
err_obj[constants.VEHICLE_ASSIGN_ERROR] = " Unable to assign vehicle to driver";





/**
 * function for get message from error code
 */
store.getMessage = function (code) {
    return err_obj[code];
};
/**
 * export module
 */
module.exports = store;
