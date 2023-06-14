const router = require('express').Router()
const weatherController = require('../controllers/weather-controllers')

router.route('/:lat/:lon')
.get(weatherController.getArea)

module.exports = router