
/**
 *  This module is use to define database connection
 *  @module database connection
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

'use strict';

/**
 *  import project modules
 */
var util = require('../util/commonUtil');
var logger = require('../util/logger');

/*SQL DB Connection*/
var Sequelize = require('sequelize');
var config = require('./config.json');
config = config[config.activeEnv];

/**
 *  define database connection
 */
var sequelize = new Sequelize(config.databaseConnection.dbName, config.databaseConnection.dbUserName, config.databaseConnection.dbUserPassword, {
    host: config.databaseConnection.dbHost,
    dialect: config.databaseConnection.dbDialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    },
    logging: false
});

sequelize
    .authenticate()
    .then(function (data) {
        logger.info(" Getting connection object.");
    })
    .catch(function (err) {
        logger.error("Unable to connect to the database." + err);
    });

// load models
var models = [
    'users',
    'roles',
    'tenant',
    'report'
];
models.forEach(function (model) {
    logger.info("Model :: ", model, module.exports[model]);
    module.exports[model] = sequelize.import('../models/' + model);

    if (model === 'report') {
        module.exports[model].sync({}).then(() => {
            var insertReportList = [{ "reportName": "mileage", "reportId": null, "tenantId": null },
            { "reportName": "rpm", "reportId": null, "tenantId": null },
            { "reportName": "speed", "reportId": null, "tenantId": null },
            { "reportName": "fault_codes", "reportId": null, "tenantId": null },
            { "reportName": "average_mileage", "reportId": null, "tenantId": null }
            ];
            return module.exports['report'].bulkCreate(insertReportList).then((result) => {
                console.log("Report: blank rows created ", result)
            })
                .catch(function (err) {
                    logger.error("Failed to add blank rows in reports table." + err);
                });
        }).catch(function (err) {
            logger.error("Error in report creation", err);

        });
    }

    if (model === 'roles') {
        module.exports[model].sync().then(function () {
            var superAdminRoleId;
            var tenantAdminRoleId;
            return sequelize.transaction(function (t) {
                var insertRoleObj = [
                    {
                        "roleName": "super admin",
                        "privileges": "Manage users"
                    },
                    {
                        "roleName": "tenant admin",
                        "privileges": "Manage tenant specific fleets and users"
                    },
                    {
                        "roleName": "driver",
                        "privileges": "Create trip"
                    },
                    {
                        "roleName": "fleet admin",
                        "privileges": "Manage fleet specific vehicles and drivers"
                    }
                ]
                return module.exports['roles'].bulkCreate(insertRoleObj, { transaction: t }).then(function (roleResult) {
                    for (var i = 0; i < roleResult.length; i++) {
                        if (roleResult[i].dataValues.roleName == 'super admin') {
                            superAdminRoleId = roleResult[i].dataValues.id;
                        }
                        if (roleResult[i].dataValues.roleName == 'tenant admin') {
                            tenantAdminRoleId = roleResult[i].dataValues.id;
                        }
                    }

                    var insertTenantObj = {
                        "tenantCompanyName": "Mobiliya"
                    };
                    return module.exports['tenant'].create(insertTenantObj, { transaction: t }).then(function (tenantResult) {
                        var insertUserObj = [{
                            email: "superadmin@mobiliya.com",
                            mobileNumber: "0000000000",
                            password: util.encryptPassword('welcome'),
                            status: 1,
                            firstName: "Super",
                            lastName: "Admin",
                            roleId: superAdminRoleId,
                            tenantId: tenantResult.id
                        },

                        {
                            email: "tenantadmin@mobiliya.com",
                            mobileNumber: "0000000001",
                            password: util.encryptPassword('welcome'),
                            status: 1,
                            firstName: "Tenant",
                            lastName: "Admin",
                            roleId: tenantAdminRoleId,
                            tenantId: tenantResult.id
                        }]
                        return module.exports['users'].bulkCreate(insertUserObj, { transaction: t })
                    });
                });
            }).then(function (result) {
                logger.info("Super Admin and Tenant Admin created!");

            }).catch(function (err) {
                logger.error("Error in Super Admin and Tenant Admin creation,Records already exist");

            });
        });
    } else {
        module.exports[model].sync();
    }
});

// describe relationships
(function (m) {
    m.tenant.hasMany(m.users, { foreignKey: 'tenantId' });
    m.users.belongsTo(m.tenant, { foreignKey: { tenantId: 'id' } });

})(module.exports);


/**
 *  export modules
 */
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;

