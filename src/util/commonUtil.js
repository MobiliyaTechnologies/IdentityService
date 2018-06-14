'use strict';
/**
 *  This module is use to define Utility functions 
 *  @module CommonUtility
 *  @author shweta.ghenand
 *  @version 1.0.0
 */
var randStr = require('randomstring');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var https = require('http');
const secret = 'm@b1l1y@';
var config = require('../config/config.json');
config = config[config.activeEnv];

/**
 * export module
 */
module.exports = {
    /**
     * Utility function for generate random function 
     */
    generateRandomPassword: function () {
        return randStr.generate(8);
    },
    /**
     * Utility function for encrypt password
     */
    encryptPassword: function (password) {
        const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
        return hash;
    },

    /**
     * Utility function for compare password
     */
    comparePasswords: function (oldPassword, decryptPassword) {
        if (oldPassword === decryptPassword) return true;

        return false;
    },

    responseUtil: function (error, data, code) {
        var constants = require('../constant/responseConstant');
        var message = require('../constant/message');
        var response = {};
        if ((code == null || code == undefined) && (error == null || error == undefined)) {
            throw new Error("Please Send code or error message");
        } else if (code == null || code == undefined) {
            if (error.name === constants.SEQUELIZE_DATABASE_ERROR_NAME)
                code = constants.SEQUELIZE_DATABASE_ERROR_NAME_CODE;
            else if (error.name === constants.SEQUELIZE_VALIDATION_ERROR_NAME)
                code = constants.SEQUELIZE_VALIDATION_ERROR_NAME_CODE;
            else if (error.name === constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME)
                code = constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME_CODE;
            else if (error.name === constants.SEQUELIZE_CONSTRAINT_ERROR)
                code = constants.SEQUELIZE_CONSTRAINT_ERROR_CODE;
            else
                code = constants.UNDEFINED_DATABASE_ERROR;
        }
        //response.status = code;
        response.message = message.getMessage(code);
        if (error != null) {
            response.error = error;
            if (error.message != null || error.message != undefined) {
                response.message = response.message + ' :: ' + error.message;
            }

        }
        if (data != null) {
            if (!data.hasOwnProperty('rows')) {
                response.data = data;
            }
            else {
                response.count = data.count;
                response.data = data.rows;
            }
        }
        return response;
    },

    //if mGadge call fail then send throgh nodemailer
    sendMail: function (emailId, subject, msg, callback) {
        console.log(emailId, subject, msg);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });
        var mailOptions = {                                             // setup e-mail data with unicode symbols
            from: config.email.user,                                      // sender address
            to: emailId,                           // list of receivers
            subject: subject,                                     // Subject line
            text: 'Hello',                                            // plaintext body
            html: msg
        };
        transporter.sendMail(mailOptions, function (error, info) {       // send mail with defined transport object
            if (error) {
                console.log("error", error);
                return callback(error);
            } else {
                return callback(null, info.response);
            }
        });
    },

    /**
    * httpRequest utility function
    * @param  {Object} req
    */
    httpRequest: function (reqData, options, callback) {
        var getReq = https.request(options, function (res) {
            var responseObj = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                responseObj += chunk;
            });
            res.on('end', function () {
                return callback(null, JSON.parse(responseObj));
            });
        });

        getReq.write(reqData);
        //end the request
        getReq.end();
        getReq.on('error', function (err) {
            return callback(err);
        });
    },


}


