const express = require('express')

const AddressController = require('../controllers/AddressController')
const CountryController = require('../controllers/CountryController')

const api = express.Router()

// Addresses
api.post('/addresses', AddressController.create)
api.get('/addresses', AddressController.index)
api.get('/addresses/:id', AddressController.detail)
api.delete('/addresses/:id', AddressController.delete)

// Countries
api.get('/countries', CountryController.index)
api.get('/countries/:id', CountryController.detail)

module.exports = api