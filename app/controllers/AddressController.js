const Address = require('../models/AddressModel');
const Country = require('../models/CountryModel');
const { check, validationResult } = require('express-validator');
const apiResponse = require('../helpers/apiResponse');
const utility = require("../helpers/utility");

/**
 * Address index
 * 
 * @returns {Object}
 */
exports.index = [
    function (req, res) {
        try {
            Address.all().then((results) => {
                if (results !== null) {
                    let paginatedResults = utility.paginateResults(req.query.page, results);
                    
                    return apiResponse.successResponseWithDataAndMeta(res, 'Addresses list', paginatedResults.paginatedData, paginatedResults.paginationInfo);
                } else {
                    return apiResponse.successResponseWithData(res, 'Addresses list', {});
                }
            });
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
];

/**
 * Address detail
 * 
 * @param {string} id
 * @returns {Object}
 */
exports.detail = [
    function (req, res) {
        try {
            Address.find(req.params.id).then((result) => {
                if (result !== undefined) {
                    return apiResponse.successResponseWithData(res, 'Address', result);
                } else {
                    return apiResponse.notFoundResponse(res, 'Address does not exists');
                }
            });
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
];

/**
 * Address delete
 * 
 * @param {string} id
 * @returns {Object}
 */
exports.delete = [
    function (req, res) {
        try {
            Address.find(req.params.id).then((result) => {
                if (result !== undefined) {
                    Address.delete(req.params.id).then(() => {
                        return apiResponse.successResponse(res, 'Address deleted');
                    });
                } else {
                    return apiResponse.notFoundResponse(res, 'Address does not exists');
                }
            });
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
];

/**
 * Address create
 * 
 * @param {string} name 
 * @param {string} street
 * @param {string} city
 * @param {string} zip
 * @param {string} country_id
 * @returns {Object}
 */
exports.create = [
    check("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
    check("street", "Street must not be empty.").isLength({ min: 1 }).trim(),
    check("city", "City must not be empty.").isLength({ min: 1 }).trim(),
    check("zip", "ZIP must not be empty.").isLength({ min: 1 }).trim(),

    check("country_id", "Country must not be empty").isLength({ min: 1 }).trim().custom((country_id,{req}) => {
        return Country.find(country_id).then((country) => {
            if (country === undefined) {
                return Promise.reject('Country does not exist');
            }
        });
    }),

    (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
            } else {
                addressData = {
                    country_id: req.body.country_id,
                    name: req.body.name,
                    street: req.body.street,
                    city: req.body.city,
                    zip: req.body.zip
                }

                Address.create(addressData).then(address_id => {
                    return apiResponse.successResponseWithData(res, 'Address created', { 'id': parseInt(address_id) });
                }).catch(err => {
                    return apiResponse.errorResponse(res, err);
                });
            }
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
];