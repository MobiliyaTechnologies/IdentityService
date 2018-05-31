'use strict';
/**
 *  This module is use to define response constants
 *  @module responseConstants
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * npm modules
 */

/*
** Sequelize error code 
** undefined error code 
** Business logic error code
** Internal error code
*/

var constants = {};

constants.SUCCESS = 0;

constants.SEQUELIZE_DATABASE_ERROR = 1001;

constants.SEQUELIZE_DATABASE_TRANSACTION_ERROR = 1004;
constants.SEQUELIZE_CONSTRAINT_ERROR_CODE = 1005;
constants.UNDEFINED_DATABASE_ERROR = 1006;
constants.SEQUELIZE_DATABASE_ERROR_NAME_CODE = 1007;
constants.SEQUELIZE_VALIDATION_ERROR_NAME_CODE = 1008;
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME_CODE = 1009;

constants.UNABLE_TO_SEND_EMAIL = 1108;
constants.RUN_TIME_ERROR = 1109;
constants.DUPLICATION_ERROR = 1111;
constants.LOGGED_OUT_ERROR = 1120;
constants.UNAUTHORIZE = 1122;
constants.INVALID_CREDENTIAL = 1123;
constants.INVALID_REQUEST_PARAMETERS = 1124;
constants.PASSWORD_CHANGE_ERROR = 1125;
constants.INVALID_ROLE = 1127;
constants.ROLE_NOT_FOUND = 1129;
constants.TENANT_NOT_FOUND = 1138;
constants.USER_NOT_FOUND = 1130;
constants.PASSWORD_DUPLICATION_ERROR = 1131;
constants.INVALID_VEHICLE = 1133;
constants.FLEET_NOT_FOUND = 1134;
constants.INVALID_TOKEN = 1135;
constants.ERROR_IN_DELETION = 1136;

constants.SEQUELIZE_DATABASE_ERROR_NAME = 'SequelizeDatabaseError';
constants.SEQUELIZE_VALIDATION_ERROR_NAME = 'SequelizeValidationError';
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME = 'SequelizeForeignKeyConstraintError';
constants.SEQUELIZE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError';

/**
 * export module
 */
module.exports = constants;