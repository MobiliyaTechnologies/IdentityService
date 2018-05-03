
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

    if (model === 'roles') {
        module.exports[model].sync().then(function () {
            return sequelize.transaction(function (t) {
                var insertObj = {
                    "roleName": "tenant admin",
                    "privileges": "add trip"
                };
                return module.exports['roles'].create(insertObj, { transaction: t }).then(function (result) {
                    var insertObj = {
                        "roleName": "fleet admin",
                        "privileges": "add trip"
                    };
                    return module.exports['roles'].create(insertObj, { transaction: t }).then(function (result) {

                        var insertRoleObj = {
                            "roleName": "driver",
                            "privileges": "add trip"
                        };
                        return module.exports['roles'].create(insertRoleObj, { transaction: t })
                    });
                });


            }).then(function (result) {
                console.log(" Roles created:");

            }).catch(function (err) {
                logger.error("Error in role creation");

            });
        });
    }

    if (model !== 'users') {
        module.exports[model].sync();
    } else {
        module.exports['users'].sync().then(function () {
            return sequelize.transaction(function (t) {
                var insertObj = {
                    "roleName": "super admin",
                    "privileges": "add trip"
                };
                return module.exports['roles'].create(insertObj, { transaction: t }).then(function (result) {
                    var insertObj = {
                        "tenantCompanyName": "root"
                    };
                    return module.exports['tenant'].create(insertObj, { transaction: t }).then(function (tenantResult) {
                        var insertObj = {
                            email: "superadmin@mobiliya.com",
                            mobileNumber: "0000000000",
                            password: util.encryptPassword('welcome'),
                            status: 1,
                            firstName: "Super",
                            lastName: "Admin",
                            roleId: result.id,
                            fleetId: "2a49828d-514d-403c-8868-3d2de896e0dd",
                            tenantId: tenantResult.id
                        }
                        return module.exports['users'].create(insertObj, { transaction: t });
                    });

                });
            }).then(function (result) {
                console.log("Super Admin Created userId:", result.id);

            }).catch(function (err) {
                logger.error("Error in Superadmin Creation,Record already exist");

            });
        });
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

