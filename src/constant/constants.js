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
//  */

constants.status = [0, 1, 2, 3, 4, 5];
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


/**
 *  export module
 */
module.exports = constants;