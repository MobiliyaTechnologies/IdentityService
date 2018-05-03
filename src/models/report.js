/**
 *  This module is use to define DAO for report model
 *  @module report model
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Reports',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },

            reportName: {
                type: DataTypes.STRING,
                allowNull: false
            },

            reportId: {
                type: DataTypes.STRING,
                allowNull: false
            },

            tenantId: {
                type: DataTypes.STRING
            }
        },
        {
            freezeTableName: true,
            tableName: 'reports'
        });
};

