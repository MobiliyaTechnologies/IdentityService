
"use strict";
/**
 *  This module is use to define DAO for tenant model
 *  @module tenant model
 *  @author shweta.ghenand
 *  @version 1.0.0
 */


module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Tenant', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        tenantCompanyName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'TenantCompanyName can not be empty.'
                }
            },
            unique: true
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        }
    }, {
            tableName: 'tenant',
            freezeTableName: true
        });
};

