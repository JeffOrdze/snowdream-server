const router = require('express').Router()
const avalancheController = require("../controllers/avalanche-controllers")

router.route('/:location')
.get(avalancheController.getAllAreas)

module.exports = router