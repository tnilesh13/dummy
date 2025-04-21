const express = require('express')
const router = express.Router()
const authenticationRoutes = require('./authentication.router.js')
const authenticationController = require('../controllers/authentication.controller.js')

router.post('/login', authenticationController.logIn)
router.post('/signup', authenticationController.createUser)
// router.post('/forget', authenticationController.forget)

// ################################################# Authenticated Routes #################################################
router.use('/auth', authenticationRoutes)

module.exports = router
