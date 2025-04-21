const express = require('express')
const routes_v1 = require('./v1/routes/index.router.js')

const router = express.Router()

router.use('/v1',routes_v1)

module.exports = router;
