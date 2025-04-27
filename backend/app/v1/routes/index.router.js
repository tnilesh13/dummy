const express = require('express')
const router = express.Router()
const authenticationRoutes = require('./authentication.router.js')
const authenticationController = require('../controllers/authentication.controller.js')

router.post('/login', authenticationController.logIn)
router.post('/signup', authenticationController.createUser)
// forget password remaining

// -------Authenticated Routes------
router.use('/auth', authenticationRoutes)

module.exports = router
