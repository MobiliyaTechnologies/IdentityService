'use strict';
/**
 *  This module is use to define constants
 *  @module constants
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 *  import project modules
 */
var constants = {};
/**
 *  constansts
 */
constants.roles = ['Super Admin', 'Tenant Admin', 'Fleet Admin', 'Driver'];

constants.nameRegex = /^[a-zA-Z]*[a-zA-Z]+[a-zA-Z]*$/;
constants.mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,34}$/;
constants.passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
constants.previewTypes = [0, 1];
constants.status = [0, 1, 2, 3, 4, 5];
constants.daysRequired = [7, 90, 365];
constants.rolesInt = [1, 2, 3, 4, 5];
constants.assignLicense = [0, 1];
constants.keyTypes = ['PROD', 'DEV'];
constants.isGranted = [0, 1, 2];

constants.statusConstants = {
    "ACTIVE": 1,
    "PENDING": 2,
    "BLOCKED": 3,
    "REJECTED": 4
};

constants.rolesSortConstants = ['RoleName', 'createdAt', 'updatedAt'];
constants.tenantsSortConstants = ['TenantCompanyName', 'UserId', 'createdAt', 'updatedAt'];
constants.usersSortConstants = ['Id', 'Email', 'MobileNumber', 'FirstName', 'LastName', 'RoleId', 'FleetId'];
constants.orderConstants = ['asc', 'desc'];
constants.isDeleted = 0;
constants.tenantRole = 'Tenant Admin';
constants.sadminRole = 'Super Admin';
constants.fleetadminRole = 'Fleet Admin';
constants.driverRole = 'Driver';



/**
 *  export module
 */
module.exports = constants;