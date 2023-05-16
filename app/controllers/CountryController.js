const Country = require('../models/CountryModel');
const { check, validationResult } = require('express-validator');
const apiResponse = require('../helpers/apiResponse');

/**
 * Country index
 * 
 * @returns {Object}
 */
exports.index = [
    function (req, res) {
        try {
            Country.all().then((results) => {
                if (results !== null) {
                    return apiResponse.successResponseWithData(res, 'Countries list', results);
                } else {
                    return apiResponse.successResponseWithData(res, 'Countries list', {});
                }
            });
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
];

/**
 * Country detail
 * 
 * @param {string} id
 * @returns {Object}
 */
exports.detail = [
    function (req, res) {
        try {
            Country.find(req.params.id).then((result) => {
                if (result !== undefined) {
                    return apiResponse.successResponseWithData(res, 'Country', result);
                } else {
                    return apiResponse.notFoundResponse(res, 'Country does not exists');
                }
            });
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
];