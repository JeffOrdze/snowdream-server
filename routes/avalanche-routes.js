const router = require('express').Router()
const avalancheController = require("../controllers/avalanche-controllers")

router.route('/')
.get(avalancheController.getAll)

router.route('/:lat/:lon')
.get(avalancheController.getArea)

module.exports = router