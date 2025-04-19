const express = require('express')
const routes_v1 = require('./v1/routes/indexRouter')

const router = express.Router()

router.use('/v1',routes_v1)

module.exports = router;
