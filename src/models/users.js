
"use strict";

/**
 *  This module is use to define DAO for user model
 *  @module user model
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

var sequelize = require('../config/databaseConnection');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'The email you entered is invalid.'
                }
            }
        },
        password: {
            type: DataTypes.STRING
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true
            }
        },

        status: {
            type: DataTypes.SMALLINT
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        eulaAcceptanceTime: {
            type: DataTypes.STRING

        },
        area: {
            type: DataTypes.STRING,
            allowNull: true
        },
        licenseNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        roleId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'RoleId cannot be empty.'
                }
            }
        },
        fleetId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        tenantId: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'TenantId cannot be empty.'
                }
            }
        },
        isDriverAssign: {
            type: DataTypes.TINYINT,
            defaultValue: 0 //false and 1 means true
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
            tableName: 'users',
            freezeTableName: true
        });
};
