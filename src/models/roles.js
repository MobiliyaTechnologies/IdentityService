/**
 *  This module is use to define DAO for role model
 *  @module role model
 *  @author shweta.ghenand
 *  @version 1.0.0
 */


module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Roles',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            roleName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            privileges: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false
            },

            isDeleted: {
                type: DataTypes.SMALLINT,
                defaultValue: 0
            }
        },
        {
            freezeTableName: true,
            tableName: 'roles'
        });
};

