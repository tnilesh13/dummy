const express = require('express')
const router = express.Router()
const authenticationRoutes = require('./authenticationRouter.js')
const authenticationController = require('../controllers/authenticationController.js')

router.post('/login', authenticationController.logIn)
router.post('/signup', authenticationController.createuser)
// router.post('/forget', authenticationController.forget)

// ################################################# Authenticated Routes #################################################
router.use('/auth', authenticationRoutes)

module.exports = router
